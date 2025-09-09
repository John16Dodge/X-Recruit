import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
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
  Edit, 
  Save, 
  X,
  Plus,
  Trash2,
  ExternalLink,
  Download,
  Upload
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

const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingSection, setEditingSection] = useState<string | null>(null);

  useEffect(() => {
    // Sample profile data
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
        },
        {
          id: '2',
          company: 'StartupXYZ',
          position: 'Full Stack Developer',
          startDate: '2020-06',
          endDate: '2021-12',
          current: false,
          description: 'Developed and maintained web applications using React, Node.js, and MongoDB. Collaborated with cross-functional teams to deliver high-quality products.',
          location: 'Remote'
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
        },
        {
          id: '2',
          name: 'React Developer Certification',
          issuer: 'Meta',
          date: '2022-08',
          credentialId: 'META-REACT-789012'
        }
      ],
      projects: [
        {
          id: '1',
          name: 'E-commerce Platform',
          description: 'Built a full-stack e-commerce platform with React, Node.js, and MongoDB. Features include user authentication, product management, shopping cart, and payment integration.',
          technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'JWT'],
          startDate: '2023-01',
          endDate: '2023-06',
          url: 'https://ecommerce-demo.com',
          githubUrl: 'https://github.com/johndoe/ecommerce-platform'
        },
        {
          id: '2',
          name: 'Task Management App',
          description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
          technologies: ['React', 'Socket.io', 'Express', 'PostgreSQL'],
          startDate: '2022-09',
          endDate: '2022-12',
          githubUrl: 'https://github.com/johndoe/task-manager'
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

  const handleEdit = (section: string) => {
    setEditingSection(section);
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    setEditingSection(null);
    // In a real app, this would save to the backend
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingSection(null);
  };

  const addSkill = (skill: string) => {
    if (profile && skill.trim() && !profile.skills.includes(skill.trim())) {
      setProfile({
        ...profile,
        skills: [...profile.skills, skill.trim()]
      });
    }
  };

  const removeSkill = (skill: string) => {
    if (profile) {
      setProfile({
        ...profile,
        skills: profile.skills.filter(s => s !== skill)
      });
    }
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
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container-custom">
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24 border-4 border-white">
              <AvatarImage src={profile.avatar} />
              <AvatarFallback className="text-2xl">
                {profile.firstName[0]}{profile.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">
                {profile.firstName} {profile.lastName}
              </h1>
              <p className="text-xl opacity-90 mb-4">{profile.bio}</p>
              <div className="flex items-center gap-6 text-white/90">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <span>{profile.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  <span>{profile.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  <span>{profile.phone}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="border-white text-white hover:bg-white/20">
                <Download className="h-4 w-4 mr-2" />
                Download Resume
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/20">
                <Upload className="h-4 w-4 mr-2" />
                Upload Resume
              </Button>
              <Button 
                onClick={() => navigate('/profile/edit')} 
                className="bg-white text-blue-600 hover:bg-white/90 button-hover-animate button-hover-glow"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Skills */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Skills</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => handleEdit('skills')}>
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-sm py-1 px-3">
                      {skill}
                      {editingSection === 'skills' && (
                        <button
                          onClick={() => removeSkill(skill)}
                          className="ml-2 hover:text-red-500"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </Badge>
                  ))}
                  {editingSection === 'skills' && (
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="Add skill"
                        className="w-32"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            addSkill(e.currentTarget.value);
                            e.currentTarget.value = '';
                          }
                        }}
                      />
                      <Button size="sm" variant="outline">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Certifications</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => handleEdit('certifications')}>
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profile.certifications.map((cert) => (
                    <div key={cert.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold">{cert.name}</h4>
                        <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                        <p className="text-sm text-muted-foreground">
                          Issued: {cert.date} {cert.expiryDate && `• Expires: ${cert.expiryDate}`}
                        </p>
                        {cert.credentialId && (
                          <p className="text-sm text-muted-foreground">ID: {cert.credentialId}</p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {cert.url && (
                          <Button variant="ghost" size="sm" asChild>
                            <a href={cert.url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                        {editingSection === 'certifications' && (
                          <Button variant="ghost" size="sm" className="text-red-500">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="experience" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Work Experience</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => handleEdit('experience')}>
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {profile.experience.map((exp) => (
                    <div key={exp.id} className="border-l-4 border-blue-500 pl-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold">{exp.position}</h3>
                          <p className="text-lg text-muted-foreground">{exp.company}</p>
                          <p className="text-sm text-muted-foreground">
                            {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                          </p>
                          <p className="text-sm text-muted-foreground">{exp.location}</p>
                        </div>
                        {editingSection === 'experience' && (
                          <Button variant="ghost" size="sm" className="text-red-500">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <p className="mt-3 text-muted-foreground">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="education" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Education</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => handleEdit('education')}>
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {profile.education.map((edu) => (
                    <div key={edu.id} className="border-l-4 border-green-500 pl-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold">{edu.degree} in {edu.field}</h3>
                          <p className="text-lg text-muted-foreground">{edu.institution}</p>
                          <p className="text-sm text-muted-foreground">
                            {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                          </p>
                          <p className="text-sm text-muted-foreground">{edu.location}</p>
                          {edu.gpa && (
                            <p className="text-sm text-muted-foreground">GPA: {edu.gpa}</p>
                          )}
                        </div>
                        {editingSection === 'education' && (
                          <Button variant="ghost" size="sm" className="text-red-500">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Projects</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => handleEdit('projects')}>
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {profile.projects.map((project) => (
                    <div key={project.id} className="border rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-semibold">{project.name}</h3>
                        {editingSection === 'projects' && (
                          <Button variant="ghost" size="sm" className="text-red-500">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <p className="text-muted-foreground mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
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
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Job Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Preferred Job Types</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {profile.preferences.jobTypes.map((type) => (
                      <Badge key={type} variant="secondary">{type}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Preferred Locations</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {profile.preferences.locations.map((location) => (
                      <Badge key={location} variant="secondary">{location}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Salary Range</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    ${profile.preferences.salaryRange.min.toLocaleString()} - ${profile.preferences.salaryRange.max.toLocaleString()}
                  </p>
                </div>
                <div>
                  <Label>Remote Work</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    {profile.preferences.remoteWork ? 'Yes' : 'No'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Edit Actions */}
        {isEditing && (
          <div className="fixed bottom-6 right-6 flex gap-3">
            <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
            <Button variant="outline" onClick={handleCancel}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
