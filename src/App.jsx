import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SiteContentProvider } from './context/SiteContentContext';
import ErrorBoundary from './components/ErrorBoundary';
import PublicHome from './pages/PublicHome';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import LivePreview from './admin/LivePreview';

import './styles/variables.css';
import './styles/global.css';
import './styles/animations.css';
import './styles/navbar.css';
import './styles/responsive.css';
import './styles/admin.css';

export default function App() {
  return (
    <Router>
      <SiteContentProvider isAdmin={true}>
        <ErrorBoundary>
          <Routes>
          {/* Public Website Route */}
          <Route path="/" element={<PublicHome />} />

          {/* Admin Login Route */}
          <Route path="/admin" element={<AdminLogin />} />

          {/* Admin Dashboard Studio Route */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* Dedicated Full Website Preview Route */}
          <Route
            path="/admin/preview"
            element={
              <div style={{ position: 'relative' }}>
                <div
                  style={{
                    position: 'fixed',
                    top: '1rem',
                    right: '1rem',
                    zIndex: 99999,
                    background: '#651E32',
                    color: '#FFF',
                    padding: '0.6rem 1.2rem',
                    borderRadius: '4px',
                    border: '1px solid #C6A36A',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    fontSize: '0.85rem'
                  }}
                >
                  <span>Previewing Live Draft</span>
                  <a
                    href="#/admin/dashboard"
                    style={{
                      background: '#C6A36A',
                      color: '#211817',
                      padding: '0.3rem 0.6rem',
                      borderRadius: '2px',
                      textDecoration: 'none',
                      fontWeight: 600,
                      fontSize: '0.78rem'
                    }}
                  >
                    Return to Studio
                  </a>
                </div>
                <PublicHome />
              </div>
            }
          />

          {/* Fallback to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ErrorBoundary>
    </SiteContentProvider>
    </Router>
  );
}
