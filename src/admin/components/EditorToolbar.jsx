import React, { useRef } from 'react';
import { Save, UploadCloud, RotateCcw, Download, Upload, ExternalLink, Check, AlertCircle } from 'lucide-react';
import { useSiteContent } from '../../context/SiteContentContext';
import { exportConfigurationToFile, importConfigurationFromFile } from '../../services/exportService';

export default function EditorToolbar({ title, onExportSuccess }) {
  const {
    content,
    setEntireContent,
    saveStatus,
    handleSaveDraft,
    handlePublishLocally,
    handleResetDraft
  } = useSiteContent();

  const fileInputRef = useRef(null);

  const onSaveDraftClick = () => {
    handleSaveDraft();
  };

  const onPublishClick = () => {
    const confirmed = window.confirm(
      'Publish changes locally to this browser? Your public website in this browser will display these updates immediately.'
    );
    if (confirmed) {
      handlePublishLocally();
    }
  };

  const onResetClick = () => {
    const confirmed = window.confirm(
      'Discard all unsaved draft changes and reset back to the last published configuration?'
    );
    if (confirmed) {
      handleResetDraft();
    }
  };

  const onExportClick = () => {
    const meta = exportConfigurationToFile(content);
    if (onExportSuccess) {
      onExportSuccess(meta);
    }
  };

  const handleImportFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const imported = await importConfigurationFromFile(file);
      setEntireContent(imported);
      alert('Configuration imported successfully! You can now review and preview the changes.');
    } catch (err) {
      alert(`Import failed: ${err.message}`);
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <header className="admin-header">
      {/* Title & Section breadcrumb */}
      <div>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: '#3B101F', margin: 0, fontWeight: 600 }}>
          {title}
        </h2>
        <span style={{ fontSize: '0.78rem', color: '#7A6662', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Cafeana Visual Studio • Live Synchronized
        </span>
      </div>

      {/* Save Status & Action Controls */}
      <div className="admin-header-actions">
        {/* Status Pill */}
        {saveStatus === 'unsaved' && (
          <span className="admin-status-pill unsaved">
            <AlertCircle size={12} />
            Unsaved Changes
          </span>
        )}
        {saveStatus === 'saved' && (
          <span className="admin-status-pill saved">
            <Check size={12} />
            Draft Saved
          </span>
        )}
        {saveStatus === 'published' && (
          <span className="admin-status-pill published">
            <Check size={12} />
            Published Locally
          </span>
        )}

        {/* Hidden Import file input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImportFile}
          accept=".json,application/json"
          style={{ display: 'none' }}
        />

        {/* Save Draft Button */}
        <button
          type="button"
          className="admin-btn admin-btn-outline"
          onClick={onSaveDraftClick}
          title="Save draft to browser storage"
        >
          <Save size={15} />
          Save Draft
        </button>

        {/* Publish Locally Button */}
        <button
          type="button"
          className="admin-btn admin-btn-primary"
          onClick={onPublishClick}
          title="Publish updates locally to current browser"
        >
          <UploadCloud size={15} />
          Publish Locally
        </button>

        {/* Reset Draft Button */}
        <button
          type="button"
          className="admin-btn admin-btn-outline"
          onClick={onResetClick}
          title="Discard draft changes"
        >
          <RotateCcw size={15} />
          Reset
        </button>

        {/* Export JSON Button */}
        <button
          type="button"
          className="admin-btn admin-btn-gold"
          onClick={onExportClick}
          title="Download cafeana-site-content.json for GitHub deployment"
        >
          <Download size={15} />
          Export JSON
        </button>

        {/* Import JSON Button */}
        <button
          type="button"
          className="admin-btn admin-btn-outline"
          onClick={() => fileInputRef.current?.click()}
          title="Import configuration JSON file"
        >
          <Upload size={15} />
          Import
        </button>

        {/* View Public Website */}
        <a
          href="#/"
          target="_blank"
          rel="noopener noreferrer"
          className="admin-btn admin-btn-outline"
          title="Open public website in new tab"
        >
          <ExternalLink size={15} />
          Public Site
        </a>
      </div>
    </header>
  );
}
