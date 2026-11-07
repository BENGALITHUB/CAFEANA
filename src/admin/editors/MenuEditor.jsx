import React, { useState } from 'react';
import { Plus, Trash2, ArrowUp, ArrowDown, ChevronDown, ChevronUp, Eye, EyeOff, Utensils } from 'lucide-react';
import ImageUploader from '../components/ImageUploader';
import { useSiteContent } from '../../context/SiteContentContext';

export default function MenuEditor() {
  const { content, updateSection } = useSiteContent();
  const menu = content?.menu || {};
  const categories = menu.categories || [];

  const [activeCatIndex, setActiveCatIndex] = useState(0);
  const [editingItemCatIdx, setEditingItemCatIdx] = useState(null);
  const [newItemData, setNewItemData] = useState({
    name: '',
    description: '',
    price: '',
    available: true,
    featured: false,
    image: ''
  });

  const handleChange = (field, val) => {
    updateSection('menu', { [field]: val });
  };

  const handleCategoryChange = (index, field, val) => {
    const updated = [...categories];
    updated[index] = { ...updated[index], [field]: val };
    handleChange('categories', updated);
  };

  const handleAddCategory = () => {
    const newCat = {
      id: `cat-${Date.now()}`,
      name: 'New Cuisine / Category',
      subtitle: 'Artisanal Flavours',
      description: 'Description of this culinary tradition and flavour profile.',
      image: '/images/menu-coffee.jpg',
      tag: 'Chef Selection',
      highlights: ['Fresh Ingredients', 'Handcrafted'],
      visible: true,
      items: []
    };
    handleChange('categories', [...categories, newCat]);
    setActiveCatIndex(categories.length);
  };

  const handleDeleteCategory = (index) => {
    if (categories.length <= 1) {
      alert('You must have at least one menu category.');
      return;
    }
    const confirmed = window.confirm(`Delete "${categories[index].name}" category?`);
    if (confirmed) {
      const updated = categories.filter((_, i) => i !== index);
      handleChange('categories', updated);
      setActiveCatIndex(Math.max(0, index - 1));
    }
  };

  const handleMoveCategory = (index, direction) => {
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= categories.length) return;
    const updated = [...categories];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    handleChange('categories', updated);
    setActiveCatIndex(targetIdx);
  };

  const handleToggleCatVisibility = (index) => {
    const current = categories[index].visible !== false;
    handleCategoryChange(index, 'visible', !current);
  };

  // Menu items management inside active category
  const activeCategory = categories[activeCatIndex] || categories[0];

  const handleAddMenuItem = (e) => {
    e.preventDefault();
    if (!newItemData.name.trim()) return;

    const currentItems = activeCategory.items || [];
    const itemToAdd = {
      id: `item-${Date.now()}`,
      ...newItemData
    };

    handleCategoryChange(activeCatIndex, 'items', [...currentItems, itemToAdd]);
    setNewItemData({ name: '', description: '', price: '', available: true, featured: false, image: '' });
    setEditingItemCatIdx(null);
  };

  const handleDeleteMenuItem = (itemId) => {
    const currentItems = activeCategory.items || [];
    const updated = currentItems.filter((item) => item.id !== itemId);
    handleCategoryChange(activeCatIndex, 'items', updated);
  };

  return (
    <div>
      {/* Section Global Settings */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3 className="admin-card-title">Menu Section Settings</h3>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={menu.visible !== false}
              onChange={(e) => handleChange('visible', e.target.checked)}
            />
            <span>Menu Section Visible</span>
          </label>
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Section Badge</label>
          <input
            type="text"
            className="admin-input"
            value={menu.badge || ''}
            onChange={(e) => handleChange('badge', e.target.value)}
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Section Title</label>
          <input
            type="text"
            className="admin-input"
            value={menu.title || ''}
            onChange={(e) => handleChange('title', e.target.value)}
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Section Intro Description</label>
          <textarea
            className="admin-textarea"
            value={menu.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
          />
        </div>
      </div>

      {/* Categories Reorder & Selection Bar */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3 className="admin-card-title">Menu Categories ({categories.length})</h3>
          <button
            type="button"
            className="admin-btn admin-btn-primary"
            style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
            onClick={handleAddCategory}
          >
            <Plus size={14} />
            Add Category
          </button>
        </div>

        {/* Category Pill Tabs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {categories.map((cat, idx) => {
            const isSelected = activeCatIndex === idx;
            const isVisible = cat.visible !== false;

            return (
              <div
                key={cat.id || idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: isSelected ? '#651E32' : '#FAF7F2',
                  border: isSelected ? '1px solid #651E32' : '1px solid #D4C3B3',
                  borderRadius: '4px',
                  padding: '0.3rem 0.6rem',
                  cursor: 'pointer',
                  opacity: isVisible ? 1 : 0.6
                }}
                onClick={() => setActiveCatIndex(idx)}
              >
                <span
                  style={{
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: isSelected ? '#FFFFFF' : '#3B101F',
                    marginRight: '0.4rem'
                  }}
                >
                  {cat.name}
                </span>

                <div style={{ display: 'flex', gap: '2px' }} onClick={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: isSelected ? '#C6A36A' : '#7A6662', padding: '2px' }}
                    onClick={() => handleToggleCatVisibility(idx)}
                    title={isVisible ? 'Hide Category' : 'Show Category'}
                  >
                    {isVisible ? <Eye size={12} /> : <EyeOff size={12} />}
                  </button>
                  <button
                    type="button"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: isSelected ? '#FFF' : '#7A6662', padding: '2px' }}
                    onClick={() => handleMoveCategory(idx, -1)}
                    disabled={idx === 0}
                    title="Move Left"
                  >
                    <ArrowUp size={12} />
                  </button>
                  <button
                    type="button"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: isSelected ? '#FFF' : '#7A6662', padding: '2px' }}
                    onClick={() => handleMoveCategory(idx, 1)}
                    disabled={idx === categories.length - 1}
                    title="Move Right"
                  >
                    <ArrowDown size={12} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Category Detail Form */}
        {activeCategory && (
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
                Editing: {activeCategory.name}
              </h4>
              <button
                type="button"
                className="admin-btn admin-btn-danger"
                style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
                onClick={() => handleDeleteCategory(activeCatIndex)}
              >
                <Trash2 size={13} />
                Delete Category
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="admin-form-group">
                <label className="admin-label">Category Name</label>
                <input
                  type="text"
                  className="admin-input"
                  value={activeCategory.name || ''}
                  onChange={(e) => handleCategoryChange(activeCatIndex, 'name', e.target.value)}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Subtitle / Flavour Profile</label>
                <input
                  type="text"
                  className="admin-input"
                  value={activeCategory.subtitle || ''}
                  onChange={(e) => handleCategoryChange(activeCatIndex, 'subtitle', e.target.value)}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="admin-form-group">
                <label className="admin-label">Badge Tag</label>
                <input
                  type="text"
                  className="admin-input"
                  value={activeCategory.tag || ''}
                  onChange={(e) => handleCategoryChange(activeCatIndex, 'tag', e.target.value)}
                  placeholder="e.g. Global Heritage"
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Highlights (comma separated)</label>
                <input
                  type="text"
                  className="admin-input"
                  value={(activeCategory.highlights || []).join(', ')}
                  onChange={(e) =>
                    handleCategoryChange(
                      activeCatIndex,
                      'highlights',
                      e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                    )
                  }
                  placeholder="e.g. Aromatic Broths, Coconut Reductions"
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Category Description</label>
              <textarea
                className="admin-textarea"
                value={activeCategory.description || ''}
                onChange={(e) => handleCategoryChange(activeCatIndex, 'description', e.target.value)}
              />
            </div>

            {/* Category Image Upload */}
            <div style={{ marginTop: '1rem' }}>
              <ImageUploader
                label="Category Food Image"
                value={activeCategory.image}
                onChange={(newVal) => handleCategoryChange(activeCatIndex, 'image', newVal)}
              />
            </div>

            {/* Category Dishes / Menu Items Support */}
            <div style={{ marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(101,30,50,0.15)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                <h5 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', color: '#3B101F', margin: 0 }}>
                  Featured Dishes for {activeCategory.name} ({activeCategory.items?.length || 0})
                </h5>
                <button
                  type="button"
                  className="admin-btn admin-btn-outline"
                  style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}
                  onClick={() => setEditingItemCatIdx(editingItemCatIdx === activeCatIndex ? null : activeCatIndex)}
                >
                  <Plus size={13} />
                  {editingItemCatIdx === activeCatIndex ? 'Close Form' : 'Add Dish'}
                </button>
              </div>

              {/* Add dish form */}
              {editingItemCatIdx === activeCatIndex && (
                <form
                  onSubmit={handleAddMenuItem}
                  style={{
                    background: '#FFFFFF',
                    padding: '1rem',
                    borderRadius: '4px',
                    border: '1px solid #D4C3B3',
                    marginBottom: '1rem'
                  }}
                >
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '0.8rem', marginBottom: '0.8rem' }}>
                    <div>
                      <label className="admin-label">Dish Name</label>
                      <input
                        type="text"
                        className="admin-input"
                        required
                        value={newItemData.name}
                        onChange={(e) => setNewItemData({ ...newItemData, name: e.target.value })}
                        placeholder="e.g. Royal Thai Tom Yum"
                      />
                    </div>
                    <div>
                      <label className="admin-label">Price (Optional)</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={newItemData.price}
                        onChange={(e) => setNewItemData({ ...newItemData, price: e.target.value })}
                        placeholder="e.g. $18 or ₹450"
                      />
                    </div>
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-label">Dish Short Description</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={newItemData.description}
                      onChange={(e) => setNewItemData({ ...newItemData, description: e.target.value })}
                      placeholder="Simmered lemongrass, tiger prawns, and kaffir lime"
                    />
                  </div>

                  <button type="submit" className="admin-btn admin-btn-primary" style={{ padding: '0.45rem 1rem' }}>
                    Save Dish to Category
                  </button>
                </form>
              )}

              {/* Dishes list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {(activeCategory.items || []).map((dish) => (
                  <div
                    key={dish.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.5rem 0.8rem',
                      background: '#FFFFFF',
                      borderRadius: '4px',
                      border: '1px solid #E8D8C5'
                    }}
                  >
                    <div>
                      <strong style={{ fontSize: '0.88rem', color: '#211817' }}>{dish.name}</strong>
                      {dish.price && <span style={{ marginLeft: '0.6rem', color: '#8C6A30', fontWeight: 600, fontSize: '0.82rem' }}>{dish.price}</span>}
                      {dish.description && <p style={{ margin: '0.1rem 0 0 0', fontSize: '0.78rem', color: '#7A6662' }}>{dish.description}</p>}
                    </div>
                    <button
                      type="button"
                      className="admin-btn admin-btn-danger"
                      style={{ padding: '0.35rem 0.5rem' }}
                      onClick={() => handleDeleteMenuItem(dish.id)}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
