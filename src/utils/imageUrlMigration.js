import { UPLOADS_BASE_URL } from '../config/api';

const SOURCE_UPLOADS_URLS = [
  'https://costech.kingdomsolutions.co.tz/uploads',
  'http://localhost/uploads',
];

export const migrateUploadUrl = (value) => {
  if (typeof value !== 'string') {
    return value;
  }

  for (const sourceUrl of SOURCE_UPLOADS_URLS) {
    if (value === sourceUrl || value === `${sourceUrl}/`) {
      return UPLOADS_BASE_URL;
    }

    if (value.startsWith(`${sourceUrl}/`)) {
      return `${UPLOADS_BASE_URL}${value.slice(sourceUrl.length + 1)}`;
    }
  }

  return value;
};

export const resolveAssetUrl = (value) => {
  const migratedValue = migrateUploadUrl(value);

  if (
    typeof migratedValue !== 'string' ||
    /^(?:https?:|data:|blob:)/.test(migratedValue)
  ) {
    return migratedValue;
  }

  const relativePath = migratedValue.replace(/^\/+/, '').replace(/^uploads\//, '');
  return `${UPLOADS_BASE_URL}${relativePath}`;
};

export const resolveUploadUrl = resolveAssetUrl;

export const migrateUploadUrls = (value) => {
  if (Array.isArray(value)) {
    return value.map(migrateUploadUrls);
  }

  if (
    value &&
    typeof value === 'object' &&
    Object.getPrototypeOf(value) === Object.prototype
  ) {
    return Object.fromEntries(
      Object.entries(value).map(([key, nestedValue]) => [key, migrateUploadUrls(nestedValue)])
    );
  }

  return migrateUploadUrl(value);
};
