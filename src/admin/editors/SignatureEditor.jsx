import React, { useState } from 'react';
import { Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import ImageUploader from '../components/ImageUploader';
import { useSiteContent } from '../../context/SiteContentContext';

export default function SignatureEditor() {
  const { content, updateSection } = useSiteContent();
  const sig = content?.signatureDishes || {};
  const items = sig.items || [];

  const [activeDishIdx, setActiveDishIdx] = useState(0);

  const handleChange = (field, val) => {
    updateSection('signatureDishes', { [field]: val });
  };

  const handleDishChange = (index, field, val) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: val };
    handleChange('items', updated);
  };

  const handleAddDish = () => {
    const newDish = {
      id: Date.now(),
      title: 'New Signature Creation',
      category: 'Chef Masterpiece',
      description: 'Slow-simmered artisanal delicacy with chef reduction glaze.',
      image: '/images/sig-1.jpg',
      accent: 'Chef Special Reserve',
      quote: '“Crafted with precision, warmth, and culinary devotion.”',
      visible: true
    };
    handleChange('items', [...items, newDish]);
    setActiveDishIdx(items.length);
  };

  const handleDeleteDish = (index) => {
    if (items.length <= 1) {
      alert('You must have at least one signature dish.');
      return;
    }
    const confirmed = window.confirm(`Delete "${items[index].title}"?`);
    if (confirmed) {
      const updated = items.filter((_, i) => i !== index);
      handleChange('items', updated);
      setActiveDishIdx(Math.max(0, index - 1));
    }
  };

  const handleMoveDish = (index, direction) => {
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= items.length) return;
    const updated = [...items];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    handleChange('items', updated);
    setActiveDishIdx(targetIdx);
  };

  const activeDish = items[activeDishIdx] || items[0];

  return (
    <div>
      {/* Section Global Settings */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3 className="admin-card-title">Signature Dishes Settings</h3>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={sig.visible !== false}
              onChange={(e) => handleChange('visible', e.target.checked)}
            />
            <span>Section Visible</span>
          </label>
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Badge Label</label>
          <input
            type="text"
            className="admin-input"
            value={sig.badge || ''}
            onChange={(e) => handleChange('badge', e.target.value)}
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Main Section Heading</label>
          <input
            type="text"
            className="admin-input"
            value={sig.title || ''}
            onChange={(e) => handleChange('title', e.target.value)}
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Section Description</label>
          <textarea
            className="admin-textarea"
            value={sig.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
          />
        </div>
      </div>

      {/* Signature Dishes List */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3 className="admin-card-title">Signature Showcase Items ({items.length})</h3>
          <button
            type="button"
            className="admin-btn admin-btn-primary"
            style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
            onClick={handleAddDish}
          >
            <Plus size={14} />
            Add Signature Dish
          </button>
        </div>

        {/* Tab switcher */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {items.map((dish, idx) => {
            const isSelected = activeDishIdx === idx;
            return (
              <div
                key={dish.id || idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: isSelected ? '#651E32' : '#FAF7F2',
                  border: isSelected ? '1px solid #651E32' : '1px solid #D4C3B3',
                  borderRadius: '4px',
                  padding: '0.3rem 0.6rem',
                  cursor: 'pointer'
                }}
                onClick={() => setActiveDishIdx(idx)}
              >
                <span
                  style={{
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: isSelected ? '#FFFFFF' : '#3B101F',
                    marginRight: '0.4rem'
                  }}
                >
                  0{idx + 1}. {dish.title}
                </span>

                <div style={{ display: 'flex', gap: '2px' }} onClick={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: isSelected ? '#FFF' : '#7A6662', padding: '2px' }}
                    onClick={() => handleMoveDish(idx, -1)}
                    disabled={idx === 0}
                  >
                    <ArrowUp size={12} />
                  </button>
                  <button
                    type="button"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: isSelected ? '#FFF' : '#7A6662', padding: '2px' }}
                    onClick={() => handleMoveDish(idx, 1)}
                    disabled={idx === items.length - 1}
                  >
                    <ArrowDown size={12} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Active dish editing */}
        {activeDish && (
          <div
            style={{
              padding: '1.25rem',
              background: '#FAF7F2',
              borderRadius: '6px',
              border: '1px solid #D4C3B3'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid rgba(101,30,50,0.1)', paddingBottom: '0.5rem' }}>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: '#3B101F', margin: 0 }}>
                Editing: {activeDish.title}
              </h4>
              <button
                type="button"
                className="admin-btn admin-btn-danger"
                style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
                onClick={() => handleDeleteDish(activeDishIdx)}
              >
                <Trash2 size={13} />
                Delete Dish
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
              <div className="admin-form-group">
                <label className="admin-label">Dish Title</label>
                <input
                  type="text"
                  className="admin-input"
                  value={activeDish.title || ''}
                  onChange={(e) => handleDishChange(activeDishIdx, 'title', e.target.value)}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Category Subheading</label>
                <input
                  type="text"
                  className="admin-input"
                  value={activeDish.category || ''}
                  onChange={(e) => handleDishChange(activeDishIdx, 'category', e.target.value)}
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Floating Accent Badge</label>
              <input
                type="text"
                className="admin-input"
                value={activeDish.accent || ''}
                onChange={(e) => handleDishChange(activeDishIdx, 'accent', e.target.value)}
                placeholder="e.g. Slow-Cooked 48 Hours"
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Editorial Quote</label>
              <input
                type="text"
                className="admin-input"
                value={activeDish.quote || ''}
                onChange={(e) => handleDishChange(activeDishIdx, 'quote', e.target.value)}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Dish Description</label>
              <textarea
                className="admin-textarea"
                value={activeDish.description || ''}
                onChange={(e) => handleDishChange(activeDishIdx, 'description', e.target.value)}
              />
            </div>

            <ImageUploader
              label="Signature Dish Photography"
              value={activeDish.image}
              onChange={(newVal) => handleDishChange(activeDishIdx, 'image', newVal)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
