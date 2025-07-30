
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlusCircle, Trash2 } from 'lucide-react';
import ThemeToggle from '@/components/ui/theme-toggle';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  headline: z.string().optional(),
  location: z.string().optional(),
  email: z.string().email('Invalid email address.'),
  phone: z.string().optional(),
  website: z.string().url('Invalid URL.').optional(),
  bio: z.string().max(500, 'Bio must be less than 500 characters.').optional(),
  linkedin: z.string().url().optional(),
  github: z.string().url().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const ProfileEdit: React.FC = () => {
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [experience, setExperience] = useState([{ title: '', company: '', startDate: '', endDate: '', description: '' }]);
  const [education, setEducation] = useState([{ school: '', degree: '', field: '', startDate: '', endDate: '' }]);
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      headline: '',
      location: '',
      email: '',
      phone: '',
      website: '',
      bio: '',
      linkedin: '',
      github: '',
    },
  });

  const handlePictureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => setProfilePicture(e.target?.result as string);
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const addExperience = () => setExperience([...experience, { title: '', company: '', startDate: '', endDate: '', description: '' }]);
  const removeExperience = (index: number) => setExperience(experience.filter((_, i) => i !== index));

  const addEducation = () => setEducation([...education, { school: '', degree: '', field: '', startDate: '', endDate: '' }]);
  const removeEducation = (index: number) => setEducation(education.filter((_, i) => i !== index));
  
  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };
  const removeSkill = (skill: string) => setSkills(skills.filter(s => s !== skill));

  const onSubmit = (data: ProfileFormValues) => {
    console.log({ ...data, profilePicture, experience, education, skills });
    // Handle form submission logic here
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Edit Profile</h1>
          <ThemeToggle />
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={profilePicture ?? undefined} alt="Profile Picture" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Input type="file" onChange={handlePictureUpload} />
                </div>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="headline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Headline</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Full Stack Developer" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., San Francisco, CA" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl><Input type="email" placeholder="your.email@example.com" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="phone" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl><Input placeholder="Your phone number" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="website" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website</FormLabel>
                    <FormControl><Input placeholder="https://your.website" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField control={form.control} name="bio" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Summary / Bio</FormLabel>
                    <FormControl><Textarea placeholder="Tell us about yourself" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Experience</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {experience.map((exp, index) => (
                  <div key={index} className="space-y-2 p-4 border rounded-lg relative">
                    <Input placeholder="Job Title" value={exp.title} onChange={(e) => { const newExp = [...experience]; newExp[index].title = e.target.value; setExperience(newExp); }} />
                    <Input placeholder="Company" value={exp.company} onChange={(e) => { const newExp = [...experience]; newExp[index].company = e.target.value; setExperience(newExp); }} />
                    <div className="flex space-x-2">
                      <Input type="date" placeholder="Start Date" value={exp.startDate} onChange={(e) => { const newExp = [...experience]; newExp[index].startDate = e.target.value; setExperience(newExp); }} />
                      <Input type="date" placeholder="End Date" value={exp.endDate} onChange={(e) => { const newExp = [...experience]; newExp[index].endDate = e.target.value; setExperience(newExp); }} />
                    </div>
                    <Textarea placeholder="Description" value={exp.description} onChange={(e) => { const newExp = [...experience]; newExp[index].description = e.target.value; setExperience(newExp); }} />
                    <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeExperience(index)}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={addExperience}><PlusCircle className="mr-2 h-4 w-4" /> Add Experience</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Education</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index} className="space-y-2 p-4 border rounded-lg relative">
                    <Input placeholder="School or University" value={edu.school} onChange={(e) => { const newEdu = [...education]; newEdu[index].school = e.target.value; setEducation(newEdu); }} />
                    <Input placeholder="Degree" value={edu.degree} onChange={(e) => { const newEdu = [...education]; newEdu[index].degree = e.target.value; setEducation(newEdu); }} />
                    <Input placeholder="Field of Study" value={edu.field} onChange={(e) => { const newEdu = [...education]; newEdu[index].field = e.target.value; setEducation(newEdu); }} />
                    <div className="flex space-x-2">
                      <Input type="date" placeholder="Start Date" value={edu.startDate} onChange={(e) => { const newEdu = [...education]; newEdu[index].startDate = e.target.value; setEducation(newEdu); }} />
                      <Input type="date" placeholder="End Date" value={edu.endDate} onChange={(e) => { const newEdu = [...education]; newEdu[index].endDate = e.target.value; setEducation(newEdu); }} />
                    </div>
                    <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeEducation(index)}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={addEducation}><PlusCircle className="mr-2 h-4 w-4" /> Add Education</Button>
              </CardContent>
            </Card>

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
                    onKeyDown={(e) => e.key === 'Enter' && addSkill()}
                  />
                  <Button type="button" onClick={addSkill}>Add</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.map(skill => (
                    <div key={skill} className="flex items-center bg-secondary text-secondary-foreground rounded-full px-3 py-1">
                      <span>{skill}</span>
                      <Button variant="ghost" size="icon" className="h-6 w-6 ml-2" onClick={() => removeSkill(skill)}><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Social Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField control={form.control} name="linkedin" render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn</FormLabel>
                    <FormControl><Input placeholder="https://linkedin.com/in/yourprofile" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="github" render={({ field }) => (
                  <FormItem>
                    <FormLabel>GitHub</FormLabel>
                    <FormControl><Input placeholder="https://github.com/yourusername" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </CardContent>
            </Card>

            <Button type="submit" size="lg" className="w-full">Save Profile</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ProfileEdit;

