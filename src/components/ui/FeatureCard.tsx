
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
        "feature-card animate-fade-in bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 shadow-card hover:shadow-card-hover transition-all duration-300",
        delay > 0 ? animationDelay : "",
        className
      )}
    >
      <div className={cn("feature-icon mb-5 bg-xr-blue-light/20 dark:bg-blue-500/20", iconClassName)}>
        <Icon size={24} className="text-xr-blue dark:text-blue-400" />
      </div>
      <h3 className="text-xl font-semibold mb-3 text-xr-gray-dark dark:text-gray-100">{title}</h3>
      <p className="text-xr-gray dark:text-gray-300 leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureCard;
