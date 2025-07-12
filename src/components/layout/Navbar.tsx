
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './navbar/Logo';
import DesktopNav from './navbar/DesktopNav';
import MobileNav from './navbar/MobileNav';
import CTAButtons from './navbar/CTAButtons';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [studentDropdownOpen, setStudentDropdownOpen] = useState(false);
  const [collegeDropdownOpen, setCollegeDropdownOpen] = useState(false);

  // Navigation items
  const studentItems = [
    { title: 'Overview', href: '/students' },
    { title: 'Roadmap Generator', href: '/roadmap-generator' },
    { title: 'Request a Mentor', href: '/request-mentor' },
    { title: 'Aptitude and Soft skill training', href: '/aptitude-training' },
    { title: 'Learning Resources', href: '/students/resources' }
  ];

  const collegeItems = [
    { title: 'Overview', href: '/colleges' },
    { title: 'Partnerships', href: '/colleges/partnerships' },
    { title: 'Campus Programs', href: '/colleges/campus-programs' },
    { title: 'Aptitude and Soft skill training', href: '/colleges/aptitude-training' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleStudentDropdown = () => {
    setStudentDropdownOpen(!studentDropdownOpen);
    if (!studentDropdownOpen) setCollegeDropdownOpen(false);
  };

  const toggleCollegeDropdown = () => {
    setCollegeDropdownOpen(!collegeDropdownOpen);
    if (!collegeDropdownOpen) setStudentDropdownOpen(false);
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'glass-nav py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <DesktopNav
          studentItems={studentItems}
          collegeItems={collegeItems}
        />

        {/* CTA Buttons */}
        <CTAButtons />

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-xr-gray-dark" 
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <MobileNav
        isOpen={isMobileMenuOpen}
        studentDropdownOpen={studentDropdownOpen}
        collegeDropdownOpen={collegeDropdownOpen}
        toggleStudentDropdown={toggleStudentDropdown}
        toggleCollegeDropdown={toggleCollegeDropdown}
        closeMobileMenu={closeMobileMenu}
        studentItems={studentItems}
        collegeItems={collegeItems}
      />
    </header>
  );
};

export default Navbar;
