import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  collegeName: z.string().min(1, 'College name is required'),
  contactPersonName: z.string().min(1, 'Contact person name is required'),
  designation: z.string().min(1, 'Designation is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\d{10}$/, 'Please enter a valid 10-digit mobile number'),
  collegeAddress: z.string().min(1, 'College address is required'),
  collegeType: z.string().min(1, 'Please select college type'),
  departments: z.array(z.string()).min(1, 'Please select at least one department'),
  totalStudents: z.string().min(1, 'Total number of students is required'),
  batchYear: z.string().min(1, 'Please select batch year'),
  trainingType: z.string().min(1, 'Please select training type'),
  trainingDuration: z.string().min(1, 'Please select training duration'),
  preferredSchedule: z.string().min(1, 'Please select preferred schedule'),
  message: z.string().min(1, 'Message is required'),
});

type FormData = z.infer<typeof formSchema>;

interface CollegeAptitudeFormProps {
  onSuccess: () => void;
}

const CollegeAptitudeForm = ({ onSuccess }: CollegeAptitudeFormProps) => {
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  });

  const collegeTypes = [
    { value: 'Engineering College', label: 'Engineering College' },
    { value: 'Arts & Science College', label: 'Arts & Science College' },
    { value: 'Business School', label: 'Business School' },
    { value: 'University', label: 'University' },
    { value: 'Technical Institute', label: 'Technical Institute' },
    { value: 'Others', label: 'Others' },
  ];

  const departments = [
    'Computer Science (CSE)',
    'Information Technology (IT)',
    'Electrical Engineering (EEE)',
    'Electronics (ECE)',
    'Mechanical (MECH)',
    'Civil Engineering (CIVIL)',
    'Chemical Engineering',
    'Biotechnology',
    'Business Administration (BBA)',
    'Commerce',
    'Arts',
    'Science',
    'Others',
  ];

  const batchYears = [
    { value: '2024-25', label: '2024-25' },
    { value: '2025-26', label: '2025-26' },
    { value: '2026-27', label: '2026-27' },
    { value: '2027-28', label: '2027-28' },
  ];

  const trainingTypes = [
    { value: 'Aptitude Training', label: 'Aptitude Training Only' },
    { value: 'Soft Skills Training', label: 'Soft Skills Training Only' },
    { value: 'Both', label: 'Both Aptitude & Soft Skills' },
    { value: 'Campus Placement Preparation', label: 'Complete Campus Placement Preparation' },
  ];

  const trainingDurations = [
    { value: '1 week', label: '1 Week' },
    { value: '2 weeks', label: '2 Weeks' },
    { value: '1 month', label: '1 Month' },
    { value: '2 months', label: '2 Months' },
    { value: '3 months', label: '3 Months' },
    { value: 'Semester long', label: 'Semester Long' },
    { value: 'Custom', label: 'Custom Duration' },
  ];

  const scheduleOptions = [
    { value: 'Weekdays', label: 'Weekdays (Monday-Friday)' },
    { value: 'Weekends', label: 'Weekends (Saturday-Sunday)' },
    { value: 'Intensive Workshop', label: 'Intensive Workshop' },
    { value: 'Regular Classes', label: 'Regular Classes' },
    { value: 'Online', label: 'Online Training' },
    { value: 'Hybrid', label: 'Hybrid (Online + Offline)' },
  ];

  const handleDepartmentToggle = (department: string) => {
    const updatedDepartments = selectedDepartments.includes(department)
      ? selectedDepartments.filter(d => d !== department)
      : [...selectedDepartments, department];
    
    setSelectedDepartments(updatedDepartments);
    setValue('departments', updatedDepartments);
  };

  const onSubmit = (data: FormData) => {
    const message = `
      *College Aptitude & Soft Skills Training Request*
      
      College Details:
      College Name: ${data.collegeName}
      Contact Person: ${data.contactPersonName}
      Designation: ${data.designation}
      Email: ${data.email}
      Phone: +91${data.phone}
      Address: ${data.collegeAddress}
      College Type: ${data.collegeType}
      
      Training Details:
      Departments: ${data.departments.join(', ')}
      Total Students: ${data.totalStudents}
      Batch Year: ${data.batchYear}
      Training Type: ${data.trainingType}
      Duration: ${data.trainingDuration}
      Preferred Schedule: ${data.preferredSchedule}
      
      Additional Information:
      ${data.message}
    `;
    
    const whatsappURL = `https://wa.me/+918148916824?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-4">
        {/* College Information Section */}
        <div className="border-b pb-4">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">College Information</h3>
          
          <input
            {...register('collegeName')}
            type="text"
            placeholder="College/University Name"
            className={`w-full p-3 text-base border-2 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 transition-all duration-300 hover:-translate-y-0.5 focus:border-blue-500 dark:focus:border-blue-400 ${errors.collegeName ? 'border-red-500' : 'border-gray-200'}`}
          />
          {errors.collegeName && <span className="text-red-500 text-sm">{errors.collegeName.message}</span>}

          <textarea
            {...register('collegeAddress')}
            placeholder="Complete College Address"
            className={`w-full p-3 text-base border-2 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 transition-all duration-300 hover:-translate-y-0.5 focus:border-blue-500 dark:focus:border-blue-400 min-h-[80px] mt-3 ${errors.collegeAddress ? 'border-red-500' : 'border-gray-200'}`}
          />
          {errors.collegeAddress && <span className="text-red-500 text-sm">{errors.collegeAddress.message}</span>}

          <select
            {...register('collegeType')}
            className={`w-full p-3 text-base border-2 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 transition-all duration-300 hover:-translate-y-0.5 focus:border-blue-500 dark:focus:border-blue-400 mt-3 ${errors.collegeType ? 'border-red-500' : 'border-gray-200'}`}
          >
            <option value="">Select College Type</option>
            {collegeTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
          {errors.collegeType && <span className="text-red-500 text-sm">{errors.collegeType.message}</span>}
        </div>

        {/* Contact Person Section */}
        <div className="border-b pb-4">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">Contact Person Details</h3>
          
          <input
            {...register('contactPersonName')}
            type="text"
            placeholder="Contact Person Full Name"
            className={`w-full p-3 text-base border-2 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 transition-all duration-300 hover:-translate-y-0.5 focus:border-blue-500 dark:focus:border-blue-400 ${errors.contactPersonName ? 'border-red-500' : 'border-gray-200'}`}
          />
          {errors.contactPersonName && <span className="text-red-500 text-sm">{errors.contactPersonName.message}</span>}

          <input
            {...register('designation')}
            type="text"
            placeholder="Designation/Position"
            className={`w-full p-3 text-base border-2 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 transition-all duration-300 hover:-translate-y-0.5 focus:border-blue-500 dark:focus:border-blue-400 mt-3 ${errors.designation ? 'border-red-500' : 'border-gray-200'}`}
          />
          {errors.designation && <span className="text-red-500 text-sm">{errors.designation.message}</span>}

          <input
            {...register('email')}
            type="email"
            placeholder="Official Email Address"
            className={`w-full p-3 text-base border-2 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 transition-all duration-300 hover:-translate-y-0.5 focus:border-blue-500 dark:focus:border-blue-400 mt-3 ${errors.email ? 'border-red-500' : 'border-gray-200'}`}
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}

          <input
            {...register('phone')}
            type="tel"
            placeholder="10-digit Mobile Number"
            className={`w-full p-3 text-base border-2 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 transition-all duration-300 hover:-translate-y-0.5 focus:border-blue-500 dark:focus:border-blue-400 mt-3 ${errors.phone ? 'border-red-500' : 'border-gray-200'}`}
          />
          {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}
        </div>

        {/* Training Requirements Section */}
        <div className="border-b pb-4">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">Training Requirements</h3>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Select Departments (Choose all that apply):
            </label>
            <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-3">
              {departments.map(department => (
                <label key={department} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedDepartments.includes(department)}
                    onChange={() => handleDepartmentToggle(department)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{department}</span>
                </label>
              ))}
            </div>
            {errors.departments && <span className="text-red-500 text-sm">{errors.departments.message}</span>}
          </div>

          <input
            {...register('totalStudents')}
            type="number"
            placeholder="Total Number of Students for Training"
            className={`w-full p-3 text-base border-2 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 transition-all duration-300 hover:-translate-y-0.5 focus:border-blue-500 dark:focus:border-blue-400 mt-3 ${errors.totalStudents ? 'border-red-500' : 'border-gray-200'}`}
          />
          {errors.totalStudents && <span className="text-red-500 text-sm">{errors.totalStudents.message}</span>}

          <select
            {...register('batchYear')}
            className={`w-full p-3 text-base border-2 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 transition-all duration-300 hover:-translate-y-0.5 focus:border-blue-500 dark:focus:border-blue-400 mt-3 ${errors.batchYear ? 'border-red-500' : 'border-gray-200'}`}
          >
            <option value="">Select Batch Year</option>
            {batchYears.map(year => (
              <option key={year.value} value={year.value}>{year.label}</option>
            ))}
          </select>
          {errors.batchYear && <span className="text-red-500 text-sm">{errors.batchYear.message}</span>}

          <select
            {...register('trainingType')}
            className={`w-full p-3 text-base border-2 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 transition-all duration-300 hover:-translate-y-0.5 focus:border-blue-500 dark:focus:border-blue-400 mt-3 ${errors.trainingType ? 'border-red-500' : 'border-gray-200'}`}
          >
            <option value="">Select Training Type</option>
            {trainingTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
          {errors.trainingType && <span className="text-red-500 text-sm">{errors.trainingType.message}</span>}

          <select
            {...register('trainingDuration')}
            className={`w-full p-3 text-base border-2 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 transition-all duration-300 hover:-translate-y-0.5 focus:border-blue-500 dark:focus:border-blue-400 mt-3 ${errors.trainingDuration ? 'border-red-500' : 'border-gray-200'}`}
          >
            <option value="">Select Training Duration</option>
            {trainingDurations.map(duration => (
              <option key={duration.value} value={duration.value}>{duration.label}</option>
            ))}
          </select>
          {errors.trainingDuration && <span className="text-red-500 text-sm">{errors.trainingDuration.message}</span>}

          <select
            {...register('preferredSchedule')}
            className={`w-full p-3 text-base border-2 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 transition-all duration-300 hover:-translate-y-0.5 focus:border-blue-500 dark:focus:border-blue-400 mt-3 ${errors.preferredSchedule ? 'border-red-500' : 'border-gray-200'}`}
          >
            <option value="">Select Preferred Schedule</option>
            {scheduleOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          {errors.preferredSchedule && <span className="text-red-500 text-sm">{errors.preferredSchedule.message}</span>}
        </div>

        <textarea
          {...register('message')}
          placeholder="Additional requirements, specific goals, or any other information you'd like to share"
          className={`w-full p-3 text-base border-2 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 transition-all duration-300 hover:-translate-y-0.5 focus:border-blue-500 dark:focus:border-blue-400 min-h-[100px] max-h-[200px] ${errors.message ? 'border-red-500' : 'border-gray-200'}`}
        />
        {errors.message && <span className="text-red-500 text-sm">{errors.message.message}</span>}

        <button
          type="submit"
          className="w-full p-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-red-500 hover:from-red-500 hover:to-blue-600 rounded-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Submit College Training Request
        </button>
      </div>
    </form>
  );
};

export default CollegeAptitudeForm;