
import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';

// Form validation schema
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

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

  // Form setup
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Login attempt",
        description: "This is a demo login. Backend authentication is not configured yet.",
      });
      console.log("Login submitted:", values);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 bg-gradient-to-br from-xr-blue-light/10 to-xr-purple-light/10">
      {/* Background Elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-xr-blue/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-xr-purple/5 rounded-full blur-3xl"></div>
      
      <animated.div style={fadeIn} className="w-full max-w-md text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gradient">X-Recruit</h1>
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
                <Button 
                  type="submit" 
                  className="w-full shine-effect" 
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <animated.div style={slideUp} className="text-sm text-center w-full">
              <Link to="#" className="text-xr-blue hover:underline">
                Forgot your password?
              </Link>
            </animated.div>
            <animated.div style={slideUp} className="text-sm text-center w-full">
              Don't have an account?{" "}
              <Link to="#" className="text-xr-blue font-medium hover:underline">
                Sign up
              </Link>
            </animated.div>
          </CardFooter>
        </Card>
      </animated.div>
    </div>
  );
};

export default Login;
