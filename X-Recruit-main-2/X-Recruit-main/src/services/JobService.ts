import { api } from './api';

export interface Job {
  id: number;
  recruiterId: number;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'internship' | 'contract' | 'remote';
  description: string;
  requirements: string;
  skills: string;
  salary: string;
  experience: 'entry-level' | 'mid-level' | 'senior-level';
  applicationDeadline: string;
  status: 'active' | 'paused' | 'closed';
  createdAt: string;
  updatedAt: string;
}

export interface Applicant {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  appliedAt: string;
}

export const getJobs = async (): Promise<Job[]> => {
  const response = await api.get('/jobs');
  return response.data.data.jobs;
};

export const getJob = async (id: string): Promise<Job> => {
  const response = await api.get(`/jobs/${id}`);
  return response.data.data.job;
};

export const createJob = async (jobData: Partial<Job>): Promise<any> => {
  const response = await api.post('/jobs', jobData);
  return response.data;
};

export const applyForJob = async (jobId: string, coverLetter: string): Promise<any> => {
  const response = await api.post(`/jobs/${jobId}/apply`, { coverLetter });
  return response.data;
};

export const getApplicants = async (jobId: string): Promise<Applicant[]> => {
  const response = await api.get(`/jobs/${jobId}/applicants`);
  return response.data.data.applicants;
};

