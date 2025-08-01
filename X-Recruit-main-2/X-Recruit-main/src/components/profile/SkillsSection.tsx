import React, { useState } from 'react';
import { api } from '@/services/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Skill {
  name: string;
  level: string;
}

const SkillsSection: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const [skillLevel, setSkillLevel] = useState('');
  const { toast } = useToast();

  const addSkill = () => {
    if (newSkill.trim() && skillLevel) {
      setSkills([...skills, { name: newSkill.trim(), level: skillLevel }]);
      setNewSkill('');
      setSkillLevel('');
    }
  };

  const removeSkill = (skillName: string) =>
    setSkills(skills.filter((skill) => skill.name !== skillName));

  const saveSkills = async () => {
    try {
      for (const skill of skills) {
        await api.post('/skills', skill);
      }
      toast({
        title: 'Success',
        description: 'Skills saved successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save skills.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-2">
          <Input
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Add a new skill"
          />
          <Input
            value={skillLevel}
            onChange={(e) => setSkillLevel(e.target.value)}
            placeholder="Skill level"
          />
          <Button type="button" onClick={addSkill}>
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {skills.map(({ name, level }) => (
            <div key={name} className="flex items-center space-x-2">
              <Badge>{name} ({level})</Badge>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeSkill(name)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
        <Button type="button" onClick={saveSkills}>
          Save Skills
        </Button>
      </CardContent>
    </Card>
  );
};

export default SkillsSection;

