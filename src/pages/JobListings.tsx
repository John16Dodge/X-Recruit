import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  DollarSign, 
  Building, 
  Users, 
  Star,
  Bookmark,
  Share2,
  Eye
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  experience: string;
  postedDate: string;
  description: string;
  requirements: string[];
  benefits: string[];
  skills: string[];
  isRemote: boolean;
  isFeatured: boolean;
  companyLogo?: string;
  rating: number;
  applicants: number;
}

const JobListings: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [experienceFilter, setExperienceFilter] = useState('');
  const [sortBy, setSortBy] = useState('recent');

  // Sample job data
  useEffect(() => {
    const sampleJobs: Job[] = [
      {
        id: '1',
        title: 'Senior React Developer',
        company: 'TechCorp Inc.',
        location: 'San Francisco, CA',
        type: 'Full-time',
        salary: { min: 120000, max: 180000, currency: 'USD' },
        experience: '3-5 years',
        postedDate: '2 days ago',
        description: 'We are looking for a passionate Senior React Developer to join our team and help build amazing user experiences.',
        requirements: [
          '3+ years of React experience',
          'Strong JavaScript/TypeScript skills',
          'Experience with Redux or Context API',
          'Knowledge of modern build tools'
        ],
        benefits: [
          'Health insurance',
          '401k matching',
          'Flexible work hours',
          'Remote work options'
        ],
        skills: ['React', 'JavaScript', 'TypeScript', 'Redux', 'Node.js'],
        isRemote: true,
        isFeatured: true,
        rating: 4.5,
        applicants: 24
      },
      {
        id: '2',
        title: 'Frontend Developer Intern',
        company: 'StartupXYZ',
        location: 'New York, NY',
        type: 'Internship',
        salary: { min: 25, max: 35, currency: 'USD' },
        experience: '0-1 years',
        postedDate: '1 week ago',
        description: 'Great opportunity for students to gain real-world experience in frontend development.',
        requirements: [
          'Basic knowledge of HTML, CSS, JavaScript',
          'Learning attitude',
          'Portfolio of projects',
          'Currently enrolled in CS program'
        ],
        benefits: [
          'Mentorship program',
          'Certificate of completion',
          'Potential full-time offer',
          'Flexible schedule'
        ],
        skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Git'],
        isRemote: false,
        isFeatured: false,
        rating: 4.2,
        applicants: 45
      },
      {
        id: '3',
        title: 'Full Stack Developer',
        company: 'Digital Solutions',
        location: 'Austin, TX',
        type: 'Full-time',
        salary: { min: 90000, max: 130000, currency: 'USD' },
        experience: '2-4 years',
        postedDate: '3 days ago',
        description: 'Join our dynamic team to build scalable web applications using modern technologies.',
        requirements: [
          '2+ years full-stack experience',
          'Proficiency in React and Node.js',
          'Database design skills',
          'API development experience'
        ],
        benefits: [
          'Competitive salary',
          'Stock options',
          'Professional development',
          'Team events'
        ],
        skills: ['React', 'Node.js', 'MongoDB', 'Express', 'AWS'],
        isRemote: true,
        isFeatured: true,
        rating: 4.3,
        applicants: 18
      },
      {
        id: '4',
        title: 'UI/UX Designer',
        company: 'Creative Agency',
        location: 'Los Angeles, CA',
        type: 'Contract',
        salary: { min: 60, max: 80, currency: 'USD' },
        experience: '3-5 years',
        postedDate: '5 days ago',
        description: 'Create beautiful and intuitive user interfaces for our clients\' digital products.',
        requirements: [
          '3+ years UI/UX design experience',
          'Proficiency in Figma/Sketch',
          'Strong portfolio',
          'Understanding of design systems'
        ],
        benefits: [
          'Creative freedom',
          'Diverse projects',
          'Professional growth',
          'Flexible schedule'
        ],
        skills: ['Figma', 'Sketch', 'Adobe Creative Suite', 'Prototyping', 'User Research'],
        isRemote: true,
        isFeatured: false,
        rating: 4.7,
        applicants: 32
      }
    ];

    setJobs(sampleJobs);
    setFilteredJobs(sampleJobs);
  }, []);

  // Filter and search jobs
  useEffect(() => {
    let filtered = jobs;

    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (locationFilter) {
      filtered = filtered.filter(job =>
        job.location.toLowerCase().includes(locationFilter.toLowerCase()) ||
        (locationFilter === 'remote' && job.isRemote)
      );
    }

    if (typeFilter) {
      filtered = filtered.filter(job => job.type === typeFilter);
    }

    if (experienceFilter) {
      filtered = filtered.filter(job => job.experience === experienceFilter);
    }

    // Sort jobs
    switch (sortBy) {
      case 'recent':
        filtered.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
        break;
      case 'salary-high':
        filtered.sort((a, b) => b.salary.max - a.salary.max);
        break;
      case 'salary-low':
        filtered.sort((a, b) => a.salary.min - b.salary.min);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
    }

    setFilteredJobs(filtered);
  }, [jobs, searchTerm, locationFilter, typeFilter, experienceFilter, sortBy]);

  const formatSalary = (salary: Job['salary']) => {
    if (salary.currency === 'USD' && salary.min > 1000) {
      return `$${(salary.min / 1000).toFixed(0)}k - $${(salary.max / 1000).toFixed(0)}k`;
    }
    return `${salary.currency} ${salary.min} - ${salary.max}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl font-bold mb-4">Find Your Dream Job</h1>
          <p className="text-xl opacity-90">Discover opportunities that match your skills and aspirations</p>
        </div>
      </div>

      <div className="container-custom py-8">
        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search jobs, companies, or skills..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Locations</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                  <SelectItem value="san francisco">San Francisco</SelectItem>
                  <SelectItem value="new york">New York</SelectItem>
                  <SelectItem value="austin">Austin</SelectItem>
                  <SelectItem value="los angeles">Los Angeles</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Types</SelectItem>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Internship">Internship</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="salary-high">Salary: High to Low</SelectItem>
                  <SelectItem value="salary-low">Salary: Low to High</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-muted-foreground">
            {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found
          </p>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span className="text-sm text-muted-foreground">Filters applied</span>
          </div>
        </div>

        {/* Job Listings */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Job Cards */}
          <div className="lg:col-span-2 space-y-4">
            {filteredJobs.map((job, index) => (
              <Card key={job.id} className={`hover:shadow-lg transition-all duration-300 animate-fade-in-up hover:scale-105 hover:rotate-1 ${job.isFeatured ? 'ring-2 ring-blue-500' : ''}`} style={{ animationDelay: `${index * 100}ms` }}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-foreground">{job.title}</h3>
                        {job.isFeatured && (
                          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            Featured
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Building className="h-4 w-4" />
                          <span>{job.company}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{job.location}</span>
                          {job.isRemote && (
                            <Badge variant="secondary" className="ml-2">Remote</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{job.postedDate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Bookmark className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4 line-clamp-2">{job.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.skills.slice(0, 4).map((skill, index) => (
                      <Badge key={index} variant="outline">{skill}</Badge>
                    ))}
                    {job.skills.length > 4 && (
                      <Badge variant="outline">+{job.skills.length - 4} more</Badge>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <span className="font-semibold">{formatSalary(job.salary)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span>{job.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{job.applicants} applicants</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
        <Button variant="outline" asChild className="button-hover-animate button-hover-glow hover-wiggle">
            <Link to={`/jobs/${job.id}`}>
                <Eye className="h-4 w-4 mr-2" />
                View Details
            </Link>
        </Button>
        <Button asChild className="button-hover-animate button-hover-bounce hover-heartbeat">
            <Link to={`/jobs/${job.id}/apply`}>Apply Now</Link>
        </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Job Market Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Jobs</span>
                  <span className="font-semibold">{jobs.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Remote Jobs</span>
                  <span className="font-semibold">{jobs.filter(j => j.isRemote).length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Featured Jobs</span>
                  <span className="font-semibold">{jobs.filter(j => j.isFeatured).length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Avg. Salary</span>
                  <span className="font-semibold">
                    ${Math.round(jobs.reduce((acc, job) => acc + (job.salary.min + job.salary.max) / 2, 0) / jobs.length / 1000)}k
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Popular Skills */}
            <Card>
              <CardHeader>
                <CardTitle>Popular Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {['React', 'JavaScript', 'Python', 'Node.js', 'TypeScript', 'AWS', 'Docker', 'Kubernetes'].map((skill) => (
                    <Badge key={skill} variant="secondary" className="cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Job Alerts */}
            <Card>
              <CardHeader>
                <CardTitle>Job Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Get notified when new jobs match your criteria
                </p>
                <Button className="w-full">Create Job Alert</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobListings;
