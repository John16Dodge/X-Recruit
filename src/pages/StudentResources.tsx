
import React from 'react';
import Layout from "@/components/layout/Layout";

const StudentResources = () => {
  return (
    <Layout>
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-xr-blue dark:text-xr-blue-light">
              Student Resources
            </h1>
            <p className="text-xr-gray dark:text-gray-300 max-w-2xl mx-auto">
              Access valuable resources to help you on your learning journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Resource cards will go here */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold mb-3 text-xr-blue dark:text-xr-blue-light">Getting Started Guide</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                A comprehensive guide for new students to navigate through our platform.
              </p>
              <a 
                href="#" 
                className="inline-flex items-center text-xr-purple dark:text-xr-purple-light hover:underline font-medium"
              >
                Read More
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold mb-3 text-xr-blue dark:text-xr-blue-light">Learning Materials</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Access tutorials, videos, and documents to enhance your learning experience.
              </p>
              <a 
                href="#" 
                className="inline-flex items-center text-xr-purple dark:text-xr-purple-light hover:underline font-medium"
              >
                Explore Resources
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold mb-3 text-xr-blue dark:text-xr-blue-light">Career Development</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Tips and tools to help you prepare for your future career in the industry.
              </p>
              <a 
                href="#" 
                className="inline-flex items-center text-xr-purple dark:text-xr-purple-light hover:underline font-medium"
              >
                Learn More
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default StudentResources;
