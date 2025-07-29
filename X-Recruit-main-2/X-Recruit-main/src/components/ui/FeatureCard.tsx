
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
        "p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-card hover:shadow-card-hover dark:hover:shadow-2xl transition-all duration-300 animate-fade-in",
        delay > 0 ? animationDelay : "",
        className
      )}
    >
      <div className={cn("p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 inline-flex items-center justify-center mb-5", iconClassName)}>
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureCard;
