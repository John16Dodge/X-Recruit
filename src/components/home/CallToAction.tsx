
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Briefcase, GraduationCap, Building } from 'lucide-react';

const CallToAction = () => {
  // HTML template as a string to represent pure HTML conversion
  const htmlVersion = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>X-Recruit - Call to Action</title>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
  <style>
    /* Custom CSS that would replace Tailwind classes */
    .section-padding {
      padding-top: 4rem;
      padding-bottom: 4rem;
    }
    
    .container-custom {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }
    
    .bg-gradient-radial {
      background: radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, transparent 70%);
    }
    
    .text-gradient {
      background: linear-gradient(to right, #3b82f6, #8b5cf6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    .feature-card {
      padding: 1.5rem;
      border-radius: 0.5rem;
      border: 1px solid #e5e7eb;
      transition: all 0.3s ease;
    }
    
    .feature-card:hover {
      border-color: rgba(59, 130, 246, 0.3);
    }
    
    .feature-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      background-color: #f3f4f6;
      transition: all 0.3s ease;
    }
    
    .feature-card:hover .feature-icon {
      background-color: #3b82f6;
      color: white;
    }
    
    .animate-fade-in {
      animation: fadeIn 0.6s ease-out forwards;
    }
    
    .animate-delay-100 {
      animation-delay: 0.1s;
    }
    
    .animate-delay-200 {
      animation-delay: 0.2s;
    }
    
    .animate-delay-300 {
      animation-delay: 0.3s;
    }
    
    .animate-delay-400 {
      animation-delay: 0.4s;
    }
    
    .animate-delay-500 {
      animation-delay: 0.5s;
    }
    
    .animate-delay-700 {
      animation-delay: 0.7s;
    }
    
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  </style>
</head>
<body>
  <section class="section-padding bg-white relative overflow-hidden" id="cta">
    <!-- Background Gradient -->
    <div class="absolute inset-0 bg-gradient-radial opacity-70"></div>
    
    <div class="container-custom">
      <div class="max-w-4xl mx-auto text-center">
        <span class="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-600 font-medium text-sm mb-6 animate-fade-in">
          Get Started Today
        </span>
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 animate-fade-in animate-delay-100">
          Ready to Transform <span class="text-gradient">How You Recruit?</span>
        </h2>
        <p class="text-lg text-gray-600 mb-10 max-w-2xl mx-auto animate-fade-in animate-delay-200">
          Join thousands of students, colleges, and companies already using X-Recruit to 
          streamline their recruitment processes and career development.
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div class="feature-card group animate-fade-in animate-delay-300">
            <div class="flex flex-col items-center text-center">
              <div class="feature-icon mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                  <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold mb-3 text-gray-800">For Students</h3>
              <p class="text-gray-600 mb-5">Discover perfect job matches and accelerate your career growth.</p>
              <button class="border border-blue-600 text-blue-600 px-3 py-1 rounded-md text-sm hover:bg-blue-600 hover:text-white transition-colors">
                Student Sign Up
              </button>
            </div>
          </div>
          
          <div class="feature-card group animate-fade-in animate-delay-400">
            <div class="flex flex-col items-center text-center">
              <div class="feature-icon mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="6" width="20" height="12" rx="2"></rect>
                  <path d="M12 12H2M22 12h-4"></path>
                  <path d="M12 6v12"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold mb-3 text-gray-800">For Colleges</h3>
              <p class="text-gray-600 mb-5">Enhance your campus placements with AI-powered tools.</p>
              <button class="border border-blue-600 text-blue-600 px-3 py-1 rounded-md text-sm hover:bg-blue-600 hover:text-white transition-colors">
                College Sign Up
              </button>
            </div>
          </div>
          
          <div class="feature-card group animate-fade-in animate-delay-500">
            <div class="flex flex-col items-center text-center">
              <div class="feature-icon mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path>
                  <circle cx="12" cy="12" r="4"></circle>
                </svg>
              </div>
              <h3 class="text-xl font-semibold mb-3 text-gray-800">For Recruiters</h3>
              <p class="text-gray-600 mb-5">Find the perfect candidates efficiently and reduce hiring time.</p>
              <button class="border border-blue-600 text-blue-600 px-3 py-1 rounded-md text-sm hover:bg-blue-600 hover:text-white transition-colors">
                Recruiter Sign Up
              </button>
            </div>
          </div>
        </div>
        
        <div class="animate-fade-in animate-delay-700">
          <button class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-lg font-medium flex items-center justify-center mx-auto group">
            Schedule a Demo
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2 group-hover:translate-x-1 transition-transform">
              <path d="m9 18 6-6-6-6"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </section>

  <script>
    // JavaScript for enhancing interactivity
    document.addEventListener('DOMContentLoaded', () => {
      // Animation trigger on scroll
      const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-fade-in');
        
        elements.forEach(element => {
          const elementPosition = element.getBoundingClientRect().top;
          const screenPosition = window.innerHeight / 1.2;
          
          if (elementPosition < screenPosition) {
            element.style.opacity = '1';
          }
        });
      };
      
      // Initialize animations
      animateOnScroll();
      
      // Add scroll event listener
      window.addEventListener('scroll', animateOnScroll);
      
      // Add event listeners to buttons
      const buttons = document.querySelectorAll('button');
      buttons.forEach(button => {
        button.addEventListener('click', (e) => {
          console.log('Button clicked:', e.target.textContent.trim());
          // Add actual functionality here
        });
      });
    });
  </script>
