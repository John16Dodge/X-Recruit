
import React, { useState } from 'react';
import { useSpring, animated, config } from 'react-spring';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { UserPlus, Eye, EyeOff } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import Logo from '@/components/layout/navbar/Logo';

// Form validation schema
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string().min(8, { message: "Please confirm your password" }),
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const AccountCreation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  // React Spring animations
  const fadeIn = useSpring({
    opacity: 1,
    transform: 'translateY(0px)',
    from: { opacity: 0, transform: 'translateY(-40px)' },
    config: { tension: 280, friction: 20 }
  });

  const slideUp = useSpring({
    transform: 'translateY(0px)',
    opacity: 1, 
    from: { transform: 'translateY(40px)', opacity: 0 },
    delay: 300,
    config: { tension: 280, friction: 20 }
  });

  const formAnimation = useSpring({
    transform: 'scale(1)',
    opacity: 1,
    from: { transform: 'scale(0.9)', opacity: 0 },
    delay: 100,
    config: { tension: 200, friction: 20 }
  });

  // Button click animation
  const [buttonProps, buttonApi] = useSpring(() => ({
    scale: 1,
    config: config.wobbly,
  }));

  // Success animation
  const successAnimation = useSpring({
    opacity: isSubmitted ? 1 : 0,
    transform: isSubmitted ? 'scale(1)' : 'scale(0.5)',
    config: config.gentle
  });

  // Form setup
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    // Button animation on click
    buttonApi.start({
      from: { scale: 0.95 },
      to: { scale: 1 },
    });
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      
      toast({
        title: "Account created successfully!",
        description: "Welcome to X-Recruit. You can now sign in with your credentials.",
      });
      
      console.log("Account creation submitted:", values);
      
      // Redirect after successful animation display
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 bg-gradient-to-br from-xr-blue-light/10 to-xr-purple-light/10">
      {/* Background Elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-xr-blue/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-xr-purple/5 rounded-full blur-3xl"></div>
      
      {/* Logo */}
      <animated.div style={fadeIn} className="w-full max-w-md text-center mb-8">
        <div className="flex justify-center mb-4">
          <Logo />
        </div>
        <p className="text-xr-gray mt-2">Create your X-Recruit account</p>
      </animated.div>
      
      <animated.div style={formAnimation} className="w-full max-w-md">
        <Card className="border-none shadow-card">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Create Account</CardTitle>
            <CardDescription className="text-center">Enter your information to get started</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="John"
                            className="input-animated"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Doe"
                            className="input-animated"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="you@example.com"
                          className="input-animated"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="input-animated pr-10"
                            {...field}
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="input-animated pr-10"
                            {...field}
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <animated.div style={buttonProps}>
                  <Button 
                    type="submit" 
                    className="w-full shine-effect" 
                    disabled={isLoading}
                    onClick={() => {
                      buttonApi.start({
                        from: { scale: 0.95 },
                        to: { scale: 1 },
                      });
                    }}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <span className="h-4 w-4 rounded-full border-2 border-t-transparent border-white animate-spin"></span>
                        Creating Account...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <UserPlus className="h-4 w-4" />
                        Create Account
                      </div>
                    )}
                  </Button>
                </animated.div>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <animated.div style={slideUp} className="text-sm text-center w-full">
              Already have an account?{" "}
              <Link to="/login" className="text-xr-blue font-medium hover:underline">
                Sign in
              </Link>
            </animated.div>
          </CardFooter>
        </Card>
      </animated.div>
      
      {/* Success animation overlay */}
      {isSubmitted && (
        <animated.div 
          style={successAnimation}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <div className="bg-white p-8 rounded-lg text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full mx-auto flex items-center justify-center text-white text-2xl mb-4">
              ✓
            </div>
            <h2 className="text-2xl font-bold mb-2">Account Created!</h2>
            <p>Redirecting to login...</p>
          </div>
        </animated.div>
      )}
    </div>
  );
};

export default AccountCreation;
