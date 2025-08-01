import React, { useState } from 'react';
import { api } from '@/services/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { PlusCircle, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Language {
  id?: string;
  name: string;
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Native';
  level: number; // 1-100 for progress bar
}

const LanguagesSection: React.FC = () => {
  const [languages, setLanguages] = useState<Language[]>([
    { name: '', proficiency: 'Beginner', level: 25 }
  ]);
  const { toast } = useToast();

  const proficiencyLevels = {
    'Beginner': 25,
    'Intermediate': 50,
    'Advanced': 75,
    'Native': 100
  };

  const addLanguage = () =>
    setLanguages([...languages, { name: '', proficiency: 'Beginner', level: 25 }]);

  const removeLanguage = (index: number) =>
    setLanguages(languages.filter((_, i) => i !== index));

  const handleLanguageChange = (index: number, name: string) => {
    const newLanguages = [...languages];
    newLanguages[index].name = name;
    setLanguages(newLanguages);
  };

  const handleProficiencyChange = (index: number, proficiency: Language['proficiency']) => {
    const newLanguages = [...languages];
    newLanguages[index].proficiency = proficiency;
    newLanguages[index].level = proficiencyLevels[proficiency];
    setLanguages(newLanguages);
  };

  const saveLanguages = async () => {
    try {
      for (const language of languages) {
        await api.post('/languages', language);
      }
      toast({
        title: 'Success',
        description: 'Languages saved successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save languages.',
        variant: 'destructive',
      });
    }
  };

  const getProficiencyColor = (proficiency: string) => {
    switch (proficiency) {
      case 'Beginner': return 'text-red-600';
      case 'Intermediate': return 'text-yellow-600';
      case 'Advanced': return 'text-blue-600';
      case 'Native': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Languages</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {languages.map((language, index) => (
          <div key={index} className="space-y-3 p-4 border rounded-lg relative">
            <div className="flex space-x-2">
              <Input
                placeholder="Language (e.g., English, Spanish)"
                value={language.name}
                onChange={(e) => handleLanguageChange(index, e.target.value)}
                className="flex-1"
              />
              <Select
                value={language.proficiency}
                onValueChange={(value) => handleProficiencyChange(index, value as Language['proficiency'])}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Proficiency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                  <SelectItem value="Native">Native</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{language.name || 'Language'}</span>
                <span className={`text-sm font-medium ${getProficiencyColor(language.proficiency)}`}>
                  {language.proficiency}
                </span>
              </div>
              <Progress value={language.level} className="h-2" />
            </div>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2"
              onClick={() => removeLanguage(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button type="button" variant="outline" onClick={addLanguage}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Language
        </Button>
        <Button type="button" onClick={saveLanguages}>
          Save Languages
        </Button>
      </CardContent>
    </Card>
  );
};

export default LanguagesSection;
