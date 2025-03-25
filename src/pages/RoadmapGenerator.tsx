
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ArrowRight, BookOpen, Code, Lightbulb, Sparkles, Cpu, Database, LineChart } from 'lucide-react';

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
  const [aiSuggestion, setAiSuggestion] = useState('');

  // Demo roadmaps database
  const demoRoadmaps = {
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
        difficulty: "intermediate",
        timeEstimate: "4-6 months",
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
        difficulty: "advanced",
        timeEstimate: "3-5 months",
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
        difficulty: "intermediate",
        timeEstimate: "6-9 months",
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
        difficulty: "advanced",
        timeEstimate: "6-12 months",
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
        icon: <Database className="h-8 w-8 text-green-500" />,
        difficulty: "advanced",
        timeEstimate: "4-8 months",
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
          "Model deployment and MLOps",
          "Big data technologies",
          "Business understanding and communication"
        ]
      },
      {
        id: 2,
        title: "AI/ML Engineering Path",
        description: "Focus on building AI and ML systems",
        icon: <Cpu className="h-8 w-8 text-purple-500" />,
        difficulty: "advanced",
        timeEstimate: "12-18 months",
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
        icon: <Database className="h-8 w-8 text-green-500" />,
        difficulty: "intermediate",
        timeEstimate: "6-10 months",
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
    ],
    devops: [
      {
        id: 1,
        title: "DevOps Engineer Roadmap",
        description: "Become a skilled DevOps professional",
        icon: <Cpu className="h-8 w-8 text-blue-500" />,
        difficulty: "intermediate",
        timeEstimate: "6-9 months",
        steps: [
          "Learn Linux fundamentals",
          "Master Git and version control",
          "Understand CI/CD principles",
          "Learn container technologies (Docker)",
          "Container orchestration (Kubernetes)",
          "Infrastructure as Code (Terraform, Ansible)",
          "Cloud platforms (AWS, Azure, GCP)",
          "Monitoring and logging",
          "Security best practices"
        ]
      },
      {
        id: 2,
        title: "Site Reliability Engineering",
        description: "Focus on system reliability and automation",
        icon: <ArrowRight className="h-8 w-8 text-purple-500" />,
        difficulty: "advanced",
        timeEstimate: "8-12 months",
        steps: [
          "Advanced Linux and system administration",
          "Network architecture and security",
          "Service level objectives (SLOs)",
          "Incident response and management",
          "Performance tuning",
          "Chaos engineering",
          "Advanced monitoring and alerting",
          "Automation at scale",
          "Distributed systems design"
        ]
      }
    ],
    mobile: [
      {
        id: 1,
        title: "Mobile App Developer",
        description: "Path to becoming a mobile application developer",
        icon: <Code className="h-8 w-8 text-blue-500" />,
        difficulty: "intermediate",
        timeEstimate: "6-9 months",
        steps: [
          "Choose a platform (iOS or Android)",
          "Learn Swift/SwiftUI (iOS) or Kotlin (Android)",
          "Understand mobile UI/UX principles",
          "Learn app architecture patterns",
          "Implement data persistence",
          "Network and API integration",
          "Push notifications and background tasks",
          "App store deployment",
          "Analytics and monitoring"
        ]
      },
      {
        id: 2,
        title: "Cross-Platform Development",
        description: "Develop apps for multiple platforms with one codebase",
        icon: <Sparkles className="h-8 w-8 text-purple-500" />,
        difficulty: "intermediate",
        timeEstimate: "4-8 months",
        steps: [
          "Learn JavaScript/TypeScript fundamentals",
          "Master React Native or Flutter",
          "Cross-platform UI design principles",
          "Platform-specific integrations",
          "State management",
          "Performance optimization",
          "Native module integration",
          "Testing on multiple devices",
          "Cross-platform deployment"
        ]
      }
    ]
  };

  // AI suggestion engine (simulated)
  const generateAISuggestion = (userPrompt: string) => {
    const promptLower = userPrompt.toLowerCase();
    
    // Keywords analysis
    const keywords = {
      frontend: ["frontend", "web", "ui", "react", "javascript", "html", "css", "design"],
      backend: ["backend", "server", "api", "database", "node", "python", "java", "php"],
      datascience: ["data", "ai", "machine learning", "ml", "analytics", "statistics", "python", "big data"],
      devops: ["devops", "operations", "ci/cd", "docker", "kubernetes", "cloud", "aws", "deployment"],
      mobile: ["mobile", "app", "ios", "android", "flutter", "react native", "swift", "kotlin"]
    };
    
    // Count keyword matches
    const scores: Record<string, number> = {};
    Object.keys(keywords).forEach(category => {
      scores[category] = keywords[category as keyof typeof keywords].filter(
        keyword => promptLower.includes(keyword)
      ).length;
    });
    
    // Find highest scoring categories
    const maxScore = Math.max(...Object.values(scores));
    const topCategories = Object.keys(scores).filter(cat => scores[cat] === maxScore);
    
    // No strong match, suggest based on other criteria
    if (maxScore === 0 || topCategories.length > 2) {
      if (promptLower.includes("beginner") || promptLower.includes("start")) {
        return "Based on your prompt, it seems you're just starting your tech journey. Frontend development is often a great entry point to tech careers, with visible results that can be motivating for beginners.";
      } else if (promptLower.includes("job") || promptLower.includes("career") || promptLower.includes("salary")) {
        return "If you're focused on career opportunities, both frontend and backend development offer strong job markets. For highest salary potential, data science and DevOps specializations tend to command premium compensation.";
      } else {
        return "Consider exploring frontend development as a starting point, as it allows you to create visible projects quickly and build a portfolio.";
      }
    }
    
    // Generate a more personalized suggestion
    const primaryCategory = topCategories[0];
    let suggestion = "";
    
    switch(primaryCategory) {
      case "frontend":
        suggestion = "Based on your interests, frontend development would be an excellent path. You'll be able to create visually engaging interfaces and interactive web applications.";
        break;
      case "backend":
        suggestion = "Your interests align well with backend development. This path will allow you to work with server architecture, APIs, and databases.";
        break;
      case "datascience":
        suggestion = "Your interests suggest data science would be a great fit. This rapidly growing field combines programming, statistics, and domain expertise.";
        break;
      case "devops":
        suggestion = "DevOps would be a great specialization based on your interests. You'll work at the intersection of development and operations, optimizing the deployment pipeline.";
        break;
      case "mobile":
        suggestion = "Mobile app development aligns well with your interests. You can create applications that millions of users can install on their devices.";
        break;
    }
    
    // Add a secondary recommendation if there's a close second
    const sortedCategories = Object.keys(scores).sort((a, b) => scores[b] - scores[a]);
    if (sortedCategories.length > 1 && scores[sortedCategories[1]] > 0) {
      const secondaryCategory = sortedCategories[1];
      suggestion += ` You might also consider ${secondaryCategory} development as a complementary skill that pairs well with your primary interests.`;
    }
    
    return suggestion;
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
      const aiSuggestionText = generateAISuggestion(prompt);
      setAiSuggestion(aiSuggestionText);
      
      // Keyword-based roadmap selection with more sophistication
      const promptLower = prompt.toLowerCase();
      const keywordMatches = {
        frontend: 0,
        backend: 0,
        datascience: 0,
        devops: 0,
        mobile: 0
      };
      
      // Count keyword matches for each category
      const keywordSets = {
        frontend: ["frontend", "web", "ui", "react", "javascript", "html", "css", "design"],
        backend: ["backend", "server", "api", "database", "node", "python", "java", "php"],
        datascience: ["data", "ai", "machine learning", "ml", "analytics", "statistics", "python", "big data"],
        devops: ["devops", "operations", "ci/cd", "docker", "kubernetes", "cloud", "aws", "deployment"],
        mobile: ["mobile", "app", "ios", "android", "flutter", "react native", "swift", "kotlin"]
      };
      
      Object.keys(keywordSets).forEach(category => {
        keywordSets[category as keyof typeof keywordSets].forEach(keyword => {
          if (promptLower.includes(keyword)) {
            keywordMatches[category as keyof typeof keywordMatches]++;
          }
        });
      });
      
      // Find best matching category
      const maxMatches = Math.max(...Object.values(keywordMatches));
      if (maxMatches > 0) {
        const matchedCategories = Object.keys(keywordMatches).filter(
          cat => keywordMatches[cat as keyof typeof keywordMatches] === maxMatches
        );
        
        // Use the first matched category
        const primaryCategory = matchedCategories[0] as keyof typeof demoRoadmaps;
        if (demoRoadmaps[primaryCategory]) {
          generatedRoadmaps = [...demoRoadmaps[primaryCategory]];
          
          // If we have secondary matches, add one roadmap from there too
          if (matchedCategories.length > 1) {
            const secondaryCategory = matchedCategories[1] as keyof typeof demoRoadmaps;
            if (demoRoadmaps[secondaryCategory] && demoRoadmaps[secondaryCategory].length > 0) {
              generatedRoadmaps.push(demoRoadmaps[secondaryCategory][0]);
            }
          }
        }
      } else {
        // No strong matches, provide a default recommendation
        if (promptLower.includes("beginner") || promptLower.includes("start")) {
          generatedRoadmaps = demoRoadmaps.frontend;
        } else if (promptLower.includes("advanced") || promptLower.includes("expert")) {
          generatedRoadmaps = [...demoRoadmaps.datascience];
        } else if (promptLower.includes("job") || promptLower.includes("career")) {
          generatedRoadmaps = [demoRoadmaps.frontend[0], demoRoadmaps.backend[0], demoRoadmaps.datascience[0]];
        } else {
          // Default to a mixed recommendation
          generatedRoadmaps = [demoRoadmaps.frontend[0], demoRoadmaps.backend[0], demoRoadmaps.datascience[0]];
        }
      }

      setRoadmaps(generatedRoadmaps);
      setIsGenerating(false);
      
      toast({
        title: "AI Roadmaps generated!",
        description: `Created ${generatedRoadmaps.length} personalized roadmaps based on your goals.`,
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 pb-20">
        <div className="container-custom">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">AI Roadmap Generator</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Enter your desired career path or skill, and our AI will create personalized learning roadmaps tailored to your goals.
            </p>
          </div>

          {/* Input Section */}
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6 mb-12">
            <div className="mb-4">
              <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
                What would you like to learn? Describe your goals and experience.
              </label>
              <Textarea
                id="prompt"
                placeholder="e.g., I want to become a frontend developer with React, or I'm interested in data science and machine learning..."
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
              {isGenerating ? "Analyzing your goals..." : "Generate AI Roadmaps"}
            </Button>
          </div>

          {/* AI Suggestion Section */}
          {aiSuggestion && (
            <div className="max-w-3xl mx-auto mb-12">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <Sparkles className="h-6 w-6 text-blue-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-blue-800 mb-2">AI Career Recommendation</h3>
                    <p className="text-blue-700">{aiSuggestion}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Results Section */}
          {roadmaps.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-center mb-8">Your Personalized Learning Roadmaps</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {roadmaps.map((roadmap) => (
                  <Card key={roadmap.id} className="h-full transition-all duration-300 hover:shadow-lg">
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
