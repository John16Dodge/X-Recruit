import React, { useState } from 'react';
import { api } from '@/services/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { User, Mail, Phone, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  linkedIn: string;
  portfolio: string;
}

const PersonalInfoSection: React.FC = () => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    linkedIn: '',
    portfolio: ''
  });
  const { toast } = useToast();

  const handleChange = (field: keyof PersonalInfo, value: string) => {
    setPersonalInfo(prev => ({ ...prev, [field]: value }));
  };

  const savePersonalInfo = async () => {
    try {
      await api.post('/personal-info', personalInfo);
      toast({
        title: 'Success',
        description: 'Personal information saved successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save personal information.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Personal Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Full Name</label>
            <Input
              placeholder="Enter your full name"
              value={personalInfo.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-1">
              <Mail className="h-4 w-4" />
              Email
            </label>
            <Input
              type="email"
              placeholder="your.email@example.com"
              value={personalInfo.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-1">
              <Phone className="h-4 w-4" />
              Phone
            </label>
            <Input
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={personalInfo.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              Location
            </label>
            <Input
              placeholder="City, State/Country"
              value={personalInfo.location}
              onChange={(e) => handleChange('location', e.target.value)}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">LinkedIn Profile</label>
            <Input
              placeholder="https://linkedin.com/in/yourprofile"
              value={personalInfo.linkedIn}
              onChange={(e) => handleChange('linkedIn', e.target.value)}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">Portfolio Website</label>
            <Input
              placeholder="https://yourportfolio.com"
              value={personalInfo.portfolio}
              onChange={(e) => handleChange('portfolio', e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Bio/Introduction</label>
          <Textarea
            placeholder="Write a brief introduction about yourself, your interests, and career goals..."
            value={personalInfo.bio}
            onChange={(e) => handleChange('bio', e.target.value)}
            rows={4}
          />
        </div>
        <Button type="button" onClick={savePersonalInfo}>
          Save Personal Information
        </Button>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoSection;
