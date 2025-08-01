import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Save, PlusCircle, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface Facility {
  name: string;
  description: string;
  capacity: string;
  features: string;
}

const FacilitiesSection = () => {
  const [facilities, setFacilities] = useState<Facility[]>([
    { name: '', description: '', capacity: '', features: '' }
  ]);

  const [isEditing, setIsEditing] = useState(true);

  const handleFacilityChange = (index: number, field: keyof Facility, value: string) => {
    const updatedFacilities = [...facilities];
    updatedFacilities[index][field] = value;
    setFacilities(updatedFacilities);
  };

  const addFacility = () => {
    setFacilities([...facilities, { name: '', description: '', capacity: '', features: '' }]);
  };

  const removeFacility = (index: number) => {
    if (facilities.length > 1) {
      setFacilities(facilities.filter((_, i) => i !== index));
    } else {
      toast.error('At least one facility is required');
    }
  };

  const handleSave = () => {
    // Here you would typically save the data to your backend
    console.log('Saving facilities:', facilities);
    toast.success('Facilities saved successfully!');
    setIsEditing(false);
  };

  return (
    <Card className="w-full shadow-md mt-6">
      <CardHeader className="bg-slate-50 dark:bg-slate-800">
        <CardTitle className="text-xl font-semibold flex justify-between items-center">
          <span>Facilities & Infrastructure</span>
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
            {facilities.map((facility, index) => (
              <div key={index} className="p-4 border rounded-lg relative space-y-3">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => removeFacility(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Facility Name</label>
                    <Input
                      value={facility.name}
                      onChange={(e) => handleFacilityChange(index, 'name', e.target.value)}
                      placeholder="e.g., Library, Computer Lab, Sports Complex"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Capacity/Size</label>
                    <Input
                      value={facility.capacity}
                      onChange={(e) => handleFacilityChange(index, 'capacity', e.target.value)}
                      placeholder="e.g., 500 seats, 10,000 sq ft"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Key Features</label>
                  <Input
                    value={facility.features}
                    onChange={(e) => handleFacilityChange(index, 'features', e.target.value)}
                    placeholder="e.g., Wi-Fi, Air Conditioning, Modern Equipment (comma separated)"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    value={facility.description}
                    onChange={(e) => handleFacilityChange(index, 'description', e.target.value)}
                    placeholder="Brief description of the facility"
                    rows={3}
                  />
                </div>
              </div>
            ))}
            
            <Button 
              variant="outline" 
              onClick={addFacility}
              className="w-full"
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Add Facility
            </Button>

            <Button 
              onClick={handleSave} 
              className="w-full mt-4"
            >
              <Save className="mr-2 h-4 w-4" /> Save Facilities
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {facilities.some(facility => facility.name) ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {facilities.map((facility, index) => (
                  facility.name ? (
                    <div key={index} className="p-4 border rounded-lg">
                      <h3 className="font-semibold text-lg">{facility.name}</h3>
                      
                      {facility.capacity && (
                        <p className="mt-1 text-sm"><span className="font-medium">Capacity:</span> {facility.capacity}</p>
                      )}
                      
                      {facility.features && (
                        <p className="mt-1 text-sm"><span className="font-medium">Features:</span> {facility.features}</p>
                      )}
                      
                      {facility.description && (
                        <p className="mt-2 text-gray-600 dark:text-gray-300">{facility.description}</p>
                      )}
                    </div>
                  ) : null
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No facilities added yet. Click Edit to add facilities.</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FacilitiesSection;