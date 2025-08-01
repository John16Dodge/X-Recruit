import React from 'react';
import { JobPostings } from '@/components/jobs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PostJobPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Post a Job</CardTitle>
          </CardHeader>
          <CardContent>
            <JobPostings />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PostJobPage;

