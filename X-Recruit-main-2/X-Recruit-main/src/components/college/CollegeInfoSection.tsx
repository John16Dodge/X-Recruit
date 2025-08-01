import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Save } from 'lucide-react';
import { toast } from 'sonner';

const CollegeInfoSection = () => {
  const [collegeInfo, setCollegeInfo] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    website: '',
    description: '',
    establishedYear: '',
    collegeType: '',
    accreditation: '',
    affiliation: ''
  });

  const [isEditing, setIsEditing] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCollegeInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setCollegeInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Here you would typically save the data to your backend
    console.log('Saving college info:', collegeInfo);
    toast.success('College information saved successfully!');
    setIsEditing(false);
  };

  const collegeTypes = [
    { value: 'Engineering', label: 'Engineering College' },
    { value: 'Arts & Science', label: 'Arts & Science College' },
    { value: 'Medical', label: 'Medical College' },
    { value: 'Business School', label: 'Business School' },
    { value: 'Law', label: 'Law College' },
    { value: 'University', label: 'University' },
    { value: 'Technical Institute', label: 'Technical Institute' },
    { value: 'Others', label: 'Others' },
  ];

  return (
    <Card className="w-full shadow-md">
      <CardHeader className="bg-slate-50 dark:bg-slate-800">
        <CardTitle className="text-xl font-semibold flex justify-between items-center">
          <span>College Information</span>
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
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">College Name</label>
                <Input
                  name="name"
                  value={collegeInfo.name}
                  onChange={handleChange}
                  placeholder="Enter college name"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Website</label>
                <Input
                  name="website"
                  value={collegeInfo.website}
                  onChange={handleChange}
                  placeholder="https://www.example.edu"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Address</label>
              <Textarea
                name="address"
                value={collegeInfo.address}
                onChange={handleChange}
                placeholder="Enter complete address"
                rows={2}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">City</label>
                <Input
                  name="city"
                  value={collegeInfo.city}
                  onChange={handleChange}
                  placeholder="City"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">State</label>
                <Input
                  name="state"
                  value={collegeInfo.state}
                  onChange={handleChange}
                  placeholder="State"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Pincode</label>
                <Input
                  name="pincode"
                  value={collegeInfo.pincode}
                  onChange={handleChange}
                  placeholder="Pincode"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Established Year</label>
                <Input
                  name="establishedYear"
                  value={collegeInfo.establishedYear}
                  onChange={handleChange}
                  placeholder="Year of establishment"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">College Type</label>
                <Select 
                  value={collegeInfo.collegeType} 
                  onValueChange={(value) => handleSelectChange('collegeType', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select college type" />
                  </SelectTrigger>
                  <SelectContent>
                    {collegeTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Accreditation</label>
                <Input
                  name="accreditation"
                  value={collegeInfo.accreditation}
                  onChange={handleChange}
                  placeholder="NAAC/NBA/AICTE etc."
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">University Affiliation</label>
              <Input
                name="affiliation"
                value={collegeInfo.affiliation}
                onChange={handleChange}
                placeholder="Affiliated university name"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">College Description</label>
              <Textarea
                name="description"
                value={collegeInfo.description}
                onChange={handleChange}
                placeholder="Brief description about the college"
                rows={3}
              />
            </div>

            <Button 
              onClick={handleSave} 
              className="w-full mt-4"
            >
              <Save className="mr-2 h-4 w-4" /> Save College Information
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {collegeInfo.name ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-lg">{collegeInfo.name}</h3>
                    {collegeInfo.website && (
                      <a href={collegeInfo.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        {collegeInfo.website}
                      </a>
                    )}
                  </div>
                  <div>
                    {collegeInfo.establishedYear && (
                      <p><span className="font-medium">Established:</span> {collegeInfo.establishedYear}</p>
                    )}
                    {collegeInfo.collegeType && (
                      <p><span className="font-medium">Type:</span> {collegeInfo.collegeType}</p>
                    )}
                  </div>
                </div>

                {collegeInfo.address && (
                  <p><span className="font-medium">Address:</span> {collegeInfo.address}, {collegeInfo.city}, {collegeInfo.state} - {collegeInfo.pincode}</p>
                )}

                {collegeInfo.accreditation && (
                  <p><span className="font-medium">Accreditation:</span> {collegeInfo.accreditation}</p>
                )}

                {collegeInfo.affiliation && (
                  <p><span className="font-medium">Affiliated to:</span> {collegeInfo.affiliation}</p>
                )}

                {collegeInfo.description && (
                  <div>
                    <p className="font-medium">About:</p>
                    <p className="text-gray-600 dark:text-gray-300">{collegeInfo.description}</p>
                  </div>
                )}
              </>
            ) : (
              <p className="text-gray-500 italic">No college information added yet. Click Edit to add details.</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CollegeInfoSection;