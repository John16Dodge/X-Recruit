
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Briefcase, GraduationCap, Building } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="section-padding bg-white relative overflow-hidden" id="cta">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-xr-blue-light/5 to-transparent opacity-70"></div>
      
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-xr-blue/10 text-xr-blue font-medium text-sm mb-6 animate-fade-in">
            Get Started Today
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 animate-fade-in animate-delay-100">
            Ready to Transform <span className="text-gradient">How You Recruit?</span>
          </h2>
          <p className="text-lg text-xr-gray mb-10 max-w-2xl mx-auto animate-fade-in animate-delay-200">
            Join thousands of students, colleges, and companies already using X-Recruit to 
            streamline their recruitment processes and career development.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="feature-card hover:border-xr-blue/30 group animate-fade-in animate-delay-300">
              <div className="flex flex-col items-center text-center">
                <div className="feature-icon mb-5 group-hover:bg-xr-blue group-hover:text-white transition-colors">
                  <GraduationCap size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-xr-gray-dark">For Students</h3>
                <p className="text-xr-gray mb-5">Discover perfect job matches and accelerate your career growth.</p>
                <Button variant="outline" size="sm" className="border-xr-blue text-xr-blue group-hover:bg-xr-blue group-hover:text-white transition-colors">
                  Student Sign Up
                </Button>
              </div>
            </div>
            
            <div className="feature-card hover:border-xr-blue/30 group animate-fade-in animate-delay-400">
              <div className="flex flex-col items-center text-center">
                <div className="feature-icon mb-5 group-hover:bg-xr-blue group-hover:text-white transition-colors">
                  <Building size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-xr-gray-dark">For Colleges</h3>
                <p className="text-xr-gray mb-5">Enhance your campus placements with AI-powered tools.</p>
                <Button variant="outline" size="sm" className="border-xr-blue text-xr-blue group-hover:bg-xr-blue group-hover:text-white transition-colors">
                  College Sign Up
                </Button>
              </div>
            </div>
            
            <div className="feature-card hover:border-xr-blue/30 group animate-fade-in animate-delay-500">
              <div className="flex flex-col items-center text-center">
                <div className="feature-icon mb-5 group-hover:bg-xr-blue group-hover:text-white transition-colors">
                  <Briefcase size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-xr-gray-dark">For Recruiters</h3>
                <p className="text-xr-gray mb-5">Find the perfect candidates efficiently and reduce hiring time.</p>
                <Button variant="outline" size="sm" className="border-xr-blue text-xr-blue group-hover:bg-xr-blue group-hover:text-white transition-colors">
                  Recruiter Sign Up
                </Button>
              </div>
            </div>
          </div>
          
          <div className="animate-fade-in animate-delay-700">
            <Button size="lg" className="bg-xr-blue hover:bg-xr-blue-dark group">
              Schedule a Demo
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
