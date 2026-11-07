import React, { useState } from 'react';
import { Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import ImageUploader from '../components/ImageUploader';
import { useSiteContent } from '../../context/SiteContentContext';

export default function AmbienceEditor() {
  const { content, updateSection } = useSiteContent();
  const ambience = content?.ambience || {};
  const moments = ambience.moments || [];

  const [activeMomentIdx, setActiveMomentIdx] = useState(0);

  const handleChange = (field, val) => {
    updateSection('ambience', { [field]: val });
  };

  const handleMomentChange = (index, field, val) => {
    const updated = [...moments];
    updated[index] = { ...updated[index], [field]: val };
    handleChange('moments', updated);
  };

  const handleAddMoment = () => {
    const newMoment = {
      id: Date.now(),
      title: 'New Café Corner',
      description: 'Warm lighting, relaxed seating, and an atmosphere crafted for lingering conversations.',
      image: '/images/ambience-1.jpg',
      tag: 'Atmosphere',
      visible: true
    };
    handleChange('moments', [...moments, newMoment]);
    setActiveMomentIdx(moments.length);
  };

  const handleDeleteMoment = (index) => {
    if (moments.length <= 1) {
      alert('You must have at least one ambience highlight.');
      return;
    }
    const confirmed = window.confirm(`Delete "${moments[index].title}"?`);
    if (confirmed) {
      const updated = moments.filter((_, i) => i !== index);
      handleChange('moments', updated);
      setActiveMomentIdx(Math.max(0, index - 1));
    }
  };

  const handleMoveMoment = (index, direction) => {
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= moments.length) return;
    const updated = [...moments];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    handleChange('moments', updated);
    setActiveMomentIdx(targetIdx);
  };

  const activeMoment = moments[activeMomentIdx] || moments[0];

  return (
    <div>
      {/* Global Ambience Settings */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3 className="admin-card-title">Ambience Section Settings</h3>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={ambience.visible !== false}
              onChange={(e) => handleChange('visible', e.target.checked)}
            />
            <span>Ambience Section Visible</span>
          </label>
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Section Badge</label>
          <input
            type="text"
            className="admin-input"
            value={ambience.badge || ''}
            onChange={(e) => handleChange('badge', e.target.value)}
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Main Section Heading</label>
          <input
            type="text"
            className="admin-input"
            value={ambience.title || ''}
            onChange={(e) => handleChange('title', e.target.value)}
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Section Description</label>
          <textarea
            className="admin-textarea"
            value={ambience.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
          />
        </div>
      </div>

      {/* Moments List */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3 className="admin-card-title">Ambience Atmosphere Moments ({moments.length})</h3>
          <button
            type="button"
            className="admin-btn admin-btn-primary"
            style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
            onClick={handleAddMoment}
          >
            <Plus size={14} />
            Add Moment
          </button>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {moments.map((moment, idx) => {
            const isSelected = activeMomentIdx === idx;
            return (
              <div
                key={moment.id || idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: isSelected ? '#651E32' : '#FAF7F2',
                  border: isSelected ? '1px solid #651E32' : '1px solid #D4C3B3',
                  borderRadius: '4px',
                  padding: '0.3rem 0.6rem',
                  cursor: 'pointer'
                }}
                onClick={() => setActiveMomentIdx(idx)}
              >
                <span
                  style={{
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: isSelected ? '#FFFFFF' : '#3B101F',
                    marginRight: '0.4rem'
                  }}
                >
                  {moment.title}
                </span>

                <div style={{ display: 'flex', gap: '2px' }} onClick={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: isSelected ? '#FFF' : '#7A6662', padding: '2px' }}
                    onClick={() => handleMoveMoment(idx, -1)}
                    disabled={idx === 0}
                  >
                    <ArrowUp size={12} />
                  </button>
                  <button
                    type="button"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: isSelected ? '#FFF' : '#7A6662', padding: '2px' }}
                    onClick={() => handleMoveMoment(idx, 1)}
                    disabled={idx === moments.length - 1}
                  >
                    <ArrowDown size={12} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {activeMoment && (
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
                Editing: {activeMoment.title}
              </h4>
              <button
                type="button"
                className="admin-btn admin-btn-danger"
                style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
                onClick={() => handleDeleteMoment(activeMomentIdx)}
              >
                <Trash2 size={13} />
                Delete Moment
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
              <div className="admin-form-group">
                <label className="admin-label">Moment Title</label>
                <input
                  type="text"
                  className="admin-input"
                  value={activeMoment.title || ''}
                  onChange={(e) => handleMomentChange(activeMomentIdx, 'title', e.target.value)}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Mood Tag / Label</label>
                <input
                  type="text"
                  className="admin-input"
                  value={activeMoment.tag || ''}
                  onChange={(e) => handleMomentChange(activeMomentIdx, 'tag', e.target.value)}
                  placeholder="e.g. Evening Mood"
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Moment Description</label>
              <textarea
                className="admin-textarea"
                value={activeMoment.description || ''}
                onChange={(e) => handleMomentChange(activeMomentIdx, 'description', e.target.value)}
              />
            </div>

            <ImageUploader
              label="Atmosphere Photography"
              value={activeMoment.image}
              onChange={(newVal) => handleMomentChange(activeMomentIdx, 'image', newVal)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