</body>
</html>
  `;

  return (
    <section className="section-padding bg-white relative overflow-hidden" id="cta">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-xr-blue-light/5 to-transparent opacity-70"></div>
      
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-xr-blue/10 text-xr-blue font-medium text-sm mb-6 animate-fade-in">
            Get Started Today
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 animate-fade-in animate-delay-100">
            Ready to Transform <span className="text-gradient">How You Recruit?</span>
          </h2>
          <p className="text-lg text-xr-gray mb-10 max-w-2xl mx-auto animate-fade-in animate-delay-200">
            Join thousands of students, colleges, and companies already using X-Recruit to 
            streamline their recruitment processes and career development.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="feature-card hover:border-xr-blue/30 group animate-fade-in animate-delay-300">
              <div className="flex flex-col items-center text-center">
                <div className="feature-icon mb-5 group-hover:bg-xr-blue group-hover:text-white transition-colors">
                  <GraduationCap size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-xr-gray-dark">For Students</h3>
                <p className="text-xr-gray mb-5">Discover perfect job matches and accelerate your career growth.</p>
                <Button variant="outline" size="sm" className="border-xr-blue text-xr-blue group-hover:bg-xr-blue group-hover:text-white transition-colors">
                  Student Sign Up
                </Button>
              </div>
            </div>
            
            <div className="feature-card hover:border-xr-blue/30 group animate-fade-in animate-delay-400">
              <div className="flex flex-col items-center text-center">
                <div className="feature-icon mb-5 group-hover:bg-xr-blue group-hover:text-white transition-colors">
                  <Building size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-xr-gray-dark">For Colleges</h3>
                <p className="text-xr-gray mb-5">Enhance your campus placements with AI-powered tools.</p>
                <Button variant="outline" size="sm" className="border-xr-blue text-xr-blue group-hover:bg-xr-blue group-hover:text-white transition-colors">
                  College Sign Up
                </Button>
              </div>
            </div>
            
            <div className="feature-card hover:border-xr-blue/30 group animate-fade-in animate-delay-500">
              <div className="flex flex-col items-center text-center">
                <div className="feature-icon mb-5 group-hover:bg-xr-blue group-hover:text-white transition-colors">
                  <Briefcase size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-xr-gray-dark">For Recruiters</h3>
                <p className="text-xr-gray mb-5">Find the perfect candidates efficiently and reduce hiring time.</p>
                <Button variant="outline" size="sm" className="border-xr-blue text-xr-blue group-hover:bg-xr-blue group-hover:text-white transition-colors">
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
