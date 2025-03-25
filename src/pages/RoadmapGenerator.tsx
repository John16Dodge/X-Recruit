
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { BookOpen, Code, Lightbulb, LineChart, ArrowDown, ArrowUp } from 'lucide-react';

interface Roadmap {
  id: number;
  title: string;
  description: string;
  steps: string[];
  icon: React.ReactNode;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  timeEstimate?: string;
  resources?: { title: string; url: string; type: 'book' | 'video' | 'course' | 'article' }[];
  aiGenerated?: boolean;
}

const RoadmapGenerator = () => {
  const { toast } = useToast();
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [showDetails, setShowDetails] = useState<number | null>(null);

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
        ],
        resources: [
          { title: "Complete Web Development Bootcamp", url: "#", type: "course" },
          { title: "JavaScript: The Good Parts", url: "#", type: "book" },
          { title: "React Documentation", url: "#", type: "article" }
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
        ],
        resources: [
          { title: "Don't Make Me Think", url: "#", type: "book" },
          { title: "Figma Essential Training", url: "#", type: "video" },
          { title: "Design Systems Handbook", url: "#", type: "article" }
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
        ],
        resources: [
          { title: "Node.js Design Patterns", url: "#", type: "book" },
          { title: "RESTful API Design", url: "#", type: "course" },
          { title: "Database Design Fundamentals", url: "#", type: "video" }
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
        ],
        resources: [
          { title: "SQL Performance Explained", url: "#", type: "book" },
          { title: "MongoDB University", url: "#", type: "course" },
          { title: "Database Internals", url: "#", type: "book" }
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
        ],
        resources: [
          { title: "Python for Data Analysis", url: "#", type: "book" },
          { title: "Deep Learning Specialization", url: "#", type: "course" },
          { title: "Feature Engineering for Machine Learning", url: "#", type: "book" }
        ]
      }
    ]
  };

  // AI-based roadmap categories for more intelligent matching
  const aiCategories = {
    webdev: ["website", "web", "html", "css", "javascript", "react", "frontend", "back-end", "fullstack"],
    mobile: ["mobile", "app", "android", "ios", "flutter", "react native", "swift"],
    data: ["data", "analytics", "science", "machine learning", "ai", "statistics", "visualization", "python", "analysis"],
    design: ["design", "ui", "ux", "user experience", "figma", "adobe", "graphic", "visual"],
    devops: ["devops", "cloud", "aws", "azure", "docker", "kubernetes", "ci/cd", "pipeline"],
    security: ["security", "cyber", "hacking", "penetration", "encryption", "protection", "firewall", "vulnerability"],
    game: ["game", "unity", "unreal", "2d", "3d", "gaming", "development"]
  };

  // Generate AI suggestion based on the prompt
  const generateAiSuggestion = (userPrompt: string) => {
    setIsAiThinking(true);
    
    setTimeout(() => {
      const promptLower = userPrompt.toLowerCase();
      let suggestion = '';
      
      // Simple AI suggestion based on keyword matching
      if (promptLower.includes('beginner') || promptLower.includes('start')) {
        suggestion = "I recommend starting with the fundamentals before moving to more advanced topics. Based on your interests, a structured approach focusing on core concepts first would be most beneficial.";
      } else if (promptLower.includes('job') || promptLower.includes('career') || promptLower.includes('work')) {
        suggestion = "For career-focused learning, prioritize projects and skills that are in high demand. Consider creating a portfolio that showcases your abilities to potential employers.";
      } else if (promptLower.includes('time') || promptLower.includes('fast') || promptLower.includes('quick')) {
        suggestion = "For an accelerated learning path, focus on practical skills first and learn theory as you go. Project-based learning can help you progress quickly while building a portfolio.";
      } else {
        suggestion = "Based on your goals, I recommend a balanced approach of theory and practice. Make sure to build projects along the way to reinforce your learning and demonstrate your skills.";
      }
      
      setAiSuggestion(suggestion);
      setIsAiThinking(false);
    }, 1200);
  };

  // AI-enhanced roadmap generation
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
    generateAiSuggestion(prompt);
    
    // Simulate AI processing delay
    setTimeout(() => {
      let generatedRoadmaps: Roadmap[] = [];
      const promptLower = prompt.toLowerCase();
      
      // More sophisticated keyword matching with AI categories
      let categoryMatch = '';
      let highestMatchScore = 0;
      
      // Analyze prompt against AI categories
      Object.entries(aiCategories).forEach(([category, keywords]) => {
        const matchCount = keywords.filter(keyword => promptLower.includes(keyword)).length;
        if (matchCount > highestMatchScore) {
          highestMatchScore = matchCount;
          categoryMatch = category;
        }
      });
      
      // Map AI category to roadmap category
      if (categoryMatch === 'webdev') {
        if (promptLower.includes('back') || promptLower.includes('server') || promptLower.includes('api')) {
          generatedRoadmaps = demoRoadmaps.backend;
        } else {
          generatedRoadmaps = demoRoadmaps.frontend;
        }
      } else if (categoryMatch === 'data' || categoryMatch === 'ai') {
        generatedRoadmaps = demoRoadmaps.datascience;
      } else if (categoryMatch === 'design') {
        generatedRoadmaps = [demoRoadmaps.frontend.find(r => r.title.includes('UI/UX'))!];
      } else {
        // If no specific match, provide a mixed recommendation
        generatedRoadmaps = [demoRoadmaps.frontend[0], demoRoadmaps.backend[0]];
      }
      
      // Generate a custom AI roadmap based on the prompt
      const customRoadmap: Roadmap = {
        id: 999,
        title: `Custom AI Roadmap: ${prompt.charAt(0).toUpperCase() + prompt.slice(1)}`,
        description: `A personalized learning path generated specifically for your interest in ${prompt}`,
        icon: <Lightbulb className="h-8 w-8 text-indigo-500" />,
        difficulty: "intermediate",
        timeEstimate: "6-12 months",
        steps: [
          `Understand the fundamentals of ${prompt}`,
          `Learn essential tools and technologies for ${prompt}`,
          `Build basic projects to practice ${prompt} skills`,
          `Study advanced concepts in ${prompt}`,
          `Create a comprehensive portfolio project`,
          `Network with others in the ${prompt} field`,
          `Continue learning and stay updated with ${prompt} trends`
        ],
        resources: [
          { title: "Recommended Online Course", url: "#", type: "course" },
          { title: "Essential Reading", url: "#", type: "book" },
          { title: "Community Forum", url: "#", type: "article" }
        ],
        aiGenerated: true
      };
      
      generatedRoadmaps.push(customRoadmap);
      setRoadmaps(generatedRoadmaps);
      setIsGenerating(false);
      
      toast({
        title: "AI Roadmaps generated!",
        description: `Created ${generatedRoadmaps.length} personalized roadmaps based on your goals.`,
      });
    }, 1500);
  };

  const toggleDetails = (id: number) => {
    if (showDetails === id) {
      setShowDetails(null);
    } else {
      setShowDetails(id);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">AI Roadmap Generator</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Enter your desired career path or skill, and our AI will create personalized learning roadmaps.
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
                placeholder="e.g., frontend development, backend, data science, or something more specific like 'I want to become a web developer in 6 months'..."
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
              {isGenerating ? "AI is generating..." : "Generate AI Roadmaps"}
            </Button>
          </div>

          {/* AI Suggestion Section */}
          {aiSuggestion && (
            <div className="max-w-2xl mx-auto mb-8">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <Lightbulb className="text-blue-500 mt-1 mr-3 h-5 w-5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-blue-800">AI Learning Suggestion</h3>
                    <p className="text-blue-700 mt-1">{isAiThinking ? "Analyzing your learning goals..." : aiSuggestion}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Results Section */}
          {roadmaps.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-center mb-8">Your AI Learning Roadmaps</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {roadmaps.map((roadmap) => (
                  <Card key={roadmap.id} className={`h-full transition-all duration-200 ${roadmap.aiGenerated ? 'border-indigo-200 shadow-md' : ''}`}>
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        {roadmap.icon}
                        <CardTitle>
                          {roadmap.title}
                          {roadmap.aiGenerated && (
                            <span className="ml-2 text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
                              AI Generated
                            </span>
                          )}
                        </CardTitle>
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
                      
                      {roadmap.resources && (
                        <div className="mt-4">
                          <button
                            onClick={() => toggleDetails(roadmap.id)}
                            className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                          >
                            {showDetails === roadmap.id ? (
                              <>
                                <ArrowUp className="h-4 w-4 mr-1" /> Hide resources
                              </>
                            ) : (
                              <>
                                <ArrowDown className="h-4 w-4 mr-1" /> Show resources
                              </>
                            )}
                          </button>
                          
                          {showDetails === roadmap.id && (
                            <div className="mt-3 space-y-2 pl-2 border-l-2 border-blue-100">
                              <h4 className="font-medium text-gray-700">Recommended Resources:</h4>
                              <ul className="space-y-1">
                                {roadmap.resources.map((resource, idx) => (
                                  <li key={idx} className="text-sm">
                                    <span className="inline-block w-16 text-xs bg-gray-100 rounded px-1 mr-2">
                                      {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                                    </span>
                                    {resource.title}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
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
