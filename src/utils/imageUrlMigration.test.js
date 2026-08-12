import {
  migrateUploadUrl,
  migrateUploadUrls,
  resolveAssetUrl,
  resolveUploadUrl,
} from './imageUrlMigration';

const localImageUrl = 'http://127.0.0.1:8000/uploads/heros/example.jpeg';

test('moves production upload URLs to the local Laravel server', () => {
  expect(
    migrateUploadUrl('https://costech.kingdomsolutions.co.tz/uploads/heros/example.jpeg')
  ).toBe(localImageUrl);
});

test('adds the Laravel port to localhost upload URLs returned by the API', () => {
  expect(migrateUploadUrl('http://localhost/uploads/heros/example.jpeg')).toBe(localImageUrl);
});

test('migrates upload URLs in nested API response data', () => {
  expect(
    migrateUploadUrls({ items: [{ image: 'http://localhost/uploads/heros/example.jpeg' }] })
  ).toEqual({ items: [{ image: localImageUrl }] });
});

test('resolves relative database upload paths against the Laravel server', () => {
  expect(resolveUploadUrl('uploads/heros/example.jpeg')).toBe(localImageUrl);
});

test('resolves local document URLs against the Laravel server', () => {
  expect(resolveAssetUrl('http://localhost/uploads/reports/example.pdf')).toBe(
    'http://127.0.0.1:8000/uploads/reports/example.pdf'
  );
});
