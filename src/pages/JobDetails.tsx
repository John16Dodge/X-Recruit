import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  DollarSign, 
  Building, 
  Users, 
  Star,
  Bookmark,
  Share2,
  CheckCircle,
  Calendar,
  Briefcase,
  GraduationCap,
  Heart,
  ExternalLink
} from 'lucide-react';

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
  companyDescription: string;
  companySize: string;
  companyWebsite: string;
  applicationDeadline: string;
  workingHours: string;
  department: string;
}

const JobDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    // In a real app, this would fetch from an API
    const sampleJob: Job = {
      id: id || '1',
      title: 'Senior React Developer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: { min: 120000, max: 180000, currency: 'USD' },
      experience: '3-5 years',
      postedDate: '2 days ago',
      description: `We are looking for a passionate Senior React Developer to join our innovative team and help build amazing user experiences that millions of users interact with daily.

As a Senior React Developer at TechCorp, you will be responsible for developing and maintaining high-quality web applications using React and related technologies. You'll work closely with our design team, product managers, and other engineers to create seamless user experiences.

Key responsibilities include:
• Developing new user-facing features using React.js
• Building reusable components and front-end libraries
• Translating designs and wireframes into high-quality code
• Optimizing components for maximum performance across devices
• Collaborating with backend developers to integrate APIs
• Participating in code reviews and technical discussions
• Mentoring junior developers and sharing knowledge`,
      requirements: [
        '3+ years of professional React development experience',
        'Strong proficiency in JavaScript, including ES6+ features',
        'Experience with popular React workflows (Redux, Context API)',
        'Familiarity with modern front-end build pipelines and tools',
        'Experience with data structure libraries (e.g., Lodash)',
        'Knowledge of isomorphic React is a plus',
        'Familiarity with RESTful APIs and GraphQL',
        'Experience with common front-end development tools such as Babel, Webpack, NPM, etc.',
        'Ability to understand business requirements and translate them into technical requirements',
        'A knack for benchmarking and optimization',
        'Proficient understanding of code versioning tools, such as Git',
        'Strong problem-solving skills and attention to detail'
      ],
      benefits: [
        'Competitive salary and equity package',
        'Comprehensive health, dental, and vision insurance',
        '401(k) with company matching up to 6%',
        'Flexible work hours and remote work options',
        'Professional development budget ($2,000/year)',
        'Top-tier equipment and home office setup',
        'Unlimited PTO and paid holidays',
        'Stock options and performance bonuses',
        'Team building events and company retreats',
        'Learning and development opportunities',
        'Mentorship program',
        'Wellness program and gym membership'
      ],
      skills: ['React', 'JavaScript', 'TypeScript', 'Redux', 'Node.js', 'HTML', 'CSS', 'Git', 'Jest', 'Webpack'],
      isRemote: true,
      isFeatured: true,
      rating: 4.5,
      applicants: 24,
      companyDescription: 'TechCorp Inc. is a leading technology company specializing in innovative software solutions. Founded in 2015, we have grown to serve over 10,000 clients worldwide. Our mission is to empower businesses through cutting-edge technology and exceptional user experiences.',
      companySize: '201-500 employees',
      companyWebsite: 'https://techcorp.com',
      applicationDeadline: '2024-02-15',
      workingHours: '9 AM - 5 PM PST',
      department: 'Engineering'
    };

    setJob(sampleJob);
  }, [id]);

  const formatSalary = (salary: Job['salary']) => {
    if (salary.currency === 'USD' && salary.min > 1000) {
      return `$${(salary.min / 1000).toFixed(0)}k - $${(salary.max / 1000).toFixed(0)}k`;
    }
    return `${salary.currency} ${salary.min} - ${salary.max}`;
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleApply = () => {
    setIsApplied(true);
    // In a real app, this would redirect to application form
  };

  if (!job) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading job details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8">
        <div className="container-custom">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="sm" asChild className="text-white hover:bg-white/20">
              <Link to="/jobs">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Jobs
              </Link>
            </Button>
          </div>
          
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">{job.title}</h1>
                {job.isFeatured && (
                  <Badge className="bg-yellow-500 text-black">Featured</Badge>
                )}
              </div>
              <div className="flex items-center gap-6 text-white/90 mb-4">
                <div className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  <span className="text-xl">{job.company}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <span>{job.location}</span>
                  {job.isRemote && (
                    <Badge variant="secondary" className="ml-2">Remote</Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{job.postedDate}</span>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  <span className="text-xl font-semibold">{formatSalary(job.salary)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  <span>{job.rating} ({job.applicants} applicants)</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleBookmark}
                className={`border-white text-white hover:bg-white/20 ${
                  isBookmarked ? 'bg-white/20' : ''
                }`}
              >
                <Bookmark className="h-4 w-4 mr-2" />
                {isBookmarked ? 'Bookmarked' : 'Bookmark'}
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/20">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button
                onClick={handleApply}
                disabled={isApplied}
                className="bg-white text-blue-600 hover:bg-white/90"
              >
                {isApplied ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Applied
                  </>
                ) : (
                  'Apply Now'
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Description */}
            <Card>
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  {job.description.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">{paragraph}</p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {job.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{requirement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle>Required Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-sm py-1 px-3">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card>
              <CardHeader>
                <CardTitle>Benefits & Perks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {job.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Heart className="h-4 w-4 text-red-500 flex-shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Company Info */}
            <Card>
              <CardHeader>
                <CardTitle>About {job.company}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{job.companyDescription}</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{job.companySize}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{job.rating} rating</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    <a 
                      href={job.companyWebsite} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Company Website
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Job Details */}
            <Card>
              <CardHeader>
                <CardTitle>Job Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Job Type</p>
                    <p className="text-sm text-muted-foreground">{job.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Experience Level</p>
                    <p className="text-sm text-muted-foreground">{job.experience}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Working Hours</p>
                    <p className="text-sm text-muted-foreground">{job.workingHours}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Application Deadline</p>
                    <p className="text-sm text-muted-foreground">{job.applicationDeadline}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Department</p>
                    <p className="text-sm text-muted-foreground">{job.department}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Apply */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Apply</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Ready to apply? Click the button below to start your application.
                </p>
                <Button 
                  onClick={handleApply}
                  disabled={isApplied}
                  className="w-full"
                >
                  {isApplied ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Application Submitted
                    </>
                  ) : (
                    'Apply for this Job'
                  )}
                </Button>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  Application takes about 5 minutes
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;

