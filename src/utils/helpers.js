import { format, parseISO, formatDistanceToNow } from 'date-fns';

/** Format an ISO date string to a human-readable date */
export const formatDate = (isoString, fmt = 'dd MMM yyyy') => {
  if (!isoString) return '—';
  try {
    return format(parseISO(isoString), fmt);
  } catch {
    return isoString;
  }
};

/** Returns 'x minutes ago' style string */
export const timeAgo = (isoString) => {
  if (!isoString) return '—';
  try {
    return formatDistanceToNow(parseISO(isoString), { addSuffix: true });
  } catch {
    return isoString;
  }
};

/** Format a number as Indian Rupee currency */
export const formatCurrency = (amount, currency = 'INR') => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
};

/** Truncate a string to maxLength characters */
export const truncate = (str, maxLength = 100) => {
  if (!str) return '';
  return str.length > maxLength ? `${str.slice(0, maxLength)}…` : str;
};

/** Capitalize the first letter of a string */
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/** Map booking status to badge variant class */
export const getStatusBadgeClass = (status) => {
  const map = {
    pending:    'badge-warning',
    confirmed:  'badge-primary',
    in_progress:'badge-primary',
    completed:  'badge-success',
    cancelled:  'badge-danger',
    rejected:   'badge-danger',
  };
  return map[status] ?? 'badge-gray';
};

/** Build full image URL – handles both relative paths and absolute URLs */
export const getImageUrl = (path) => {
  if (!path) return '/assets/placeholder.png';
  if (path.startsWith('http')) return path;
  return `${import.meta.env.VITE_API_BASE_URL?.replace('/api/v1', '')}/${path}`;
};
