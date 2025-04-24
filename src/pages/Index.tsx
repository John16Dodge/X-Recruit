
import React, { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import Dashboard from '../components/home/Dashboard';
import CallToAction from '../components/home/CallToAction';
import TeamMembers from '../components/home/TeamMembers';

const Index = () => {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        <Dashboard />
        <TeamMembers />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
