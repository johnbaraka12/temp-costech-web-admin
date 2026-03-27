import { useEffect, useMemo, useRef, useState } from 'react';
import '../css/NewsImagesModal.css';

export function NewsImagesModal({ open, newsItem, localUploadedImages = [], onClose, onUpload, onDeleteExisting, uploading = false }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  const previewUrls = useMemo(
    () => selectedFiles.map((file) => ({ file, url: URL.createObjectURL(file) })),
    [selectedFiles]
  );

  const existingImages = useMemo(() => {
    if (!newsItem) return localUploadedImages;
    if (Array.isArray(newsItem.otherImages) && newsItem.otherImages.length) {
      return [
        ...newsItem.otherImages,
        ...localUploadedImages,
      ];
    }
    return localUploadedImages;
  }, [newsItem, localUploadedImages]);

  useEffect(() => {
    if (!open) return;
    setSelectedFiles([]);
    setError('');
  }, [open, newsItem?.id]);

  useEffect(() => {
    return () => {
      previewUrls.forEach(({ url }) => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  if (!open) return null;

  const handleFileChange = (e) => {
    const pickedFiles = Array.from(e.target.files || []);
    if (!pickedFiles.length) {
      setSelectedFiles([]);
      setError('');
      return;
    }
    const invalidFile = pickedFiles.find((next) => !next.type.startsWith('image/'));
    if (invalidFile) {
      setSelectedFiles([]);
      setError('Please select an image file.');
      e.target.value = '';
      return;
    }
    setSelectedFiles(pickedFiles);
    setError('');
  };

  const handleRemoveSelected = (indexToRemove) => {
    setSelectedFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
    setError('');
    if (inputRef.current) {
      if (selectedFiles.length <= 1) {
        inputRef.current.value = '';
      }
    }
  };

  const handleUpload = async () => {
    if (!newsItem?.id) {
      setError('Missing news id.');
      return;
    }
    if (!selectedFiles.length) {
      setError('Please choose at least one image first.');
      return;
    }
    setError('');
    await onUpload?.(newsItem, selectedFiles);
  };

  return (
    <div className="news-images-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="news-images-modal" onClick={(e) => e.stopPropagation()}>
        <div className="news-images-header">
          <h3 className="news-images-title">Upload news image</h3>
          <button type="button" className="news-images-close" onClick={onClose} aria-label="Close">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="18" height="18" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="news-images-body">
          <div className="news-images-meta">
            <div className="news-images-meta-label">News</div>
            <div className="news-images-meta-value">{newsItem?.title || '—'}</div>
          </div>

          <div className="news-images-field">
            <label className="news-images-label" htmlFor="news-image-upload-input">
              Choose image
            </label>
            <input
              ref={inputRef}
              id="news-image-upload-input"
              type="file"
              name="image"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              disabled={uploading}
            />
          </div>

          <div className="news-images-preview-grid">
            {existingImages.map((entry, index) => (
              <div key={`existing-${index}`} className="news-images-preview existing">
                <img src={typeof entry === 'string' ? entry : entry?.image} alt={`Uploaded news ${index + 1}`} />
                {typeof entry !== 'string' && entry?.id && (
                  <button
                    type="button"
                    className="news-images-remove"
                    onClick={() => onDeleteExisting?.(newsItem, entry)}
                    disabled={uploading}
                    aria-label="Delete uploaded image"
                    title="Delete uploaded image"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}

            {previewUrls.map(({ url, file }, index) => (
              <div key={`${file.name}-${index}`} className="news-images-preview selected">
                <img src={url} alt={`Selected upload ${index + 1}`} />
                <button
                  type="button"
                  className="news-images-remove"
                  onClick={() => handleRemoveSelected(index)}
                  disabled={uploading}
                  aria-label="Remove selected image"
                  title="Remove selected image"
                >
                  ×
                </button>
              </div>
            ))}

            {!existingImages.length && !previewUrls.length && (
              <div className="news-images-empty">No image available</div>
            )}
          </div>

          {error && <div className="news-images-error">{error}</div>}
        </div>

        <div className="news-images-actions">
          <button type="button" className="news-images-cancel" onClick={onClose} disabled={uploading}>
            Cancel
          </button>
          <button
            type="button"
            className="news-images-upload"
            onClick={handleUpload}
            disabled={uploading || !selectedFiles.length}
          >
            {uploading ? 'Uploading…' : 'Upload'}
          </button>
        </div>
      </div>
    </div>
  );
}
