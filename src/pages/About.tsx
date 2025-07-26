
import React from 'react';
import { 
  Brain, 
  GraduationCap, 
  Building2, 
  Users, 
  BarChart3,
  CheckCircle,
  Quote,
  ArrowRight,
  Calendar,
  Target,
  Eye,
  Heart
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const About = () => {
  const features = [
    {
      icon: GraduationCap,
      title: "Student Dashboard",
      description: "Personalized insights, resume builder, job alerts"
    },
    {
      icon: Building2,
      title: "College Portal", 
      description: "Drive management, student tracking, recruiter tools"
    },
    {
      icon: Users,
      title: "Recruiter Access",
      description: "Smart shortlisting, event scheduling, analytics"
    },
    {
      icon: BarChart3,
      title: "Placement Dashboard",
      description: "Real-time insights for colleges & companies"
    }
  ];

  const benefits = [
    "AI-based Candidate Shortlisting",
    "Real-time Notifications & Alerts", 
    "Transparent Selection Process",
    "Cross-campus Drive Support",
    "Mock Interviews & Feedback System",
    "Market Trends & Job Role Insights"
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-xr-blue/5 via-white to-xr-purple/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-xr-blue/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-xr-purple/10 rounded-full blur-3xl"></div>
        
        <div className="container-custom text-center relative">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 mb-6 animate-fade-in">
              <Brain className="w-8 h-8 text-xr-blue" />
              <h1 className="text-4xl md:text-6xl font-bold">
                About <span className="text-gradient">X-Recruit</span>
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-xr-gray mb-6 animate-fade-in animate-delay-100">
              Next-generation campus recruitment, reimagined.
            </p>
            <p className="text-lg text-xr-gray-dark font-medium animate-fade-in animate-delay-200">
              We're not just a placement portal—we're a career accelerator.
            </p>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 animate-fade-in">
              Who <span className="text-gradient">We Are</span>
            </h2>
            <p className="text-lg text-xr-gray leading-relaxed animate-fade-in animate-delay-100">
              X-Recruit is a next-generation campus recruitment platform that simplifies the entire placement 
              ecosystem for students, colleges, and companies using AI tools, smart matchmaking, and analytics. 
              We bridge the gap between talent and opportunity with intelligent technology that understands 
              both sides of the recruitment equation.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Card className="feature-card animate-fade-in">
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-xr-blue/10 rounded-full mb-6">
                  <Eye className="w-8 h-8 text-xr-blue" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-xr-gray-dark">Our Vision</h3>
                <p className="text-xr-gray leading-relaxed">
                  To redefine how students and recruiters connect—efficiently, fairly, and transparently.
                </p>
              </CardContent>
            </Card>

            <Card className="feature-card animate-fade-in animate-delay-200">
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-xr-purple/10 rounded-full mb-6">
                  <Target className="w-8 h-8 text-xr-purple" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-xr-gray-dark">Our Mission</h3>
                <p className="text-xr-gray leading-relaxed">
                  To empower institutions and students with data-driven, skill-based recruitment tools.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in">
              What We <span className="text-gradient">Offer</span>
            </h2>
            <p className="text-lg text-xr-gray max-w-3xl mx-auto animate-fade-in animate-delay-100">
              Comprehensive solutions designed to streamline every aspect of campus recruitment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className={`feature-card group hover:border-xr-blue/30 animate-fade-in animate-delay-${(index + 1) * 100}`}>
                <CardContent className="p-6 text-center">
                  <div className="feature-icon mb-5 group-hover:bg-xr-blue group-hover:text-white transition-colors">
                    <feature.icon size={24} />
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-xr-gray-dark">{feature.title}</h3>
                  <p className="text-xr-gray text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why X-Recruit */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in">
                Why Choose <span className="text-gradient">X-Recruit</span>
              </h2>
              <p className="text-lg text-xr-gray animate-fade-in animate-delay-100">
                Advanced features that set us apart from traditional recruitment platforms
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className={`flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm animate-fade-in animate-delay-${(index + 1) * 100}`}>
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-xr-gray-dark font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 animate-fade-in">
              Our <span className="text-gradient">Story</span>
            </h2>
            <Card className="feature-card animate-fade-in animate-delay-100">
              <CardContent className="p-8">
                <p className="text-lg text-xr-gray leading-relaxed mb-6">
                  X-Recruit was born out of frustration with outdated placement systems. Having experienced 
                  the challenges of traditional campus recruitment firsthand, we recognized the need for a 
                  more intelligent, efficient, and transparent approach.
                </p>
                <p className="text-lg text-xr-gray leading-relaxed">
                  We've turned personal experience into a product that empowers the whole ecosystem—students, 
                  institutions, and companies—with cutting-edge technology that makes recruitment smarter, 
                  faster, and more effective for everyone involved.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in">
              Meet Our <span className="text-gradient">Team</span>
            </h2>
            <p className="text-lg text-xr-gray animate-fade-in animate-delay-100">
              The visionaries behind X-Recruit's innovative approach to recruitment
            </p>
          </div>

          <div className="flex justify-center">
            <Card className="feature-card max-w-md animate-fade-in animate-delay-200">
              <CardContent className="p-8 text-center">
                <Avatar className="w-24 h-24 mx-auto mb-6">
                  <AvatarFallback className="bg-xr-blue/10 text-xr-blue text-xl">
                    MJ
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold mb-2 text-xr-gray-dark">Mahesh Magesh Kumar Jayavel</h3>
                <p className="text-xr-blue font-medium mb-4">Founder & CEO</p>
                <p className="text-xr-gray text-sm">
                  Visionary leader driving innovation in campus recruitment technology
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="section-padding bg-xr-gray-dark text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        
        <div className="container-custom relative">
          <div className="max-w-4xl mx-auto text-center">
            <Quote className="w-16 h-16 text-xr-blue mx-auto mb-8 animate-fade-in" />
            <blockquote className="text-2xl md:text-3xl font-bold mb-8 animate-fade-in animate-delay-100">
              "We're not here to replace TPOs or recruiters—we're here to supercharge them with technology."
            </blockquote>
            <cite className="text-lg text-gray-300 animate-fade-in animate-delay-200">
              — Mahesh Magesh Kumar, Founder & CEO
            </cite>
          </div>
        </div>
      </section>

      {/* Call-To-Action */}
      <section className="section-padding bg-gradient-to-br from-xr-blue/5 via-white to-xr-purple/5">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in">
              📢 Want to be part of the future of <span className="text-gradient">campus recruitment?</span>
            </h2>
            <p className="text-lg text-xr-gray mb-12 animate-fade-in animate-delay-100">
              Join thousands of students, colleges, and companies transforming how recruitment works
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animate-delay-200">
              <Button size="lg" className="bg-xr-blue hover:bg-xr-blue-dark group">
                Request a Demo
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="border-xr-blue text-xr-blue hover:bg-xr-blue hover:text-white">
                Contact Us
              </Button>
              <Button size="lg" variant="outline" className="border-xr-purple text-xr-purple hover:bg-xr-purple hover:text-white">
                Join Our Team
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
