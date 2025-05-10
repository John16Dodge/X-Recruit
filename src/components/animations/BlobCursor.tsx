
import React, { useEffect, useRef, useState } from 'react';
import './BlobCursor.css';

const BlobCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => {
      setClicked(true);
    };

    const handleMouseUp = () => {
      setClicked(false);
    };

    const handleMouseEnter = () => {
      setHidden(false);
    };

    const handleMouseLeave = () => {
      setHidden(true);
    };

    const handleLinkHoverEvents = () => {
      document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
        el.addEventListener('mouseenter', () => setLinkHovered(true));
        el.addEventListener('mouseleave', () => setLinkHovered(false));
      });
    };

    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    handleLinkHoverEvents();

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);

      document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
        el.removeEventListener('mouseenter', () => setLinkHovered(true));
        el.removeEventListener('mouseleave', () => setLinkHovered(false));
      });
    };
  }, []);

  useEffect(() => {
    if (!cursorRef.current) return;
    
    const cursorStyle = {
      left: `${position.x}px`,
      top: `${position.y}px`,
      opacity: hidden ? 0 : 1,
      transform: `translate(-50%, -50%) scale(${clicked ? 0.8 : linkHovered ? 1.5 : 1})`,
      backgroundColor: linkHovered ? 'rgba(75, 0, 230, 0.3)' : 'rgba(75, 0, 230, 0.15)',
    };

    Object.assign(cursorRef.current.style, cursorStyle);
  }, [position, hidden, clicked, linkHovered]);

  if (typeof window === 'undefined') return null;

  // Don't show on touch devices
  if (window.matchMedia('(hover: none)').matches) return null;

  return <div ref={cursorRef} className="blob-cursor" />;
};

export default BlobCursor;
