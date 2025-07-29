
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Send, Users, BookOpen, Smartphone, Mail, MessageCircle, Code, Palette, Database, Layers, ArrowLeft, Moon, Sun, School } from 'lucide-react';
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
  yearOfStudy: z.string().min(1, { message: 'Please select your year of study' }),
  department: z.string().min(1, { message: 'Please select your department' }),
  customDepartment: z.string().optional(),
  collegeName: z.string().min(2, { message: 'College/School name must be at least 2 characters' }),
  mobileNumber: z.string().regex(/^\d{10}$/, { message: 'Mobile number must be exactly 10 digits' }),
  gmailId: z.string().regex(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, { message: 'Please enter a valid Gmail address' }),
  whyInternship: z.string().min(10, { message: 'Please provide at least 10 characters explaining why you want this internship' }),
  nonTechnicalSkills: z.string().min(10, { message: 'Please provide at least 10 characters describing your non-technical skills' }),
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
  const navigate = useNavigate();

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      yearOfStudy: '',
      department: '',
      customDepartment: '',
      collegeName: '',
      mobileNumber: '',
      gmailId: '',
      whyInternship: '',
      nonTechnicalSkills: '',
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
      // Example: Microsoft Power Automate Flow URL or other Excel integration
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
          description: "We'll get back to you soon.",
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
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'}`}>
      <div className="container mx-auto px-4 py-16">
        {/* Header Section with Back Button and Dark Mode Toggle */}
        <div className="text-center mb-12">
          <div className="flex justify-between items-center mb-6">
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className={`flex items-center gap-2 ${theme === 'dark' ? 'bg-gray-800 text-white border-gray-600 hover:bg-gray-700' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
            
            <Button
              onClick={toggleTheme}
              variant="outline"
              size="icon"
              className={`${theme === 'dark' ? 'bg-gray-800 text-white border-gray-600 hover:bg-gray-700' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
          </div>

          <div className={`inline-flex items-center px-4 py-2 rounded-full border mb-6 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-blue-100 border-blue-200'}`}>
            <Users className={`w-5 h-5 mr-2 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
            <span className={`font-medium ${theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}`}>Join Our Team</span>
          </div>
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Apply for <span className="text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Internship</span>
          </h1>
          <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Ready to kickstart your career with X-Recruit? We're looking for passionate students 
            who want to make an impact in the future of campus recruitment technology.
          </p>
        </div>

        {/* Application Form */}
        <Card className={`max-w-4xl mx-auto backdrop-blur-lg border shadow-2xl ${theme === 'dark' ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-white/20'}`}>
          <CardHeader className="text-center pb-6">
            <CardTitle className={`text-2xl ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Internship Application Form</CardTitle>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Fill in your details and showcase your skills</p>
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
                        <FormLabel className={`font-semibold flex items-center ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                          <Users className={`mr-2 h-4 w-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                          Full Name
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter your full name" 
                            className={`h-12 border-2 rounded-lg ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' : 'border-gray-200 focus:border-blue-500'}`}
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
                        <FormLabel className={`font-semibold flex items-center ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                          <BookOpen className={`mr-2 h-4 w-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                          Year of Study
                        </FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className={`h-12 border-2 rounded-lg ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' : 'border-gray-200 focus:border-blue-500'}`}>
                              <SelectValue placeholder="Select your year" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1st Year">1st Year</SelectItem>
                            <SelectItem value="2nd Year">2nd Year</SelectItem>
                            <SelectItem value="3rd Year">3rd Year</SelectItem>
                            <SelectItem value="Final Year">Final Year</SelectItem>
                            <SelectItem value="Others">Others</SelectItem>
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
                        <FormLabel className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Department</FormLabel>
                        <Select onValueChange={(value) => {
                          field.onChange(value);
                          setShowCustomDepartment(value === 'Others');
                        }} value={field.value}>
                          <FormControl>
                            <SelectTrigger className={`h-12 border-2 rounded-lg ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' : 'border-gray-200 focus:border-blue-500'}`}>
                              <SelectValue placeholder="Select your department" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="CSE">CSE</SelectItem>
                            <SelectItem value="IT">IT</SelectItem>
                            <SelectItem value="ECE">ECE</SelectItem>
                            <SelectItem value="EEE">EEE</SelectItem>
                            <SelectItem value="MECH">MECH</SelectItem>
                            <SelectItem value="CIVIL">CIVIL</SelectItem>
                            <SelectItem value="Others">Others</SelectItem>
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
                          <FormLabel className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Custom Department</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter your department" 
                              className={`h-12 border-2 rounded-lg ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' : 'border-gray-200 focus:border-blue-500'}`}
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
                    name="collegeName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={`font-semibold flex items-center ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                          <School className={`mr-2 h-4 w-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                          College/School Name
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter your college or school name" 
                            className={`h-12 border-2 rounded-lg ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' : 'border-gray-200 focus:border-blue-500'}`}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="mobileNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={`font-semibold flex items-center ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                          <Smartphone className={`mr-2 h-4 w-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                          Mobile Number
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter 10-digit mobile number" 
                            type="tel"
                            className={`h-12 border-2 rounded-lg ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' : 'border-gray-200 focus:border-blue-500'}`}
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
                        <FormLabel className={`font-semibold flex items-center ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                          <Mail className={`mr-2 h-4 w-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                          Gmail ID
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="yourname@gmail.com" 
                            type="email"
                            className={`h-12 border-2 rounded-lg ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' : 'border-gray-200 focus:border-blue-500'}`}
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
                      <FormLabel className={`font-semibold flex items-center ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                        <MessageCircle className={`mr-2 h-4 w-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                        Why do you want this internship?
                      </FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about your motivation, goals, and what you hope to achieve..." 
                          className={`resize-none min-h-[120px] border-2 rounded-lg ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' : 'border-gray-200 focus:border-blue-500'}`}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Non Technical Skills */}
                <FormField
                  control={form.control}
                  name="nonTechnicalSkills"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={`font-semibold flex items-center ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                        <Users className={`mr-2 h-4 w-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                        Non Technical Skills
                      </FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your non-technical skills like communication, leadership, teamwork, problem-solving, etc..." 
                          className={`resize-none min-h-[120px] border-2 rounded-lg ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' : 'border-gray-200 focus:border-blue-500'}`}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Skills Section */}
                <div className="space-y-6">
                  <h3 className={`text-xl font-semibold flex items-center ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                    <Code className={`mr-2 h-5 w-5 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                    Technical Skills
                  </h3>

                  {/* Frontend Skills */}
                  <Card className={`p-4 ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-blue-50/50'}`}>
                    <h4 className={`font-semibold mb-3 flex items-center ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                      <Palette className={`mr-2 h-4 w-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                      Frontend
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {['React', 'Angular', 'Others'].map((skill) => (
                        <div key={skill} className="flex items-center space-x-2">
                          <Checkbox 
                            checked={(form.watch('frontend') || []).includes(skill)}
                            onCheckedChange={(checked) => handleSkillChange(skill, 'frontend', !!checked)}
                          />
                          <label className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{skill}</label>
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
                                className={`h-10 border rounded-lg ${theme === 'dark' ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400 focus:border-blue-500' : 'border-gray-200 focus:border-blue-500'}`}
                                {...field} 
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    )}
                  </Card>

                  {/* UI/UX Skills */}
                  <Card className={`p-4 ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-purple-50/50'}`}>
                    <h4 className={`font-semibold mb-3 flex items-center ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                      <Palette className={`mr-2 h-4 w-4 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
                      UI/UX Design
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {['Figma', 'Balsamiq', 'Others'].map((skill) => (
                        <div key={skill} className="flex items-center space-x-2">
                          <Checkbox 
                            checked={(form.watch('uiux') || []).includes(skill)}
                            onCheckedChange={(checked) => handleSkillChange(skill, 'uiux', !!checked)}
                          />
                          <label className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{skill}</label>
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
                                className={`h-10 border rounded-lg ${theme === 'dark' ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400 focus:border-blue-500' : 'border-gray-200 focus:border-blue-500'}`}
                                {...field} 
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    )}
                  </Card>

                  {/* Backend Skills */}
                  <Card className={`p-4 ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-green-50/50'}`}>
                    <h4 className={`font-semibold mb-3 flex items-center ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                      <Database className={`mr-2 h-4 w-4 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} />
                      Backend
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {['MongoDB', 'PostgreSQL', 'Others'].map((skill) => (
                        <div key={skill} className="flex items-center space-x-2">
                          <Checkbox 
                            checked={(form.watch('backend') || []).includes(skill)}
                            onCheckedChange={(checked) => handleSkillChange(skill, 'backend', !!checked)}
                          />
                          <label className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{skill}</label>
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
                                className={`h-10 border rounded-lg ${theme === 'dark' ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400 focus:border-blue-500' : 'border-gray-200 focus:border-blue-500'}`}
                                {...field} 
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    )}
                  </Card>

                  {/* Full Stack Skills */}
                  <Card className={`p-4 ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-orange-50/50'}`}>
                    <h4 className={`font-semibold mb-3 flex items-center ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                      <Layers className={`mr-2 h-4 w-4 ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`} />
                      Full Stack Track (Optional)
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {['MERN', 'MEAN'].map((skill) => (
                        <div key={skill} className="flex items-center space-x-2">
                          <Checkbox 
                            checked={(form.watch('fullStack') || []).includes(skill)}
                            onCheckedChange={(checked) => handleSkillChange(skill, 'fullStack', !!checked)}
                          />
                          <label className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{skill}</label>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <Button 
                    type="submit" 
                    className="w-full h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-lg rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl"
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
