
import React from 'react';
import { ArrowRight, Search, CheckCircle, BriefcaseBusiness } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-24">
      {/* Background with subtle patterns */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-blue-50 z-0">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#0052CC_1px,transparent_1px)] [background-size:16px_16px]"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
            <span className="inline-block px-4 py-2 rounded-full bg-xr-blue/10 text-xr-blue font-medium text-sm mb-6 animate-fade-in">
              Guidance?? X-Recruit....!!!
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in animate-delay-100">
              <span className="text-gradient">X-Recruit</span> Career Guidance for Placement
            </h1>
            
            <p className="text-lg text-xr-gray mb-8 max-w-xl mx-auto lg:mx-0 animate-fade-in animate-delay-200">
            "X-Recruit: Transforming Campus Placements and Beyond"
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in animate-delay-300">
              <Button size="lg" className="bg-xr-blue hover:bg-xr-blue-dark group">
                Get Started
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="border-xr-blue text-xr-blue hover:bg-xr-blue/5">
                Learn More
              </Button>
            </div>
            
            <div className="mt-12 flex items-center justify-center lg:justify-start space-x-8 animate-fade-in animate-delay-400">
              <div className="flex items-center space-x-2">
                <CheckCircle size={20} className="text-xr-blue" />
                <span className="text-xr-gray-dark">For Students</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle size={20} className="text-xr-blue" />
                <span className="text-xr-gray-dark">For Colleges</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle size={20} className="text-xr-blue" />
                <span className="text-xr-gray-dark">For Companies</span>
              </div>
            </div>
          </div>
          
          {/* Right - Floating Dashboard/UI Preview */}
          <div className="w-full lg:w-1/2 relative">
            <div className="glass-card rounded-2xl overflow-hidden shadow-xl animate-float">
              <div className="bg-xr-blue text-white p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <BriefcaseBusiness size={20} />
                  <span className="font-medium">XR Dashboard</span>
                </div>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
              </div>
              
              <div className="p-6 bg-white">
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xr-gray" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search for roadmaps, career to pursue etc...." 
                    className="w-full py-3 pl-10 pr-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-xr-blue focus:border-transparent"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-lg bg-xr-blue-light/10 border border-xr-blue-light/30">
                    <div className="text-xr-blue text-2xl font-bold">100+</div>
                    <div className="text-xr-gray-dark text-sm">New Job Matches</div>
                  </div>
                  <div className="p-4 rounded-lg bg-xr-purple-light/10 border border-xr-purple-light/30">
                    <div className="text-xr-purple text-2xl font-bold">1000+</div>
                    <div className="text-xr-gray-dark text-sm">Interview Requests</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 rounded-lg border border-gray-100 hover:border-xr-blue-light/30 transition-colors cursor-pointer">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-xr-gray-dark">Full Stack Developer</h3>
                      <span className="text-green-500 text-sm">95% Match</span>
                    </div>
                    <div className="text-xr-gray text-sm mt-1">X-Recruit</div>
                    <div className="flex items-center space-x-2 mt-3">
                      <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs">MERN Stack</span>
                      <span className="px-2 py-1 rounded-full bg-purple-100 text-purple-700 text-xs">Problem Solving</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg border border-gray-100 hover:border-xr-blue-light/30 transition-colors cursor-pointer">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-xr-gray-dark">Business Analyst</h3>
                      <span className="text-green-500 text-sm">93% Match</span>
                    </div>
                    <div className="text-xr-gray text-sm mt-1">X-Recruit</div>
                    <div className="flex items-center space-x-2 mt-3">
                      <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs">SCRUM Master</span>
                      <span className="px-2 py-1 rounded-full bg-purple-100 text-purple-700 text-xs">Team Collaborator</span>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg border border-gray-100 hover:border-xr-blue-light/30 transition-colors cursor-pointer">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-xr-gray-dark">UX Designer</h3>
                      <span className="text-green-500 text-sm">87% Match</span>
                    </div>
                    <div className="text-xr-gray text-sm mt-1">X-Recruit</div>
                    <div className="flex items-center space-x-2 mt-3">
                      <span className="px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs">Figma</span>
                      <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs">Prototyping</span>
                      <span className="px-2 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs">Research</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Bubble Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-xr-teal-light/30 backdrop-blur-sm animate-float opacity-80"></div>
            <div className="absolute -bottom-6 -left-6 w-16 h-16 rounded-full bg-xr-purple-light/30 backdrop-blur-sm animate-float opacity-80" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
