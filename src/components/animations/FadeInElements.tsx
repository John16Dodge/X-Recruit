
import React, { useEffect, useRef, ReactNode } from 'react';

interface FadeInElementsProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  threshold?: number;
  className?: string;
}

const FadeInElements: React.FC<FadeInElementsProps> = ({
  children,
  direction = 'up',
  delay = 0,
  threshold = 0.1,
  className = '',
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate-in');
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -100px 0px',
      }
    );
    
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    
    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [delay, threshold]);
  
  const getDirectionClass = () => {
    switch (direction) {
      case 'up':
        return 'translate-y-16';
      case 'down':
        return '-translate-y-16';
      case 'left':
        return 'translate-x-16';
      case 'right':
        return '-translate-x-16';
      default:
        return 'translate-y-16';
    }
  };
  
  return (
    <div
      ref={elementRef}
      className={`opacity-0 transform ${getDirectionClass()} transition-all duration-700 ease-out ${className}`}
    >
      {children}
    </div>
  );
};

export default FadeInElements;
