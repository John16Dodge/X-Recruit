
import React from 'react';
import { 
  Briefcase, 
  CalendarClock, 
  Lightbulb, 
  Users,
  BookMarkedIcon,
  HandHelping,
  Edit,
  BracketsIcon
} from 'lucide-react';
import FeatureCard from '../ui/FeatureCard';

const Features = () => {
  const features = [
    {
      title: "Internship & Job Listings",
      description: "A dashboard for colleges to manage placement activities, track student progress, and coordinate with recruiters.",
      icon: Briefcase,
      delay: 100
    },
    {
      title: "College Dashboard",
      description: "AI-driven coordination between recruiters and candidates for seamless interview management.",
      icon: CalendarClock,
      delay: 200
    },
    {
      title: "Mock Interviews",
      description: "Simulated interview sessions to help students practice and improve their interview skills with feedback.",
      icon: Lightbulb,
      delay: 300
    },
    {
      title: "Campus Event Calendar",
      description: "A calendar to track campus placement events, such as job fairs, company visits, and workshops.",
      icon: BookMarkedIcon,
      delay: 400
    },
    {
      title: "Job Roles and Its Market Analysis",
      description: "Insights into various job roles, including market demand, salary trends, and required skills.",
      icon: BookMarkedIcon,
      delay: 500
    },
    {
      title: "Recruiter Feedback System",
      description: "A system for recruiters to provide feedback to students on their applications, interviews, or profiles.",
      icon: HandHelping,
      delay: 600
    },
    {
      title: "Placement Analytics Dashboard",
      description: "An analytics tool for colleges and students to track placement statistics, success rates, and trends.",
      icon: BracketsIcon,
      delay: 700
    },
    {
      title: "Roadmap Generator",
      description: "A tool to generate personalized career roadmaps for students, outlining steps to achieve their career goals.",
      icon: Edit,
      delay: 800
    },
    {
      title: "Services for Business and Mentorships",
      description: "Services for businesses to engage with students (e.g., mentorship programs, workshops) and for students to access mentorship opportunities.",
      icon: Users,
      delay: 900
    }
  ];

  return (
    <section className="section-padding bg-gray-50 dark:bg-gray-900 relative overflow-hidden" id="features">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-xr-blue/5 dark:bg-blue-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-xr-purple/5 dark:bg-purple-600/10 rounded-full blur-3xl"></div>
      
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-xr-blue/10 dark:bg-blue-600/20 text-xr-blue dark:text-blue-400 font-medium text-sm mb-4 animate-fade-in">
            Core Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in animate-delay-100 text-gray-900 dark:text-white">
            Revolutionizing Recruitment with <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 dark:from-blue-400 dark:via-purple-400 dark:to-teal-400 bg-clip-text text-transparent">AI Technology</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg animate-fade-in animate-delay-200">
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
