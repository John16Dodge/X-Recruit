import React, { useState } from 'react';
import { api } from '@/services/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Experience {
  id?: string;
  company: string;
  title: string;
  duration: string;
  description: string;
}

const ExperienceSection: React.FC = () => {
  const [experience, setExperience] = useState<Experience[]>([{ company: '', title: '', duration: '', description: '' }]);
  const { toast } = useToast();

  const addExperience = () => setExperience([...experience, { company: '', title: '', duration: '', description: '' }]);
  const removeExperience = (index: number) => setExperience(experience.filter((_, i) => i !== index));

  const handleChange = (index: number, field: keyof Experience, value: string) => {
    const newExperience = [...experience];
    newExperience[index][field] = value;
    setExperience(newExperience);
  };

  const saveExperience = async () => {
    try {
      for (const exp of experience) {
        await api.post('/experiences', exp);
      }
      toast({
        title: 'Success',
        description: 'Experience saved successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save experience.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Work Experience</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {experience.map((exp, index) => (
          <div key={index} className="space-y-2 p-4 border rounded-lg relative">
            <Input
              placeholder="Company"
              value={exp.company}
              onChange={(e) => handleChange(index, 'company', e.target.value)}
            />
            <Input
              placeholder="Title"
              value={exp.title}
              onChange={(e) => handleChange(index, 'title', e.target.value)}
            />
            <Input
              placeholder="Duration"
              value={exp.duration}
              onChange={(e) => handleChange(index, 'duration', e.target.value)}
            />
            <Textarea
              placeholder="Description"
              value={exp.description}
              onChange={(e) => handleChange(index, 'description', e.target.value)}
            />
            <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeExperience(index)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button type="button" variant="outline" onClick={addExperience}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Experience
        </Button>
        <Button type="button" onClick={saveExperience}>
          Save Experience
        </Button>
      </CardContent>
    </Card>
  );
};

export default ExperienceSection;
