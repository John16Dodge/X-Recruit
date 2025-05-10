
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useToast } from '@/components/ui/use-toast';
import Particles from '@/components/animations/Particles';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

const Login = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      
      // For demonstration, show success toast
      toast({
        title: 'Successfully logged in!',
        description: `Welcome back, ${values.email}`,
      });
    }, 1500);
  };

  return (
    <div className="relative min-h-screen">
      {/* Particles background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Particles
          particleColors={['#4C9AFF', '#0052CC', '#998DD9', '#6554C0']}
          particleCount={150}
          particleSpread={15}
          speed={0.05}
          particleBaseSize={80}
          moveParticlesOnHover={true}
          alphaParticles={true}
          disableRotation={false}
        />
      </div>

      <Layout>
        <div className="container relative z-10 flex items-center justify-center min-h-[calc(100vh-160px)] py-12">
          <Card className="w-full max-w-md mx-auto bg-white/90 backdrop-blur-md shadow-xl">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">
                Sign in to X-Recruit
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="you@example.com" 
                            {...field} 
                            className="input-animated"
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
                            {...field} 
                            className="input-animated"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full form-button-pulse bg-gradient-to-r from-xr-blue to-xr-purple hover:opacity-90"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Signing in...
                      </>
                    ) : 'Sign in'}
                  </Button>
                </form>
              </Form>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-sm text-center text-muted-foreground">
                Don't have an account?{" "}
                <a href="#" className="text-primary underline-offset-4 hover:underline">
                  Sign up
                </a>
              </div>
              
              <div className="text-xs text-center text-muted-foreground">
                <a href="#" className="hover:underline underline-offset-4">
                  Forgot your password?
                </a>
              </div>
            </CardFooter>
          </Card>
        </div>
      </Layout>
    </div>
  );
};

export default Login;
