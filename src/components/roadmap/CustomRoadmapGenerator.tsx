import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Sparkles, Plus, X, Download } from 'lucide-react';
import { useProgress } from '@/hooks/useProgress';
import RoadmapVisualizer from './RoadmapVisualizer';

interface CustomRoadmap {
  title: string;
  description: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  skills: string[];
  goals: string[];
}

const CustomRoadmapGenerator: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedRoadmap, setGeneratedRoadmap] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    difficulty: 'beginner' as const,
    currentSkills: '',
    targetRole: '',
    experience: '',
    goals: ''
  });
  const [skills, setSkills] = useState<string[]>([]);
  const [goals, setGoals] = useState<string[]>([]);
  const { progress, status, setProgress, setLoading, reset } = useProgress();

  const addSkill = () => {
    if (formData.currentSkills.trim() && !skills.includes(formData.currentSkills.trim())) {
      setSkills([...skills, formData.currentSkills.trim()]);
      setFormData(prev => ({ ...prev, currentSkills: '' }));
    }
  };

  const addGoal = () => {
    if (formData.goals.trim() && !goals.includes(formData.goals.trim())) {
      setGoals([...goals, formData.goals.trim()]);
      setFormData(prev => ({ ...prev, goals: '' }));
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const removeGoal = (goal: string) => {
    setGoals(goals.filter(g => g !== goal));
  };

  const generateCustomRoadmap = async () => {
    if (!formData.title || !formData.targetRole) return;

    setIsGenerating(true);
    setLoading(true);
    reset();

    try {
      // Simulate AI generation with progress updates
      setProgress(10, 'Analyzing requirements...');
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setProgress(30, 'Creating learning path...');
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setProgress(60, 'Adding resources and tools...');
      await new Promise(resolve => setTimeout(resolve, 700));
      
      setProgress(90, 'Finalizing roadmap...');
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setProgress(100, 'Complete!');

      // Generate a custom roadmap based on inputs
      const customRoadmap = {
        title: formData.title,
        description: formData.description || `Comprehensive learning path to become a ${formData.targetRole}`,
        difficulty: formData.difficulty,
        timeEstimate: formData.duration || 'Custom timeline',
        roadmapType: 'custom',
        steps: [
          {
            title: 'Foundation Building',
            duration: 2,
            category: 'foundation',
            description: `Build strong fundamentals based on your current skills: ${skills.join(', ')}`
          },
          {
            title: 'Core Skill Development',
            duration: 4,
            category: 'core',
            description: `Develop core competencies for ${formData.targetRole}`
          },
          {
            title: 'Practical Projects',
            duration: 3,
            category: 'project',
            description: 'Apply knowledge through hands-on projects and portfolio building'
          },
          {
            title: 'Advanced Topics',
            duration: 3,
            category: 'advanced',
            description: 'Master advanced concepts and specialization areas'
          },
          {
            title: 'Professional Development',
            duration: 2,
            category: 'specialization',
            description: 'Prepare for job market and continuous learning'
          }
        ],
        tools: ['Git', 'VS Code', 'Documentation Tools', 'Project Management Tools'],
        platforms: ['GitHub', 'Online Learning Platforms', 'Community Forums'],
        certifications: [`${formData.targetRole} Certification`, 'Industry Standard Certifications'],
        currentSkills: skills,
        targetGoals: goals,
        experienceLevel: formData.experience
      };

      setGeneratedRoadmap(customRoadmap);
    } catch (error) {
      console.error('Error generating roadmap:', error);
    } finally {
      setIsGenerating(false);
      setLoading(false);
    }
  };

  const downloadRoadmap = () => {
    if (!generatedRoadmap) return;

    const roadmapText = `
${generatedRoadmap.title}
${'='.repeat(generatedRoadmap.title.length)}

Description: ${generatedRoadmap.description}
Difficulty: ${generatedRoadmap.difficulty}
Duration: ${generatedRoadmap.timeEstimate}

Current Skills: ${generatedRoadmap.currentSkills?.join(', ') || 'None specified'}
Target Goals: ${generatedRoadmap.targetGoals?.join(', ') || 'None specified'}

Learning Path:
${generatedRoadmap.steps?.map((step: any, index: number) => 
  `${index + 1}. ${step.title} (${step.duration} weeks)
   ${step.description}`
).join('\n\n') || 'No steps defined'}

Recommended Tools: ${generatedRoadmap.tools?.join(', ') || 'None specified'}
Platforms: ${generatedRoadmap.platforms?.join(', ') || 'None specified'}
Certifications: ${generatedRoadmap.certifications?.join(', ') || 'None specified'}
`;

    const blob = new Blob([roadmapText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${generatedRoadmap.title.replace(/\s+/g, '_')}_roadmap.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Create Custom Roadmap
          </CardTitle>
          <CardDescription>
            Generate a personalized learning roadmap based on your goals and current skills
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Roadmap Title *</Label>
              <Input
                id="title"
                placeholder="e.g., My Frontend Developer Journey"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="targetRole">Target Role *</Label>
              <Input
                id="targetRole"
                placeholder="e.g., Frontend Developer, Data Scientist"
                value={formData.targetRole}
                onChange={(e) => setFormData(prev => ({ ...prev, targetRole: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your learning objectives and what you want to achieve..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty Level</Label>
              <Select value={formData.difficulty} onValueChange={(value: any) => setFormData(prev => ({ ...prev, difficulty: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                placeholder="e.g., 6 months, 12 weeks"
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience">Experience Level</Label>
              <Input
                id="experience"
                placeholder="e.g., 2 years, Beginner"
                value={formData.experience}
                onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Current Skills</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a skill..."
                  value={formData.currentSkills}
                  onChange={(e) => setFormData(prev => ({ ...prev, currentSkills: e.target.value }))}
                  onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                />
                <Button onClick={addSkill} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map(skill => (
                  <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                    {skill}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeSkill(skill)} />
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Learning Goals</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a goal..."
                  value={formData.goals}
                  onChange={(e) => setFormData(prev => ({ ...prev, goals: e.target.value }))}
                  onKeyPress={(e) => e.key === 'Enter' && addGoal()}
                />
                <Button onClick={addGoal} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {goals.map(goal => (
                  <Badge key={goal} variant="secondary" className="flex items-center gap-1">
                    {goal}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeGoal(goal)} />
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {isGenerating && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{status}</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} />
            </div>
          )}

          <div className="flex gap-2">
            <Button 
              onClick={generateCustomRoadmap} 
              disabled={isGenerating || !formData.title || !formData.targetRole}
              className="flex-1"
            >
              {isGenerating ? 'Generating...' : 'Generate Custom Roadmap'}
            </Button>
            {generatedRoadmap && (
              <Button variant="outline" onClick={downloadRoadmap}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {generatedRoadmap && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold">Your Custom Roadmap</h3>
          <RoadmapVisualizer roadmap={generatedRoadmap} />
        </div>
      )}
    </div>
  );
};

export default CustomRoadmapGenerator;