import React, { useState } from 'react';
import { X, Download, GitBranch, AlertCircle, CheckCircle, FileCode, Copy, Check } from 'lucide-react';
import { useSiteContent } from '../../context/SiteContentContext';

export default function ExportModal({ isOpen, onClose, metadata }) {
  const { content } = useSiteContent();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    try {
      const jsonStr = JSON.stringify(content, null, 2);
      navigator.clipboard.writeText(jsonStr);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Failed to copy JSON:', err);
    }
  };

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid rgba(101,30,50,0.1)', paddingBottom: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FileCode size={22} color="#651E32" />
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: '#3B101F', margin: 0 }}>
              Website Configuration Exported
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#7A6662' }}
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', background: 'rgba(198, 163, 106, 0.15)', padding: '0.75rem 1rem', borderRadius: '4px', border: '1px solid rgba(198, 163, 106, 0.35)', marginBottom: '1.2rem' }}>
            <CheckCircle size={20} color="#8C6A30" style={{ flexShrink: 0 }} />
            <span style={{ fontSize: '0.88rem', color: '#211817' }}>
              <strong>cafeana-site-content.json</strong> was downloaded successfully to your computer.
            </span>
          </div>

          <p style={{ fontSize: '0.92rem', color: '#4A3A37', lineHeight: 1.6, marginBottom: '1.25rem' }}>
            To make your changes visible to all worldwide visitors on your GitHub Pages static deployment, follow these 3 simple steps:
          </p>

          {/* Steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#651E32', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700, flexShrink: 0 }}>
                1
              </div>
              <div style={{ fontSize: '0.88rem', color: '#211817' }}>
                <strong>Replace the configuration file:</strong>
                <p style={{ margin: '0.25rem 0 0 0', color: '#7A6662', fontSize: '0.82rem' }}>
                  Move the downloaded file into your project at: <br />
                  <code style={{ background: '#FAF7F2', padding: '0.2rem 0.4rem', borderRadius: '3px', border: '1px solid #D4C3B3', color: '#651E32', display: 'inline-block', marginTop: '0.2rem' }}>
                    src/data/siteContent.json
                  </code> (rename it to <code>siteContent.json</code> if needed).
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#651E32', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700, flexShrink: 0 }}>
                2
              </div>
              <div style={{ fontSize: '0.88rem', color: '#211817' }}>
                <strong>Commit your changes in Git:</strong>
                <pre style={{ margin: '0.35rem 0 0 0', background: '#211817', color: '#F7F0E7', padding: '0.6rem 0.8rem', borderRadius: '4px', fontSize: '0.8rem', overflowX: 'auto' }}>
git add src/data/siteContent.json
git commit -m "Update Cafeana website content"
                </pre>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#651E32', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700, flexShrink: 0 }}>
                3
              </div>
              <div style={{ fontSize: '0.88rem', color: '#211817' }}>
                <strong>Push to GitHub:</strong>
                <pre style={{ margin: '0.35rem 0 0 0', background: '#211817', color: '#F7F0E7', padding: '0.6rem 0.8rem', borderRadius: '4px', fontSize: '0.8rem', overflowX: 'auto' }}>
git push origin main
                </pre>
                <p style={{ margin: '0.25rem 0 0 0', color: '#7A6662', fontSize: '0.82rem' }}>
                  GitHub Actions will automatically build and publish the changes live on GitHub Pages.
                </p>
              </div>
            </div>
          </div>

          {/* Note on localStorage vs GitHub */}
          <div style={{ background: '#FAF7F2', border: '1px solid #D4C3B3', borderRadius: '4px', padding: '0.85rem 1rem', display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
            <AlertCircle size={18} color="#651E32" style={{ flexShrink: 0, marginTop: '2px' }} />
            <p style={{ fontSize: '0.82rem', color: '#4A3A37', margin: 0, lineHeight: 1.5 }}>
              <strong>Browser Storage vs Global Deployment:</strong> Clicking "Publish Locally" in the dashboard updates the site only in your current browser session. To update the website for everyone on GitHub Pages, committing this exported JSON file to your repo is required.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <button
            type="button"
            className="admin-btn admin-btn-primary"
            onClick={onClose}
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
}
