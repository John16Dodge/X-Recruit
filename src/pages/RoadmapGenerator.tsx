
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ArrowRight, BookOpen, Code, Lightbulb } from 'lucide-react';

interface Roadmap {
  id: number;
  title: string;
  description: string;
  steps: string[];
  icon: React.ReactNode;
}

const RoadmapGenerator = () => {
  const { toast } = useToast();
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);

  // Demo roadmaps for different inputs
  const demoRoadmaps = {
    frontend: [
      {
        id: 1,
        title: "Frontend Developer Roadmap",
        description: "A comprehensive path to becoming a skilled frontend developer",
        icon: <Code className="h-8 w-8 text-blue-500" />,
        steps: [
          "Learn HTML, CSS fundamentals",
          "Master JavaScript basics and ES6+",
          "Study responsive design principles",
          "Pick a CSS framework (Tailwind, Bootstrap)",
          "Learn a JavaScript framework (React, Vue, Angular)",
          "Understand state management",
          "Learn build tools and bundlers",
          "Practice web performance optimization",
          "Master web accessibility principles"
        ]
      },
      {
        id: 2,
        title: "UI/UX Design Track",
        description: "Design-focused path for frontend developers",
        icon: <Lightbulb className="h-8 w-8 text-purple-500" />,
        steps: [
          "Learn design fundamentals and theory",
          "Master a design tool (Figma, Adobe XD)",
          "Study user research methods",
          "Practice wireframing and prototyping",
          "Learn animation and micro-interactions",
          "Study design systems",
          "Implement designs with CSS/JS",
          "Master accessibility in design",
          "Portfolio development"
        ]
      },
      {
        id: 3,
        title: "Frontend Specialist: Performance",
        description: "Focus on creating high-performance web applications",
        icon: <ArrowRight className="h-8 w-8 text-green-500" />,
        steps: [
          "Core web vitals and metrics",
          "Advanced JavaScript optimization",
          "Bundle size optimization techniques",
          "Image and asset optimization",
          "Advanced CSS techniques",
          "Server-side rendering vs. client-side",
          "Caching strategies",
          "Network performance optimization",
          "Performance testing and monitoring"
        ]
      }
    ],
    backend: [
      {
        id: 1,
        title: "Backend Developer Roadmap",
        description: "Path to becoming a proficient backend developer",
        icon: <Code className="h-8 w-8 text-blue-500" />,
        steps: [
          "Learn a backend language (Node.js, Python, Java)",
          "Understand HTTP/HTTPS and REST principles",
          "Master database fundamentals (SQL/NoSQL)",
          "Learn authentication and authorization",
          "API design and documentation",
          "Error handling and logging",
          "Testing and debugging",
          "Caching strategies",
          "Deployment and DevOps basics"
        ]
      },
      {
        id: 2,
        title: "Cloud Engineering Path",
        description: "Specialization in cloud infrastructure and services",
        icon: <BookOpen className="h-8 w-8 text-purple-500" />,
        steps: [
          "Learn cloud fundamentals (AWS, Azure, GCP)",
          "Infrastructure as Code (Terraform, CloudFormation)",
          "Containerization with Docker",
          "Orchestration with Kubernetes",
          "Serverless architecture",
          "CI/CD pipelines",
          "Cloud security best practices",
          "Monitoring and logging solutions",
          "Cost optimization strategies"
        ]
      },
      {
        id: 3,
        title: "Database Specialist Track",
        description: "Focus on data management and database technologies",
        icon: <ArrowRight className="h-8 w-8 text-green-500" />,
        steps: [
          "Advanced SQL concepts",
          "Database design principles",
          "NoSQL database systems",
          "Data modeling",
          "Database performance optimization",
          "Sharding and partitioning",
          "Data replication strategies",
          "Database security",
          "Big data tools and frameworks"
        ]
      }
    ],
    datascience: [
      {
        id: 1,
        title: "Data Science Roadmap",
        description: "Path to becoming a proficient data scientist",
        icon: <Code className="h-8 w-8 text-blue-500" />,
        steps: [
          "Learn Python or R programming",
          "Master statistics and probability",
          "Data manipulation and preprocessing",
          "Data visualization techniques",
          "Machine learning fundamentals",
          "Deep learning concepts",
          "Model deployment and MLOps",
          "Big data technologies",
          "Business understanding and communication"
        ]
      },
      {
        id: 2,
        title: "AI/ML Engineering Path",
        description: "Focus on building AI and ML systems",
        icon: <Lightbulb className="h-8 w-8 text-purple-500" />,
        steps: [
          "Advanced machine learning algorithms",
          "Deep learning frameworks (TensorFlow, PyTorch)",
          "Computer vision techniques",
          "Natural language processing",
          "Reinforcement learning",
          "Feature engineering",
          "Model optimization and tuning",
          "ML system design",
          "Ethical AI and bias mitigation"
        ]
      },
      {
        id: 3,
        title: "Data Engineering Track",
        description: "Specialization in data infrastructure and pipelines",
        icon: <ArrowRight className="h-8 w-8 text-green-500" />,
        steps: [
          "Data pipeline architecture",
          "ETL processes and tools",
          "Distributed computing (Spark, Hadoop)",
          "Data warehousing solutions",
          "Stream processing",
          "Data governance and quality",
          "Cloud data solutions",
          "Database systems (SQL/NoSQL)",
          "Data security and compliance"
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
    
    // Simulate API call delay
    setTimeout(() => {
      let generatedRoadmaps: Roadmap[] = [];
      
      // Simple keyword matching for demo
      const promptLower = prompt.toLowerCase();
      if (promptLower.includes('front') || promptLower.includes('web') || promptLower.includes('ui')) {
        generatedRoadmaps = demoRoadmaps.frontend;
      } else if (promptLower.includes('back') || promptLower.includes('server') || promptLower.includes('api')) {
        generatedRoadmaps = demoRoadmaps.backend;
      } else if (promptLower.includes('data') || promptLower.includes('ai') || promptLower.includes('ml')) {
        generatedRoadmaps = demoRoadmaps.datascience;
      } else {
        // Default to frontend if no match
        generatedRoadmaps = demoRoadmaps.frontend;
      }

      setRoadmaps(generatedRoadmaps);
      setIsGenerating(false);
      
      toast({
        title: "Roadmaps generated!",
        description: `Created ${generatedRoadmaps.length} roadmaps based on your input.`,
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 pb-20">
        <div className="container-custom">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Roadmap Generator</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Enter your desired career path or skill, and we'll generate customized learning roadmaps to help you achieve your goals.
            </p>
          </div>

          {/* Input Section */}
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6 mb-12">
            <div className="mb-4">
              <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
                What would you like to learn?
              </label>
              <Textarea
                id="prompt"
                placeholder="e.g., Frontend development, Data Science, Cloud Engineering..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            <Button 
              onClick={generateRoadmaps} 
              disabled={isGenerating}
              className="w-full bg-xr-blue hover:bg-xr-blue-dark text-white"
            >
              {isGenerating ? "Generating..." : "Generate Roadmaps"}
            </Button>
          </div>

          {/* Results Section */}
          {roadmaps.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-center mb-8">Your Personalized Roadmaps</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {roadmaps.map((roadmap) => (
                  <Card key={roadmap.id} className="h-full transition-all duration-300 hover:shadow-lg">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        {roadmap.icon}
                        <CardTitle>{roadmap.title}</CardTitle>
                      </div>
                      <CardDescription>{roadmap.description}</CardDescription>
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
