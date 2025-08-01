import React, { useState } from 'react';
import { api } from '@/services/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface VolunteerExperience {
  id?: string;
  title: string;
  organization: string;
  duration: string;
  impact: string;
}

const VolunteerExperienceSection: React.FC = () => {
  const [volunteerExperiences, setVolunteerExperiences] = useState<VolunteerExperience[]>([
    { title: '', organization: '', duration: '', impact: '' }
  ]);
  const { toast } = useToast();

  const addExperience = () =>
    setVolunteerExperiences([...volunteerExperiences, { title: '', organization: '', duration: '', impact: '' }]);

  const removeExperience = (index: number) =>
    setVolunteerExperiences(volunteerExperiences.filter((_, i) => i !== index));

  const handleChange = (index: number, field: keyof VolunteerExperience, value: string) => {
    const newExperiences = [...volunteerExperiences];
    newExperiences[index][field] = value;
    setVolunteerExperiences(newExperiences);
  };

  const saveExperiences = async () => {
    try {
      for (const experience of volunteerExperiences) {
        await api.post('/volunteer_experiences', experience);
      }
      toast({
        title: 'Success',
        description: 'Volunteer experiences saved successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save volunteer experiences.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Volunteer Experience</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {volunteerExperiences.map((exp, index) => (
          <div key={index} className="space-y-2 p-4 border rounded-lg relative">
            <Input
              placeholder="Title"
              value={exp.title}
              onChange={(e) => handleChange(index, 'title', e.target.value)}
            />
            <Input
              placeholder="Organization"
              value={exp.organization}
              onChange={(e) => handleChange(index, 'organization', e.target.value)}
            />
            <Input
              placeholder="Duration"
              value={exp.duration}
              onChange={(e) => handleChange(index, 'duration', e.target.value)}
            />
            <Textarea
              placeholder="Impact"
              value={exp.impact}
              onChange={(e) => handleChange(index, 'impact', e.target.value)}
            />
            <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeExperience(index)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button type="button" variant="outline" onClick={addExperience}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Experience
        </Button>
        <Button type="button" onClick={saveExperiences}>
          Save Experiences
        </Button>
      </CardContent>
    </Card>
  );
};

export default VolunteerExperienceSection;

