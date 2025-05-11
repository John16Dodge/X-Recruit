
import React from 'react';

interface FloatingElementsProps {
  count?: number;
  colors?: string[];
  minSize?: number;
  maxSize?: number;
  className?: string;
}

const FloatingElements: React.FC<FloatingElementsProps> = ({
  count = 15,
  colors = ['#4C9AFF', '#0052CC', '#998DD9', '#6554C0'],
  minSize = 10,
  maxSize = 40,
  className = '',
}) => {
  const elements = Array.from({ length: count }, (_, i) => {
    const size = Math.floor(Math.random() * (maxSize - minSize + 1) + minSize);
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = `${Math.random() * 100}%`;
    const top = `${Math.random() * 100}%`;
    const animationDuration = `${Math.random() * 20 + 10}s`;
    const animationDelay = `${Math.random() * 5}s`;
    const opacity = Math.random() * 0.5 + 0.1;
    const blur = Math.random() > 0.5 ? 'backdrop-blur-sm' : '';
    const rotation = Math.random() * 360;
    
    return {
      id: i,
      style: {
        position: 'absolute' as const,
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
        left,
        top,
        opacity,
        borderRadius: '50%',
        animation: `floating ${animationDuration} ease-in-out infinite alternate`,
        animationDelay,
        transform: `rotate(${rotation}deg)`,
      },
      blur,
    };
  });
  
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {elements.map((element) => (
        <div 
          key={element.id} 
          style={element.style} 
          className={`${element.blur}`} 
        />
      ))}
    </div>
  );
};

export default FloatingElements;
