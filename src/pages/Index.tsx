import React, { useEffect } from 'react';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import Dashboard from '../components/home/Dashboard';
import TeamMembers from '../components/home/TeamMembers';
import CallToAction from '../components/home/CallToAction';
import ContactForm from '../components/home/ContactForm';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Briefcase } from 'lucide-react';

const Index = () => {
  useEffect(() => {
    document.title = 'X-Recruit - Revolutionizing Campus Recruitment';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white text-gray-900">
      <Hero />
      <Features />
      <Dashboard />
      <TeamMembers />
      <CallToAction />
      <ContactForm />
    </div>
  );
};

export default Index;
