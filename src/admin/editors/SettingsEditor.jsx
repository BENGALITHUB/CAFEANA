import React, { useRef } from 'react';
import { Download, Upload, RotateCcw, AlertTriangle, Key, ShieldCheck } from 'lucide-react';
import { useSiteContent } from '../../context/SiteContentContext';
import { exportConfigurationToFile, importConfigurationFromFile } from '../../services/exportService';
import { ADMIN_CREDENTIALS } from '../../config/adminConfig';

export default function SettingsEditor({ onExportSuccess }) {
  const {
    content,
    setEntireContent,
    handleResetDraft,
    handleRestoreDefaults
  } = useSiteContent();

  const fileInputRef = useRef(null);

  const onExportClick = () => {
    const meta = exportConfigurationToFile(content);
    if (onExportSuccess) onExportSuccess(meta);
  };

  const onImportFile = async (e) => {
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

  const onRestoreFactoryClick = () => {
    const confirmed = window.confirm(
      'WARNING: This will erase all local drafts and overrides, restoring original Cafeana factory settings. Proceed?'
    );
    if (confirmed) {
      handleRestoreDefaults();
      alert('Website restored to original factory defaults.');
    }
  };

  return (
    <div>
      {/* Configuration Backup & Restore */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3 className="admin-card-title">Configuration Backup &amp; Migration</h3>
        </div>

        <p style={{ fontSize: '0.88rem', color: '#4A3A37', marginBottom: '1.25rem', lineHeight: 1.6 }}>
          Download your complete site content configuration as a JSON file, or restore from a previously exported backup file.
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="admin-btn admin-btn-gold"
            onClick={onExportClick}
          >
            <Download size={16} />
            Export Configuration File
          </button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={onImportFile}
            accept=".json,application/json"
            style={{ display: 'none' }}
          />

          <button
            type="button"
            className="admin-btn admin-btn-outline"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload size={16} />
            Import Configuration File
          </button>
        </div>
      </div>

      {/* Admin Authentication & Security Notice */}
      <div className="admin-card">
        <div className="admin-card-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Key size={18} color="#651E32" />
            <h3 className="admin-card-title">Admin Credentials</h3>
          </div>
        </div>

        <div style={{ background: '#FAF7F2', padding: '1rem', borderRadius: '4px', border: '1px solid #D4C3B3', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
            <span style={{ fontSize: '0.85rem', color: '#7A6662' }}>Configured Username:</span>
            <strong style={{ fontSize: '0.85rem', color: '#211817' }}>{ADMIN_CREDENTIALS.username}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.85rem', color: '#7A6662' }}>Password Storage:</span>
            <code style={{ fontSize: '0.8rem', color: '#651E32' }}>src/config/adminConfig.js</code>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', color: '#7A6662', fontSize: '0.82rem', lineHeight: 1.5 }}>
          <ShieldCheck size={16} color="#651E32" style={{ flexShrink: 0, marginTop: '2px' }} />
          <span>
            To update your administrator login credentials, simply edit <code>src/config/adminConfig.js</code> in your project repository before deploying.
          </span>
        </div>
      </div>

      {/* Factory Reset */}
      <div className="admin-card" style={{ borderColor: 'rgba(138, 28, 44, 0.3)' }}>
        <div className="admin-card-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertTriangle size={18} color="#8A1C2C" />
            <h3 className="admin-card-title" style={{ color: '#8A1C2C' }}>Factory Reset</h3>
          </div>
        </div>

        <p style={{ fontSize: '0.85rem', color: '#4A3A37', marginBottom: '1rem' }}>
          Discard all local browser modifications and revert back to original Cafeana branding, images, and text.
        </p>

        <button
          type="button"
          className="admin-btn admin-btn-danger"
          onClick={onRestoreFactoryClick}
        >
          <RotateCcw size={15} />
          Reset to Factory Defaults
        </button>
      </div>
    </div>
  );
}
