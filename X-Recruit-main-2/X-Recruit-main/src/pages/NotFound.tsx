
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import useTheme from "@/hooks/useTheme";

const NotFound = () => {
  const location = useLocation();
  const { theme } = useTheme();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gray-900 text-white' 
        : 'bg-gray-100 text-gray-900'
    }`}>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className={`text-xl mb-4 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Oops! Page not found
        </p>
        <a 
          href="/" 
          className={`inline-block px-6 py-3 rounded-lg font-medium transition-colors duration-300 ${
            theme === 'dark'
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-blue-500 hover:bg-blue-700 text-white'
          }`}
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
