
import React, { useEffect } from 'react';
import { Mail, Phone, ArrowRight, CheckCircle, Star, Users, Building, Briefcase, Sparkles, Zap, Target } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Features from '../components/home/Features';
import CallToAction from '../components/home/CallToAction';
import ContactForm from '../components/home/ContactForm';
import { Button } from '@/components/ui/button';

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow">
        {/* Revolutionary Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Dynamic Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/50 to-purple-50/50"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.15),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(147,51,234,0.15),transparent_50%)]"></div>
            
            {/* Floating geometric shapes */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          </div>
          
          <div className="container-custom relative z-10">
            <div className="text-center max-w-5xl mx-auto">
              {/* Premium Badge */}
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-200/50 backdrop-blur-sm mb-8 animate-fade-in">
                <Sparkles className="w-5 h-5 text-yellow-500 mr-2" />
                <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Transform Your Career Journey
                </span>
              </div>
              
              {/* Logo Integration */}
              <div className="flex justify-center mb-8 animate-fade-in animate-delay-100">
                <div className="relative">
                  <img 
                    src="/lovable-uploads/26807aa8-d05e-46aa-8679-30c0c2a7c5d5.png" 
                    alt="X-Recruit Logo" 
                    className="h-56 w-auto drop-shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl -z-10"></div>
                </div>
              </div>
              
              {/* Dynamic Headlines */}
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight animate-fade-in animate-delay-200">
                <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                  X-Recruit
                </span>
                <br />
                <span className="text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent font-medium">
                  Career Guidance Platform
                </span>
              </h1>
              
              {/* Compelling Subtitle */}
              <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in animate-delay-300">
                "Transforming Campus Placements and Beyond" - Empowering students, colleges, and companies 
                with AI-driven career solutions and seamless recruitment experiences.
              </p>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16 animate-fade-in animate-delay-400">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-6 text-lg font-semibold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 group">
                  Start Your Journey
                  <ArrowRight size={20} className="ml-3 group-hover:translate-x-2 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-10 py-6 text-lg font-semibold rounded-2xl">
                  Watch Demo
                </Button>
              </div>
              
              {/* Target Audience Pills */}
              <div className="flex flex-wrap items-center justify-center gap-6 animate-fade-in animate-delay-500">
                <div className="group flex items-center bg-white/90 backdrop-blur-sm rounded-2xl px-8 py-4 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <Users className="w-6 h-6 text-blue-600 mr-3 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold text-gray-800">Students</span>
                </div>
                <div className="group flex items-center bg-white/90 backdrop-blur-sm rounded-2xl px-8 py-4 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <Building className="w-6 h-6 text-purple-600 mr-3 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold text-gray-800">Colleges</span>
                </div>
                <div className="group flex items-center bg-white/90 backdrop-blur-sm rounded-2xl px-8 py-4 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <Briefcase className="w-6 h-6 text-emerald-600 mr-3 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold text-gray-800">Companies</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Statistics */}
        <section className="py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1),transparent_50%)]"></div>
          
          <div className="container-custom relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Our Impact in Numbers
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Real results from our revolutionary career guidance platform
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 group-hover:scale-105">
                  <div className="text-5xl md:text-6xl font-bold text-white mb-4 flex items-center justify-center">
                    <Zap className="w-12 h-12 text-yellow-400 mr-4" />
                    1000+
                  </div>
                  <div className="text-gray-300 text-xl font-medium">Students Successfully Placed</div>
                </div>
              </div>
              <div className="text-center group">
                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 group-hover:scale-105">
                  <div className="text-5xl md:text-6xl font-bold text-white mb-4 flex items-center justify-center">
                    <Target className="w-12 h-12 text-green-400 mr-4" />
                    500+
                  </div>
                  <div className="text-gray-300 text-xl font-medium">Partner Companies</div>
                </div>
              </div>
              <div className="text-center group">
                <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 group-hover:scale-105">
                  <div className="text-5xl md:text-6xl font-bold text-white mb-4 flex items-center justify-center">
                    <Star className="w-12 h-12 text-purple-400 mr-4" />
                    100+
                  </div>
                  <div className="text-gray-300 text-xl font-medium">College Partners</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Core Features Section */}
        <Features />
        
        {/* Enhanced Contact Section */}
        <section id="contact" className="py-32 bg-gradient-to-br from-slate-50 via-blue-50/50 to-purple-50/50 relative overflow-hidden">
          {/* Artistic background elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.3),transparent_70%)]"></div>
            <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_70%,rgba(147,51,234,0.3),transparent_70%)]"></div>
          </div>
          
          <div className="container-custom relative z-10">
            <div className="text-center mb-20 animate-fade-in">
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200/50 mb-8">
                <Mail className="w-5 h-5 text-blue-600 mr-2" />
                <span className="text-sm font-semibold text-gray-700">Ready to Connect?</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold mb-8">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
                  Let's Transform
                </span>
                <br />
                <span className="text-gray-800">Your Career Together</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Take the first step towards revolutionizing your career journey. Our expert team is ready to guide you through every step of the process.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start max-w-7xl mx-auto">
              {/* Enhanced Contact Information */}
              <div className="space-y-8">
                <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/50 hover:shadow-3xl transition-all duration-500">
                  <h3 className="text-3xl font-bold mb-8 text-gray-800">Get In Touch</h3>
                  
                  <div className="space-y-8">
                    <div className="flex items-start group cursor-pointer">
                      <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-4 rounded-2xl mr-6 group-hover:scale-110 transition-transform shadow-lg">
                        <Mail className="h-7 w-7" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">Email Address</h4>
                        <a href="mailto:xrecruit.official@gmail.com" className="text-blue-600 hover:text-blue-700 transition-colors text-xl font-medium">
                          xrecruit.official@gmail.com
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start group cursor-pointer">
                      <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-4 rounded-2xl mr-6 group-hover:scale-110 transition-transform shadow-lg">
                        <Phone className="h-7 w-7" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">Phone Number</h4>
                        <a href="tel:+918148916824" className="text-blue-600 hover:text-blue-700 transition-colors text-xl font-medium">
                          +91 8148916824
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/50 hover:shadow-3xl transition-all duration-500">
                  <h3 className="text-3xl font-bold mb-8 text-gray-800">Working Hours</h3>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="text-gray-600 font-medium text-lg">Monday - Friday</span>
                      <span className="font-bold text-gray-800 text-lg">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="text-gray-600 font-medium text-lg">Saturday</span>
                      <span className="font-bold text-gray-800 text-lg">9:00 AM - 3:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-gray-600 font-medium text-lg">Sunday</span>
                      <span className="font-bold text-red-600 text-lg">Closed</span>
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
