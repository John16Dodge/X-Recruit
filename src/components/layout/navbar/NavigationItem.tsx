
import React from 'react';
import { Link } from 'react-router-dom';
import { NavigationMenuItem } from "@/components/ui/navigation-menu";

interface NavigationItemProps {
  href: string;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

const NavigationItem: React.FC<NavigationItemProps> = ({ 
  href, 
  className = "text-xr-gray-dark hover:text-xr-blue font-medium transition-colors", 
  onClick,
  children 
}) => {
  return (
    <NavigationMenuItem>
      <Link 
        to={href} 
        className={className} 
        onClick={onClick}
      >
        {children}
      </Link>
    </NavigationMenuItem>
  );
};

export default NavigationItem;
