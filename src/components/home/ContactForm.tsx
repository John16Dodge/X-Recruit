
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send, Mail, User, Phone, MessageCircle } from 'lucide-react';
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
    
    try {
      // Format WhatsApp message
      const whatsappMessage = encodeURIComponent(
        `*New Contact Form Message*\n\n` +
        `*Name:* ${data.name}\n` +
        `*Email:* ${data.email}\n` +
        `*Phone:* ${data.phone || 'Not provided'}\n\n` +
        `*Message:*\n${data.message}`
      );
      
      // WhatsApp API URL
      const whatsappUrl = `https://wa.me/918148916824?text=${whatsappMessage}`;
      
      // Open WhatsApp in new tab
      window.open(whatsappUrl, '_blank');
      
      // Simulate email notification (in a real app, this would be a backend API call)
      console.log('Email notification would be sent to: xrecruitofficial@gmail.com');
      console.log('Email content:', {
        to: 'xrecruitofficial@gmail.com',
        subject: `Contact Form: Message from ${data.name}`,
        body: `
          Name: ${data.name}
          Email: ${data.email}
          Phone: ${data.phone || 'Not provided'}
          Message: ${data.message}
        `
      });
      
      toast({
        title: "Message Sent",
        description: "Thank you! Your message has been forwarded to our team.",
      });
      
      form.reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-white/80 to-blue-50/80 backdrop-blur-sm rounded-2xl p-8 shadow-glass border border-white/20 hover:shadow-card-hover transition-all duration-500 overflow-hidden relative">
      {/* Animated decoration circles */}
      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-blue-100/30 animate-float opacity-70"></div>
      <div className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full bg-xr-purple-light/30 animate-float opacity-60" style={{ animationDelay: '1.5s' }}></div>
      
      <div className="relative z-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gradient animate-fade-in">Get in Touch</h2>
        <p className="text-xr-gray mb-6 animate-fade-in animate-delay-100">
          Have a question? Reach out to us and we'll be happy to help.
        </p>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 animate-fade-in animate-delay-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-2 animate-fade-in animate-delay-100">
                    <FormLabel className="text-xr-gray-dark flex items-center">
                      <User className="mr-1.5 h-4 w-4 text-xr-blue" />
                      <span>Name</span>
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Your name" 
                        className="focus:border-xr-blue transition-all duration-300 hover:border-xr-blue-light" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-2 animate-fade-in animate-delay-200">
                    <FormLabel className="text-xr-gray-dark flex items-center">
                      <Mail className="mr-1.5 h-4 w-4 text-xr-blue" />
                      <span>Email</span>
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Your email address" 
                        className="focus:border-xr-blue transition-all duration-300 hover:border-xr-blue-light" 
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
              name="phone"
              render={({ field }) => (
                <FormItem className="space-y-2 animate-fade-in animate-delay-300">
                  <FormLabel className="text-xr-gray-dark flex items-center">
                    <Phone className="mr-1.5 h-4 w-4 text-xr-blue" />
                    <span>Phone (Optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Your phone number" 
                      className="focus:border-xr-blue transition-all duration-300 hover:border-xr-blue-light" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="space-y-2 animate-fade-in animate-delay-400">
                  <FormLabel className="text-xr-gray-dark flex items-center">
                    <MessageCircle className="mr-1.5 h-4 w-4 text-xr-blue" />
                    <span>Message</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Your message here..." 
                      className="resize-none min-h-[120px] focus:border-xr-blue transition-all duration-300 hover:border-xr-blue-light" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full bg-xr-blue hover:bg-xr-blue-dark transition-all duration-300 group animate-fade-in animate-delay-500 relative overflow-hidden"
              disabled={isSubmitting}
            >
              <span className="relative z-10 flex items-center justify-center">
                {isSubmitting ? 'Sending...' : 'Send Message'}
                <Send size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-xr-blue to-xr-purple opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ContactForm;
