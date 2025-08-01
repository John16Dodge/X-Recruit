import React, { useState } from 'react';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';

const Cards = () => {
  const [openModal, setOpenModal] = useState(null);

  const handleOpenModal = (type) => {
    setOpenModal(type);
  };

  const handleCloseModal = () => {
    setOpenModal(null);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      {/* Student Card */}
      <Card>
        <CardHeader>
          <div className="icon">{/* Student Icon */}</div>
          <CardTitle>For Students</CardTitle>
          <CardDescription>Discover perfect job matches and accelerate your career growth.</CardDescription>
        </CardHeader>
        <CardContent />
        <CardFooter>
          <Button variant="default" onClick={() => handleOpenModal('student')}>Student Sign Up</Button>
        </CardFooter>
      </Card>

      {/* College Card */}
      <Card>
        <CardHeader>
          <div className="icon">{/* College Icon */}</div>
          <CardTitle>For Colleges</CardTitle>
          <CardDescription>Enhance your campus placements with AI-powered tools.</CardDescription>
        </CardHeader>
        <CardContent />
        <CardFooter>
          <Button variant="default" onClick={() => handleOpenModal('college')}>College Sign Up</Button>
        </CardFooter>
      </Card>

      {/* Recruiter Card */}
      <Card>
        <CardHeader>
          <div className="icon">{/* Recruiter Icon */}</div>
          <CardTitle>For Recruiters</CardTitle>
          <CardDescription>Find the perfect candidates efficiently and reduce hiring time.</CardDescription>
        </CardHeader>
        <CardContent />
        <CardFooter>
          <Button variant="default" onClick={() => handleOpenModal('recruiter')}>Recruiter Sign Up</Button>
        </CardFooter>
      </Card>

      {/* Modal Dialogs */}
      {openModal && (
        <Dialog open={!!openModal} onOpenChange={handleCloseModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{openModal === 'student' ? 'Student Sign Up' : openModal === 'college' ? 'College Sign Up' : 'Recruiter Sign Up'}</DialogTitle>
            </DialogHeader>
            <Form onSubmit={(e) => e.preventDefault()}>
              {/* Form Fields */}
              {openModal === 'student' && (
                <>
                  <FormField name="name">
                    {({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl><Input placeholder="Your Name" {...field} required /></FormControl>
                      </FormItem>
                    )}
                  </FormField>
                  <FormField name="email">
                    {({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl><Input type="email" placeholder="Your Email" {...field} required /></FormControl>
                        <FormMessage>Error message</FormMessage>
                      </FormItem>
                    )}
                  </FormField>
                  <FormField name="password">
                    {({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl><Input type="password" placeholder="Password" {...field} required /></FormControl>
                      </FormItem>
                    )}
                  </FormField>
                </>
              )}

              {openModal === 'college' && (
                <>
                  <FormField name="collegeName">
                    {({ field }) => (
                      <FormItem>
                        <FormLabel>College Name</FormLabel>
                        <FormControl><Input placeholder="College Name" {...field} required /></FormControl>
                      </FormItem>
                    )}
                  </FormField>
                  <FormField name="officerName">
                    {({ field }) => (
                      <FormItem>
                        <FormLabel>Placement Officer Name</FormLabel>
                        <FormControl><Input placeholder="Placement Officer Name" {...field} required /></FormControl>
                      </FormItem>
                    )}
                  </FormField>
                </>
              )}

              {openModal === 'recruiter' && (
                <>
                  <FormField name="companyName">
                    {({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl><Input placeholder="Company Name" {...field} required /></FormControl>
                      </FormItem>
                    )}
                  </FormField>
                  <FormField name="hrName">
                    {({ field }) => (
                      <FormItem>
                        <FormLabel>HR Contact Name</FormLabel>
                        <FormControl><Input placeholder="HR Contact Name" {...field} required /></FormControl>
                      </FormItem>
                    )}
                  </FormField>
                </>
              )}

              <DialogFooter>
                <Button variant="primary" type="submit">Submit</Button>
              </DialogFooter>
            </Form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Cards;

