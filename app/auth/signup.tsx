import { userRegisterSchema, vendorRegisterSchema } from '@/lib/validationSchemas';
import { AppDispatch, RootState } from '@/store';
import { clearError, registerUser } from '@/store/slices/authSlice';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

// ─── Types ────────────────────────────────────────────────────────────────────
type FormErrors = Partial<{
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  businessName: string;
  gstNumber: string;
}>;

// ─── Component ────────────────────────────────────────────────────────────────
export default function SignupScreen() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [role, setRole] = useState<'user' | 'vendor'>('user');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form values
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Validation errors
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  // ── Clear error for a specific field when user starts typing ──
  const clearFieldError = (field: keyof FormErrors) => {
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  // ── Validate and submit ───────────────────────────────────────
  const handleSignup = async () => {
    const schema = role === 'vendor' ? vendorRegisterSchema : userRegisterSchema;
    const values = { name, email, phone, password, confirmPassword};

    try {
      await schema.validate(values, { abortEarly: false });
    } catch (validationError) {
      if (validationError instanceof Yup.ValidationError) {
        const errors: FormErrors = {};
        validationError.inner.forEach((err) => {
          if (err.path) errors[err.path as keyof FormErrors] = err.message;
        });
        setFormErrors(errors);
        return;
      }
    }

    setFormErrors({});
    dispatch(clearError());

    const result = await dispatch(
      registerUser({
        name,
        email,
        phone,
        password,
        is_vendor: role === 'vendor' ? true: false,
      })
    );

    if (registerUser.fulfilled.match(result)) {
      router.replace('/(drawer)' as any);
    }
  };

  // ── Helper: renders a red error message beneath a field ──────
  const FieldError = ({ field }: { field: keyof FormErrors }) =>
    formErrors[field] ? (
      <Text style={styles.fieldError}>{formErrors[field]}</Text>
    ) : null;

  // ── Helper: border highlight when field has error ────────────
  const inputStyle = (field: keyof FormErrors) =>
    formErrors[field] ? [styles.input, styles.inputError] : styles.input;

  const passwordContainerStyle = (field: keyof FormErrors) =>
    formErrors[field]
      ? [styles.passwordContainer, styles.inputError]
      : styles.passwordContainer;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>
              Join AmritBazar as a {role === 'user' ? 'customer' : 'partner'} today!
            </Text>
          </View>

          {/* Role Toggle */}
          <View style={styles.roleContainer}>
            <TouchableOpacity
              style={[styles.roleButton, role === 'user' && styles.roleButtonActive]}
              onPress={() => setRole('user')}
              activeOpacity={0.8}
            >
              <Ionicons name="person" size={18} color={role === 'user' ? '#fff' : '#666'} />
              <Text style={[styles.roleText, role === 'user' && styles.roleTextActive]}>
                User
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.roleButton, role === 'vendor' && styles.roleButtonActive]}
              onPress={() => setRole('vendor')}
              activeOpacity={0.8}
            >
              <Ionicons name="storefront" size={18} color={role === 'vendor' ? '#fff' : '#666'} />
              <Text style={[styles.roleText, role === 'vendor' && styles.roleTextActive]}>
                Vendor
              </Text>
            </TouchableOpacity>
          </View>

          {/* Form */}
          <View style={styles.form}>

            {/* Full Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={inputStyle('name')}
                placeholder="Enter your full name"
                value={name}
                onChangeText={(v) => { setName(v); clearFieldError('name'); }}
              />
              <FieldError field="name" />
            </View>

            {/* Vendor-only fields */}
            

            {/* Email */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={inputStyle('email')}
                placeholder="name@example.com"
                value={email}
                onChangeText={(v) => { setEmail(v); clearFieldError('email'); }}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <FieldError field="email" />
            </View>

            {/* Phone */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={inputStyle('phone')}
                placeholder="10-digit mobile number"
                value={phone}
                onChangeText={(v) => { setPhone(v); clearFieldError('phone'); }}
                keyboardType="phone-pad"
                maxLength={10}
              />
              <FieldError field="phone" />
            </View>

            {/* Password */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={passwordContainerStyle('password')}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Min 8 chars, 1 uppercase, 1 number"
                  value={password}
                  onChangeText={(v) => { setPassword(v); clearFieldError('password'); }}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color="#888"
                  />
                </TouchableOpacity>
              </View>
              <FieldError field="password" />
            </View>

            {/* Confirm Password */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Confirm Password</Text>
              <View style={passwordContainerStyle('confirmPassword')}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChangeText={(v) => { setConfirmPassword(v); clearFieldError('confirmPassword'); }}
                  secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={styles.eyeIcon}
                >
                  <Ionicons
                    name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color="#888"
                  />
                </TouchableOpacity>
              </View>
              <FieldError field="confirmPassword" />
            </View>

            {/* API Error Banner */}
            {error ? (
              <View style={styles.errorBanner}>
                <Ionicons name="alert-circle-outline" size={16} color="#C0392B" />
                <Text style={styles.errorBannerText}>{error}</Text>
              </View>
            ) : null}

            {/* Submit Button */}
            <TouchableOpacity
              style={[styles.signupButton, loading && styles.signupButtonDisabled]}
              onPress={handleSignup}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.signupButtonText}>Sign Up</Text>
              )}
            </TouchableOpacity>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => router.push('/auth/login' as any)}>
                <Text style={styles.linkText}>Log In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 32,
  },
  backButton: {
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  roleContainer: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 4,
    marginBottom: 32,
  },
  roleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    gap: 8,
  },
  roleButtonActive: {
    backgroundColor: '#0C831F',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  roleText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#666',
  },
  roleTextActive: {
    color: '#fff',
  },
  form: {
    gap: 20,
  },
  inputGroup: {
    gap: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  optional: {
    fontWeight: '400',
    color: '#999',
  },
  input: {
    backgroundColor: '#F9F9F9',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#111',
  },
  inputError: {
    borderColor: '#E74C3C',
    backgroundColor: '#FFF8F8',
  },
  fieldError: {
    fontSize: 12,
    color: '#E74C3C',
    marginTop: 2,
    marginLeft: 4,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 12,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#111',
  },
  eyeIcon: {
    padding: 14,
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FDECEA',
    borderRadius: 10,
    padding: 12,
    gap: 8,
  },
  errorBannerText: {
    flex: 1,
    color: '#C0392B',
    fontSize: 14,
    lineHeight: 20,
  },
  signupButton: {
    backgroundColor: '#0C831F',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    elevation: 2,
  },
  signupButtonDisabled: {
    backgroundColor: '#6BBF7A',
    elevation: 0,
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  footerText: {
    color: '#666',
    fontSize: 15,
  },
  linkText: {
    color: '#0C831F',
    fontWeight: '700',
    fontSize: 15,
  },
});
