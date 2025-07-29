
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

interface MobileDropdownItem {
  title: string;
  href: string;
}

interface MobileDropdownProps {
  title: string;
  items: MobileDropdownItem[];
  isOpen: boolean;
  toggleOpen: () => void;
  onItemClick: () => void;
}

const MobileDropdown: React.FC<MobileDropdownProps> = ({
  title,
  items,
  isOpen,
  toggleOpen,
  onItemClick,
}) => {
  return (
    <div className="relative">
      <button 
        onClick={toggleOpen}
        className={`w-full flex items-center justify-between font-medium transition-colors rounded-md px-3 py-2 ${
          isOpen 
            ? 'bg-blue-50 text-xr-blue' 
            : 'text-xr-gray-dark hover:text-xr-blue'
        }`}
      >
        <span>{title}</span>
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="pl-4 mt-2 space-y-2 border-l-2 border-xr-blue-light">
          {items.map((item) => (
            <Link 
              key={item.href}
              to={item.href} 
              className="block text-xr-gray-dark hover:text-xr-blue font-medium transition-colors"
              onClick={onItemClick}
            >
              {item.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileDropdown;
