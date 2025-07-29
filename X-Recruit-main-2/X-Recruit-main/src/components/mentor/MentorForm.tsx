
import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\d{10}$/, 'Please enter a valid 10-digit mobile number'),
  department: z.string().min(1, 'Please select a department'),
  mentorshipArea: z.string().min(1, 'Please select a mentorship area'),
  message: z.string().min(1, 'Message is required'),
});

type FormData = z.infer<typeof formSchema>;

interface MentorFormProps {
  onSuccess: () => void;
}

const MentorForm = ({ onSuccess }: MentorFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  });

  const departments = [
    { value: 'CSE', label: 'Computer Science (CSE)' },
    { value: 'EEE', label: 'Electrical Engineering (EEE)' },
    { value: 'ECE', label: 'Electronics (ECE)' },
    { value: 'MECH', label: 'Mechanical (MECH)' },
    { value: 'CIVIL', label: 'Civil Engineering (CIVIL)' },
    { value: 'BBA', label: 'Business Administration (BBA)' },
    { value: 'Others', label: 'Others' },
  ];

  const mentorshipAreas = [
    { value: 'Career Guidance', label: 'Career Guidance' },
    { value: 'Resume Building', label: 'Resume Building' },
    { value: 'Coding Help', label: 'Coding Help' },
    { value: 'Interview Preparation', label: 'Interview Preparation' },
    { value: 'Research Assistance', label: 'Research Assistance' },
    { value: 'Entrepreneurship Mentoring', label: 'Entrepreneurship Mentoring' },
  ];

  const onSubmit = (data: FormData) => {
    const message = `
      *Mentorship Request*
      Full Name: ${data.fullName}
      Email: ${data.email}
      Phone: +91${data.phone}
      Department: ${data.department}
      Mentorship Area: ${data.mentorshipArea}
      Message: ${data.message}
    `;
    
    const whatsappURL = `https://wa.me/+918148916824?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-4">
        <input
          {...register('fullName')}
          type="text"
          placeholder="Full Name"
          className={`w-full p-3 text-base border-2 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 transition-all duration-300 hover:-translate-y-0.5 focus:border-blue-500 dark:focus:border-blue-400 ${errors.fullName ? 'border-red-500' : 'border-gray-200'}`}
        />
        {errors.fullName && <span className="text-red-500 text-sm">{errors.fullName.message}</span>}

        <input
          {...register('email')}
          type="email"
          placeholder="Email Address"
          className={`w-full p-3 text-base border-2 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 transition-all duration-300 hover:-translate-y-0.5 focus:border-blue-500 dark:focus:border-blue-400 ${errors.email ? 'border-red-500' : 'border-gray-200'}`}
        />
        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}

        <input
          {...register('phone')}
          type="tel"
          placeholder="10-digit Mobile Number"
          className={`w-full p-3 text-base border-2 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 transition-all duration-300 hover:-translate-y-0.5 focus:border-blue-500 dark:focus:border-blue-400 ${errors.phone ? 'border-red-500' : 'border-gray-200'}`}
        />
        {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}

        <select
          {...register('department')}
          className={`w-full p-3 text-base border-2 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 transition-all duration-300 hover:-translate-y-0.5 focus:border-blue-500 dark:focus:border-blue-400 ${errors.department ? 'border-red-500' : 'border-gray-200'}`}
        >
          <option value="">Select Department</option>
          {departments.map(dept => (
            <option key={dept.value} value={dept.value}>{dept.label}</option>
          ))}
        </select>
        {errors.department && <span className="text-red-500 text-sm">{errors.department.message}</span>}

        <select
          {...register('mentorshipArea')}
          className={`w-full p-3 text-base border-2 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 transition-all duration-300 hover:-translate-y-0.5 focus:border-blue-500 dark:focus:border-blue-400 ${errors.mentorshipArea ? 'border-red-500' : 'border-gray-200'}`}
        >
          <option value="">Select Mentorship Area</option>
          {mentorshipAreas.map(area => (
            <option key={area.value} value={area.value}>{area.label}</option>
          ))}
        </select>
        {errors.mentorshipArea && <span className="text-red-500 text-sm">{errors.mentorshipArea.message}</span>}

        <textarea
          {...register('message')}
          placeholder="Describe your mentorship needs or goals"
          className={`w-full p-3 text-base border-2 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 transition-all duration-300 hover:-translate-y-0.5 focus:border-blue-500 dark:focus:border-blue-400 min-h-[100px] max-h-[200px] ${errors.message ? 'border-red-500' : 'border-gray-200'}`}
        />
        {errors.message && <span className="text-red-500 text-sm">{errors.message.message}</span>}

        <button
          type="submit"
          className="w-full p-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-red-500 hover:from-red-500 hover:to-blue-600 rounded-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default MentorForm;
