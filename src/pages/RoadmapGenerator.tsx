
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { BookOpen, Code, Lightbulb, LineChart } from 'lucide-react';

interface Roadmap {
  id: number;
  title: string;
  description: string;
  steps: string[];
  icon: React.ReactNode;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  timeEstimate?: string;
}

const RoadmapGenerator = () => {
  const { toast } = useToast();
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);

  // Simplified demo roadmaps database
  const demoRoadmaps: Record<string, Roadmap[]> = {
    frontend: [
      {
        id: 1,
        title: "Frontend Developer Roadmap",
        description: "A comprehensive path to becoming a skilled frontend developer",
        icon: <Code className="h-8 w-8 text-blue-500" />,
        difficulty: "intermediate",
        timeEstimate: "6-9 months",
        steps: [
          "Learn HTML, CSS fundamentals",
          "Master JavaScript basics and ES6+",
          "Study responsive design principles",
          "Pick a CSS framework (Tailwind, Bootstrap)",
          "Learn a JavaScript framework (React, Vue, Angular)",
          "Understand state management",
          "Learn build tools and bundlers"
        ]
      },
      {
        id: 2,
        title: "UI/UX Design Track",
        description: "Design-focused path for frontend developers",
        icon: <Lightbulb className="h-8 w-8 text-purple-500" />,
        difficulty: "beginner",
        timeEstimate: "4-6 months",
        steps: [
          "Learn design fundamentals and theory",
          "Master a design tool (Figma, Adobe XD)",
          "Study user research methods",
          "Practice wireframing and prototyping",
          "Learn animation and micro-interactions",
          "Study design systems",
          "Portfolio development"
        ]
      }
    ],
    backend: [
      {
        id: 1,
        title: "Backend Developer Roadmap",
        description: "Path to becoming a proficient backend developer",
        icon: <Code className="h-8 w-8 text-blue-500" />,
        difficulty: "intermediate",
        timeEstimate: "6-9 months",
        steps: [
          "Learn a backend language (Node.js, Python, Java)",
          "Understand HTTP/HTTPS and REST principles",
          "Master database fundamentals (SQL/NoSQL)",
          "Learn authentication and authorization",
          "API design and documentation",
          "Error handling and logging",
          "Deployment and DevOps basics"
        ]
      },
      {
        id: 2,
        title: "Database Specialist Track",
        description: "Focus on data management and database technologies",
        icon: <BookOpen className="h-8 w-8 text-green-500" />,
        difficulty: "advanced",
        timeEstimate: "4-8 months",
        steps: [
          "Advanced SQL concepts",
          "Database design principles",
          "NoSQL database systems",
          "Data modeling",
          "Database performance optimization",
          "Data replication strategies",
          "Database security"
        ]
      }
    ],
    datascience: [
      {
        id: 1,
        title: "Data Science Roadmap",
        description: "Path to becoming a proficient data scientist",
        icon: <LineChart className="h-8 w-8 text-blue-500" />,
        difficulty: "advanced",
        timeEstimate: "9-12 months",
        steps: [
          "Learn Python or R programming",
          "Master statistics and probability",
          "Data manipulation and preprocessing",
          "Data visualization techniques",
          "Machine learning fundamentals",
          "Deep learning concepts",
          "Business understanding and communication"
        ]
      }
    ]
  };

  const generateRoadmaps = () => {
    if (!prompt.trim()) {
      toast({
        title: "Empty prompt",
        description: "Please enter a career path or skill to generate roadmaps",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI processing delay
    setTimeout(() => {
      let generatedRoadmaps: Roadmap[] = [];
      const promptLower = prompt.toLowerCase();
      
      // Simple keyword matching for the roadmap category
      if (promptLower.includes("front") || promptLower.includes("web") || promptLower.includes("ui") || promptLower.includes("react")) {
        generatedRoadmaps = demoRoadmaps.frontend;
      } else if (promptLower.includes("back") || promptLower.includes("server") || promptLower.includes("api") || promptLower.includes("database")) {
        generatedRoadmaps = demoRoadmaps.backend;
      } else if (promptLower.includes("data") || promptLower.includes("ai") || promptLower.includes("machine learning")) {
        generatedRoadmaps = demoRoadmaps.datascience;
      } else {
        // If no specific match, provide a mixed recommendation
        generatedRoadmaps = [demoRoadmaps.frontend[0], demoRoadmaps.backend[0]];
      }

      setRoadmaps(generatedRoadmaps);
      setIsGenerating(false);
      
      toast({
        title: "Roadmaps generated!",
        description: `Created ${generatedRoadmaps.length} personalized roadmaps based on your goals.`,
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Roadmap Generator</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Enter your desired career path or skill, and we'll create personalized learning roadmaps.
            </p>
          </div>

          {/* Input Section */}
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6 mb-12">
            <div className="mb-4">
              <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
                What would you like to learn?
              </label>
              <Textarea
                id="prompt"
                placeholder="e.g., frontend development, backend, data science..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            <Button 
              onClick={generateRoadmaps} 
              disabled={isGenerating}
              className="w-full"
            >
              {isGenerating ? "Generating..." : "Generate Roadmaps"}
            </Button>
          </div>

          {/* Results Section */}
          {roadmaps.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-center mb-8">Your Learning Roadmaps</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {roadmaps.map((roadmap) => (
                  <Card key={roadmap.id} className="h-full">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        {roadmap.icon}
                        <CardTitle>{roadmap.title}</CardTitle>
                      </div>
                      <CardDescription>{roadmap.description}</CardDescription>
                      {(roadmap.difficulty || roadmap.timeEstimate) && (
                        <div className="flex items-center gap-3 mt-2">
                          {roadmap.difficulty && (
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              roadmap.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                              roadmap.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {roadmap.difficulty.charAt(0).toUpperCase() + roadmap.difficulty.slice(1)}
                            </span>
                          )}
                          {roadmap.timeEstimate && (
                            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                              {roadmap.timeEstimate}
                            </span>
                          )}
                        </div>
                      )}
                    </CardHeader>
                    <CardContent>
                      <ol className="space-y-2 list-decimal list-inside">
                        {roadmap.steps.map((step, index) => (
                          <li key={index} className="text-gray-700">{step}</li>
                        ))}
                      </ol>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">Save Roadmap</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RoadmapGenerator;
