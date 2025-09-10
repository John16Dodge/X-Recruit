import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedLoaderProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'purple' | 'green' | 'red' | 'yellow';
  className?: string;
  text?: string;
}

const AnimatedLoader: React.FC<AnimatedLoaderProps> = ({
  size = 'md',
  color = 'blue',
  className,
  text
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const colorClasses = {
    blue: 'border-blue-500',
    purple: 'border-purple-500',
    green: 'border-green-500',
    red: 'border-red-500',
    yellow: 'border-yellow-500'
  };

  return (
    <div className={cn('flex flex-col items-center justify-center space-y-4', className)}>
      <div className="relative">
        {/* Spinning ring */}
        <div className={cn(
          'rounded-full border-4 border-gray-200 animate-spin-slow',
          sizeClasses[size],
          colorClasses[color]
        )}></div>
        
        {/* Inner pulsing dot */}
        <div className={cn(
          'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full animate-pulse-slow',
          size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-3 h-3' : 'w-4 h-4',
          color === 'blue' ? 'bg-blue-500' : 
          color === 'purple' ? 'bg-purple-500' :
          color === 'green' ? 'bg-green-500' :
          color === 'red' ? 'bg-red-500' : 'bg-yellow-500'
        )}></div>
      </div>
      
      {text && (
        <p className="text-sm text-gray-600 dark:text-gray-400 animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
};

export default AnimatedLoader;
