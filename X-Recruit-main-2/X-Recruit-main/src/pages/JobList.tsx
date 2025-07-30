
import React from 'react';
import { Briefcase, MapPin, Search, SlidersHorizontal, ArrowLeft, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ThemeToggle from '@/components/ui/theme-toggle';

const JobList = () => {
  const navigate = useNavigate();
  
  const jobs = [
    {
      title: 'Software Engineer',
      company: 'Innovate Inc.',
      location: 'San Francisco, CA',
      type: 'Full-time',
      tags: ['React', 'Node.js', 'TypeScript'],
    },
    {
      title: 'Product Manager',
      company: 'Creative Solutions',
      location: 'New York, NY',
      type: 'Full-time',
      tags: ['Agile', 'Roadmap', 'UX'],
    },
    {
      title: 'UX Designer',
      company: 'DesignFirst',
      location: 'Remote',
      type: 'Contract',
      tags: ['Figma', 'Sketch', 'Prototyping'],
    },
    {
      title: 'Data Scientist',
      company: 'DataDriven Co.',
      location: 'Boston, MA',
      type: 'Full-time',
      tags: ['Python', 'Machine Learning', 'SQL'],
    },
    {
      title: 'DevOps Engineer',
      company: 'CloudNine',
      location: 'Austin, TX',
      type: 'Full-time',
      tags: ['AWS', 'Kubernetes', 'CI/CD'],
    },
    {
      title: 'Marketing Specialist',
      company: 'Growth Gurus',
      location: 'Remote',
      type: 'Part-time',
      tags: ['SEO', 'Content Marketing', 'Google Analytics'],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-xr-blue-light/10 to-xr-purple-light/10 dark:from-slate-900 dark:to-slate-800 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      {/* Header Navigation */}
      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-b border-gray-200/50 dark:border-slate-700/50 sticky top-0 z-10 transition-colors duration-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-xr-blue dark:hover:text-xr-blue"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
              <div className="h-6 w-px bg-gray-300 dark:bg-slate-600"></div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Job Listings</h2>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle size="sm" variant="outline" />
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Profile
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-xr-blue to-xr-purple">
            Find Your Next Opportunity
          </h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed text-gray-600 dark:text-gray-400">
            Explore thousands of job openings and find the perfect role for you.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative w-full md:flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search by title, company, or keyword..."
              className="pl-10 h-12 text-base shadow-sm"
            />
          </div>
          <Button size="lg" className="h-12 w-full md:w-auto flex items-center gap-2 shadow-sm">
            <SlidersHorizontal className="h-5 w-5" />
            Filters
          </Button>
        </div>

        {/* Job Listings */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-lg border-white/20 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Briefcase className="h-8 w-8 text-xr-blue" />
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-gray-900">{job.title}</span>
                    <span className="text-base font-medium text-gray-500">{job.company}</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-4 text-gray-600">
                  <MapPin className="h-5 w-5" />
                  <span>{job.location}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xr-purple border-xr-purple">{job.type}</Badge>
                  {job.tags.map((tag, i) => (
                    <Badge key={i} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50/50 p-4">
                <Button className="w-full shine-effect">
                  Apply Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobList;

