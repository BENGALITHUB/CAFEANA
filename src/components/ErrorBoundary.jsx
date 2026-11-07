import React from 'react';
import { AlertTriangle, RotateCcw, Home, RefreshCw } from 'lucide-react';
import { ADMIN_STORAGE_KEYS } from '../config/adminConfig';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error('ErrorBoundary caught an unhandled error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleResetStorage = () => {
    try {
      localStorage.removeItem(ADMIN_STORAGE_KEYS.DRAFT);
      localStorage.removeItem(ADMIN_STORAGE_KEYS.PUBLISHED);
    } catch (e) {
      console.error('Failed to clear storage:', e);
    }
    window.location.href = '#/admin/dashboard';
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '#/';
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            width: '100vw',
            backgroundColor: '#211817',
            backgroundImage: 'radial-gradient(circle at center, #3B101F 0%, #211817 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            boxSizing: 'border-box',
            fontFamily: "'DM Sans', sans-serif",
            color: '#F7F0E7'
          }}
        >
          <div
            style={{
              maxWidth: '560px',
              width: '100%',
              backgroundColor: 'rgba(33, 24, 23, 0.95)',
              border: '1px solid #C6A36A',
              borderRadius: '6px',
              padding: '2.5rem',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7)',
              textAlign: 'center'
            }}
          >
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                border: '1px solid #C6A36A',
                backgroundColor: 'rgba(101, 30, 50, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto',
                color: '#C6A36A'
              }}
            >
              <AlertTriangle size={30} strokeWidth={1.8} />
            </div>

            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '2rem',
                color: '#F7F0E7',
                margin: '0 0 0.5rem 0',
                letterSpacing: '0.05em'
              }}
            >
              Cafeana Studio Recovery
            </h2>

            <p style={{ color: '#D4C3B3', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              An unexpected render issue occurred. Your studio content is safely preserved in browser storage.
            </p>

            {this.state.error && (
              <div
                style={{
                  backgroundColor: 'rgba(59, 16, 31, 0.6)',
                  border: '1px solid rgba(198, 163, 106, 0.3)',
                  borderRadius: '4px',
                  padding: '0.75rem 1rem',
                  fontSize: '0.8rem',
                  color: '#FAF0E6',
                  textAlign: 'left',
                  marginBottom: '1.75rem',
                  overflowX: 'auto',
                  fontFamily: 'monospace'
                }}
              >
                {this.state.error.toString()}
              </div>
            )}

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
              <button
                type="button"
                onClick={this.handleReload}
                style={{
                  background: 'linear-gradient(135deg, #651E32 0%, #3B101F 100%)',
                  color: '#F7F0E7',
                  border: '1px solid #C6A36A',
                  padding: '0.65rem 1.25rem',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <RefreshCw size={15} />
                Reload Studio
              </button>

              <button
                type="button"
                onClick={this.handleResetStorage}
                style={{
                  background: 'rgba(198, 163, 106, 0.15)',
                  color: '#C6A36A',
                  border: '1px solid #C6A36A',
                  padding: '0.65rem 1.25rem',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <RotateCcw size={15} />
                Reset Draft to Default
              </button>

              <button
                type="button"
                onClick={this.handleGoHome}
                style={{
                  background: 'transparent',
                  color: '#D4C3B3',
                  border: '1px solid rgba(212, 195, 179, 0.3)',
                  padding: '0.65rem 1.25rem',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <Home size={15} />
                Public Website
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
