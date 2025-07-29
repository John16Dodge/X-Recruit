
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send, Mail, User, Phone, MessageCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().optional(),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
});

type FormValues = z.infer<typeof formSchema>;

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      console.log('Form submitted:', data);
      toast({
        title: "Message Sent Successfully! ✨",
        description: "Thank you for reaching out! We'll get back to you within 24 hours.",
      });
      form.reset();
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 dark:border-gray-700/50 hover:shadow-3xl transition-all duration-500 overflow-hidden relative">
      {/* Enhanced animated decoration circles */}
      <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-gradient-to-br from-blue-200/40 to-purple-200/40 dark:from-blue-800/20 dark:to-purple-800/20 animate-float opacity-60"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-gradient-to-br from-purple-200/40 to-pink-200/40 dark:from-purple-800/20 dark:to-pink-800/20 animate-float opacity-50" style={{ animationDelay: '1.5s' }}></div>
      
      <div className="relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 border border-blue-200/50 dark:border-blue-700/50 mb-4">
            <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400 mr-2" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Let's Connect</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Get in Touch
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Ready to transform your career journey? Send us a message!
          </p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-gray-800 dark:text-gray-200 font-semibold flex items-center text-sm">
                      <User className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
                      <span>Full Name</span>
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your full name" 
                        className="h-12 border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-500 bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-gray-800 dark:text-gray-200 font-semibold flex items-center text-sm">
                      <Mail className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
                      <span>Email Address</span>
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your email address" 
                        className="h-12 border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-500 bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-gray-800 dark:text-gray-200 font-semibold flex items-center text-sm">
                    <Phone className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <span>Phone Number (Optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter your phone number" 
                      className="h-12 border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-500 bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-gray-800 dark:text-gray-200 font-semibold flex items-center text-sm">
                    <MessageCircle className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <span>Your Message</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Tell us about your requirements, questions, or how we can help you..." 
                      className="resize-none min-h-[140px] border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-500 bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-lg rounded-xl transition-all duration-300 group relative overflow-hidden shadow-xl hover:shadow-2xl"
              disabled={isSubmitting}
            >
              <span className="relative z-10 flex items-center justify-center">
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending Message...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ContactForm;
