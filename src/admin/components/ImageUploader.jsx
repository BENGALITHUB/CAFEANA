import { assetUrl } from '../../services/assetUrl';
import React, { useState, useRef } from 'react';
import { Upload, Trash2, RotateCcw, AlertTriangle, CheckCircle, Image as ImageIcon } from 'lucide-react';
import { optimizeImage } from '../../services/imageProcessor';

export default function ImageUploader({
  label = 'Image',
  value,
  originalValue,
  onChange,
  onReset
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [warning, setWarning] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError('');
    setWarning('');
    setLoading(true);

    try {
      const result = await optimizeImage(file);
      onChange(result.dataUrl);
      if (result.isLarge) {
        setWarning('Image is larger than 1.5MB. Compressed for performance.');
      }
    } catch (err) {
      setError(err.message || 'Failed to process image.');
    } finally {
      setLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = () => {
    onChange('');
    setError('');
    setWarning('');
  };

  const handleRestore = () => {
    if (originalValue) {
      onChange(originalValue);
      if (onReset) onReset();
      setError('');
      setWarning('');
    }
  };

  return (
    <div className="admin-form-group">
      <label className="admin-label">{label}</label>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/jpeg,image/png,image/webp,image/svg+xml,image/x-icon,image/vnd.microsoft.icon,.svg,.ico"
        style={{ display: 'none' }}
      />

      <div className="admin-image-uploader">
        {value ? (
          <div>
            <img
              src={assetUrl(value)}
              alt="Uploaded Preview"
              className="admin-image-preview-thumb"
            />
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
              <button
                type="button"
                className="admin-btn admin-btn-outline"
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.78rem' }}
                onClick={() => fileInputRef.current?.click()}
                disabled={loading}
              >
                <Upload size={14} />
                Replace Image
              </button>

              <button
                type="button"
                className="admin-btn admin-btn-danger"
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.78rem' }}
                onClick={handleRemove}
              >
                <Trash2 size={14} />
                Remove
              </button>

              {originalValue && value !== originalValue && (
                <button
                  type="button"
                  className="admin-btn admin-btn-outline"
                  style={{ padding: '0.4rem 0.8rem', fontSize: '0.78rem' }}
                  onClick={handleRestore}
                  title="Restore original factory image"
                >
                  <RotateCcw size={14} />
                  Original
                </button>
              )}
            </div>
          </div>
        ) : (
          <div>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: 'rgba(101, 30, 50, 0.08)',
                color: '#651E32',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 0.6rem auto'
              }}
            >
              <ImageIcon size={22} />
            </div>
            <p style={{ fontSize: '0.82rem', color: '#7A6662', margin: '0 0 0.75rem 0' }}>
              Upload JPG, PNG, or WebP. Images are optimized automatically.
            </p>
            <button
              type="button"
              className="admin-btn admin-btn-primary"
              style={{ padding: '0.45rem 1rem', fontSize: '0.82rem' }}
              onClick={() => fileInputRef.current?.click()}
              disabled={loading}
            >
              <Upload size={14} />
              {loading ? 'Optimizing...' : 'Upload Image'}
            </button>
          </div>
        )}

        {error && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#8A1C2C', fontSize: '0.78rem', marginTop: '0.6rem', justifyContent: 'center' }}>
            <AlertTriangle size={14} />
            <span>{error}</span>
          </div>
        )}

        {warning && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#C6A36A', fontSize: '0.78rem', marginTop: '0.6rem', justifyContent: 'center' }}>
            <AlertTriangle size={14} />
            <span>{warning}</span>
          </div>
        )}
      </div>
    </div>
  );
}
