
import React from 'react';
import { Link } from 'react-router-dom';
import MobileDropdown from './MobileDropdown';
import CTAButtons from './CTAButtons';

interface MobileNavProps {
  isOpen: boolean;
  studentDropdownOpen: boolean;
  collegeDropdownOpen: boolean;
  toggleStudentDropdown: () => void;
  toggleCollegeDropdown: () => void;
  closeMobileMenu: () => void;
  studentItems: { title: string; href: string }[];
  collegeItems: { title: string; href: string }[];
}

const MobileNav: React.FC<MobileNavProps> = ({
  isOpen,
  studentDropdownOpen,
  collegeDropdownOpen,
  toggleStudentDropdown,
  toggleCollegeDropdown,
  closeMobileMenu,
  studentItems,
  collegeItems,
}) => {
  return (
    <div 
      className={`md:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-lg border-t border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out ${
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}
    >
      <div className="container-custom py-5 flex flex-col space-y-6">
        <nav className="flex flex-col space-y-4">
          <Link 
            to="/" 
            className="text-xr-gray-dark dark:text-gray-300 hover:text-xr-blue dark:hover:text-blue-400 font-medium transition-colors"
            onClick={closeMobileMenu}
          >
            Home
          </Link>
          
          <Link 
            to="/about" 
            className="text-xr-gray-dark dark:text-gray-300 hover:text-xr-blue dark:hover:text-blue-400 font-medium transition-colors"
            onClick={closeMobileMenu}
          >
            About
          </Link>
          
          <MobileDropdown
            title="For Students"
            items={studentItems}
            isOpen={studentDropdownOpen}
            toggleOpen={toggleStudentDropdown}
            onItemClick={closeMobileMenu}
          />
          
          <MobileDropdown
            title="For Colleges"
            items={collegeItems}
            isOpen={collegeDropdownOpen}
            toggleOpen={toggleCollegeDropdown}
            onItemClick={closeMobileMenu}
          />
          
          <Link 
            to="/features" 
            className="text-xr-gray-dark dark:text-gray-300 hover:text-xr-blue dark:hover:text-blue-400 font-medium transition-colors"
            onClick={closeMobileMenu}
          >
            Features
          </Link>
        </nav>
        
        <CTAButtons isMobile={true} onLoginClick={closeMobileMenu} />
      </div>
    </div>
  );
};

export default MobileNav;
