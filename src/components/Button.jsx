import React from 'react';

export default function Button({
  children,
  href,
  onClick,
  variant = 'primary', // 'primary' | 'outline' | 'gold' | 'text'
  size = 'md',        // 'sm' | 'md' | 'lg'
  icon: Icon,
  iconPosition = 'right',
  className = '',
  target,
  rel
}) {
  const isLink = Boolean(href);
  const Component = isLink ? 'a' : 'button';

  const sizeStyles = {
    sm: { padding: '0.6rem 1.4rem', fontSize: '0.82rem' },
    md: { padding: '0.9rem 2.2rem', fontSize: '0.92rem' },
    lg: { padding: '1.15rem 2.8rem', fontSize: '1.02rem' }
  };

  const variantStyles = {
    primary: {
      background: 'linear-gradient(135deg, var(--color-primary-burgundy) 0%, var(--color-deep-burgundy) 100%)',
      color: 'var(--color-warm-cream)',
      border: '1px solid var(--color-champagne-gold)',
      boxShadow: '0 8px 25px rgba(59, 16, 31, 0.45)'
    },
    outline: {
      background: 'rgba(33, 24, 23, 0.35)',
      color: 'var(--color-champagne-gold)',
      border: '1px solid var(--color-champagne-gold)',
      backdropFilter: 'blur(8px)'
    },
    gold: {
      background: 'var(--color-champagne-gold)',
      color: 'var(--color-espresso)',
      border: '1px solid var(--color-champagne-gold)',
      fontWeight: 600,
      boxShadow: '0 6px 20px rgba(198, 163, 106, 0.3)'
    },
    cream: {
      background: 'var(--color-primary-burgundy)',
      color: 'var(--color-warm-cream)',
      border: '1px solid var(--color-primary-burgundy)',
      boxShadow: '0 6px 20px rgba(101, 30, 50, 0.25)'
    }
  };

  const selectedSize = sizeStyles[size] || sizeStyles.md;
  const selectedVariant = variantStyles[variant] || variantStyles.primary;

  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.65rem',
    fontFamily: 'var(--font-body)',
    fontWeight: 500,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    borderRadius: '2px',
    cursor: 'pointer',
    textDecoration: 'none',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
    ...selectedSize,
    ...selectedVariant
  };

  return (
    <Component
      href={href}
      onClick={onClick}
      target={target}
      rel={rel}
      className={`luxury-btn btn-${variant} ${className}`}
      style={baseStyle}
      onMouseEnter={(e) => {
        if (variant === 'outline') {
          e.currentTarget.style.background = 'var(--color-champagne-gold)';
          e.currentTarget.style.color = 'var(--color-espresso)';
          e.currentTarget.style.transform = 'translateY(-3px)';
          e.currentTarget.style.boxShadow = '0 10px 25px rgba(198, 163, 106, 0.35)';
        } else if (variant === 'primary' || variant === 'cream') {
          e.currentTarget.style.transform = 'translateY(-3px)';
          e.currentTarget.style.boxShadow = '0 12px 30px rgba(101, 30, 50, 0.6)';
        } else if (variant === 'gold') {
          e.currentTarget.style.transform = 'translateY(-3px)';
          e.currentTarget.style.boxShadow = '0 12px 30px rgba(198, 163, 106, 0.45)';
        }
      }}
      onMouseLeave={(e) => {
        if (variant === 'outline') {
          e.currentTarget.style.background = 'rgba(33, 24, 23, 0.35)';
          e.currentTarget.style.color = 'var(--color-champagne-gold)';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        } else if (variant === 'primary' || variant === 'cream') {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = selectedVariant.boxShadow || 'none';
        } else if (variant === 'gold') {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = selectedVariant.boxShadow || 'none';
        }
      }}
    >
      {Icon && iconPosition === 'left' && <Icon size={16} strokeWidth={2} />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon size={16} strokeWidth={2} />}
    </Component>
  );
}
