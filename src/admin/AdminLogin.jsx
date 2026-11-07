import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UtensilsCrossed, Eye, EyeOff, Lock, User, AlertCircle, ArrowLeft } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, isAuthenticated } = useSiteContent();
  const navigate = useNavigate();

  // If already logged in, redirect to dashboard
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const res = login(username, password);
    if (res.success) {
      navigate('/admin/dashboard');
    } else {
      setError(res.error || 'Invalid credentials.');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#211817',
        backgroundImage: 'radial-gradient(circle at center, #3B101F 0%, #211817 100%)',
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Back to public website button */}
      <a
        href="#/"
        style={{
          position: 'absolute',
          top: '2rem',
          left: '2rem',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          color: '#C6A36A',
          fontSize: '0.85rem',
          textDecoration: 'none',
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          background: 'rgba(59, 16, 31, 0.4)',
          border: '1px solid rgba(198, 163, 106, 0.3)'
        }}
      >
        <ArrowLeft size={16} />
        Back to Cafeana
      </a>

      {/* Login Card */}
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          background: 'rgba(33, 24, 23, 0.85)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(198, 163, 106, 0.35)',
          borderRadius: '6px',
          padding: '2.5rem',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6)',
          color: '#F7F0E7'
        }}
      >
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div
            style={{
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              border: '1px solid #C6A36A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#C6A36A',
              background: 'rgba(101, 30, 50, 0.4)',
              margin: '0 auto 1rem auto'
            }}
          >
            <UtensilsCrossed size={26} strokeWidth={1.8} />
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '2rem',
              letterSpacing: '0.15em',
              fontWeight: 700,
              color: '#F7F0E7',
              margin: 0
            }}
          >
            CAFEANA
          </h1>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.72rem',
              letterSpacing: '0.25em',
              color: '#C6A36A',
              textTransform: 'uppercase',
              display: 'block',
              marginTop: '0.25rem'
            }}
          >
            Visual Content Studio
          </span>
        </div>

        {error && (
          <div
            style={{
              background: 'rgba(138, 28, 44, 0.25)',
              border: '1px solid rgba(198, 163, 106, 0.4)',
              borderRadius: '4px',
              padding: '0.75rem 1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#F7D6D6',
              fontSize: '0.85rem',
              marginBottom: '1.5rem'
            }}
          >
            <AlertCircle size={16} color="#E8A5A5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.78rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#C6A36A',
                marginBottom: '0.4rem',
                fontWeight: 600
              }}
            >
              Username
            </label>
            <div style={{ position: 'relative' }}>
              <span
                style={{
                  position: 'absolute',
                  left: '0.9rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#A89585',
                  display: 'flex'
                }}
              >
                <User size={16} />
              </span>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin username"
                style={{
                  width: '100%',
                  padding: '0.75rem 0.9rem 0.75rem 2.4rem',
                  backgroundColor: 'rgba(59, 16, 31, 0.4)',
                  border: '1px solid rgba(198, 163, 106, 0.3)',
                  borderRadius: '4px',
                  color: '#F7F0E7',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.92rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.78rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#C6A36A',
                marginBottom: '0.4rem',
                fontWeight: 600
              }}
            >
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <span
                style={{
                  position: 'absolute',
                  left: '0.9rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#A89585',
                  display: 'flex'
                }}
              >
                <Lock size={16} />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                style={{
                  width: '100%',
                  padding: '0.75rem 2.4rem 0.75rem 2.4rem',
                  backgroundColor: 'rgba(59, 16, 31, 0.4)',
                  border: '1px solid rgba(198, 163, 106, 0.3)',
                  borderRadius: '4px',
                  color: '#F7F0E7',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.92rem',
                  outline: 'none'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '0.8rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#C6A36A',
                  cursor: 'pointer',
                  display: 'flex'
                }}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="admin-btn admin-btn-primary"
            style={{
              padding: '0.85rem',
              fontSize: '0.92rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              borderRadius: '3px',
              border: '1px solid #C6A36A',
              marginTop: '0.5rem',
              boxShadow: '0 8px 25px rgba(101, 30, 50, 0.5)'
            }}
          >
            Access Studio
          </button>
        </form>

        {/* Security Limitation Notice */}
        <div
          style={{
            marginTop: '2rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid rgba(198, 163, 106, 0.15)',
            fontSize: '0.75rem',
            color: '#A89585',
            lineHeight: 1.5,
            textAlign: 'center'
          }}
        >
          <strong style={{ display: 'block', color: '#C6A36A', marginBottom: '0.2rem' }}>
            Static Frontend Environment
          </strong>
          Configured credentials in <code>src/config/adminConfig.js</code> serve as a private editing lock for client-side content management.
        </div>
      </div>
    </div>
  );
}
