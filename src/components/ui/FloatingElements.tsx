import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'diagonal';
  intensity?: 'subtle' | 'medium' | 'strong';
}

const FloatingElement: React.FC<FloatingElementProps> = ({
  children,
  className,
  delay = 0,
  duration = 3,
  direction = 'up',
  intensity = 'medium'
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const intensityMap = {
      subtle: 5,
      medium: 10,
      strong: 20
    };

    const directionMap = {
      up: 'translateY',
      down: 'translateY',
      left: 'translateX',
      right: 'translateX',
      diagonal: 'translate'
    };

    const moveDistance = intensityMap[intensity];
    const transformProperty = directionMap[direction];

    const animate = () => {
      const time = Date.now() * 0.001;
      const offset = Math.sin(time + delay) * moveDistance;
      
      if (direction === 'diagonal') {
        element.style.transform = `translate(${offset}px, ${offset * 0.5}px)`;
      } else if (direction === 'up' || direction === 'down') {
        element.style.transform = `translateY(${direction === 'up' ? -offset : offset}px)`;
      } else {
        element.style.transform = `translateX(${direction === 'left' ? -offset : offset}px)`;
      }
    };

    const interval = setInterval(animate, 16); // 60fps
    return () => clearInterval(interval);
  }, [delay, duration, direction, intensity]);

  return (
    <div
      ref={elementRef}
      className={cn('transition-transform duration-300', className)}
    >
      {children}
    </div>
  );
};

export default FloatingElement;
