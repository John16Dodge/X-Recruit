
import { useState } from 'react';
import MentorForm from '@/components/mentor/MentorForm';
import useTheme from '@/hooks/useTheme';
import { Sun, Moon } from 'lucide-react';

const MentorRequest = () => {
  const { theme, toggleTheme } = useTheme();
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <div className={`min-h-screen flex justify-center items-start relative overflow-x-hidden overflow-y-auto ${theme === 'dark' ? 'bg-gradient-to-br from-gray-800 to-gray-700 text-gray-100' : 'bg-white text-gray-700'}`}>
      {/* Enhanced animated background */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <div className="absolute inset-0 opacity-50 bg-gradient-to-br from-indigo-200 via-blue-400 to-purple-400 bg-[length:400%] animate-gradient" />
        <div className="absolute inset-0 opacity-30 bg-[url('/grid-pattern.svg')] bg-repeat animate-pulse" />
        <div className={`absolute inset-0 backdrop-blur-[2px] transition-opacity duration-500 ${theme === 'dark' ? 'bg-black/20' : 'bg-white/10'}`} />
      </div>
      
      <div className="w-[90%] max-w-[600px] my-12 p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg relative z-10 transition-all duration-300 animate-fadeIn hover:shadow-xl">
        <h1 className="text-3xl mb-6 font-bold text-center flex items-center justify-center gap-3 text-blue-600 dark:text-blue-400">
          Request a Mentor
          <button
            onClick={toggleTheme}
            className="text-2xl transition-transform duration-300 hover:rotate-12"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Moon className="text-blue-400" /> : <Sun className="text-blue-600" />}
          </button>
        </h1>

        {showSuccess ? (
          <div className="text-center p-4 bg-green-500 dark:bg-green-600 text-white rounded-lg animate-fadeIn">
            Thank You! Your request has been sent via WhatsApp.
          </div>
        ) : (
          <MentorForm onSuccess={() => setShowSuccess(true)} />
        )}
      </div>
    </div>
  );
};

export default MentorRequest;
