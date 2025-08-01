import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Save, PlusCircle, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface PlacementYear {
  year: string;
  placementPercentage: string;
  averageSalary: string;
  highestSalary: string;
  topRecruiters: string;
  notes: string;
}

const PlacementHistorySection = () => {
  const [placementHistory, setPlacementHistory] = useState<PlacementYear[]>([
    { 
      year: '', 
      placementPercentage: '', 
      averageSalary: '', 
      highestSalary: '', 
      topRecruiters: '',
      notes: ''
    }
  ]);

  const [isEditing, setIsEditing] = useState(true);

  const handlePlacementChange = (index: number, field: keyof PlacementYear, value: string) => {
    const updatedHistory = [...placementHistory];
    updatedHistory[index][field] = value;
    setPlacementHistory(updatedHistory);
  };

  const addPlacementYear = () => {
    setPlacementHistory([
      ...placementHistory, 
      { 
        year: '', 
        placementPercentage: '', 
        averageSalary: '', 
        highestSalary: '', 
        topRecruiters: '',
        notes: ''
      }
    ]);
  };

  const removePlacementYear = (index: number) => {
    if (placementHistory.length > 1) {
      setPlacementHistory(placementHistory.filter((_, i) => i !== index));
    } else {
      toast.error('At least one placement year is required');
    }
  };

  const handleSave = () => {
    // Here you would typically save the data to your backend
    console.log('Saving placement history:', placementHistory);
    toast.success('Placement history saved successfully!');
    setIsEditing(false);
  };

  return (
    <Card className="w-full shadow-md mt-6">
      <CardHeader className="bg-slate-50 dark:bg-slate-800">
        <CardTitle className="text-xl font-semibold flex justify-between items-center">
          <span>Placement History</span>
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
            {placementHistory.map((placement, index) => (
              <div key={index} className="p-4 border rounded-lg relative space-y-3">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => removePlacementYear(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Academic Year</label>
                    <Input
                      value={placement.year}
                      onChange={(e) => handlePlacementChange(index, 'year', e.target.value)}
                      placeholder="e.g., 2022-23"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Placement Percentage</label>
                    <Input
                      value={placement.placementPercentage}
                      onChange={(e) => handlePlacementChange(index, 'placementPercentage', e.target.value)}
                      placeholder="e.g., 85%"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Average Package (LPA)</label>
                    <Input
                      value={placement.averageSalary}
                      onChange={(e) => handlePlacementChange(index, 'averageSalary', e.target.value)}
                      placeholder="e.g., 6.5"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Highest Package (LPA)</label>
                    <Input
                      value={placement.highestSalary}
                      onChange={(e) => handlePlacementChange(index, 'highestSalary', e.target.value)}
                      placeholder="e.g., 24"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Top Recruiters</label>
                  <Input
                    value={placement.topRecruiters}
                    onChange={(e) => handlePlacementChange(index, 'topRecruiters', e.target.value)}
                    placeholder="e.g., Google, Microsoft, Amazon (comma separated)"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Additional Notes</label>
                  <Textarea
                    value={placement.notes}
                    onChange={(e) => handlePlacementChange(index, 'notes', e.target.value)}
                    placeholder="Any additional information about placements this year"
                    rows={2}
                  />
                </div>
              </div>
            ))}
            
            <Button 
              variant="outline" 
              onClick={addPlacementYear}
              className="w-full"
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Add Placement Year
            </Button>

            <Button 
              onClick={handleSave} 
              className="w-full mt-4"
            >
              <Save className="mr-2 h-4 w-4" /> Save Placement History
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {placementHistory.some(p => p.year) ? (
              <div className="space-y-4">
                {placementHistory.map((placement, index) => (
                  placement.year ? (
                    <div key={index} className="p-4 border rounded-lg">
                      <h3 className="font-semibold text-lg">Academic Year: {placement.year}</h3>
                      
                      <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-2">
                        {placement.placementPercentage && (
                          <p><span className="font-medium">Placement Rate:</span> {placement.placementPercentage}</p>
                        )}
                        {placement.averageSalary && (
                          <p><span className="font-medium">Avg Package:</span> {placement.averageSalary} LPA</p>
                        )}
                        {placement.highestSalary && (
                          <p><span className="font-medium">Highest Package:</span> {placement.highestSalary} LPA</p>
                        )}
                      </div>
                      
                      {placement.topRecruiters && (
                        <p className="mt-2"><span className="font-medium">Top Recruiters:</span> {placement.topRecruiters}</p>
                      )}
                      
                      {placement.notes && (
                        <p className="mt-2 text-gray-600 dark:text-gray-300">{placement.notes}</p>
                      )}
                    </div>
                  ) : null
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No placement history added yet. Click Edit to add placement data.</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PlacementHistorySection;