
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-blue-100/30 to-indigo-50/80 dark:from-gray-900 dark:via-blue-950/30 dark:to-indigo-950/20">
      <Navbar />
      <main className="flex-grow text-gray-800 dark:text-gray-200">{children}</main>
      <Footer />
    </div>
  );
};
