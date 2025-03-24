
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
  iconClassName?: string;
  delay?: number;
}

const FeatureCard = ({
  title,
  description,
  icon: Icon,
  className,
  iconClassName,
  delay = 0,
}: FeatureCardProps) => {
  const animationDelay = `animate-delay-${delay}`;
  
  return (
    <div 
      className={cn(
        "feature-card animate-fade-in",
        delay > 0 ? animationDelay : "",
        className
      )}
    >
      <div className={cn("feature-icon mb-5", iconClassName)}>
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-semibold mb-3 text-xr-gray-dark">{title}</h3>
      <p className="text-xr-gray leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureCard;
