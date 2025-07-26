
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send, Users, BookOpen, Smartphone, Mail, MessageCircle, Code, Palette, Database, Layers } from 'lucide-react';
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

// Define form schema using Zod
const formSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters' }),
  yearOfStudy: z.string().min(1, { message: 'Please select your year of study' }),
  department: z.string().min(1, { message: 'Please select your department' }),
  customDepartment: z.string().optional(),
  mobileNumber: z.string().regex(/^\d{10}$/, { message: 'Mobile number must be exactly 10 digits' }),
  gmailId: z.string().regex(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, { message: 'Please enter a valid Gmail address' }),
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

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      yearOfStudy: '',
      department: '',
      customDepartment: '',
      mobileNumber: '',
      gmailId: '',
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 border border-blue-200 mb-6">
            <Users className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-blue-700 font-medium">Join Our Team</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Apply for <span className="text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Internship</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Ready to kickstart your career with X-Recruit? We're looking for passionate students 
            who want to make an impact in the future of campus recruitment technology.
          </p>
        </div>

        {/* Application Form */}
        <Card className="max-w-4xl mx-auto bg-white/80 backdrop-blur-lg border border-white/20 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl text-gray-800">Internship Application Form</CardTitle>
            <p className="text-gray-600">Fill in your details and showcase your skills</p>
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
                        <FormLabel className="text-gray-800 font-semibold flex items-center">
                          <Users className="mr-2 h-4 w-4 text-blue-600" />
                          Full Name
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter your full name" 
                            className="h-12 border-2 border-gray-200 focus:border-blue-500 rounded-lg" 
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
                        <FormLabel className="text-gray-800 font-semibold flex items-center">
                          <BookOpen className="mr-2 h-4 w-4 text-blue-600" />
                          Year of Study
                        </FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-blue-500 rounded-lg">
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
                        <FormLabel className="text-gray-800 font-semibold">Department</FormLabel>
                        <Select onValueChange={(value) => {
                          field.onChange(value);
                          setShowCustomDepartment(value === 'Others');
                        }} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-blue-500 rounded-lg">
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
                          <FormLabel className="text-gray-800 font-semibold">Custom Department</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter your department" 
                              className="h-12 border-2 border-gray-200 focus:border-blue-500 rounded-lg" 
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
                        <FormLabel className="text-gray-800 font-semibold flex items-center">
                          <Smartphone className="mr-2 h-4 w-4 text-blue-600" />
                          Mobile Number
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter 10-digit mobile number" 
                            type="tel"
                            className="h-12 border-2 border-gray-200 focus:border-blue-500 rounded-lg" 
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
                        <FormLabel className="text-gray-800 font-semibold flex items-center">
                          <Mail className="mr-2 h-4 w-4 text-blue-600" />
                          Gmail ID
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="yourname@gmail.com" 
                            type="email"
                            className="h-12 border-2 border-gray-200 focus:border-blue-500 rounded-lg" 
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
                      <FormLabel className="text-gray-800 font-semibold flex items-center">
                        <MessageCircle className="mr-2 h-4 w-4 text-blue-600" />
                        Why do you want this internship?
                      </FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about your motivation, goals, and what you hope to achieve..." 
                          className="resize-none min-h-[120px] border-2 border-gray-200 focus:border-blue-500 rounded-lg" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Skills Section */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                    <Code className="mr-2 h-5 w-5 text-blue-600" />
                    Technical Skills
                  </h3>

                  {/* Frontend Skills */}
                  <Card className="p-4 bg-blue-50/50">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <Palette className="mr-2 h-4 w-4 text-blue-600" />
                      Frontend
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {['React', 'Angular', 'Others'].map((skill) => (
                        <div key={skill} className="flex items-center space-x-2">
                          <Checkbox 
                            checked={(form.watch('frontend') || []).includes(skill)}
                            onCheckedChange={(checked) => handleSkillChange(skill, 'frontend', !!checked)}
                          />
                          <label className="text-sm font-medium text-gray-700">{skill}</label>
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
                                className="h-10 border border-gray-200 focus:border-blue-500 rounded-lg" 
                                {...field} 
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    )}
                  </Card>

                  {/* UI/UX Skills */}
                  <Card className="p-4 bg-purple-50/50">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <Palette className="mr-2 h-4 w-4 text-purple-600" />
                      UI/UX Design
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {['Figma', 'Balsamiq', 'Others'].map((skill) => (
                        <div key={skill} className="flex items-center space-x-2">
                          <Checkbox 
                            checked={(form.watch('uiux') || []).includes(skill)}
                            onCheckedChange={(checked) => handleSkillChange(skill, 'uiux', !!checked)}
                          />
                          <label className="text-sm font-medium text-gray-700">{skill}</label>
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
                                className="h-10 border border-gray-200 focus:border-blue-500 rounded-lg" 
                                {...field} 
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    )}
                  </Card>

                  {/* Backend Skills */}
                  <Card className="p-4 bg-green-50/50">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <Database className="mr-2 h-4 w-4 text-green-600" />
                      Backend
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {['MongoDB', 'PostgreSQL', 'Others'].map((skill) => (
                        <div key={skill} className="flex items-center space-x-2">
                          <Checkbox 
                            checked={(form.watch('backend') || []).includes(skill)}
                            onCheckedChange={(checked) => handleSkillChange(skill, 'backend', !!checked)}
                          />
                          <label className="text-sm font-medium text-gray-700">{skill}</label>
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
                                className="h-10 border border-gray-200 focus:border-blue-500 rounded-lg" 
                                {...field} 
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    )}
                  </Card>

                  {/* Full Stack Skills */}
                  <Card className="p-4 bg-orange-50/50">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <Layers className="mr-2 h-4 w-4 text-orange-600" />
                      Full Stack Track (Optional)
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {['MERN', 'MEAN'].map((skill) => (
                        <div key={skill} className="flex items-center space-x-2">
                          <Checkbox 
                            checked={(form.watch('fullStack') || []).includes(skill)}
                            onCheckedChange={(checked) => handleSkillChange(skill, 'fullStack', !!checked)}
                          />
                          <label className="text-sm font-medium text-gray-700">{skill}</label>
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
