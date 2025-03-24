
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Linkedin, 
  Twitter, 
  Instagram, 
  Facebook, 
  Mail, 
  MapPin, 
  Phone 
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-xr-gray-dark text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <h2 className="text-2xl font-bold text-white">X-Recruit</h2>
            </Link>
            <p className="text-gray-300 mb-6 max-w-md">
              Next-generation AI-driven recruitment platform designed to streamline hiring processes, 
              enhance campus placements, and provide career and Business and Entreprenuership mentorship.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://in.linkedin.com/company/xrecruition" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
          
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">For Users</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/students" className="text-gray-300 hover:text-white transition-colors">
                  For Students
                </Link>
              </li>
              <li>
                <Link to="/colleges" className="text-gray-300 hover:text-white transition-colors">
                  For Colleges
                </Link>
              </li>
              <li>
                <Link to="/recruiters" className="text-gray-300 hover:text-white transition-colors">
                  For Recruiters
                </Link>
              </li>
              <li>
                <Link to="/mentorship" className="text-gray-300 hover:text-white transition-colors">
                  Business Mentorship
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/help" className="text-gray-300 hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-300 hover:text-white transition-colors">
                  Events & Webinars
                </Link>
              </li>
            
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-5">
              <li className="flex items-start space-x-3">
                <Mail size={18} className="mt-0.5 text-gray-300" />
                <a href="mailto:hello@xrecruit.com" className="text-gray-300 hover:text-white transition-colors size-3">
                  xrecruit.official@gmail.com
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Phone size={18} className="mt-0.5 text-gray-300" />
                <a href="tel:+1234567890" className="text-gray-300 hover:text-white transition-colors">
                  +91 8148916824 
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={25} className="mt-0.5 text-gray-300" />
                <span className="text-gray-300">
                  NO: 437 Devanathaswamy Nagar, VPM
                </span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-700 my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} X-Recruit. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
