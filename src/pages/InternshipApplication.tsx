
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send, Users, BookOpen, Smartphone, Mail, MessageCircle, Code, Palette, Database, Layers, School, Moon, Sun, Home, Phone, Info, Github, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import useTheme from '@/hooks/useTheme';

// Define form schema using Zod
const formSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters' }),
  collegeName: z.string().min(2, { message: 'College/School name must be at least 2 characters' }),
  yearOfStudy: z.string().min(1, { message: 'Please select your year of study' }),
  department: z.string().min(1, { message: 'Please select your department' }),
  customDepartment: z.string().optional(),
  mobileNumber: z.string().regex(/^\d{10}$/, { message: 'Mobile number must be exactly 10 digits' }),
  gmailId: z.string().regex(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, { message: 'Please enter a valid Gmail address' }),
  linkedinProfile: z.string().url({ message: 'Please enter a valid LinkedIn URL' }).optional().or(z.literal('')),
  githubId: z.string().url({ message: 'Please enter a valid GitHub URL' }).optional().or(z.literal('')),
  whyInternship: z.string().min(10, { message: 'Please provide at least 10 characters explaining why you want this internship' }),
  frontend: z.array(z.string()).default([]),
  frontendOther: z.string().optional(),
  uiux: z.array(z.string()).default([]),
  uiuxOther: z.string().optional(),
  backend: z.array(z.string()).default([]),
  backendOther: z.string().optional(),
  fullStack: z.array(z.string()).default([]),
});

type FormValues = z.infer<typeof formSchema>;

