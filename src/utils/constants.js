/** ─── App-wide constants ──────────────────────────────────────────────────── */

export const APP_NAME = import.meta.env.VITE_APP_NAME || 'ServiceBook';
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

/** User roles */
export const ROLES = {
  CUSTOMER: 'customer',
  PROVIDER: 'provider',
  ADMIN: 'admin',
};

/** Booking lifecycle statuses */
export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  REJECTED: 'rejected',
};

/** Booking status display labels */
export const BOOKING_STATUS_LABELS = {
  pending:     'Pending',
  confirmed:   'Confirmed',
  in_progress: 'In Progress',
  completed:   'Completed',
  cancelled:   'Cancelled',
  rejected:    'Rejected',
};

/** Service price units */
export const PRICE_UNITS = {
  FIXED:    'fixed',
  PER_HOUR: 'per_hour',
  PER_DAY:  'per_day',
};

export const PRICE_UNIT_LABELS = {
  fixed:    'Fixed Price',
  per_hour: 'Per Hour',
  per_day:  'Per Day',
};

/** Pagination */
export const DEFAULT_PAGE_SIZE = 12;

/** Rating stars */
export const MAX_RATING = 5;
