import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\d{10}$/, 'Please enter a valid 10-digit mobile number'),
  department: z.string().min(1, 'Please select a department'),
  currentYear: z.string().min(1, 'Please select your current year'),
  trainingType: z.string().min(1, 'Please select training type'),
  skillAreas: z.array(z.string()).min(1, 'Please select at least one skill area'),
  experience: z.string().min(1, 'Please select your experience level'),
  message: z.string().min(1, 'Message is required'),
});

type FormData = z.infer<typeof formSchema>;

interface AptitudeFormProps {
  onSuccess: () => void;
}

const AptitudeForm = ({ onSuccess }: AptitudeFormProps) => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>({
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

  const academicYears = [
    { value: '1st Year', label: '1st Year' },
    { value: '2nd Year', label: '2nd Year' },
    { value: '3rd Year', label: '3rd Year' },
    { value: '4th Year', label: '4th Year' },
    { value: 'Graduate', label: 'Graduate' },
  ];

  const trainingTypes = [
    { value: 'Aptitude Training', label: 'Aptitude Training' },
    { value: 'Soft Skills Training', label: 'Soft Skills Training' },
    { value: 'Both', label: 'Both Aptitude & Soft Skills' },
  ];

  const skillAreas = [
    'Quantitative Aptitude',
    'Logical Reasoning',
    'Verbal Ability',
    'Communication Skills',
    'Leadership Skills',
    'Team Building',
    'Time Management',
    'Problem Solving',
    'Critical Thinking',
    'Presentation Skills',
    'Interview Skills',
    'Group Discussion',
  ];

  const experienceLevels = [
    { value: 'Beginner', label: 'Beginner' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'Advanced', label: 'Advanced' },
  ];

  const handleSkillToggle = (skill: string) => {
    const updatedSkills = selectedSkills.includes(skill)
      ? selectedSkills.filter(s => s !== skill)
      : [...selectedSkills, skill];
    
    setSelectedSkills(updatedSkills);
    setValue('skillAreas', updatedSkills);
  };

  const onSubmit = (data: FormData) => {
    const message = `
      *Aptitude & Soft Skills Training Request*
      Full Name: ${data.fullName}
      Email: ${data.email}
      Phone: +91${data.phone}
      Department: ${data.department}
      Current Year: ${data.currentYear}
      Training Type: ${data.trainingType}
      Skill Areas: ${data.skillAreas.join(', ')}
      Experience Level: ${data.experience}
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
          {...register('currentYear')}
          className={`w-full p-3 text-base border-2 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 transition-all duration-300 hover:-translate-y-0.5 focus:border-blue-500 dark:focus:border-blue-400 ${errors.currentYear ? 'border-red-500' : 'border-gray-200'}`}
        >
          <option value="">Select Current Year</option>
          {academicYears.map(year => (
            <option key={year.value} value={year.value}>{year.label}</option>
          ))}
        </select>
        {errors.currentYear && <span className="text-red-500 text-sm">{errors.currentYear.message}</span>}

        <select
          {...register('trainingType')}
          className={`w-full p-3 text-base border-2 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 transition-all duration-300 hover:-translate-y-0.5 focus:border-blue-500 dark:focus:border-blue-400 ${errors.trainingType ? 'border-red-500' : 'border-gray-200'}`}
        >
          <option value="">Select Training Type</option>
          {trainingTypes.map(type => (
            <option key={type.value} value={type.value}>{type.label}</option>
          ))}
        </select>
        {errors.trainingType && <span className="text-red-500 text-sm">{errors.trainingType.message}</span>}

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Select Skills You Want to Improve:
          </label>
          <div className="grid grid-cols-2 gap-2">
            {skillAreas.map(skill => (
              <label key={skill} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedSkills.includes(skill)}
                  onChange={() => handleSkillToggle(skill)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">{skill}</span>
              </label>
            ))}
          </div>
          {errors.skillAreas && <span className="text-red-500 text-sm">{errors.skillAreas.message}</span>}
        </div>

        <select
          {...register('experience')}
          className={`w-full p-3 text-base border-2 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 transition-all duration-300 hover:-translate-y-0.5 focus:border-blue-500 dark:focus:border-blue-400 ${errors.experience ? 'border-red-500' : 'border-gray-200'}`}
        >
          <option value="">Select Experience Level</option>
          {experienceLevels.map(level => (
            <option key={level.value} value={level.value}>{level.label}</option>
          ))}
        </select>
        {errors.experience && <span className="text-red-500 text-sm">{errors.experience.message}</span>}

        <textarea
          {...register('message')}
          placeholder="Tell us about your goals and what you hope to achieve from this training"
          className={`w-full p-3 text-base border-2 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 transition-all duration-300 hover:-translate-y-0.5 focus:border-blue-500 dark:focus:border-blue-400 min-h-[100px] max-h-[200px] ${errors.message ? 'border-red-500' : 'border-gray-200'}`}
        />
        {errors.message && <span className="text-red-500 text-sm">{errors.message.message}</span>}

        <button
          type="submit"
          className="w-full p-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-red-500 hover:from-red-500 hover:to-blue-600 rounded-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Submit Training Request
        </button>
      </div>
    </form>
  );
};

export default AptitudeForm;