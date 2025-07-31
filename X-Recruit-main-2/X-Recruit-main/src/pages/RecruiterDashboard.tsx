import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getJobs, getApplicants, Job, Applicant } from '@/services/JobService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle, Users, Briefcase, Eye } from 'lucide-react';

const RecruiterDashboard: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loadingApplicants, setLoadingApplicants] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const fetchedJobs = await getJobs();
        setJobs(fetchedJobs);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      }
    };
    fetchJobs();
  }, []);

  const handleViewApplicants = async (job: Job) => {
    setSelectedJob(job);
    setLoadingApplicants(true);
    try {
      const fetchedApplicants = await getApplicants(job.id.toString());
      setApplicants(fetchedApplicants);
    } catch (error) {
      console.error('Failed to fetch applicants:', error);
    } finally {
      setLoadingApplicants(false);
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'pending':
        return 'default';
      case 'reviewed':
        return 'secondary';
      case 'shortlisted':
        return 'outline';
      case 'hired':
        return 'default';
      case 'rejected':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Recruiter Dashboard</h1>
        <Link to="/post-job">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Post New Job
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="jobs" className="space-y-4">
        <TabsList>
          <TabsTrigger value="jobs">My Jobs</TabsTrigger>
          <TabsTrigger value="applicants">Job Applicants</TabsTrigger>
        </TabsList>

        <TabsContent value="jobs" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <Card key={job.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{job.title}</span>
                    <Badge variant={job.status === 'active' ? 'default' : 'secondary'}>
                      {job.status}
                    </Badge>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{job.company}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Briefcase className="h-4 w-4" />
                      <span>{job.type}</span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {job.description}
                    </p>
                    <div className="flex gap-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewApplicants(job)}
                      >
                        <Users className="mr-1 h-3 w-3" />
                        View Applicants
                      </Button>
                      <Link to={`/jobs/${job.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="mr-1 h-3 w-3" />
                          View Job
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="applicants" className="space-y-4">
          {selectedJob ? (
            <Card>
              <CardHeader>
                <CardTitle>
                  Applicants for {selectedJob.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {selectedJob.company} • {selectedJob.location}
                </p>
              </CardHeader>
              <CardContent>
                {loadingApplicants ? (
                  <p>Loading applicants...</p>
                ) : applicants.length > 0 ? (
                  <div className="space-y-4">
                    {applicants.map((applicant) => (
                      <div
                        key={applicant.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div>
                          <h4 className="font-medium">
                            {applicant.firstName} {applicant.lastName}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {applicant.email}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Applied: {new Date(applicant.appliedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge variant={getStatusBadgeVariant(applicant.status)}>
                          {applicant.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    No applicants yet for this position.
                  </p>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground">
                  Select a job from the "My Jobs" tab to view applicants.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RecruiterDashboard;
