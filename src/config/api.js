const configuredApiBaseUrl = process.env.REACT_APP_API_BASE_URL?.replace(/\/+$/, '');

export const API_BASE_URL = configuredApiBaseUrl || (
  process.env.NODE_ENV === 'production'
    ? window.location.origin
    : 'http://127.0.0.1:8000'
);

export const UPLOADS_BASE_URL = `${API_BASE_URL}/uploads/`;
