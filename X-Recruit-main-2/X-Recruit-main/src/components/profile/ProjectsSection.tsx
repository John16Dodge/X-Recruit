import React, { useState } from 'react';
import { api } from '@/services/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Trash2, Github, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Project {
  id?: string;
  title: string;
  description: string;
  technologies: string[];
  githubLink?: string;
  liveLink?: string;
}

const ProjectsSection: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([
    { title: '', description: '', technologies: [], githubLink: '', liveLink: '' }
  ]);
  const [newTech, setNewTech] = useState<string[]>(['']);
  const { toast } = useToast();

  const addProject = () =>
    setProjects([...projects, { title: '', description: '', technologies: [], githubLink: '', liveLink: '' }]);

  const removeProject = (index: number) =>
    setProjects(projects.filter((_, i) => i !== index));

  const handleChange = (index: number, field: keyof Project, value: string | string[]) => {
    const newProjects = [...projects];
    newProjects[index][field] = value as any;
    setProjects(newProjects);
  };

  const addTechnology = (projectIndex: number) => {
    const tech = newTech[projectIndex]?.trim();
    if (tech && !projects[projectIndex].technologies.includes(tech)) {
      const newProjects = [...projects];
      newProjects[projectIndex].technologies.push(tech);
      setProjects(newProjects);
      
      const newTechArray = [...newTech];
      newTechArray[projectIndex] = '';
      setNewTech(newTechArray);
    }
  };

  const removeTechnology = (projectIndex: number, tech: string) => {
    const newProjects = [...projects];
    newProjects[projectIndex].technologies = newProjects[projectIndex].technologies.filter(t => t !== tech);
    setProjects(newProjects);
  };

  const handleTechInputChange = (projectIndex: number, value: string) => {
    const newTechArray = [...newTech];
    newTechArray[projectIndex] = value;
    setNewTech(newTechArray);
  };

  const saveProjects = async () => {
    try {
      for (const project of projects) {
        await api.post('/projects', project);
      }
      toast({
        title: 'Success',
        description: 'Projects saved successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save projects.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Projects</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {projects.map((project, index) => (
          <div key={index} className="space-y-3 p-4 border rounded-lg relative">
            <Input
              placeholder="Project Title"
              value={project.title}
              onChange={(e) => handleChange(index, 'title', e.target.value)}
            />
            <Textarea
              placeholder="Project Description"
              value={project.description}
              onChange={(e) => handleChange(index, 'description', e.target.value)}
            />
            
            {/* Technologies */}
            <div className="space-y-2">
              <div className="flex space-x-2">
                <Input
                  placeholder="Add technology"
                  value={newTech[index] || ''}
                  onChange={(e) => handleTechInputChange(index, e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addTechnology(index)}
                />
                <Button type="button" onClick={() => addTechnology(index)}>
                  Add Tech
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map(tech => (
                  <div key={tech} className="flex items-center">
                    <Badge variant="secondary">{tech}</Badge>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeTechnology(index, tech)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex space-x-2">
              <div className="flex-1 relative">
                <Github className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="GitHub Repository URL"
                  value={project.githubLink}
                  onChange={(e) => handleChange(index, 'githubLink', e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex-1 relative">
                <ExternalLink className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Live Demo URL"
                  value={project.liveLink}
                  onChange={(e) => handleChange(index, 'liveLink', e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2"
              onClick={() => removeProject(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button type="button" variant="outline" onClick={addProject}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Project
        </Button>
        <Button type="button" onClick={saveProjects}>
          Save Projects
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProjectsSection;
