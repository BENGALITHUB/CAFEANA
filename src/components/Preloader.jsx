import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }) {
  const [percent, setPercent] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Smooth progress counter reaching 100 in ~1.6s
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFinished(true);
            setTimeout(() => {
              if (onComplete) onComplete();
            }, 600);
          }, 300);
          return 100;
        }
        const increment = Math.floor(Math.random() * 8) + 3;
        return Math.min(prev + increment, 100);
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          className="preloader-overlay"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: '-100%',
            transition: { duration: 0.85, ease: [0.77, 0, 0.175, 1] }
          }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'var(--color-deep-burgundy)',
            backgroundImage: 'radial-gradient(circle at center, var(--color-primary-burgundy) 0%, var(--color-deep-burgundy) 60%, var(--color-espresso) 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-warm-cream)',
            overflow: 'hidden'
          }}
        >
          {/* Subtle Ambient Particle Glow */}
          <div
            style={{
              position: 'absolute',
              width: '400px',
              height: '400px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(198,163,106,0.12) 0%, transparent 70%)',
              filter: 'blur(40px)',
              pointerEvents: 'none'
            }}
          />

          {/* Animated Coffee Cup & Steam */}
          <div style={{ position: 'relative', width: '84px', height: '84px', marginBottom: '2rem' }}>
            {/* Steam ribbons wafting upwards */}
            <svg
              viewBox="0 0 60 40"
              style={{
                position: 'absolute',
                top: '-28px',
                left: '12px',
                width: '48px',
                height: '36px',
                overflow: 'visible'
              }}
            >
              <path
                d="M12 30 C10 22, 16 16, 12 6"
                fill="none"
                stroke="#C6A36A"
                strokeWidth="2"
                strokeLinecap="round"
                className="steam-line-1"
                opacity="0.8"
              />
              <path
                d="M24 32 C21 24, 28 17, 24 4"
                fill="none"
                stroke="#F7F0E7"
                strokeWidth="2.2"
                strokeLinecap="round"
                className="steam-line-2"
                opacity="0.9"
              />
              <path
                d="M36 30 C34 23, 40 18, 36 7"
                fill="none"
                stroke="#C6A36A"
                strokeWidth="2"
                strokeLinecap="round"
                className="steam-line-3"
                opacity="0.75"
              />
            </svg>

            {/* Coffee Cup Outline */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#C6A36A"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 4px 15px rgba(198,163,106,0.3))' }}
            >
              {/* Cup body */}
              <path d="M17 8h1a4 4 0 0 1 0 8h-1" />
              <path d="M2 8h15v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" fill="rgba(101,30,50,0.5)" />
              {/* Saucer */}
              <line x1="2" y1="21" x2="18" y2="21" strokeWidth="2" />
            </svg>
          </div>

          {/* Logo Name & Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: '2.5rem' }}
          >
            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.4rem, 5vw, 3.4rem)',
                letterSpacing: '0.25em',
                fontWeight: 600,
                color: 'var(--color-warm-cream)',
                margin: 0,
                textTransform: 'uppercase'
              }}
            >
              CAFEANA
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.78rem',
                letterSpacing: '0.35em',
                color: 'var(--color-champagne-gold)',
                textTransform: 'uppercase',
                marginTop: '0.5rem'
              }}
            >
              Snap • Sip • Savour • Repeat
            </p>
          </motion.div>

          {/* Progress Bar & Percentage */}
          <div style={{ width: '220px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '100%',
                height: '2px',
                background: 'rgba(232, 216, 197, 0.15)',
                borderRadius: '2px',
                overflow: 'hidden',
                position: 'relative'
              }}
            >
              <motion.div
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, var(--color-primary-burgundy), var(--color-champagne-gold))',
                  width: `${percent}%`,
                  transition: 'width 0.1s ease-out'
                }}
              />
            </div>

            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                letterSpacing: '0.15em',
                color: '#E8D8C5',
                fontWeight: 400
              }}
            >
              {percent}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
