
import React from 'react';
import { Button } from '@/components/ui/button';
import { useSpring, animated, config } from 'react-spring';
import { useNavigate } from 'react-router-dom';

interface CTAButtonsProps {
  isMobile?: boolean;
  onLoginClick?: () => void;
}

const CTAButtons: React.FC<CTAButtonsProps> = ({ isMobile = false, onLoginClick }) => {
  const navigate = useNavigate();
  
  // Button animations
  const [loginButtonProps, loginButtonApi] = useSpring(() => ({
    scale: 1,
    config: config.wobbly,
  }));

  const [getStartedButtonProps, getStartedButtonApi] = useSpring(() => ({
    scale: 1,
    config: config.wobbly,
  }));

  const handleLoginClick = () => {
    // Animate button
    loginButtonApi.start({
      from: { scale: 0.9 },
      to: { scale: 1 },
    });
    
    // Navigate to login page
    navigate('/login');
    
    // Call additional onClick handler if provided
    if (onLoginClick) {
      onLoginClick();
    }
  };

  const handleGetStartedClick = () => {
    // Animate button
    getStartedButtonApi.start({
      from: { scale: 0.9 },
      to: { scale: 1 },
    });
  };

  if (isMobile) {
    return (
      <div className="flex flex-col space-y-3">
        <Button 
          variant="outline" 
          className="w-full border-xr-blue text-xr-blue hover:bg-xr-blue/5"
          onClick={handleLoginClick}
        >
          Log in
        </Button>
        <Button 
          className="w-full bg-xr-blue hover:bg-xr-blue-dark"
          onClick={handleGetStartedClick}
        >
          Get Started
        </Button>
      </div>
    );
  }

  return (
    <div className="hidden md:flex items-center space-x-3">
      <animated.div style={loginButtonProps}>
        <Button 
          size="sm"
          variant="outline" 
          className="border-xr-blue text-xr-blue hover:bg-xr-blue/5 shine-effect"
          onClick={handleLoginClick}
        >
          Log in
        </Button>
      </animated.div>
      
      <animated.div style={getStartedButtonProps}>
        <Button 
          size="sm"
          className="bg-xr-blue hover:bg-xr-blue-dark shine-effect"
          onClick={handleGetStartedClick}
        >
          Get Started
        </Button>
      </animated.div>
    </div>
  );
};

export default CTAButtons;
