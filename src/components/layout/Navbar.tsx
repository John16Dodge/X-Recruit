import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [studentDropdownOpen, setStudentDropdownOpen] = useState(false);
  const [collegeDropdownOpen, setCollegeDropdownOpen] = useState(false);

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
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-xr-blue">X-Recruit</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList className="flex items-center space-x-6">
              <NavigationMenuItem>
                <Link to="/" className="text-xr-gray-dark hover:text-xr-blue font-medium transition-colors">
                  Home
                </Link>
              </NavigationMenuItem>
              
              {/* Students Dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-transparent focus:bg-transparent text-xr-gray-dark hover:text-xr-blue font-medium">
                  For Students
                </NavigationMenuTrigger>
                <NavigationMenuContent className="w-[220px]">
                  <ul className="grid w-full gap-1 p-2">
                    <li className="row-span-1">
                      <NavigationMenuLink asChild>
                        <Link 
                          to="/students"
                          className="flex items-center h-full w-full select-none space-y-1 rounded-md p-3 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Overview</div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li className="row-span-1">
                      <NavigationMenuLink asChild>
                        <Link 
                          to="/roadmap-generator"
                          className="flex items-center h-full w-full select-none space-y-1 rounded-md p-3 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Roadmap Generator</div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li className="row-span-1">
                      <NavigationMenuLink asChild>
                        <Link 
                          to="/students/resources"
                          className="flex items-center h-full w-full select-none space-y-1 rounded-md p-3 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Learning Resources</div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              {/* Colleges Dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-transparent focus:bg-transparent text-xr-gray-dark hover:text-xr-blue font-medium">
                  For Colleges
                </NavigationMenuTrigger>
                <NavigationMenuContent className="w-[220px]">
                  <ul className="grid w-full gap-1 p-2">
                    <li className="row-span-1">
                      <NavigationMenuLink asChild>
                        <Link 
                          to="/colleges"
                          className="flex items-center h-full w-full select-none space-y-1 rounded-md p-3 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Overview</div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li className="row-span-1">
                      <NavigationMenuLink asChild>
                        <Link 
                          to="/colleges/partnerships"
                          className="flex items-center h-full w-full select-none space-y-1 rounded-md p-3 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Partnerships</div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li className="row-span-1">
                      <NavigationMenuLink asChild>
                        <Link 
                          to="/colleges/campus-programs"
                          className="flex items-center h-full w-full select-none space-y-1 rounded-md p-3 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Campus Programs</div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/features" className="text-xr-gray-dark hover:text-xr-blue font-medium transition-colors">
                  Features
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
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
            
            {/* Mobile Students Dropdown */}
            <div className="relative">
              <button 
                onClick={toggleStudentDropdown}
                className={`w-full flex items-center justify-between font-medium transition-colors rounded-md px-3 py-2 ${
                  studentDropdownOpen 
                    ? 'bg-blue-50 text-xr-blue' 
                    : 'text-xr-gray-dark hover:text-xr-blue'
                }`}
              >
                <span>For Students</span>
                <ChevronDown size={16} className={`transition-transform ${studentDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {studentDropdownOpen && (
                <div className="pl-4 mt-2 space-y-2 border-l-2 border-xr-blue-light">
                  <Link 
                    to="/students" 
                    className="block text-xr-gray-dark hover:text-xr-blue font-medium transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Overview
                  </Link>
                  <Link 
                    to="/roadmap-generator" 
                    className="block text-xr-gray-dark hover:text-xr-blue font-medium transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Roadmap Generator
                  </Link>
                  <Link 
                    to="/students/resources" 
                    className="block text-xr-gray-dark hover:text-xr-blue font-medium transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Learning Resources
                  </Link>
                </div>
              )}
            </div>
            
            {/* Mobile Colleges Dropdown */}
            <div className="relative">
              <button 
                onClick={toggleCollegeDropdown}
                className={`w-full flex items-center justify-between font-medium transition-colors rounded-md px-3 py-2 ${
                  collegeDropdownOpen 
                    ? 'bg-blue-50 text-xr-blue' 
                    : 'text-xr-gray-dark hover:text-xr-blue'
                }`}
              >
                <span>For Colleges</span>
                <ChevronDown size={16} className={`transition-transform ${collegeDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {collegeDropdownOpen && (
                <div className="pl-4 mt-2 space-y-2 border-l-2 border-xr-blue-light">
                  <Link 
                    to="/colleges" 
                    className="block text-xr-gray-dark hover:text-xr-blue font-medium transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Overview
                  </Link>
                  <Link 
                    to="/colleges/partnerships" 
                    className="block text-xr-gray-dark hover:text-xr-blue font-medium transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Partnerships
                  </Link>
                  <Link 
                    to="/colleges/campus-programs" 
                    className="block text-xr-gray-dark hover:text-xr-blue font-medium transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Campus Programs
                  </Link>
                </div>
              )}
            </div>
            
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
