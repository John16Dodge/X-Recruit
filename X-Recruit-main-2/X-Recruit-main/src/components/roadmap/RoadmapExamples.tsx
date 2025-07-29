
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Target, Clock, User } from 'lucide-react';

interface ExampleRoadmap {
  title: string;
  careerGoal: string;
  currentSkills: string[];
  experience: string;
  timeframe: string;
  learningStyle: string;
  expectedOutcome: string;
}

const examples: ExampleRoadmap[] = [
  {
    title: "Full Stack Developer",
    careerGoal: "I want to become a full stack developer specializing in React and Node.js, capable of building complete web applications from frontend to backend.",
    currentSkills: ["HTML", "CSS", "JavaScript", "Basic React"],
    experience: "some-experience",
    timeframe: "6-12-months",
    learningStyle: "hands-on",
    expectedOutcome: "Comprehensive roadmap with React, Node.js, databases, deployment, and portfolio projects"
  },
  {
    title: "Data Scientist",
    careerGoal: "I want to transition into data science, focusing on machine learning and predictive analytics for business insights.",
    currentSkills: ["Python", "Statistics", "Excel"],
    experience: "intermediate",
    timeframe: "1-2-years",
    learningStyle: "structured",
    expectedOutcome: "Path covering Python libraries (pandas, scikit-learn), SQL, ML algorithms, and real-world projects"
  },
  {
    title: "UX/UI Designer",
    careerGoal: "I want to become a UX/UI designer creating intuitive and beautiful digital experiences for web and mobile applications.",
    currentSkills: ["Photoshop", "Basic Design Principles"],
    experience: "complete-beginner",
    timeframe: "6-12-months",
    learningStyle: "visual",
    expectedOutcome: "Design thinking, Figma, prototyping, user research, and portfolio development"
  },
  {
    title: "DevOps Engineer",
    careerGoal: "I want to become a DevOps engineer specializing in cloud infrastructure, automation, and CI/CD pipelines.",
    currentSkills: ["Linux", "Basic AWS", "Docker"],
    experience: "intermediate",
    timeframe: "6-12-months",
    learningStyle: "hands-on",
    expectedOutcome: "Kubernetes, Terraform, Jenkins, monitoring, and cloud certifications"
  },
  {
    title: "Digital Marketing Manager",
    careerGoal: "I want to become a digital marketing manager, focusing on social media, content marketing, and data-driven campaigns.",
    currentSkills: ["Social Media", "Content Writing", "Google Analytics"],
    experience: "some-experience",
    timeframe: "3-6-months",
    learningStyle: "mixed",
    expectedOutcome: "SEO, PPC, email marketing, marketing automation, and campaign optimization"
  },
  {
    title: "Cybersecurity Analyst",
    careerGoal: "I want to become a cybersecurity analyst, specializing in threat detection, incident response, and security monitoring.",
    currentSkills: ["Networking", "Windows Administration"],
    experience: "some-experience",
    timeframe: "1-2-years",
    learningStyle: "structured",
    expectedOutcome: "Security tools, penetration testing, SIEM, compliance, and security certifications"
  }
];

const RoadmapExamples = () => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Test Examples</h2>
        <p className="text-muted-foreground">
          Here are some example inputs that demonstrate the AI roadmap generator's versatility across different career paths.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {examples.map((example, index) => (
          <Card key={index} className="border-l-4 border-l-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Target className="h-5 w-5 text-primary" />
                {example.title}
              </CardTitle>
              <CardDescription>Example input for AI roadmap generation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="h-4 w-4 text-amber-500" />
                  <span className="text-sm font-medium">Career Goal:</span>
                </div>
                <p className="text-sm text-muted-foreground pl-6">{example.careerGoal}</p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <User className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">Current Skills:</span>
                </div>
                <div className="flex flex-wrap gap-1 pl-6">
                  {example.currentSkills.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pl-6">
                <div>
                  <span className="text-xs font-medium text-muted-foreground">Experience:</span>
                  <p className="text-sm">{example.experience.replace('-', ' ')}</p>
                </div>
                <div>
                  <span className="text-xs font-medium text-muted-foreground">Timeframe:</span>
                  <p className="text-sm">{example.timeframe.replace('-', ' ')}</p>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">Expected Outcome:</span>
                </div>
                <p className="text-sm text-muted-foreground pl-6">{example.expectedOutcome}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="text-lg">How to Test</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Add your OpenAI API key in the form above</li>
            <li>Copy any of the example career goals into the "Career Goal" field</li>
            <li>Add the corresponding skills, experience level, and preferences</li>
            <li>Click "Generate AI Roadmap" to see the personalized results</li>
            <li>The AI will create a detailed roadmap with steps, resources, tools, and certifications</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoadmapExamples;
