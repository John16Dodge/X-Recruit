import React, { useState } from 'react';
import { api } from '@/services/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle, Trash2, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Certification {
  id?: string;
  name: string;
  issuer: string;
  date: string;
  pdfUrl?: string;
}

const CertificationsSection: React.FC = () => {
  const [certifications, setCertifications] = useState<Certification[]>([
    { name: '', issuer: '', date: '' }
  ]);
  const { toast } = useToast();

  const addCertification = () =>
    setCertifications([...certifications, { name: '', issuer: '', date: '' }]);

  const removeCertification = (index: number) =>
    setCertifications(certifications.filter((_, i) => i !== index));

  const handleChange = (index: number, field: keyof Certification, value: string) => {
    const newCertifications = [...certifications];
    newCertifications[index][field] = value;
    setCertifications(newCertifications);
  };

  const handleFileUpload = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // This would typically upload to a file storage service
      const newCertifications = [...certifications];
      newCertifications[index].pdfUrl = URL.createObjectURL(file);
      setCertifications(newCertifications);
    }
  };

  const saveCertifications = async () => {
    try {
      for (const cert of certifications) {
        await api.post('/certifications', cert);
      }
      toast({
        title: 'Success',
        description: 'Certifications saved successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save certifications.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Certifications</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {certifications.map((cert, index) => (
          <div key={index} className="space-y-2 p-4 border rounded-lg relative">
            <Input
              placeholder="Certification Name"
              value={cert.name}
              onChange={(e) => handleChange(index, 'name', e.target.value)}
            />
            <Input
              placeholder="Issuing Organization"
              value={cert.issuer}
              onChange={(e) => handleChange(index, 'issuer', e.target.value)}
            />
            <Input
              type="date"
              placeholder="Date Obtained"
              value={cert.date}
              onChange={(e) => handleChange(index, 'date', e.target.value)}
            />
            <div className="flex items-center space-x-2">
              <Input
                type="file"
                accept=".pdf"
                onChange={(e) => handleFileUpload(index, e)}
                className="flex-1"
              />
              <Upload className="h-4 w-4" />
            </div>
            {cert.pdfUrl && (
              <p className="text-sm text-green-600">PDF uploaded successfully</p>
            )}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2"
              onClick={() => removeCertification(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button type="button" variant="outline" onClick={addCertification}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Certification
        </Button>
        <Button type="button" onClick={saveCertifications}>
          Save Certifications
        </Button>
      </CardContent>
    </Card>
  );
};

export default CertificationsSection;
