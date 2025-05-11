
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
import Particles from '../components/animations/Particles';
import FadeInElements from '../components/animations/FadeInElements';
import FloatingElements from '../components/animations/FloatingElements';
import '../components/animations/animations.css';

const Index = () => {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background particles animation */}
      <div className="absolute inset-0 z-0">
        <Particles
          particleColors={['#4C9AFF', '#0052CC', '#998DD9', '#6554C0']}
          particleCount={120}
          particleSpread={15}
          speed={0.05}
          particleBaseSize={80}
          moveParticlesOnHover={true}
          alphaParticles={true}
          disableRotation={false}
        />
      </div>
      
      {/* Floating elements in the background */}
      <FloatingElements count={20} className="z-0" />
      
      <Navbar />
      <main className="flex-grow relative z-10">
        <Hero />
        
        <FadeInElements>
          <Features />
        </FadeInElements>
        
        <FadeInElements delay={200} direction="right">
          <Dashboard />
        </FadeInElements>
        
        <FadeInElements delay={300} direction="left">
          <TeamMembers />
        </FadeInElements>
        
        {/* Contact Form Section */}
        <section id="contact" className="py-20 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden animated-gradient">
          {/* Animated background shapes */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#0052CC_1px,transparent_1px)] [background-size:20px_20px] animate-pulse"></div>
          
          <div className="container-custom relative z-10">
            <FadeInElements delay={200} direction="up">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  <span className="text-gradient pulse-glow inline-block">Contact Us</span>
                </h2>
                <p className="text-xr-gray max-w-xl mx-auto">
                  Have questions about X-Recruit? We're here to help you navigate your career journey.
                </p>
              </div>
            </FadeInElements>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Contact Information */}
              <div className="space-y-8">
                <FadeInElements delay={300} direction="left">
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-card border border-white/20 hover:shadow-card-hover transition-all duration-300 hover-scale">
                    <h3 className="text-xl font-semibold mb-4 text-xr-gray-dark">Contact Information</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="bg-xr-blue-light/20 text-xr-blue p-2 rounded-lg mr-4 contact-icon">
                          <Mail className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-xr-gray-dark">Email</h4>
                          <a href="mailto:xrecruitofficial@gmail.com" className="text-xr-blue hover:text-xr-blue-dark transition-colors">
                            xrecruitofficial@gmail.com
                          </a>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-xr-purple-light/20 text-xr-purple p-2 rounded-lg mr-4 contact-icon">
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
                </FadeInElements>
                
                <FadeInElements delay={400} direction="left">
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-card border border-white/20 hover:shadow-card-hover transition-all duration-300 hover-scale">
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
                </FadeInElements>
              </div>
              
              {/* Contact Form */}
              <FadeInElements delay={500} direction="right">
                <div>
                  <ContactForm />
                </div>
              </FadeInElements>
            </div>
          </div>
        </section>
        
        <FadeInElements delay={300} direction="up">
          <CallToAction />
        </FadeInElements>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
