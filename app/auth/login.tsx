import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { loginUser, clearError } from '@/store/slices/authSlice';
import { loginSchema } from '@/lib/validationSchemas';
import * as Yup from 'yup';

type FormErrors = Partial<{
  email: string;
  password: string;
}>;

export default function LoginScreen() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const clearFieldError = (field: keyof FormErrors) => {
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleLogin = async () => {
    try {
      await loginSchema.validate({ email, password }, { abortEarly: false });
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

    const result = await dispatch(loginUser({ email, password }));

    if (loginUser.fulfilled.match(result)) {
      const user = result.payload.user ?? result.payload.data;
      if (user?.is_vendor) {
        router.replace('/(drawer-vendor)' as any);
      } else {
        router.replace('/(drawer)/(tabs)' as any);
      }
    }
  };

  const FieldError = ({ field }: { field: keyof FormErrors }) =>
    formErrors[field] ? (
      <Text style={styles.fieldError}>{formErrors[field]}</Text>
    ) : null;

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
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>

            <Text style={styles.title}>Welcome Back 👋</Text>
            <Text style={styles.subtitle}>
              Login to continue shopping on AmritBazar
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
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

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={passwordContainerStyle('password')}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Enter password"
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

            {/* Forgot Password */}
            <TouchableOpacity
              style={styles.forgotPassword}
              onPress={() => router.push('/auth/forgot-password' as any)}
            >
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* API Error Banner */}
            {error ? (
              <View style={styles.errorBanner}>
                <Ionicons name="alert-circle-outline" size={16} color="#C0392B" />
                <Text style={styles.errorBannerText}>{error}</Text>
              </View>
            ) : null}

            {/* Login Button */}
            <TouchableOpacity 
              style={[styles.loginButton, loading && styles.loginButtonDisabled]} 
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.loginButtonText}>Log In</Text>
              )}
            </TouchableOpacity>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Dont have an account? </Text>
              <TouchableOpacity onPress={() => router.push('/auth/signup')}>
                <Text style={styles.linkText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

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
  form: {
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
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
  forgotPassword: {
    alignItems: 'flex-end',
  },
  forgotText: {
    color: '#0C831F',
    fontWeight: '600',
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
  loginButton: {
    backgroundColor: '#0C831F',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    marginTop: 10,
  },
  loginButtonDisabled: {
    backgroundColor: '#6BBF7A',
    elevation: 0,
  },
  loginButtonText: {
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