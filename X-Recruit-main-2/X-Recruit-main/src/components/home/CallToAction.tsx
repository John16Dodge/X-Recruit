
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Briefcase, GraduationCap, Building } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="section-padding bg-white dark:bg-gray-900 relative overflow-hidden" id="cta">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-blue-100/20 to-transparent dark:from-blue-900/10 dark:to-transparent opacity-70"></div>
      
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-medium text-sm mb-6 animate-fade-in">
            Get Started Today
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 animate-fade-in animate-delay-100 text-gray-900 dark:text-white">
            Ready to Transform <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 dark:from-blue-400 dark:via-purple-400 dark:to-teal-400 bg-clip-text text-transparent">How You Recruit?</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto animate-fade-in animate-delay-200">
            Join thousands of students, colleges, and companies already using X-Recruit to 
            streamline their recruitment processes and career development.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-card hover:shadow-card-hover dark:hover:shadow-2xl hover:border-blue-300 dark:hover:border-blue-600 group animate-fade-in animate-delay-300 transition-all duration-300">
              <div className="flex flex-col items-center text-center">
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 inline-flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-500 transition-colors">
                  <GraduationCap size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">For Students</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-5">Discover perfect job matches and accelerate your career growth.</p>
                <Button variant="outline" size="sm" className="border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-500 transition-colors">
                  Student Sign Up
                </Button>
              </div>
            </div>
            
            <div className="p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-card hover:shadow-card-hover dark:hover:shadow-2xl hover:border-blue-300 dark:hover:border-blue-600 group animate-fade-in animate-delay-400 transition-all duration-300">
              <div className="flex flex-col items-center text-center">
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 inline-flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-500 transition-colors">
                  <Building size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">For Colleges</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-5">Enhance your campus placements with AI-powered tools.</p>
                <Button variant="outline" size="sm" className="border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-500 transition-colors">
                  College Sign Up
                </Button>
              </div>
            </div>
            
            <div className="p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-card hover:shadow-card-hover dark:hover:shadow-2xl hover:border-blue-300 dark:hover:border-blue-600 group animate-fade-in animate-delay-500 transition-all duration-300">
              <div className="flex flex-col items-center text-center">
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 inline-flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-500 transition-colors">
                  <Briefcase size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">For Recruiters</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-5">Find the perfect candidates efficiently and reduce hiring time.</p>
                <Button variant="outline" size="sm" className="border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-500 transition-colors">
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
