import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const onMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    // Listen for hover on interactive elements
    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, .menu-card, .gallery-item, .clickable');
      if (target) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Center dot */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '6px',
          height: '6px',
          backgroundColor: '#C6A36A',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          transform: `translate(${pos.x - 3}px, ${pos.y - 3}px)`,
          transition: 'transform 0.05s linear',
        }}
      />
      {/* Outer ring */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isHovered ? '46px' : '26px',
          height: isHovered ? '46px' : '26px',
          border: '1px solid rgba(198, 163, 106, 0.65)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99998,
          transform: `translate(${pos.x - (isHovered ? 23 : 13)}px, ${pos.y - (isHovered ? 23 : 13)}px)`,
          transition: 'width 0.25s ease-out, height 0.25s ease-out, transform 0.15s ease-out, border-color 0.2s',
          backgroundColor: isHovered ? 'rgba(101, 30, 50, 0.2)' : 'transparent',
          backdropFilter: isHovered ? 'blur(2px)' : 'none'
        }}
      />
    </>
  );
}
