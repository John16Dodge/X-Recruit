
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Plus, X } from 'lucide-react';

interface RoadmapFormProps {
  onSubmit: (formData: any) => void;
  isGenerating: boolean;
}

const RoadmapForm: React.FC<RoadmapFormProps> = ({ onSubmit, isGenerating }) => {
  const [careerGoal, setCareerGoal] = useState('');
  const [currentSkills, setCurrentSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const [experience, setExperience] = useState('');
  const [timeframe, setTimeframe] = useState('');
  const [learningStyle, setLearningStyle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      careerGoal,
      currentSkills,
      experience,
      timeframe,
      learningStyle
    });
  };

  const addSkill = () => {
    if (newSkill.trim() && !currentSkills.includes(newSkill.trim())) {
      setCurrentSkills([...currentSkills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setCurrentSkills(currentSkills.filter(skill => skill !== skillToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          AI-Powered Roadmap Generator
        </CardTitle>
        <CardDescription>
          Tell us about your career goals and current situation to generate a personalized learning roadmap.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="careerGoal" className="text-sm font-medium">
              Career Goal *
            </label>
            <Textarea
              id="careerGoal"
              placeholder="e.g., I want to become a full stack developer specializing in React and Node.js"
              value={careerGoal}
              onChange={(e) => setCareerGoal(e.target.value)}
              required
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="currentSkills" className="text-sm font-medium">
              Current Skills
            </label>
            <div className="flex gap-2">
              <Input
                id="currentSkills"
                placeholder="Add a skill (e.g., HTML, Python, etc.)"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <Button type="button" onClick={addSkill} variant="outline" size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {currentSkills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {currentSkills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="gap-1">
                    {skill}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSkill(skill)}
                      className="h-4 w-4 p-0 hover:bg-transparent"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="experience" className="text-sm font-medium">
                Experience Level
              </label>
              <Select value={experience} onValueChange={setExperience}>
                <SelectTrigger>
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="complete-beginner">Complete Beginner</SelectItem>
                  <SelectItem value="some-experience">Some Experience</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="timeframe" className="text-sm font-medium">
                Desired Timeframe
              </label>
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger>
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-3-months">1-3 months</SelectItem>
                  <SelectItem value="3-6-months">3-6 months</SelectItem>
                  <SelectItem value="6-12-months">6-12 months</SelectItem>
                  <SelectItem value="1-2-years">1-2 years</SelectItem>
                  <SelectItem value="flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="learningStyle" className="text-sm font-medium">
              Learning Style
            </label>
            <Select value={learningStyle} onValueChange={setLearningStyle}>
              <SelectTrigger>
                <SelectValue placeholder="Select learning style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="visual">Visual (videos, diagrams)</SelectItem>
                <SelectItem value="reading">Reading (books, articles)</SelectItem>
                <SelectItem value="hands-on">Hands-on (projects, coding)</SelectItem>
                <SelectItem value="structured">Structured (courses, tutorials)</SelectItem>
                <SelectItem value="mixed">Mixed approach</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" disabled={isGenerating || !careerGoal.trim()} className="w-full">
            {isGenerating ? (
              <>
                <div className="h-4 w-4 border-2 border-background border-t-transparent rounded-full animate-spin mr-2" />
                Generating AI Roadmap...
              </>
            ) : (
              <>
                <Brain className="h-4 w-4 mr-2" />
                Generate AI Roadmap
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default RoadmapForm;
