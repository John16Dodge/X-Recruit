import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Save, PlusCircle, Trash2, Award } from 'lucide-react';
import { toast } from 'sonner';

interface Achievement {
  title: string;
  year: string;
  category: string;
  description: string;
}

const AchievementsSection = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([
    { title: '', year: '', category: '', description: '' }
  ]);

  const [isEditing, setIsEditing] = useState(true);

  const handleAchievementChange = (index: number, field: keyof Achievement, value: string) => {
    const updatedAchievements = [...achievements];
    updatedAchievements[index][field] = value;
    setAchievements(updatedAchievements);
  };

  const addAchievement = () => {
    setAchievements([...achievements, { title: '', year: '', category: '', description: '' }]);
  };

  const removeAchievement = (index: number) => {
    if (achievements.length > 1) {
      setAchievements(achievements.filter((_, i) => i !== index));
    } else {
      toast.error('At least one achievement is required');
    }
  };

  const handleSave = () => {
    // Here you would typically save the data to your backend
    console.log('Saving achievements:', achievements);
    toast.success('Achievements saved successfully!');
    setIsEditing(false);
  };

  const achievementCategories = [
    'Academic',
    'Research',
    'Sports',
    'Cultural',
    'Innovation',
    'Social Service',
    'Ranking',
    'Accreditation',
    'Award',
    'Other'
  ];

  return (
    <Card className="w-full shadow-md mt-6">
      <CardHeader className="bg-slate-50 dark:bg-slate-800">
        <CardTitle className="text-xl font-semibold flex justify-between items-center">
          <span>Achievements & Recognition</span>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {isEditing ? (
          <div className="space-y-6">
            {achievements.map((achievement, index) => (
              <div key={index} className="p-4 border rounded-lg relative space-y-3">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => removeAchievement(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Achievement Title</label>
                  <Input
                    value={achievement.title}
                    onChange={(e) => handleAchievementChange(index, 'title', e.target.value)}
                    placeholder="e.g., NAAC A++ Accreditation, Ranked #5 in Engineering Colleges"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
                    <select
                      value={achievement.category}
                      onChange={(e) => handleAchievementChange(index, 'category', e.target.value)}
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                      <option value="">Select Category</option>
                      {achievementCategories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Year</label>
                    <Input
                      type="text"
                      value={achievement.year}
                      onChange={(e) => handleAchievementChange(index, 'year', e.target.value)}
                      placeholder="e.g., 2023"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    value={achievement.description}
                    onChange={(e) => handleAchievementChange(index, 'description', e.target.value)}
                    placeholder="Details about the achievement"
                    rows={3}
                  />
                </div>
              </div>
            ))}
            
            <Button 
              variant="outline" 
              onClick={addAchievement}
              className="w-full"
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Add Achievement
            </Button>

            <Button 
              onClick={handleSave} 
              className="w-full mt-4"
            >
              <Save className="mr-2 h-4 w-4" /> Save Achievements
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {achievements.some(achievement => achievement.title) ? (
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  achievement.title ? (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center">
                          <Award className="h-5 w-5 text-yellow-500 mr-2" />
                          <h3 className="font-semibold text-lg">{achievement.title}</h3>
                        </div>
                        <div className="flex items-center space-x-2">
                          {achievement.category && (
                            <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full dark:bg-purple-900 dark:text-purple-300">
                              {achievement.category}
                            </span>
                          )}
                          {achievement.year && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full dark:bg-gray-700 dark:text-gray-300">
                              {achievement.year}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {achievement.description && (
                        <p className="mt-2 text-gray-600 dark:text-gray-300">{achievement.description}</p>
                      )}
                    </div>
                  ) : null
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No achievements added yet. Click Edit to add achievements.</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AchievementsSection;