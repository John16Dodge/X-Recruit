
import React, { useState } from 'react';
import { useSpring, animated, config } from 'react-spring';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { UserPlus, Eye, EyeOff, User, Building, Users, Lightbulb } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import Logo from '@/components/layout/navbar/Logo';

// Form validation schema
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string().min(8, { message: "Please confirm your password" }),
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  userType: z.string().min(1, { message: "Please select a user type" }),
  // Student fields
  university: z.string().optional(),
  origin: z.string().optional(),
  // College fields
  collegeName: z.string().optional(),
  collegeLocation: z.string().optional(),
  // Recruiter fields
  companyName: z.string().optional(),
  hiringDetails: z.string().optional(),
  // Entrepreneur fields
  startupName: z.string().optional(),
  businessModel: z.string().optional(),
  resourcesNeeded: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const AccountCreation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState<string>('');
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
      userType: "",
      university: "",
      origin: "",
      collegeName: "",
      collegeLocation: "",
      companyName: "",
      hiringDetails: "",
      startupName: "",
      businessModel: "",
      resourcesNeeded: "",
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

  const userTypes = [
    { value: 'student', label: 'Student', icon: User, description: 'Looking for education and career opportunities' },
    { value: 'college', label: 'College', icon: Building, description: 'Educational institution seeking partnerships' },
    { value: 'recruiter', label: 'Recruiter', icon: Users, description: 'Hiring talent for organizations' },
    { value: 'entrepreneur', label: 'Entrepreneur', icon: Lightbulb, description: 'Building innovative solutions' },
  ];

  const renderUserTypeFields = () => {
    switch (selectedUserType) {
      case 'student':
        return (
          <>
            <FormField
              control={form.control}
              name="university"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>University/Institution</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., MIT, Stanford University" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="origin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location/Origin</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., New York, California" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        );
      case 'college':
        return (
          <>
            <FormField
              control={form.control}
              name="collegeName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>College/Institution Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Harvard Business School" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="collegeLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Cambridge, MA" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        );
      case 'recruiter':
        return (
          <>
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Google, Microsoft" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hiringDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hiring Focus</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="e.g., Software engineers, Data scientists, UI/UX designers" 
                      className="min-h-[80px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        );
      case 'entrepreneur':
        return (
          <>
            <FormField
              control={form.control}
              name="startupName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Startup/Project Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter name or 'I don't have a name yet'" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="businessModel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Model/Focus</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="e.g., SaaS platform, E-commerce, AI solutions" 
                      className="min-h-[80px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="resourcesNeeded"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resources Needed</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="e.g., Technical co-founder, funding, mentorship" 
                      className="min-h-[80px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 bg-background">
      {/* Background Elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-secondary/5 rounded-full blur-3xl"></div>
      
      {/* Logo */}
      <animated.div style={fadeIn} className="w-full max-w-2xl text-center mb-8">
        <div className="flex justify-center mb-4">
          <Logo />
        </div>
        <p className="text-muted-foreground mt-2">Create your account and join our community</p>
      </animated.div>
      
      <animated.div style={formAnimation} className="w-full max-w-2xl">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Create Account</CardTitle>
            <CardDescription className="text-center">Choose your role and provide your information</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* User Type Selection */}
                <FormField
                  control={form.control}
                  name="userType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold">Select Your Role</FormLabel>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                        {userTypes.map((type) => {
                          const Icon = type.icon;
                          return (
                            <div
                              key={type.value}
                              className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                                field.value === type.value
                                  ? 'border-primary bg-primary/5'
                                  : 'border-border hover:border-primary/50'
                              }`}
                              onClick={() => {
                                field.onChange(type.value);
                                setSelectedUserType(type.value);
                              }}
                            >
                              <div className="flex items-start space-x-3">
                                <Icon className={`h-5 w-5 mt-0.5 ${
                                  field.value === type.value ? 'text-primary' : 'text-muted-foreground'
                                }`} />
                                <div className="flex-1">
                                  <h3 className={`font-medium ${
                                    field.value === type.value ? 'text-primary' : 'text-foreground'
                                  }`}>
                                    {type.label}
                                  </h3>
                                  <p className="text-sm text-muted-foreground mt-1">{type.description}</p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} />
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
                            <Input placeholder="Doe" {...field} />
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
                          <Input type="email" placeholder="you@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                className="pr-10"
                                {...field}
                              />
                              <button
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
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
                                className="pr-10"
                                {...field}
                              />
                              <button
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
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
                  </div>
                </div>

                {/* Role-specific fields */}
                {selectedUserType && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                      {userTypes.find(t => t.value === selectedUserType)?.label} Information
                    </h3>
                    {renderUserTypeFields()}
                  </div>
                )}

                <animated.div style={buttonProps}>
                  <Button 
                    type="submit" 
                    className="w-full" 
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
                        <span className="h-4 w-4 rounded-full border-2 border-t-transparent border-current animate-spin"></span>
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
              <Link to="/login" className="text-primary font-medium hover:underline">
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
          <div className="bg-card p-8 rounded-lg text-center border shadow-lg">
            <div className="w-16 h-16 bg-green-500 rounded-full mx-auto flex items-center justify-center text-white text-2xl mb-4">
              ✓
            </div>
            <h2 className="text-2xl font-bold mb-2">Account Created!</h2>
            <p className="text-muted-foreground">Redirecting to login...</p>
          </div>
        </animated.div>
      )}
    </div>
  );
};

export default AccountCreation;
