import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import AptitudeForm from '@/components/aptitude/AptitudeForm';
import CollegeAptitudeForm from '@/components/aptitude/CollegeAptitudeForm';
import useTheme from '@/hooks/useTheme';
import { Sun, Moon } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const AptitudeTraining = () => {
  const { theme, toggleTheme } = useTheme();
  const [showSuccess, setShowSuccess] = useState(false);
  const location = useLocation();
  
  // Check if this is for colleges based on the route
  const isForColleges = location.pathname.includes('/colleges/');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className={`flex-grow flex justify-center items-start relative overflow-x-hidden overflow-y-auto ${theme === 'dark' ? 'bg-gradient-to-br from-gray-800 to-gray-700 text-gray-100' : 'bg-white text-gray-700'}`}>
        {/* Enhanced animated background */}
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <div className="absolute inset-0 opacity-50 bg-gradient-to-br from-indigo-200 via-blue-400 to-purple-400 bg-[length:400%] animate-gradient" />
          <div className="absolute inset-0 opacity-30 bg-[url('/grid-pattern.svg')] bg-repeat animate-pulse" />
          <div className={`absolute inset-0 backdrop-blur-[2px] transition-opacity duration-500 ${theme === 'dark' ? 'bg-black/20' : 'bg-white/10'}`} />
        </div>
        
        <div className="w-[90%] max-w-[700px] my-12 p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg relative z-10 transition-all duration-300 animate-fadeIn hover:shadow-xl navbar-spacing">
          <h1 className="text-3xl mb-6 font-bold text-center flex items-center justify-center gap-3 text-xr-blue">
            {isForColleges ? 'College Training Program' : 'Aptitude & Soft Skills Training'}
            <button
              onClick={toggleTheme}
              className="text-2xl transition-transform duration-300 hover:rotate-12"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Moon className="text-blue-400" /> : <Sun className="text-xr-blue" />}
            </button>
          </h1>

          {showSuccess ? (
            <div className="text-center p-4 bg-green-500 dark:bg-green-600 text-white rounded-lg animate-fadeIn">
              Thank You! Your {isForColleges ? 'college training' : 'training'} request has been sent via WhatsApp.
            </div>
          ) : (
            isForColleges ? (
              <CollegeAptitudeForm onSuccess={() => setShowSuccess(true)} />
            ) : (
              <AptitudeForm onSuccess={() => setShowSuccess(true)} />
            )
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AptitudeTraining;