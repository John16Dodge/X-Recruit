import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Building2, Users } from 'lucide-react';

const SignupButtons = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col sm:flex-row gap-8 justify-center items-center p-8">
      {/* Student Sign Up Button */}
      <Button 
        variant="outline"
        className="group relative overflow-hidden bg-slate-900/50 backdrop-blur-sm border-2 border-blue-500/30 text-blue-400 hover:text-white transition-all duration-700 px-8 py-4 rounded-xl transform hover:-translate-y-3 hover:scale-110 hover:rotate-1 hover:shadow-2xl hover:shadow-blue-500/40 active:scale-95 min-w-[200px] before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-r before:from-blue-600/20 before:to-cyan-600/20 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500"
        onClick={() => navigate('/students')}
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out rounded-xl"></div>
        
        {/* Sparkle effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute top-2 left-4 w-1 h-1 bg-white rounded-full animate-ping delay-100"></div>
          <div className="absolute top-4 right-6 w-1 h-1 bg-white rounded-full animate-ping delay-300"></div>
          <div className="absolute bottom-3 left-8 w-1 h-1 bg-white rounded-full animate-ping delay-500"></div>
        </div>
        
        {/* Border glow effect */}
        <div className="absolute inset-0 rounded-xl border-2 border-blue-400/0 group-hover:border-blue-400/50 transition-all duration-500 group-hover:animate-pulse"></div>
        
        <div className="relative flex items-center justify-center gap-3 font-bold text-sm tracking-wide">
          <GraduationCap className="w-5 h-5 transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 group-hover:drop-shadow-lg" />
          <span className="group-hover:tracking-wider transition-all duration-300">Student Sign Up</span>
        </div>
      </Button>
      
      {/* College Sign Up Button */}
      <Button 
        variant="outline"
        className="group relative overflow-hidden bg-slate-900/50 backdrop-blur-sm border-2 border-purple-500/30 text-purple-400 hover:text-white transition-all duration-700 px-8 py-4 rounded-xl transform hover:-translate-y-3 hover:scale-110 hover:rotate-1 hover:shadow-2xl hover:shadow-purple-500/40 active:scale-95 min-w-[200px] before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-r before:from-purple-600/20 before:to-pink-600/20 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500"
        onClick={() => navigate('/colleges')}
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out rounded-xl"></div>
        
        {/* Sparkle effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute top-2 left-4 w-1 h-1 bg-white rounded-full animate-ping delay-200"></div>
          <div className="absolute top-4 right-6 w-1 h-1 bg-white rounded-full animate-ping delay-400"></div>
          <div className="absolute bottom-3 left-8 w-1 h-1 bg-white rounded-full animate-ping delay-600"></div>
        </div>
        
        {/* Border glow effect */}
        <div className="absolute inset-0 rounded-xl border-2 border-purple-400/0 group-hover:border-purple-400/50 transition-all duration-500 group-hover:animate-pulse"></div>
        
        <div className="relative flex items-center justify-center gap-3 font-bold text-sm tracking-wide">
          <Building2 className="w-5 h-5 transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 group-hover:drop-shadow-lg" />
          <span className="group-hover:tracking-wider transition-all duration-300">College Sign Up</span>
        </div>
      </Button>
      
      {/* Recruiter Sign Up Button */}
      <Button 
        variant="outline"
        className="group relative overflow-hidden bg-slate-900/50 backdrop-blur-sm border-2 border-emerald-500/30 text-emerald-400 hover:text-white transition-all duration-700 px-8 py-4 rounded-xl transform hover:-translate-y-3 hover:scale-110 hover:rotate-1 hover:shadow-2xl hover:shadow-emerald-500/40 active:scale-95 min-w-[200px] before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-r before:from-emerald-600/20 before:to-teal-600/20 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500"
        onClick={() => navigate('/recruiters')}
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out rounded-xl"></div>
        
        {/* Sparkle effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute top-2 left-4 w-1 h-1 bg-white rounded-full animate-ping delay-150"></div>
          <div className="absolute top-4 right-6 w-1 h-1 bg-white rounded-full animate-ping delay-350"></div>
          <div className="absolute bottom-3 left-8 w-1 h-1 bg-white rounded-full animate-ping delay-550"></div>
        </div>
        
        {/* Border glow effect */}
        <div className="absolute inset-0 rounded-xl border-2 border-emerald-400/0 group-hover:border-emerald-400/50 transition-all duration-500 group-hover:animate-pulse"></div>
        
        <div className="relative flex items-center justify-center gap-3 font-bold text-sm tracking-wide">
          <Users className="w-5 h-5 transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 group-hover:drop-shadow-lg" />
          <span className="group-hover:tracking-wider transition-all duration-300">Recruiter Sign Up</span>
        </div>
      </Button>
    </div>
  );
};

export default SignupButtons;
