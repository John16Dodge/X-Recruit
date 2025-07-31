import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getJob, applyForJob, Job } from '@/services/JobService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, DollarSign, Briefcase, Clock } from 'lucide-react';

const JobDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [isApplying, setIsApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      if (id) {
        try {
          const fetchedJob = await getJob(id);
          setJob(fetchedJob);
        } catch (error) {
          console.error('Failed to fetch job:', error);
        }
      }
    };
    fetchJob();
  }, [id]);

  const handleApply = async () => {
    if (!id || !coverLetter.trim()) return;
    
    setIsApplying(true);
    try {
      await applyForJob(id, coverLetter);
      setHasApplied(true);
    } catch (error) {
      console.error('Failed to apply for job:', error);
    } finally {
      setIsApplying(false);
    }
  };

  if (!job) {
    return <div className="container mx-auto py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{job.title}</CardTitle>
          <div className="flex items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-1">
              <Briefcase className="h-4 w-4" />
              <span>{job.company}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{job.location}</span>
            </div>
            <Badge variant="secondary">{job.type}</Badge>
            <Badge variant="outline">{job.experience}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Job Description</h3>
            <p className="text-muted-foreground whitespace-pre-line">{job.description}</p>
          </div>

          {job.requirements && (
            <div>
              <h3 className="text-xl font-semibold mb-2">Requirements</h3>
              <p className="text-muted-foreground whitespace-pre-line">{job.requirements}</p>
            </div>
          )}

          {job.skills && (
            <div>
              <h3 className="text-xl font-semibold mb-2">Required Skills</h3>
              <p className="text-muted-foreground">{job.skills}</p>
            </div>
          )}

          {job.salary && (
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              <span className="font-medium">Salary: {job.salary}</span>
            </div>
          )}

          {job.applicationDeadline && (
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span className="font-medium">
                Application Deadline: {new Date(job.applicationDeadline).toLocaleDateString()}
              </span>
            </div>
          )}

          {!hasApplied ? (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Apply for this Position</h3>
              <Textarea
                placeholder="Write your cover letter here..."
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                rows={6}
              />
              <Button 
                onClick={handleApply} 
                disabled={isApplying || !coverLetter.trim()}
                className="w-full"
              >
                {isApplying ? 'Applying...' : 'Apply Now'}
              </Button>
            </div>
          ) : (
            <div className="text-center py-8">
              <h3 className="text-xl font-semibold text-green-600 mb-2">Application Submitted!</h3>
              <p className="text-muted-foreground">
                Your application has been submitted successfully. The recruiter will review it and get back to you.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default JobDetail;
