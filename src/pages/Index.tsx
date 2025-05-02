
import React, { useEffect } from 'react';
import { Mail, Phone } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import Dashboard from '../components/home/Dashboard';
import CallToAction from '../components/home/CallToAction';
import TeamMembers from '../components/home/TeamMembers';
import ContactForm from '../components/home/ContactForm';

const Index = () => {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        <Dashboard />
        <TeamMembers />
        
        {/* Contact Form Section */}
        <section id="contact" className="py-20 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden">
          {/* Animated background shapes */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#0052CC_1px,transparent_1px)] [background-size:20px_20px] animate-pulse"></div>
          
          <div className="container-custom relative z-10">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="text-gradient">Contact Us</span>
              </h2>
              <p className="text-xr-gray max-w-xl mx-auto">
                Have questions about X-Recruit? We're here to help you navigate your career journey.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Contact Information */}
              <div className="space-y-8">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-card border border-white/20 hover:shadow-card-hover transition-all duration-300 animate-fade-in">
                  <h3 className="text-xl font-semibold mb-4 text-xr-gray-dark">Contact Information</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-xr-blue-light/20 text-xr-blue p-2 rounded-lg mr-4">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-xr-gray-dark">Email</h4>
                        <a href="mailto:xrecruit.official@gmail.com" className="text-xr-blue hover:text-xr-blue-dark transition-colors">
                          xrecruit.official@gmail.com
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-xr-purple-light/20 text-xr-purple p-2 rounded-lg mr-4">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-xr-gray-dark">Phone</h4>
                        <a href="tel:+918148916824" className="text-xr-blue hover:text-xr-blue-dark transition-colors">
                          +91 8148916824
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-card border border-white/20 hover:shadow-card-hover transition-all duration-300 animate-fade-in animate-delay-100">
                  <h3 className="text-xl font-semibold mb-4 text-xr-gray-dark">Working Hours</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span className="text-xr-gray">Weekdays</span>
                      <span className="font-medium text-xr-gray-dark">9:00 AM - 6:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-xr-gray">Saturday</span>
                      <span className="font-medium text-xr-gray-dark">9:00 AM - 3:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-xr-gray">Sunday</span>
                      <span className="font-medium text-xr-gray-dark">Closed</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="animate-fade-in animate-delay-200">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
        
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
