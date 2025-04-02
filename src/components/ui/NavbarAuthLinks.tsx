
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './button';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, User } from 'lucide-react';

const NavbarAuthLinks = () => {
  const { isAuthenticated, user, logout } = useAuth();

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center gap-4">
        <div className="text-sm font-medium">
          Welcome, {user.name || user.email}
        </div>
        <Button variant="outline" size="sm" onClick={logout} className="flex items-center gap-2">
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link to="/login">
        <Button variant="outline" size="sm">Login</Button>
      </Link>
      <Link to="/register">
        <Button variant="outline" size="sm">Register</Button>
      </Link>
    </div>
  );
};

export default NavbarAuthLinks;
