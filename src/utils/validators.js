/**
 * Client-side form validation rules.
 * Each validator returns an error message string or null if valid.
 */

export const required = (value) =>
  value !== undefined && value !== null && String(value).trim() !== ''
    ? null
    : 'This field is required.';

export const minLength = (min) => (value) =>
  value && value.length >= min ? null : `Minimum ${min} characters required.`;

export const maxLength = (max) => (value) =>
  !value || value.length <= max ? null : `Maximum ${max} characters allowed.`;

export const isEmail = (value) =>
  /^\S+@\S+\.\S+$/.test(value) ? null : 'Please enter a valid email address.';

export const isStrongPassword = (value) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(value)
    ? null
    : 'Password must be 8+ characters with uppercase, lowercase, number, and symbol.';

export const isPhone = (value) =>
  /^[6-9]\d{9}$/.test(value) ? null : 'Enter a valid 10-digit Indian phone number.';

export const isPincode = (value) =>
  /^\d{6}$/.test(value) ? null : 'Enter a valid 6-digit pincode.';

/**
 * Compose multiple validators for a single field.
 * Returns the first error message encountered, or null if all pass.
 *
 * @example
 *   const error = compose(required, minLength(8), isStrongPassword)(value);
 */
export const compose = (...validators) => (value) => {
  for (const validator of validators) {
    const error = validator(value);
    if (error) return error;
  }
  return null;
};
