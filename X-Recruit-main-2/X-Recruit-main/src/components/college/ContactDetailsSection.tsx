import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Save, PlusCircle, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface ContactPerson {
  name: string;
  designation: string;
  email: string;
  phone: string;
  department: string;
}

const ContactDetailsSection = () => {
  const [contactInfo, setContactInfo] = useState({
    mainPhone: '',
    mainEmail: '',
    admissionPhone: '',
    admissionEmail: '',
    placementPhone: '',
    placementEmail: '',
  });

  const [contactPersons, setContactPersons] = useState<ContactPerson[]>([
    { name: '', designation: '', email: '', phone: '', department: '' }
  ]);

  const [isEditing, setIsEditing] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContactPersonChange = (index: number, field: keyof ContactPerson, value: string) => {
    const updatedPersons = [...contactPersons];
    updatedPersons[index][field] = value;
    setContactPersons(updatedPersons);
  };

  const addContactPerson = () => {
    setContactPersons([...contactPersons, { name: '', designation: '', email: '', phone: '', department: '' }]);
  };

  const removeContactPerson = (index: number) => {
    if (contactPersons.length > 1) {
      setContactPersons(contactPersons.filter((_, i) => i !== index));
    } else {
      toast.error('At least one contact person is required');
    }
  };

  const handleSave = () => {
    // Here you would typically save the data to your backend
    console.log('Saving contact info:', { contactInfo, contactPersons });
    toast.success('Contact details saved successfully!');
    setIsEditing(false);
  };

  return (
    <Card className="w-full shadow-md mt-6">
      <CardHeader className="bg-slate-50 dark:bg-slate-800">
        <CardTitle className="text-xl font-semibold flex justify-between items-center">
          <span>Contact Details</span>
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
            {/* Main Contact Information */}
            <div className="space-y-4">
              <h3 className="font-medium text-md">General Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Main Phone Number</label>
                  <Input
                    name="mainPhone"
                    value={contactInfo.mainPhone}
                    onChange={handleChange}
                    placeholder="Main contact number"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Main Email</label>
                  <Input
                    name="mainEmail"
                    value={contactInfo.mainEmail}
                    onChange={handleChange}
                    placeholder="Main email address"
                    type="email"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Admissions Phone</label>
                  <Input
                    name="admissionPhone"
                    value={contactInfo.admissionPhone}
                    onChange={handleChange}
                    placeholder="Admissions contact number"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Admissions Email</label>
                  <Input
                    name="admissionEmail"
                    value={contactInfo.admissionEmail}
                    onChange={handleChange}
                    placeholder="Admissions email address"
                    type="email"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Placement Cell Phone</label>
                  <Input
                    name="placementPhone"
                    value={contactInfo.placementPhone}
                    onChange={handleChange}
                    placeholder="Placement cell contact number"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Placement Cell Email</label>
                  <Input
                    name="placementEmail"
                    value={contactInfo.placementEmail}
                    onChange={handleChange}
                    placeholder="Placement cell email address"
                    type="email"
                  />
                </div>
              </div>
            </div>

            {/* Contact Persons */}
            <div className="space-y-4">
              <h3 className="font-medium text-md">Key Contact Persons</h3>
              
              {contactPersons.map((person, index) => (
                <div key={index} className="p-4 border rounded-lg relative space-y-3">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => removeContactPerson(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Full Name</label>
                      <Input
                        value={person.name}
                        onChange={(e) => handleContactPersonChange(index, 'name', e.target.value)}
                        placeholder="Contact person name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Designation</label>
                      <Input
                        value={person.designation}
                        onChange={(e) => handleContactPersonChange(index, 'designation', e.target.value)}
                        placeholder="Position/Designation"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Department</label>
                      <Input
                        value={person.department}
                        onChange={(e) => handleContactPersonChange(index, 'department', e.target.value)}
                        placeholder="Department"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input
                        value={person.email}
                        onChange={(e) => handleContactPersonChange(index, 'email', e.target.value)}
                        placeholder="Email address"
                        type="email"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Phone</label>
                      <Input
                        value={person.phone}
                        onChange={(e) => handleContactPersonChange(index, 'phone', e.target.value)}
                        placeholder="Phone number"
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              <Button 
                variant="outline" 
                onClick={addContactPerson}
                className="w-full"
              >
                <PlusCircle className="mr-2 h-4 w-4" /> Add Contact Person
              </Button>
            </div>

            <Button 
              onClick={handleSave} 
              className="w-full mt-4"
            >
              <Save className="mr-2 h-4 w-4" /> Save Contact Details
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Display General Contact Information */}
            <div className="space-y-2">
              <h3 className="font-medium text-md">General Contact Information</h3>
              
              {(contactInfo.mainPhone || contactInfo.mainEmail) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {contactInfo.mainPhone && (
                    <p><span className="font-medium">Main Phone:</span> {contactInfo.mainPhone}</p>
                  )}
                  {contactInfo.mainEmail && (
                    <p><span className="font-medium">Main Email:</span> {contactInfo.mainEmail}</p>
                  )}
                </div>
              )}
              
              {(contactInfo.admissionPhone || contactInfo.admissionEmail) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {contactInfo.admissionPhone && (
                    <p><span className="font-medium">Admissions Phone:</span> {contactInfo.admissionPhone}</p>
                  )}
                  {contactInfo.admissionEmail && (
                    <p><span className="font-medium">Admissions Email:</span> {contactInfo.admissionEmail}</p>
                  )}
                </div>
              )}
              
              {(contactInfo.placementPhone || contactInfo.placementEmail) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {contactInfo.placementPhone && (
                    <p><span className="font-medium">Placement Cell Phone:</span> {contactInfo.placementPhone}</p>
                  )}
                  {contactInfo.placementEmail && (
                    <p><span className="font-medium">Placement Cell Email:</span> {contactInfo.placementEmail}</p>
                  )}
                </div>
              )}

              {!contactInfo.mainPhone && !contactInfo.mainEmail && 
               !contactInfo.admissionPhone && !contactInfo.admissionEmail && 
               !contactInfo.placementPhone && !contactInfo.placementEmail && (
                <p className="text-gray-500 italic">No general contact information added yet.</p>
              )}
            </div>

            {/* Display Contact Persons */}
            <div className="space-y-4">
              <h3 className="font-medium text-md">Key Contact Persons</h3>
              
              {contactPersons.some(person => person.name || person.email || person.phone) ? (
                <div className="space-y-4">
                  {contactPersons.map((person, index) => (
                    person.name || person.email || person.phone ? (
                      <div key={index} className="p-3 border rounded-lg">
                        {person.name && (
                          <p className="font-medium">{person.name}{person.designation ? `, ${person.designation}` : ''}</p>
                        )}
                        {person.department && (
                          <p className="text-sm text-gray-600 dark:text-gray-300">{person.department}</p>
                        )}
                        <div className="mt-1 text-sm">
                          {person.email && (
                            <p>Email: {person.email}</p>
                          )}
                          {person.phone && (
                            <p>Phone: {person.phone}</p>
                          )}
                        </div>
                      </div>
                    ) : null
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">No contact persons added yet.</p>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ContactDetailsSection;