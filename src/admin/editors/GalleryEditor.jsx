import { assetUrl } from '../../services/assetUrl';
import React, { useRef } from 'react';
import { Plus, Trash2, ArrowUp, ArrowDown, Eye, EyeOff, Upload, Image as ImageIcon } from 'lucide-react';
import { useSiteContent } from '../../context/SiteContentContext';
import { optimizeImage } from '../../services/imageProcessor';

export default function GalleryEditor() {
  const { content, updateSection } = useSiteContent();
  const gallery = content?.gallery || {};
  const items = gallery.items || [];
  const multiFileInputRef = useRef(null);

  const handleChange = (field, val) => {
    updateSection('gallery', { [field]: val });
  };

  const handleItemChange = (index, field, val) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: val };
    handleChange('items', updated);
  };

  const handleDeleteItem = (index) => {
    const confirmed = window.confirm('Delete this gallery photo?');
    if (confirmed) {
      const updated = items.filter((_, i) => i !== index);
      handleChange('items', updated);
    }
  };

  const handleMoveItem = (index, direction) => {
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= items.length) return;
    const updated = [...items];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    handleChange('items', updated);
  };

  const handleToggleItemVisibility = (index) => {
    const current = items[index].visible !== false;
    handleItemChange(index, 'visible', !current);
  };

  const handleAddSingleItem = () => {
    const newItem = {
      id: Date.now(),
      title: 'New Gallery Snapshot',
      category: 'Food',
      image: '/images/gallery-1.jpg',
      visible: true
    };
    handleChange('items', [...items, newItem]);
  };

  const handleMultiUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newItems = [];
    for (const file of files) {
      try {
        const result = await optimizeImage(file);
        newItems.push({
          id: Date.now() + Math.random(),
          title: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
          category: 'Food',
          image: result.dataUrl,
          visible: true
        });
      } catch (err) {
        console.error('Error optimizing image:', err);
      }
    }

    if (newItems.length > 0) {
      handleChange('items', [...items, ...newItems]);
    }

    if (multiFileInputRef.current) {
      multiFileInputRef.current.value = '';
    }
  };

  const categoriesList = ['Food', 'Coffee', 'Mocktails', 'Desserts', 'Interior'];

  return (
    <div>
      {/* Global Gallery Settings */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3 className="admin-card-title">Gallery Settings</h3>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={gallery.visible !== false}
              onChange={(e) => handleChange('visible', e.target.checked)}
            />
            <span>Gallery Section Visible</span>
          </label>
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Section Badge</label>
          <input
            type="text"
            className="admin-input"
            value={gallery.badge || ''}
            onChange={(e) => handleChange('badge', e.target.value)}
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Section Title</label>
          <input
            type="text"
            className="admin-input"
            value={gallery.title || ''}
            onChange={(e) => handleChange('title', e.target.value)}
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Section Description</label>
          <textarea
            className="admin-textarea"
            value={gallery.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
          />
        </div>
      </div>

      {/* Gallery Items Grid Manager */}
      <div className="admin-card">
        <div className="admin-card-header">
          <div>
            <h3 className="admin-card-title">Gallery Collection ({items.length})</h3>
            <span style={{ fontSize: '0.78rem', color: '#7A6662' }}>
              Drag, edit captions, or batch upload photos
            </span>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {/* Multi-upload hidden input */}
            <input
              type="file"
              ref={multiFileInputRef}
              onChange={handleMultiUpload}
              multiple
              accept="image/jpeg,image/png,image/webp"
              style={{ display: 'none' }}
            />

            <button
              type="button"
              className="admin-btn admin-btn-outline"
              style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
              onClick={() => multiFileInputRef.current?.click()}
            >
              <Upload size={14} />
              Upload Multiple
            </button>

            <button
              type="button"
              className="admin-btn admin-btn-primary"
              style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
              onClick={handleAddSingleItem}
            >
              <Plus size={14} />
              Add Photo
            </button>
          </div>
        </div>

        {/* Items List */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {items.map((item, idx) => {
            const isVisible = item.visible !== false;

            return (
              <div
                key={item.id || idx}
                style={{
                  background: '#FAF7F2',
                  border: '1px solid #D4C3B3',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  opacity: isVisible ? 1 : 0.6,
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                {/* Thumb Header with actions */}
                <div style={{ position: 'relative', height: '160px', background: '#211817' }}>
                  <img
                    src={assetUrl(item.image)}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />

                  {/* Top Bar Controls */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '0.4rem',
                      right: '0.4rem',
                      display: 'flex',
                      gap: '0.3rem',
                      background: 'rgba(33, 24, 23, 0.75)',
                      padding: '0.2rem 0.4rem',
                      borderRadius: '4px'
                    }}
                  >
                    <button
                      type="button"
                      style={{ background: 'none', border: 'none', color: '#FFF', cursor: 'pointer', padding: '2px' }}
                      onClick={() => handleToggleItemVisibility(idx)}
                      title={isVisible ? 'Hide Photo' : 'Show Photo'}
                    >
                      {isVisible ? <Eye size={13} /> : <EyeOff size={13} />}
                    </button>
                    <button
                      type="button"
                      style={{ background: 'none', border: 'none', color: '#FFF', cursor: 'pointer', padding: '2px' }}
                      onClick={() => handleMoveItem(idx, -1)}
                      disabled={idx === 0}
                      title="Move Left"
                    >
                      <ArrowUp size={13} />
                    </button>
                    <button
                      type="button"
                      style={{ background: 'none', border: 'none', color: '#FFF', cursor: 'pointer', padding: '2px' }}
                      onClick={() => handleMoveItem(idx, 1)}
                      disabled={idx === items.length - 1}
                      title="Move Right"
                    >
                      <ArrowDown size={13} />
                    </button>
                    <button
                      type="button"
                      style={{ background: 'none', border: 'none', color: '#E8A5A5', cursor: 'pointer', padding: '2px' }}
                      onClick={() => handleDeleteItem(idx)}
                      title="Delete Photo"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>

                {/* Card Fields */}
                <div style={{ padding: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', flexGrow: 1 }}>
                  <div>
                    <label className="admin-label" style={{ fontSize: '0.7rem' }}>Title / Caption</label>
                    <input
                      type="text"
                      className="admin-input"
                      style={{ padding: '0.4rem 0.6rem', fontSize: '0.82rem' }}
                      value={item.title || ''}
                      onChange={(e) => handleItemChange(idx, 'title', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="admin-label" style={{ fontSize: '0.7rem' }}>Category Tag</label>
                    <select
                      className="admin-select"
                      style={{ padding: '0.4rem 0.6rem', fontSize: '0.82rem' }}
                      value={item.category || 'Food'}
                      onChange={(e) => handleItemChange(idx, 'category', e.target.value)}
                    >
                      {categoriesList.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
