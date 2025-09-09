import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Save, 
  X,
  Plus,
  Trash2,
  ExternalLink,
  Upload,
  ArrowLeft
} from 'lucide-react';

interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  avatar?: string;
  dateOfBirth: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  certifications: Certification[];
  projects: Project[];
  preferences: {
    jobTypes: string[];
    locations: string[];
    salaryRange: {
      min: number;
      max: number;
    };
    remoteWork: boolean;
  };
}

interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  location: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  gpa?: number;
  location: string;
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialId?: string;
  url?: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  startDate: string;
  endDate?: string;
  url?: string;
  githubUrl?: string;
}

const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [newEducation, setNewEducation] = useState({
    institution: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    current: false,
    gpa: '',
    location: ''
  });
  const [newExperience, setNewExperience] = useState({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
    location: ''
  });
  const [newCertification, setNewCertification] = useState({
    name: '',
    issuer: '',
    date: '',
    expiryDate: '',
    credentialId: '',
    url: ''
  });
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    technologies: '',
    startDate: '',
    endDate: '',
    url: '',
    githubUrl: ''
  });

  useEffect(() => {
    // Sample profile data - in a real app, this would come from an API
    const sampleProfile: UserProfile = {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@email.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      bio: 'Passionate full-stack developer with 5+ years of experience building scalable web applications. I love working with React, Node.js, and modern web technologies.',
      dateOfBirth: '1995-03-15',
      experience: [
        {
          id: '1',
          company: 'TechCorp Inc.',
          position: 'Senior Frontend Developer',
          startDate: '2022-01',
          current: true,
          description: 'Lead frontend development for multiple client projects, mentored junior developers, and implemented best practices for code quality and performance.',
          location: 'San Francisco, CA'
        }
      ],
      education: [
        {
          id: '1',
          institution: 'University of California, Berkeley',
          degree: 'Bachelor of Science',
          field: 'Computer Science',
          startDate: '2013-09',
          endDate: '2017-05',
          current: false,
          gpa: 3.8,
          location: 'Berkeley, CA'
        }
      ],
      skills: ['React', 'JavaScript', 'TypeScript', 'Node.js', 'Python', 'MongoDB', 'PostgreSQL', 'AWS', 'Docker', 'Git'],
      certifications: [
        {
          id: '1',
          name: 'AWS Certified Solutions Architect',
          issuer: 'Amazon Web Services',
          date: '2023-03',
          expiryDate: '2026-03',
          credentialId: 'AWS-SAA-123456',
          url: 'https://aws.amazon.com/verification'
        }
      ],
      projects: [
        {
          id: '1',
          name: 'E-commerce Platform',
          description: 'Built a full-stack e-commerce platform with React, Node.js, and MongoDB.',
          technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'JWT'],
          startDate: '2023-01',
          endDate: '2023-06',
          url: 'https://ecommerce-demo.com',
          githubUrl: 'https://github.com/johndoe/ecommerce-platform'
        }
      ],
      preferences: {
        jobTypes: ['Full-time', 'Contract'],
        locations: ['San Francisco', 'Remote'],
        salaryRange: { min: 120000, max: 180000 },
        remoteWork: true
      }
    };

    setProfile(sampleProfile);
  }, []);

  const handleInputChange = (field: keyof UserProfile, value: any) => {
    setProfile(prev => prev ? { ...prev, [field]: value } : null);
  };

  const handleNestedInputChange = (section: keyof UserProfile, field: string, value: any) => {
    setProfile(prev => prev ? {
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    } : null);
  };

  const addSkill = () => {
    if (newSkill.trim() && profile && !profile.skills.includes(newSkill.trim())) {
      setProfile(prev => prev ? {
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      } : null);
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setProfile(prev => prev ? {
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    } : null);
  };

  const addEducation = () => {
    if (newEducation.institution && newEducation.degree && newEducation.field && profile) {
      setProfile(prev => prev ? {
        ...prev,
        education: [...prev.education, {
          ...newEducation,
          id: Date.now().toString(),
          gpa: newEducation.gpa ? parseFloat(newEducation.gpa) : undefined
        }]
      } : null);
      setNewEducation({
        institution: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        current: false,
        gpa: '',
        location: ''
      });
    }
  };

  const removeEducation = (id: string) => {
    setProfile(prev => prev ? {
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    } : null);
  };

  const addExperience = () => {
    if (newExperience.company && newExperience.position && profile) {
      setProfile(prev => prev ? {
        ...prev,
        experience: [...prev.experience, {
          ...newExperience,
          id: Date.now().toString()
        }]
      } : null);
      setNewExperience({
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
        location: ''
      });
    }
  };

  const removeExperience = (id: string) => {
    setProfile(prev => prev ? {
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    } : null);
  };

  const addCertification = () => {
    if (newCertification.name && newCertification.issuer && profile) {
      setProfile(prev => prev ? {
        ...prev,
        certifications: [...prev.certifications, {
          ...newCertification,
          id: Date.now().toString()
        }]
      } : null);
      setNewCertification({
        name: '',
        issuer: '',
        date: '',
        expiryDate: '',
        credentialId: '',
        url: ''
      });
    }
  };

  const removeCertification = (id: string) => {
    setProfile(prev => prev ? {
      ...prev,
      certifications: prev.certifications.filter(cert => cert.id !== id)
    } : null);
  };

  const addProject = () => {
    if (newProject.name && newProject.description && profile) {
      setProfile(prev => prev ? {
        ...prev,
        projects: [...prev.projects, {
          ...newProject,
          id: Date.now().toString(),
          technologies: newProject.technologies.split(',').map(t => t.trim()).filter(t => t)
        }]
      } : null);
      setNewProject({
        name: '',
        description: '',
        technologies: '',
        startDate: '',
        endDate: '',
        url: '',
        githubUrl: ''
      });
    }
  };

  const removeProject = (id: string) => {
    setProfile(prev => prev ? {
      ...prev,
      projects: prev.projects.filter(proj => proj.id !== id)
    } : null);
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    navigate('/profile');
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading profile...</p>
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
              <button onClick={() => navigate('/profile')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Profile
              </button>
            </Button>
          </div>
          
          <div className="flex items-center gap-6">
            <Avatar className="h-20 w-20 border-4 border-white">
              <AvatarImage src={profile.avatar} />
              <AvatarFallback className="text-2xl">
                {profile.firstName[0]}{profile.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">Edit Profile</h1>
              <p className="text-xl opacity-90">Update your professional information</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="professional">Professional</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={profile.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={profile.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      value={profile.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={profile.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="professional" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Professional Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Skills *</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="Add a skill"
                      onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                    />
                    <Button onClick={addSkill} type="button">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {profile.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {skill}
                        <button onClick={() => removeSkill(skill)}>
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label>Job Preferences</Label>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance'].map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={type}
                          checked={profile.preferences.jobTypes.includes(type)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              handleNestedInputChange('preferences', 'jobTypes', [...profile.preferences.jobTypes, type]);
                            } else {
                              handleNestedInputChange('preferences', 'jobTypes', profile.preferences.jobTypes.filter(t => t !== type));
                            }
                          }}
                        />
                        <Label htmlFor={type}>{type}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="salaryMin">Minimum Salary</Label>
                    <Input
                      id="salaryMin"
                      type="number"
                      value={profile.preferences.salaryRange.min}
                      onChange={(e) => handleNestedInputChange('preferences', 'salaryRange', {
                        ...profile.preferences.salaryRange,
                        min: parseInt(e.target.value) || 0
                      })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="salaryMax">Maximum Salary</Label>
                    <Input
                      id="salaryMax"
                      type="number"
                      value={profile.preferences.salaryRange.max}
                      onChange={(e) => handleNestedInputChange('preferences', 'salaryRange', {
                        ...profile.preferences.salaryRange,
                        max: parseInt(e.target.value) || 0
                      })}
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remoteWork"
                    checked={profile.preferences.remoteWork}
                    onCheckedChange={(checked) => handleNestedInputChange('preferences', 'remoteWork', checked)}
                  />
                  <Label htmlFor="remoteWork">Open to remote work</Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="education" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Education</CardTitle>
                  <Button onClick={addEducation} type="button">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Education
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {profile.education.map((edu) => (
                  <Card key={edu.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-semibold">{edu.degree} in {edu.field}</h4>
                          <p className="text-muted-foreground">{edu.institution}</p>
                          <p className="text-sm text-muted-foreground">
                            {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                          </p>
                          {edu.gpa && <p className="text-sm text-muted-foreground">GPA: {edu.gpa}</p>}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeEducation(edu.id)}
                          className="text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <Card>
                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="eduInstitution">Institution</Label>
                        <Input
                          id="eduInstitution"
                          value={newEducation.institution}
                          onChange={(e) => setNewEducation({...newEducation, institution: e.target.value})}
                          placeholder="University name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="eduDegree">Degree</Label>
                        <Input
                          id="eduDegree"
                          value={newEducation.degree}
                          onChange={(e) => setNewEducation({...newEducation, degree: e.target.value})}
                          placeholder="e.g., Bachelor's"
                        />
                      </div>
                      <div>
                        <Label htmlFor="eduField">Field of Study</Label>
                        <Input
                          id="eduField"
                          value={newEducation.field}
                          onChange={(e) => setNewEducation({...newEducation, field: e.target.value})}
                          placeholder="e.g., Computer Science"
                        />
                      </div>
                      <div>
                        <Label htmlFor="eduGpa">GPA (Optional)</Label>
                        <Input
                          id="eduGpa"
                          type="number"
                          step="0.1"
                          value={newEducation.gpa}
                          onChange={(e) => setNewEducation({...newEducation, gpa: e.target.value})}
                          placeholder="3.5"
                        />
                      </div>
                      <div>
                        <Label htmlFor="eduStart">Start Date</Label>
                        <Input
                          id="eduStart"
                          type="date"
                          value={newEducation.startDate}
                          onChange={(e) => setNewEducation({...newEducation, startDate: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="eduEnd">End Date</Label>
                        <Input
                          id="eduEnd"
                          type="date"
                          value={newEducation.endDate}
                          onChange={(e) => setNewEducation({...newEducation, endDate: e.target.value})}
                          disabled={newEducation.current}
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mt-4">
                      <Checkbox
                        id="eduCurrent"
                        checked={newEducation.current}
                        onCheckedChange={(checked) => setNewEducation({...newEducation, current: checked as boolean})}
                      />
                      <Label htmlFor="eduCurrent">Currently studying</Label>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="experience" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Work Experience</CardTitle>
                  <Button onClick={addExperience} type="button">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Experience
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {profile.experience.map((exp) => (
                  <Card key={exp.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-semibold">{exp.position}</h4>
                          <p className="text-muted-foreground">{exp.company}</p>
                          <p className="text-sm text-muted-foreground">
                            {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                          </p>
                          <p className="text-sm mt-2">{exp.description}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeExperience(exp.id)}
                          className="text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <Card>
                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expCompany">Company</Label>
                        <Input
                          id="expCompany"
                          value={newExperience.company}
                          onChange={(e) => setNewExperience({...newExperience, company: e.target.value})}
                          placeholder="Company name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="expPosition">Position</Label>
                        <Input
                          id="expPosition"
                          value={newExperience.position}
                          onChange={(e) => setNewExperience({...newExperience, position: e.target.value})}
                          placeholder="Job title"
                        />
                      </div>
                      <div>
                        <Label htmlFor="expStart">Start Date</Label>
                        <Input
                          id="expStart"
                          type="date"
                          value={newExperience.startDate}
                          onChange={(e) => setNewExperience({...newExperience, startDate: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="expEnd">End Date</Label>
                        <Input
                          id="expEnd"
                          type="date"
                          value={newExperience.endDate}
                          onChange={(e) => setNewExperience({...newExperience, endDate: e.target.value})}
                          disabled={newExperience.current}
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <Label htmlFor="expDescription">Description</Label>
                      <Textarea
                        id="expDescription"
                        value={newExperience.description}
                        onChange={(e) => setNewExperience({...newExperience, description: e.target.value})}
                        placeholder="Describe your role and achievements..."
                        rows={3}
                      />
                    </div>
                    <div className="flex items-center space-x-2 mt-4">
                      <Checkbox
                        id="expCurrent"
                        checked={newExperience.current}
                        onCheckedChange={(checked) => setNewExperience({...newExperience, current: checked as boolean})}
                      />
                      <Label htmlFor="expCurrent">Currently working here</Label>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Projects</CardTitle>
                  <Button onClick={addProject} type="button">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Project
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {profile.projects.map((project) => (
                  <Card key={project.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-semibold">{project.name}</h4>
                          <p className="text-muted-foreground mb-2">{project.description}</p>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {project.technologies.map((tech, index) => (
                              <Badge key={index} variant="outline">{tech}</Badge>
                            ))}
                          </div>
                          <div className="flex gap-2">
                            {project.url && (
                              <Button variant="outline" size="sm" asChild>
                                <a href={project.url} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  Live Demo
                                </a>
                              </Button>
                            )}
                            {project.githubUrl && (
                              <Button variant="outline" size="sm" asChild>
                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  GitHub
                                </a>
                              </Button>
                            )}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeProject(project.id)}
                          className="text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="projName">Project Name</Label>
                        <Input
                          id="projName"
                          value={newProject.name}
                          onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                          placeholder="Project name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="projDescription">Description</Label>
                        <Textarea
                          id="projDescription"
                          value={newProject.description}
                          onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                          placeholder="Describe your project..."
                          rows={3}
                        />
                      </div>
                      <div>
                        <Label htmlFor="projTechnologies">Technologies (comma-separated)</Label>
                        <Input
                          id="projTechnologies"
                          value={newProject.technologies}
                          onChange={(e) => setNewProject({...newProject, technologies: e.target.value})}
                          placeholder="React, Node.js, MongoDB"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="projStart">Start Date</Label>
                          <Input
                            id="projStart"
                            type="date"
                            value={newProject.startDate}
                            onChange={(e) => setNewProject({...newProject, startDate: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="projEnd">End Date</Label>
                          <Input
                            id="projEnd"
                            type="date"
                            value={newProject.endDate}
                            onChange={(e) => setNewProject({...newProject, endDate: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="projUrl">Live URL</Label>
                          <Input
                            id="projUrl"
                            value={newProject.url}
                            onChange={(e) => setNewProject({...newProject, url: e.target.value})}
                            placeholder="https://project-demo.com"
                          />
                        </div>
                        <div>
                          <Label htmlFor="projGithub">GitHub URL</Label>
                          <Input
                            id="projGithub"
                            value={newProject.githubUrl}
                            onChange={(e) => setNewProject({...newProject, githubUrl: e.target.value})}
                            placeholder="https://github.com/username/project"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Save Button */}
        <div className="flex justify-end mt-8">
          <Button 
            onClick={handleSave}
            disabled={isSaving}
            className="button-hover-animate button-hover-glow"
          >
            {isSaving ? (
              <>
                <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-white animate-spin mr-2"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;

