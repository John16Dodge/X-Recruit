
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-xr-blue">X-Recruit</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-xr-gray-dark hover:text-xr-blue font-medium transition-colors">
            Home
          </Link>
          <Link to="/students" className="text-xr-gray-dark hover:text-xr-blue font-medium transition-colors">
            For Students
          </Link>
          <Link to="/colleges" className="text-xr-gray-dark hover:text-xr-blue font-medium transition-colors">
            For Colleges
          </Link>
          <Link to="/recruiters" className="text-xr-gray-dark hover:text-xr-blue font-medium transition-colors">
            For Recruiters
          </Link>
          <Link to="/roadmap-generator" className="text-xr-gray-dark hover:text-xr-blue font-medium transition-colors">
            Roadmap Generator
          </Link>
          <Link to="/features" className="text-xr-gray-dark hover:text-xr-blue font-medium transition-colors">
            Features
          </Link>
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="outline" className="border-xr-blue text-xr-blue hover:bg-xr-blue/5">
            Log in
          </Button>
          <Button className="bg-xr-blue hover:bg-xr-blue-dark">
            Get Started
          </Button>
        </div>

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
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-white shadow-lg transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="container-custom py-5 flex flex-col space-y-6">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-xr-gray-dark hover:text-xr-blue font-medium transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/students" 
              className="text-xr-gray-dark hover:text-xr-blue font-medium transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              For Students
            </Link>
            <Link 
              to="/colleges" 
              className="text-xr-gray-dark hover:text-xr-blue font-medium transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              For Colleges
            </Link>
            <Link 
              to="/recruiters" 
              className="text-xr-gray-dark hover:text-xr-blue font-medium transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              For Recruiters
            </Link>
            <Link 
              to="/roadmap-generator" 
              className="text-xr-gray-dark hover:text-xr-blue font-medium transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Roadmap Generator
            </Link>
            <Link 
              to="/features" 
              className="text-xr-gray-dark hover:text-xr-blue font-medium transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </Link>
          </nav>
          <div className="flex flex-col space-y-3">
            <Button variant="outline" className="w-full border-xr-blue text-xr-blue hover:bg-xr-blue/5">
              Log in
            </Button>
            <Button className="w-full bg-xr-blue hover:bg-xr-blue-dark">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
