import * as Yup from 'yup';

// ─── Reusable Field Rules ─────────────────────────────────────────────────────
const nameField = Yup.string()
  .min(2, 'Name must be at least 2 characters')
  .required('Full name is required');

const emailField = Yup.string()
  .email('Enter a valid email address')
  .required('Email is required');

const phoneField = Yup.string()
  .matches(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number')
  .required('Phone number is required');

const passwordField = Yup.string()
  .min(8, 'Password must be at least 8 characters')
  .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .matches(/[0-9]/, 'Password must contain at least one number')
  .required('Password is required');

const confirmPasswordField = Yup.string()
  .oneOf([Yup.ref('password')], 'Passwords do not match')
  .required('Please confirm your password');

// ─── Auth Schemas ─────────────────────────────────────────────────────────────

/** Registration schema for regular users */
export const userRegisterSchema = Yup.object().shape({
  name: nameField,
  email: emailField,
  phone: phoneField,
  password: passwordField,
  confirmPassword: confirmPasswordField,
});

/** Registration schema for vendors (extends user schema) */
export const vendorRegisterSchema = Yup.object().shape({
  name: nameField,
  email: emailField,
  phone: phoneField,
  password: passwordField,
  confirmPassword: confirmPasswordField,
});

/** Login schema */
export const loginSchema = Yup.object().shape({
  email: emailField,
  password: Yup.string().required('Password is required'),
});

// ─── Add more schemas below as the app grows ──────────────────────────────────
