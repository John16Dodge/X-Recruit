
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Register = () => {
  return (
    <div className="container flex items-center justify-center min-h-screen py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Registration Temporarily Unavailable</CardTitle>
          <CardDescription className="text-center">
            Registration is currently not available through this page
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4 pt-4">
          <p className="text-center text-muted-foreground">
            Please use one of our specialized registration options below
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="flex flex-col w-full gap-2">
            <Button asChild variant="outline" className="w-full">
              <Link to="/auth/student-register">
                Register as Student
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link to="/auth/college-register">
                Register as College
              </Link>
            </Button>
          </div>
          <div className="text-sm text-center text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login here
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
