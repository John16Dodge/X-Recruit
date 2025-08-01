import React, { useState } from 'react';
import { api } from '@/services/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Education {
  id?: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
}

const EducationSection: React.FC = () => {
  const [education, setEducation] = useState<Education[]>([{ school: '', degree: '', field: '', startDate: '', endDate: '' }]);
  const { toast } = useToast();

  const addEducation = () => setEducation([...education, { school: '', degree: '', field: '', startDate: '', endDate: '' }]);
  const removeEducation = (index: number) => setEducation(education.filter((_, i) => i !== index));

  const handleChange = (index: number, field: keyof Education, value: string) => {
    const newEducation = [...education];
    newEducation[index][field] = value;
    setEducation(newEducation);
  };

  const saveEducation = async () => {
    try {
      for (const edu of education) {
        await api.post('/education', edu);
      }
      toast({
        title: 'Success',
        description: 'Education information saved successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save education information.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Education</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {education.map((edu, index) => (
          <div key={index} className="space-y-2 p-4 border rounded-lg relative">
            <Input
              placeholder="School or University"
              value={edu.school}
              onChange={(e) => handleChange(index, 'school', e.target.value)}
            />
            <Input
              placeholder="Degree"
              value={edu.degree}
              onChange={(e) => handleChange(index, 'degree', e.target.value)}
            />
            <Input
              placeholder="Field of Study"
              value={edu.field}
              onChange={(e) => handleChange(index, 'field', e.target.value)}
            />
            <div className="flex space-x-2">
              <Input
                type="date"
                placeholder="Start Date"
                value={edu.startDate}
                onChange={(e) => handleChange(index, 'startDate', e.target.value)}
              />
              <Input
                type="date"
                placeholder="End Date"
                value={edu.endDate}
                onChange={(e) => handleChange(index, 'endDate', e.target.value)}
              />
            </div>
            <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeEducation(index)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button type="button" variant="outline" onClick={addEducation}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Education
        </Button>
        <Button type="button" onClick={saveEducation}>
          Save Education
        </Button>
      </CardContent>
    </Card>
  );
};

export default EducationSection;
