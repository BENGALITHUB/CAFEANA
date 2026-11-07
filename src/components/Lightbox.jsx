import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function Lightbox({ item, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="lightbox-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(33, 24, 23, 0.94)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          zIndex: 99990,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem'
        }}
      >
        <motion.div
          className="lightbox-content"
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'relative',
            maxWidth: '900px',
            width: '100%',
            backgroundColor: 'var(--color-deep-burgundy)',
            border: '1px solid rgba(198, 163, 106, 0.35)',
            boxShadow: '0 25px 60px rgba(0,0,0,0.7)',
            overflow: 'hidden'
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close image preview"
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'rgba(33, 24, 23, 0.8)',
              border: '1px solid var(--color-champagne-gold)',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-champagne-gold)',
              cursor: 'pointer',
              zIndex: 10,
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <X size={20} />
          </button>

          <div style={{ maxHeight: '72vh', overflow: 'hidden', background: '#000' }}>
            <img
              src={item.image}
              alt={item.title || 'Cafeana Photography'}
              style={{
                width: '100%',
                height: '100%',
                maxHeight: '72vh',
                objectFit: 'contain',
                display: 'block'
              }}
            />
          </div>

          <div
            style={{
              padding: '1.25rem 2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'linear-gradient(180deg, rgba(59, 16, 31, 0.95), var(--color-espresso))',
              borderTop: '1px solid rgba(198, 163, 106, 0.2)'
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--color-champagne-gold)',
                  display: 'block',
                  marginBottom: '0.25rem'
                }}
              >
                {item.category || 'Cafeana Collection'}
              </span>
              <h4
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.4rem',
                  color: 'var(--color-warm-cream)',
                  margin: 0
                }}
              >
                {item.title}
              </h4>
            </div>

            <span
              style={{
                fontFamily: 'var(--font-editorial)',
                fontStyle: 'italic',
                fontSize: '0.9rem',
                color: 'var(--color-soft-beige)'
              }}
            >
              Cafeana Signature
            </span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
