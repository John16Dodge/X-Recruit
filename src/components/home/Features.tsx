
import React from 'react';
import { 
  FileSearch, 
  Briefcase, 
  CalendarClock, 
  Building2, 
  Lightbulb, 
  Users
} from 'lucide-react';
import FeatureCard from '../ui/FeatureCard';

const Features = () => {
  const features = [
    {
      title: "AI-Powered Resume Screening",
      description: "Intelligent filtering and ranking of candidates based on skills, experience, and job requirements.",
      icon: FileSearch,
      delay: 100
    },
    {
      title: "Automated Job Matching",
      description: "Smart recommendations that connect candidates with their ideal opportunities.",
      icon: Briefcase,
      delay: 200
    },
    {
      title: "Interview Scheduling System",
      description: "AI-driven coordination between recruiters and candidates for seamless interview management.",
      icon: CalendarClock,
      delay: 300
    },
    {
      title: "Startup & Funding Support",
      description: "Connecting entrepreneurs with investors and mentors to fuel business growth.",
      icon: Building2,
      delay: 400
    },
    {
      title: "Career Mentorship & Learning",
      description: "Personalized guidance for career growth and continuous skill development.",
      icon: Lightbulb,
      delay: 500
    },
    {
      title: "Networking & Events",
      description: "Dynamic platform for industry collaborations and professional networking opportunities.",
      icon: Users,
      delay: 600
    }
  ];

  return (
    <section className="section-padding bg-gray-50 relative overflow-hidden" id="features">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-xr-blue/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-xr-purple/5 rounded-full blur-3xl"></div>
      
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-xr-blue/10 text-xr-blue font-medium text-sm mb-4 animate-fade-in">
            Core Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in animate-delay-100">
            Revolutionizing Recruitment with <span className="text-gradient">AI Technology</span>
          </h2>
          <p className="text-xr-gray text-lg animate-fade-in animate-delay-200">
            Our powerful features are designed to transform how educational institutions, 
            students, and recruiters connect and collaborate in the job market.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
