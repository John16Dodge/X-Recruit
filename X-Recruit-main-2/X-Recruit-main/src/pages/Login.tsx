
import React, { useState } from 'react';
import { useSpring, animated, config } from 'react-spring';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Key, UserPlus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import Logo from '@/components/layout/navbar/Logo';

// Form validation schema
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  rememberMe: z.boolean().default(false),
});

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
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
      rememberMe: false,
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
        title: "Login successful!",
        description: "Welcome back to X-Recruit.",
      });
      
      console.log("Login submitted:", values);
      
      // Redirect after successful animation display
      setTimeout(() => {
        navigate('/');
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
        <p className="text-xr-gray mt-2">Sign in to access your account</p>
      </animated.div>
      
      <animated.div style={formAnimation} className="w-full max-w-md">
        <Card className="border-none shadow-card">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center">Enter your credentials to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                        <Input
                          type="password"
                          placeholder="••••••••"
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
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-normal">
                          Remember me
                        </FormLabel>
                      </div>
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
                        Signing in...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Key className="h-4 w-4" />
                        Login
                      </div>
                    )}
                  </Button>
                </animated.div>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-3">
            <animated.div style={slideUp} className="text-sm text-center w-full">
              <Link to="#" className="text-xr-blue hover:underline">
                Forgot your password?
              </Link>
            </animated.div>
            <animated.div style={slideUp} className="w-full border-t pt-3">
              <div className="text-center mb-3">
                <span className="text-sm text-gray-600">If no existing account</span>
              </div>
              <Link to="/account-creation">
                <Button 
                  variant="outline" 
                  className="w-full border-xr-blue text-xr-blue hover:bg-xr-blue hover:text-white transition-colors"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Create an Account
                </Button>
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
            <h2 className="text-2xl font-bold mb-2">Login Successful!</h2>
            <p>Redirecting to dashboard...</p>
          </div>
        </animated.div>
      )}
    </div>
  );
};

export default Login;
