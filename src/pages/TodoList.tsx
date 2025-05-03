
import React, { useState, useEffect, useRef, KeyboardEvent, ChangeEvent } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ToDoListComponent } from '@/components/students/ToDoListComponent';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const TodoList = () => {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="container-custom py-24 max-w-5xl">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-xr-blue hover:text-xr-blue-dark transition-colors">
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>
        </div>

        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Student Task Organizer</span>
          </h1>
          <p className="text-xr-gray max-w-2xl mx-auto">
            Plan your study sessions, track assignments, and manage your academic goals with our comprehensive task organizer designed specifically for students.
          </p>
        </div>

        <ToDoListComponent />
      </div>
    </Layout>
  );
};

export default TodoList;
