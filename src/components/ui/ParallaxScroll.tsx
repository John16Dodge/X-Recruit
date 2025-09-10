import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface ParallaxScrollProps {
  children: React.ReactNode;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  offset?: number;
}

const ParallaxScroll: React.FC<ParallaxScrollProps> = ({
  children,
  speed = 0.5,
  direction = 'up',
  className,
  offset = 0
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return;

      const rect = elementRef.current.getBoundingClientRect();
      const scrolled = window.pageYOffset;
      const rate = scrolled * -speed;

      let translateValue = '';
      switch (direction) {
        case 'up':
          translateValue = `translateY(${rate + offset}px)`;
          break;
        case 'down':
          translateValue = `translateY(${-rate + offset}px)`;
          break;
        case 'left':
          translateValue = `translateX(${rate + offset}px)`;
          break;
        case 'right':
          translateValue = `translateX(${-rate + offset}px)`;
          break;
      }

      setTransform(translateValue);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, direction, offset]);

  return (
    <div
      ref={elementRef}
      className={cn('transition-transform duration-100 ease-out', className)}
      style={{ transform }}
    >
      {children}
    </div>
  );
};

export default ParallaxScroll;