const InternshipApplication = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCustomDepartment, setShowCustomDepartment] = useState(false);
  const [showFrontendOther, setShowFrontendOther] = useState(false);
  const [showUiuxOther, setShowUiuxOther] = useState(false);
  const [showBackendOther, setShowBackendOther] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      collegeName: '',
      yearOfStudy: '',
      department: '',
      customDepartment: '',
      mobileNumber: '',
      gmailId: '',
      linkedinProfile: '',
      githubId: '',
      whyInternship: '',
      frontend: [],
      frontendOther: '',
      uiux: [],
      uiuxOther: '',
      backend: [],
      backendOther: '',
      fullStack: [],
    },
  });

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Here you would integrate with your Excel API endpoint
      const response = await fetch('/api/internship-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        toast({
          title: "🎉 Thank you for applying!",
          description: "Our team will contact you soon.",
        });
        form.reset();
        setShowCustomDepartment(false);
        setShowFrontendOther(false);
        setShowUiuxOther(false);
        setShowBackendOther(false);
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Submission Error",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkillChange = (skill: string, skillCategory: 'frontend' | 'uiux' | 'backend' | 'fullStack', checked: boolean) => {
    const currentSkills = form.getValues(skillCategory) || [];
    
    if (checked) {
      form.setValue(skillCategory, [...currentSkills, skill]);
      if (skill === 'Others') {
        if (skillCategory === 'frontend') setShowFrontendOther(true);
        if (skillCategory === 'uiux') setShowUiuxOther(true);
        if (skillCategory === 'backend') setShowBackendOther(true);
      }
    } else {
      form.setValue(skillCategory, currentSkills.filter(s => s !== skill));
      if (skill === 'Others') {
        if (skillCategory === 'frontend') {
          setShowFrontendOther(false);
          form.setValue('frontendOther', '');
        }
        if (skillCategory === 'uiux') {
          setShowUiuxOther(false);
          form.setValue('uiuxOther', '');
        }
        if (skillCategory === 'backend') {
          setShowBackendOther(false);
          form.setValue('backendOther', '');
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Top Navigation Bar */}
      <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Link to="/" className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-bold text-lg">
                <span>X-Recruit</span>
              </Link>
              <div className="hidden md:flex items-center space-x-6">
                <Link to="/" className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </Link>
                <Link to="/internship-application" className="flex items-center space-x-1 text-blue-600 dark:text-blue-400 font-medium">
                  <Users className="w-4 h-4" />
                  <span>Apply for Internship</span>
                </Link>
                <Link to="/about" className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <Info className="w-4 h-4" />
                  <span>About</span>
                </Link>
                <Link to="/contact" className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <Phone className="w-4 h-4" />
                  <span>Contact</span>
                </Link>
              </div>
            </div>
            <Button
              onClick={toggleTheme}
              variant="outline"
              size="icon"
              className="rounded-full border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Sun className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              )}
            </Button>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16 pt-32">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700">
              <Users className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
              <span className="text-blue-700 dark:text-blue-300 font-medium">Join Our Team</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Apply for <span className="text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Internship</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Ready to kickstart your career with X-Recruit? We're looking for passionate students 
            who want to make an impact in the future of campus recruitment technology.
          </p>
        </div>

        {/* Application Form */}
        <Card className="max-w-4xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-white/20 dark:border-gray-700/20 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl text-gray-800 dark:text-white">Internship Application Form</CardTitle>
            <p className="text-gray-600 dark:text-gray-300">Fill in your details and showcase your skills</p>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-800 dark:text-gray-200 font-semibold flex items-center">
                          <Users className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
                          Full Name
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter your full name" 
                            className="h-12 border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="collegeName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-800 dark:text-gray-200 font-semibold flex items-center">
                          <School className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
                          College/School Name
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter your college or school name" 
                            className="h-12 border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="yearOfStudy"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-800 dark:text-gray-200 font-semibold flex items-center">
                          <BookOpen className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
                          Year of Study
                        </FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                              <SelectValue placeholder="Select your year" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                            <SelectItem value="10th Std" className="text-gray-900 dark:text-gray-100">10th Std</SelectItem>
                            <SelectItem value="12th Std" className="text-gray-900 dark:text-gray-100">12th Std</SelectItem>
                            <SelectItem value="1st Year" className="text-gray-900 dark:text-gray-100">1st Year</SelectItem>
                            <SelectItem value="2nd Year" className="text-gray-900 dark:text-gray-100">2nd Year</SelectItem>
                            <SelectItem value="3rd Year" className="text-gray-900 dark:text-gray-100">3rd Year</SelectItem>
                            <SelectItem value="Final Year" className="text-gray-900 dark:text-gray-100">Final Year</SelectItem>
                            <SelectItem value="Others" className="text-gray-900 dark:text-gray-100">Others</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="department"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-800 dark:text-gray-200 font-semibold">Department</FormLabel>
                        <Select onValueChange={(value) => {
                          field.onChange(value);
                          setShowCustomDepartment(value === 'Others');
                        }} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                              <SelectValue placeholder="Select your department" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                            <SelectItem value="CSE" className="text-gray-900 dark:text-gray-100">CSE</SelectItem>
                            <SelectItem value="IT" className="text-gray-900 dark:text-gray-100">IT</SelectItem>
                            <SelectItem value="ECE" className="text-gray-900 dark:text-gray-100">ECE</SelectItem>
                            <SelectItem value="EEE" className="text-gray-900 dark:text-gray-100">EEE</SelectItem>
                            <SelectItem value="MECH" className="text-gray-900 dark:text-gray-100">MECH</SelectItem>
                            <SelectItem value="CIVIL" className="text-gray-900 dark:text-gray-100">CIVIL</SelectItem>
                            <SelectItem value="Others" className="text-gray-900 dark:text-gray-100">Others</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {showCustomDepartment && (
                    <FormField
                      control={form.control}
                      name="customDepartment"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-800 dark:text-gray-200 font-semibold">Custom Department</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter your department" 
                              className="h-12 border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="mobileNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-800 dark:text-gray-200 font-semibold flex items-center">
                          <Smartphone className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
                          Mobile Number
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter 10-digit mobile number" 
                            type="tel"
                            className="h-12 border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gmailId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-800 dark:text-gray-200 font-semibold flex items-center">
                          <Mail className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
                          Gmail ID
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="yourname@gmail.com" 
                            type="email"
                            className="h-12 border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="linkedinProfile"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-800 dark:text-gray-200 font-semibold flex items-center">
                          <Linkedin className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
                          LinkedIn Profile (Optional)
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="https://linkedin.com/in/yourprofile" 
                            type="url"
                            className="h-12 border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="githubId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-800 dark:text-gray-200 font-semibold flex items-center">
                          <Github className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
                          GitHub ID (Optional)
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="https://github.com/yourusername" 
                            type="url"
                            className="h-12 border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Why Internship */}
                <FormField
                  control={form.control}
                  name="whyInternship"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-800 dark:text-gray-200 font-semibold flex items-center">
                        <MessageCircle className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
                        Why do you want this internship?
                      </FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about your motivation, goals, and what you hope to achieve..." 
                          className="resize-none min-h-[120px] border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Skills Section */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center">
                    <Code className="mr-2 h-5 w-5 text-blue-600 dark:text-blue-400" />
                    Technical Skills
                  </h3>

                  {/* Frontend Skills */}
                  <Card className="p-4 bg-blue-50/50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                      <Palette className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
                      Frontend
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {['React', 'Angular', 'Others'].map((skill) => (
                        <div key={skill} className="flex items-center space-x-2">
                          <Checkbox 
                            checked={(form.watch('frontend') || []).includes(skill)}
                            onCheckedChange={(checked) => handleSkillChange(skill, 'frontend', !!checked)}
                          />
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill}</label>
                        </div>
                      ))}
                    </div>
                    {showFrontendOther && (
                      <FormField
                        control={form.control}
                        name="frontendOther"
                        render={({ field }) => (
                          <FormItem className="mt-3">
                            <FormControl>
                              <Input 
                                placeholder="Specify other frontend skills" 
                                className="h-10 border border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" 
                                {...field} 
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    )}
                  </Card>

                  {/* UI/UX Skills */}
                  <Card className="p-4 bg-purple-50/50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                      <Palette className="mr-2 h-4 w-4 text-purple-600 dark:text-purple-400" />
                      UI/UX Design
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {['Figma', 'Balsamiq', 'Others'].map((skill) => (
                        <div key={skill} className="flex items-center space-x-2">
                          <Checkbox 
                            checked={(form.watch('uiux') || []).includes(skill)}
                            onCheckedChange={(checked) => handleSkillChange(skill, 'uiux', !!checked)}
                          />
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill}</label>
                        </div>
                      ))}
                    </div>
                    {showUiuxOther && (
                      <FormField
                        control={form.control}
                        name="uiuxOther"
                        render={({ field }) => (
                          <FormItem className="mt-3">
                            <FormControl>
                              <Input 
                                placeholder="Specify other UI/UX tools" 
                                className="h-10 border border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" 
                                {...field} 
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    )}
                  </Card>

                  {/* Backend Skills */}
                  <Card className="p-4 bg-green-50/50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                      <Database className="mr-2 h-4 w-4 text-green-600 dark:text-green-400" />
                      Backend
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {['MongoDB', 'Others'].map((skill) => (
                        <div key={skill} className="flex items-center space-x-2">
                          <Checkbox 
                            checked={(form.watch('backend') || []).includes(skill)}
                            onCheckedChange={(checked) => handleSkillChange(skill, 'backend', !!checked)}
                          />
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill}</label>
                        </div>
                      ))}
                    </div>
                    {showBackendOther && (
                      <FormField
                        control={form.control}
                        name="backendOther"
                        render={({ field }) => (
                          <FormItem className="mt-3">
                            <FormControl>
                              <Input 
                                placeholder="Specify other backend technologies" 
                                className="h-10 border border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" 
                                {...field} 
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    )}
                  </Card>

                  {/* Full Stack Skills */}
                  <Card className="p-4 bg-orange-50/50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                      <Layers className="mr-2 h-4 w-4 text-orange-600 dark:text-orange-400" />
                      Full Stack Track
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {['MERN', 'MEAN'].map((skill) => (
                        <div key={skill} className="flex items-center space-x-2">
                          <Checkbox 
                            checked={(form.watch('fullStack') || []).includes(skill)}
                            onCheckedChange={(checked) => handleSkillChange(skill, 'fullStack', !!checked)}
                          />
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill}</label>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <Button 
                    type="submit" 
                    className="w-full h-14 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold text-lg rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Submitting Application...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        Apply Now
                        <Send size={18} className="ml-2" />
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InternshipApplication;
