import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps {
  children: React.ReactNode;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  onClick?: () => void;
  animationType?: 'bounce' | 'pulse' | 'shake' | 'glow' | 'slide' | 'rotate' | 'float';
  disabled?: boolean;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  variant = 'default',
  size = 'default',
  className,
  onClick,
  animationType = 'bounce',
  disabled = false,
  ...props
}) => {
  const getAnimationClass = () => {
    switch (animationType) {
      case 'bounce':
        return 'hover:animate-bounce';
      case 'pulse':
        return 'hover:animate-pulse';
      case 'shake':
        return 'hover:animate-shake';
      case 'glow':
        return 'hover:shadow-glow hover:shadow-blue-500/50';
      case 'slide':
        return 'hover:translate-x-1 transition-transform duration-300';
      case 'rotate':
        return 'hover:rotate-3 transition-transform duration-300';
      case 'float':
        return 'hover:animate-float';
      default:
        return 'hover:scale-105 transition-transform duration-300';
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={cn(
        'transition-all duration-300 ease-out',
        getAnimationClass(),
        className
      )}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </Button>
  );
};

export default AnimatedButton;
