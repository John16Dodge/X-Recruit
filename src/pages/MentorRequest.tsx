
import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import MentorForm from '@/components/mentor/MentorForm';
import useTheme from '@/hooks/useTheme';
import { Sun, Moon, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const MentorRequest = () => {
  const { theme, toggleTheme } = useTheme();
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <Layout>
      <div className="container-custom py-24">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-xr-blue hover:text-xr-blue-dark transition-colors dark:text-blue-400 dark:hover:text-blue-300">
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>
        </div>
        
        <div className="w-[90%] max-w-[600px] mx-auto my-12 p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg relative z-10 transition-all duration-300 animate-fadeIn hover:shadow-xl">
          <h1 className="text-3xl mb-6 font-bold text-center flex items-center justify-center gap-3 text-xr-blue dark:text-blue-400">
            Request a Mentor
            <button
              onClick={toggleTheme}
              className="text-2xl transition-transform duration-300 hover:rotate-12"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Moon className="text-blue-300" /> : <Sun className="text-xr-blue" />}
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
    </Layout>
  );
};

export default MentorRequest;
