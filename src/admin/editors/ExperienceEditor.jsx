import React, { useState } from 'react';
import SignatureEditor from './SignatureEditor';
import AmbienceEditor from './AmbienceEditor';

export default function ExperienceEditor() {
  const [subTab, setSubTab] = useState('signature'); // 'signature' | 'ambience'

  return (
    <div>
      {/* Sub-navigation pill toggle */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <button
          type="button"
          className="admin-btn"
          style={{
            background: subTab === 'signature' ? '#651E32' : '#FFFFFF',
            color: subTab === 'signature' ? '#FFFFFF' : '#3B101F',
            border: '1px solid rgba(101,30,50,0.2)'
          }}
          onClick={() => setSubTab('signature')}
        >
          Signature Dishes Showcase
        </button>

        <button
          type="button"
          className="admin-btn"
          style={{
            background: subTab === 'ambience' ? '#651E32' : '#FFFFFF',
            color: subTab === 'ambience' ? '#FFFFFF' : '#3B101F',
            border: '1px solid rgba(101,30,50,0.2)'
          }}
          onClick={() => setSubTab('ambience')}
        >
          Ambience &amp; Atmosphere
        </button>
      </div>

      {subTab === 'signature' ? <SignatureEditor /> : <AmbienceEditor />}
    </div>
  );
}
