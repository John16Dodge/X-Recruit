
import React, { useEffect } from 'react';
import { Mail, Phone, ArrowRight, CheckCircle, Star, Users, Building, Briefcase } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Features from '../components/home/Features';
import CallToAction from '../components/home/CallToAction';
import ContactForm from '../components/home/ContactForm';
import { Button } from '@/components/ui/button';

const Index = () => {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section with Enhanced Design */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Enhanced Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(120,119,198,0.1),transparent_50%)]"></div>
            <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          </div>
          
          <div className="container-custom relative z-10 text-center">
            <div className="max-w-4xl mx-auto">
              {/* Badge */}
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200/50 mb-8 animate-fade-in">
                <Star className="w-4 h-4 text-yellow-500 mr-2" />
                <span className="text-sm font-semibold text-gray-700">Guidance?? X-Recruit....!!!</span>
              </div>
              
              {/* Main Heading */}
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in animate-delay-100">
                <span className="text-gradient bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                  X-Recruit
                </span>
                <br />
                <span className="text-gray-800">Career Guidance</span>
                <br />
                <span className="text-gray-600 text-3xl md:text-5xl">for Placement</span>
              </h1>
              
              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in animate-delay-200">
                "X-Recruit: Transforming Campus Placements and Beyond"
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in animate-delay-300">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg group">
                  Get Started
                  <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg">
                  Learn More
                </Button>
              </div>
              
              {/* Feature Pills */}
              <div className="flex flex-wrap items-center justify-center gap-6 animate-fade-in animate-delay-400">
                <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-white/50">
                  <Users className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="font-medium text-gray-700">For Students</span>
                </div>
                <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-white/50">
                  <Building className="w-5 h-5 text-purple-600 mr-2" />
                  <span className="font-medium text-gray-700">For Colleges</span>
                </div>
                <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-white/50">
                  <Briefcase className="w-5 h-5 text-green-600 mr-2" />
                  <span className="font-medium text-gray-700">For Companies</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50"></div>
          <div className="container-custom relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200/50">
                <div className="text-4xl font-bold text-blue-600 mb-2">1000+</div>
                <div className="text-gray-600">Students Placed</div>
              </div>
              <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200/50">
                <div className="text-4xl font-bold text-purple-600 mb-2">500+</div>
                <div className="text-gray-600">Partner Companies</div>
              </div>
              <div className="p-8 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200/50">
                <div className="text-4xl font-bold text-green-600 mb-2">100+</div>
                <div className="text-gray-600">College Partners</div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Core Features Section */}
        <Features />
        
        {/* Enhanced Contact Section */}
        <section id="contact" className="py-24 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden">
          {/* Enhanced background patterns */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container-custom relative z-10">
            <div className="text-center mb-16 animate-fade-in">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200/50 mb-6">
                <span className="text-sm font-medium text-gray-700">Get In Touch</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Contact Us</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Have questions about X-Recruit? We're here to help you navigate your career journey.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Enhanced Contact Information */}
              <div className="space-y-8">
                <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/50 hover:shadow-3xl transition-all duration-500">
                  <h3 className="text-2xl font-bold mb-6 text-gray-800">Contact Information</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start group">
                      <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-3 rounded-xl mr-4 group-hover:scale-110 transition-transform">
                        <Mail className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-800 mb-1">Email</h4>
                        <a href="mailto:xrecruit.official@gmail.com" className="text-blue-600 hover:text-blue-700 transition-colors text-lg">
                          xrecruit.official@gmail.com
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start group">
                      <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-3 rounded-xl mr-4 group-hover:scale-110 transition-transform">
                        <Phone className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-800 mb-1">Phone</h4>
                        <a href="tel:+918148916824" className="text-blue-600 hover:text-blue-700 transition-colors text-lg">
                          +91 8148916824
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/50 hover:shadow-3xl transition-all duration-500">
                  <h3 className="text-2xl font-bold mb-6 text-gray-800">Working Hours</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                      <span className="text-gray-600 font-medium">Weekdays</span>
                      <span className="font-semibold text-gray-800">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                      <span className="text-gray-600 font-medium">Saturday</span>
                      <span className="font-semibold text-gray-800">9:00 AM - 3:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600 font-medium">Sunday</span>
                      <span className="font-semibold text-red-600">Closed</span>
                    </div>
                  </div>
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
