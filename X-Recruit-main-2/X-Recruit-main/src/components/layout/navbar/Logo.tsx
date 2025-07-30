
import React from 'react';
import { Link } from 'react-router-dom';

const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <span className="text-lg font-bold">
        <span className="text-red-500">X</span>
        <span className="text-xr-blue">-Recruit</span>
      </span>
    </Link>
  );
};

export default Logo;
