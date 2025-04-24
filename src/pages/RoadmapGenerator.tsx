import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { BookOpen, Code, Lightbulb, LineChart, ArrowDown, ArrowUp, Globe, LaptopIcon, Youtube, Database, Server, PencilRuler, BookMarked, FileText as FileTextIcon, Users as UsersIcon, Terminal, ShieldCheck, Smartphone, Gamepad, Brush, Cog, Brain, Aperture, Headphones, CloudSun, LineChart as Analytics, Network, GitBranch, Blocks } from 'lucide-react';

interface Resource {
  title: string;
  url: string;
  type: 'book' | 'video' | 'course' | 'article' | 'tool' | 'community';
  platform?: string;
}

interface Roadmap {
  id: number;
  title: string;
  description: string;
  steps: string[];
  icon: React.ReactNode;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  timeEstimate?: string;
  resources?: Resource[];
  tools?: string[];
  platforms?: string[];
  certifications?: string[];
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

  // Get tag class based on difficulty level
  const getDifficultyTagClass = (difficulty: 'beginner' | 'intermediate' | 'advanced') => {
    return `tag-${difficulty}`;
  };

  // Get resource type tag class
  const getResourceTagClass = (type: 'book' | 'video' | 'course' | 'article' | 'tool' | 'community') => {
    return `tag-resource-${type}`;
  };

  // Get card gradient class based on difficulty
  const getCardGradientClass = (difficulty?: 'beginner' | 'intermediate' | 'advanced') => {
    switch (difficulty) {
      case 'beginner':
        return 'card-gradient-green';
      case 'intermediate':
        return 'card-gradient-amber';
      case 'advanced':
        return 'card-gradient-rose';
      default:
        return 'card-gradient-blue';
    }
  };

  // Sample roadmaps data
  const initialRoadmaps: Roadmap[] = [
    {
      id: 1,
      title: "Web Development Fundamentals",
      description: "A comprehensive guide to becoming a proficient web developer",
      icon: <Code />,
      steps: [
        "Learn HTML5 and CSS3 basics",
        "Master JavaScript fundamentals",
        "Study responsive design principles",
        "Learn a JavaScript framework (React, Vue, or Angular)",
        "Build several small projects to practice skills",
        "Understand web accessibility standards",
        "Learn version control with Git"
      ],
      difficulty: "beginner",
      timeEstimate: "3-6 months",
      resources: [
        {
          title: "MDN Web Docs",
          url: "https://developer.mozilla.org",
          type: "article"
        },
        {
          title: "JavaScript: The Definitive Guide",
          url: "https://example.com/js-guide",
          type: "book"
        },
        {
          title: "Complete Web Development Bootcamp",
          url: "https://example.com/web-bootcamp",
          type: "course",
          platform: "Udemy"
        }
      ],
      tools: ["VS Code", "Chrome DevTools", "GitHub", "CodePen"],
      platforms: ["freeCodeCamp", "Codecademy", "Frontend Mentor"],
      certifications: ["Microsoft Certified: Web Developer"]
    },
    {
      id: 2,
      title: "Data Science Career Path",
      description: "Essential steps and resources for aspiring data scientists",
      icon: <Database />,
      steps: [
        "Establish programming fundamentals (Python/R)",
        "Learn statistics and probability",
        "Master data manipulation and visualization",
        "Study machine learning algorithms",
        "Build practical data science projects",
        "Learn production deployment of ML models",
        "Practice with real-world datasets"
      ],
      difficulty: "intermediate",
      timeEstimate: "8-12 months",
      resources: [
        {
          title: "Python for Data Analysis",
          url: "https://example.com/python-data",
          type: "book"
        },
        {
          title: "DataCamp Data Scientist Track",
          url: "https://example.com/datacamp",
          type: "course",
          platform: "DataCamp"
        }
      ],
      tools: ["Python", "R", "Jupyter Notebook", "Pandas", "scikit-learn"],
      platforms: ["Kaggle", "DataCamp", "Coursera"],
      certifications: ["AWS Certified Data Analytics - Specialty", "Microsoft Certified: Data Scientist Associate"]
    },
    {
      id: 3,
      title: "Full Stack Developer",
      description: "Comprehensive path to becoming a versatile full stack developer",
      icon: <Code />,
      steps: [
        "Master HTML, CSS and JavaScript",
        "Learn frontend frameworks (React, Angular, or Vue)",
        "Study backend development (Node.js, Django, or Ruby on Rails)",
        "Understand databases (SQL and NoSQL)",
        "Learn RESTful API design",
        "Study authentication and authorization",
        "Practice DevOps fundamentals",
        "Build full stack projects",
        "Learn testing methodologies"
      ],
      difficulty: "advanced",
      timeEstimate: "12-18 months",
      resources: [
        {
          title: "The Complete Web Developer in 2023",
          url: "https://example.com/web-dev-2023",
          type: "course",
          platform: "Udemy"
        },
        {
          title: "You Don't Know JS",
          url: "https://github.com/getify/You-Dont-Know-JS",
          type: "book"
        }
      ],
      tools: ["VS Code", "Git", "Docker", "Postman", "MongoDB Compass"],
      platforms: ["GitHub", "StackOverflow", "FreeCodeCamp"],
      certifications: ["AWS Certified Developer", "MongoDB Certified Developer"]
    },
    {
      id: 4,
      title: "UI/UX Designer",
      description: "A roadmap to become a professional UI/UX designer",
      icon: <PencilRuler />,
      steps: [
        "Learn design fundamentals and principles",
        "Master color theory and typography",
        "Study user research methodologies",
        "Learn wireframing and prototyping",
        "Master design tools (Figma, Adobe XD)",
        "Study interaction design patterns",
        "Learn accessibility standards",
        "Build a design portfolio",
        "Understand design systems"
      ],
      difficulty: "intermediate",
      timeEstimate: "8-12 months",
      resources: [
        {
          title: "Don't Make Me Think",
          url: "https://example.com/dont-make-me-think",
          type: "book"
        },
        {
          title: "UI/UX Design Bootcamp",
          url: "https://example.com/uxui-bootcamp",
          type: "course",
          platform: "Designlab"
        }
      ],
      tools: ["Figma", "Adobe XD", "Sketch", "InVision", "Maze"],
      platforms: ["Dribbble", "Behance", "UX Collective"],
      certifications: ["Nielsen Norman Group UX Certification", "Google UX Design Certificate"]
    },
    {
      id: 5,
      title: "Software Tester / QA Engineer",
      description: "Essential path to becoming a skilled QA professional",
      icon: <Lightbulb />,
      steps: [
        "Learn testing fundamentals and methodologies",
        "Understand software development lifecycle",
        "Master test case writing",
        "Learn manual testing techniques",
        "Study automation testing (Selenium, Cypress)",
        "Understand API testing",
        "Learn performance testing basics",
        "Study database testing",
        "Master test management tools"
      ],
      difficulty: "beginner",
      timeEstimate: "6-9 months",
      resources: [
        {
          title: "Foundations of Software Testing",
          url: "https://example.com/testing-foundations",
          type: "book"
        },
        {
          title: "Complete Selenium WebDriver with Java",
          url: "https://example.com/selenium-course",
          type: "course",
          platform: "Udemy"
        }
      ],
      tools: ["Jira", "Selenium", "Postman", "JMeter", "TestRail"],
      platforms: ["Ministry of Testing", "uTest", "Test Automation University"],
      certifications: ["ISTQB Foundation Level", "Certified Test Engineer"]
    },
    {
      id: 6,
      title: "Cloud Architect",
      description: "Complete roadmap to becoming a cloud architect",
      icon: <CloudSun />,
      steps: [
        "Build strong networking fundamentals",
        "Learn operating systems concepts",
        "Master at least one cloud platform (AWS, Azure, GCP)",
        "Study infrastructure as code",
        "Learn containerization and orchestration",
        "Understand security best practices",
        "Master monitoring and observability",
        "Study cost optimization",
        "Learn cloud-native application design"
      ],
      difficulty: "advanced",
      timeEstimate: "12-24 months",
      resources: [
        {
          title: "AWS Certified Solutions Architect Study Guide",
          url: "https://example.com/aws-architect",
          type: "book"
        },
        {
          title: "Cloud Architecture Bootcamp",
          url: "https://example.com/cloud-architect",
          type: "course",
          platform: "A Cloud Guru"
        }
      ],
      tools: ["Terraform", "AWS CloudFormation", "Docker", "Kubernetes", "Prometheus"],
      platforms: ["AWS", "Azure", "Google Cloud"],
      certifications: ["AWS Certified Solutions Architect Professional", "Google Professional Cloud Architect"]
    },
    {
      id: 7,
      title: "Data Scientist",
      description: "Comprehensive guide to becoming a data scientist",
      icon: <Database />,
      steps: [
        "Build strong foundation in mathematics and statistics",
        "Learn programming (Python, R)",
        "Master data cleaning and preprocessing",
        "Study data visualization techniques",
        "Learn machine learning algorithms",
        "Understand deep learning fundamentals",
        "Master feature engineering",
        "Study big data technologies",
        "Learn model deployment"
      ],
      difficulty: "advanced",
      timeEstimate: "12-18 months",
      resources: [
        {
          title: "Hands-on Machine Learning with Scikit-Learn and TensorFlow",
          url: "https://example.com/handson-ml",
          type: "book"
        },
        {
          title: "Deep Learning Specialization",
          url: "https://example.com/dl-specialization",
          type: "course",
          platform: "Coursera"
        }
      ],
      tools: ["Python", "Jupyter", "TensorFlow", "PyTorch", "Pandas"],
      platforms: ["Kaggle", "DataCamp", "HackerRank"],
      certifications: ["TensorFlow Developer Certificate", "IBM Data Science Professional Certificate"]
    },
    {
      id: 8,
      title: "DevOps Engineer",
      description: "Essential path to becoming a DevOps professional",
      icon: <GitBranch />,
      steps: [
        "Learn Linux system administration",
        "Master version control systems",
        "Study CI/CD pipelines",
        "Learn infrastructure as code",
        "Master containerization and orchestration",
        "Understand monitoring and logging",
        "Study cloud platforms",
        "Learn security best practices",
        "Understand automation scripts"
      ],
      difficulty: "intermediate",
      timeEstimate: "9-15 months",
      resources: [
        {
          title: "The DevOps Handbook",
          url: "https://example.com/devops-handbook",
          type: "book"
        },
        {
          title: "DevOps Engineer Bootcamp",
          url: "https://example.com/devops-bootcamp",
          type: "course",
          platform: "Linux Academy"
        }
      ],
      tools: ["Jenkins", "Docker", "Kubernetes", "Ansible", "Terraform"],
      platforms: ["GitHub", "GitLab", "AWS"],
      certifications: ["AWS Certified DevOps Engineer", "Kubernetes Certified Administrator"]
    },
    {
      id: 9,
      title: "Machine Learning Engineer",
      description: "Complete roadmap to becoming a machine learning engineer",
      icon: <Brain />,
      steps: [
        "Build strong programming skills (Python)",
        "Learn statistics and probability",
        "Study linear algebra and calculus",
        "Master machine learning algorithms",
        "Learn deep learning frameworks",
        "Understand data preprocessing",
        "Study model evaluation techniques",
        "Learn model deployment",
        "Master MLOps practices"
      ],
      difficulty: "advanced",
      timeEstimate: "12-18 months",
      resources: [
        {
          title: "Pattern Recognition and Machine Learning",
          url: "https://example.com/pattern-recognition",
          type: "book"
        },
        {
          title: "Machine Learning Engineering for Production",
          url: "https://example.com/mlops-course",
          type: "course",
          platform: "Coursera"
        }
      ],
      tools: ["Python", "TensorFlow", "PyTorch", "scikit-learn", "MLflow"],
      platforms: ["Kaggle", "GitHub", "HuggingFace"],
      certifications: ["Google Professional Machine Learning Engineer", "AWS Machine Learning Specialty"]
    },
    {
      id: 10,
      title: "Cybersecurity Specialist",
      description: "Essential path to becoming a cybersecurity expert",
      icon: <ShieldCheck />,
      steps: [
        "Learn networking fundamentals",
        "Study operating systems concepts",
        "Master security principles",
        "Learn threat detection techniques",
        "Study cryptography basics",
        "Understand security compliance and regulations",
        "Learn penetration testing",
        "Study security frameworks",
        "Master security tools"
      ],
      difficulty: "intermediate",
      timeEstimate: "9-15 months",
      resources: [
        {
          title: "Cybersecurity Blue Team Field Manual",
          url: "https://example.com/blue-team",
          type: "book"
        },
        {
          title: "Complete Cybersecurity Course",
          url: "https://example.com/cybersecurity-course",
          type: "course",
          platform: "Cybrary"
        }
      ],
      tools: ["Wireshark", "Metasploit", "Nmap", "Burp Suite", "Kali Linux"],
      platforms: ["TryHackMe", "HackTheBox", "SANS"],
      certifications: ["CompTIA Security+", "Certified Ethical Hacker (CEH)"]
    },
    {
      id: 11,
      title: "Blockchain Developer",
      description: "Comprehensive guide to becoming a blockchain developer",
      icon: <Blocks />,
      steps: [
        "Learn programming fundamentals",
        "Study cryptography basics",
        "Understand blockchain architecture",
        "Learn Solidity for smart contracts",
        "Study decentralized applications (DApps)",
        "Master Web3.js or ethers.js",
        "Learn testing smart contracts",
        "Understand blockchain security",
        "Study DeFi protocols"
      ],
      difficulty: "advanced",
      timeEstimate: "10-16 months",
      resources: [
        {
          title: "Mastering Ethereum",
          url: "https://example.com/mastering-ethereum",
          type: "book"
        },
        {
          title: "Blockchain Developer Bootcamp",
          url: "https://example.com/blockchain-bootcamp",
          type: "course",
          platform: "ConsenSys Academy"
        }
      ],
      tools: ["Remix", "Hardhat", "Truffle", "MetaMask", "Ganache"],
      platforms: ["Ethereum", "Solana", "Polkadot"],
      certifications: ["Certified Blockchain Developer", "ConsenSys Developer Certification"]
    },
    {
      id: 12,
      title: "Software Engineer",
      description: "Complete roadmap to becoming a professional software engineer",
      icon: <Code />,
      steps: [
        "Learn programming fundamentals",
        "Master data structures and algorithms",
        "Study object-oriented programming",
        "Learn software design patterns",
        "Understand system design principles",
        "Master version control systems",
        "Study testing methodologies",
        "Learn continuous integration",
        "Build projects to apply knowledge"
      ],
      difficulty: "intermediate",
      timeEstimate: "8-14 months",
      resources: [
        {
          title: "Clean Code",
          url: "https://example.com/clean-code",
          type: "book"
        },
        {
          title: "Software Engineering: Principles and Practice",
          url: "https://example.com/se-principles",
          type: "book"
        }
      ],
      tools: ["Git", "VS Code", "IntelliJ IDEA", "GitHub", "Jenkins"],
      platforms: ["LeetCode", "HackerRank", "GitHub"],
      certifications: ["Oracle Certified Professional, Java SE", "Microsoft Certified: Azure Developer Associate"]
    }
  ];

  // Function to generate a roadmap based on prompt using AI
  const generateRoadmap = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Empty prompt",
        description: "Please enter a career path you're interested in",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    setIsAiThinking(true);

    // Simulate AI processing
    setTimeout(() => {
      setIsAiThinking(false);

      // Find matching roadmap
      const promptLower = prompt.toLowerCase();
      let matchedRoadmap: Roadmap | null = null;

      // Match against existing roadmaps
      if (promptLower.includes("web") || promptLower.includes("frontend") || promptLower.includes("html") || promptLower.includes("css") || promptLower.includes("javascript")) {
        matchedRoadmap = initialRoadmaps.find(r => r.title === "Web Development Fundamentals") || null;
      } else if (promptLower.includes("data science") || promptLower.includes("data analyst")) {
        matchedRoadmap = initialRoadmaps.find(r => r.title === "Data Science Career Path") || null;
      } else if (promptLower.includes("full stack")) {
        matchedRoadmap = initialRoadmaps.find(r => r.title === "Full Stack Developer") || null;
      } else if (promptLower.includes("ui") || promptLower.includes("ux") || promptLower.includes("design")) {
        matchedRoadmap = initialRoadmaps.find(r => r.title === "UI/UX Designer") || null;
      } else if (promptLower.includes("qa") || promptLower.includes("test") || promptLower.includes("quality")) {
        matchedRoadmap = initialRoadmaps.find(r => r.title === "Software Tester / QA Engineer") || null;
      } else if (promptLower.includes("cloud") || promptLower.includes("architect")) {
        matchedRoadmap = initialRoadmaps.find(r => r.title === "Cloud Architect") || null;
      } else if (promptLower.includes("data scientist")) {
        matchedRoadmap = initialRoadmaps.find(r => r.title === "Data Scientist") || null;
      } else if (promptLower.includes("devops")) {
        matchedRoadmap = initialRoadmaps.find(r => r.title === "DevOps Engineer") || null;
      } else if (promptLower.includes("machine learning")) {
        matchedRoadmap = initialRoadmaps.find(r => r.title === "Machine Learning Engineer") || null;
      } else if (promptLower.includes("cyber") || promptLower.includes("security")) {
        matchedRoadmap = initialRoadmaps.find(r => r.title === "Cybersecurity Specialist") || null;
      } else if (promptLower.includes("blockchain") || promptLower.includes("crypto")) {
        matchedRoadmap = initialRoadmaps.find(r => r.title === "Blockchain Developer") || null;
      } else if (promptLower.includes("software engineer")) {
        matchedRoadmap = initialRoadmaps.find(r => r.title === "Software Engineer") || null;
      }

      if (matchedRoadmap) {
        // Add the matched roadmap with aiGenerated flag
        const newRoadmap = {
          ...matchedRoadmap,
          id: Date.now(),
          aiGenerated: true
        };
        setRoadmaps(prev => [newRoadmap, ...prev]);
        
        toast({
          title: "Roadmap generated!",
          description: `Here's your personalized roadmap for ${newRoadmap.title}`
        });
        
        setPrompt('');
      } else {
        // If no match, suggest a general technology area
        setAiSuggestion(
          "I couldn't generate a specific roadmap for that query. Consider exploring these areas: Web Development, Data Science, UI/UX Design, Software Testing, Cloud Architecture, DevOps, Machine Learning, Cybersecurity, or Blockchain Development."
        );
        
        toast({
          title: "No specific roadmap found",
          description: "Try a different tech career path or check our suggestions",
          variant: "destructive"
        });
      }
      
      setIsGenerating(false);
    }, 2000);
  };

  // Handle text area input change
  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
    setAiSuggestion('');
  };

  // Toggle showing roadmap details
  const toggleRoadmapDetails = (id: number) => {
    setShowDetails(showDetails === id ? null : id);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Tech Career Roadmap Generator</h1>
            <p className="text-lg text-muted-foreground">
              Enter a tech career path you're interested in, and our AI will generate a personalized learning roadmap.
            </p>
          </div>
          
          <div className="mb-12 bg-card rounded-lg p-6 shadow-sm">
            <Textarea 
              placeholder="I want to become a full stack developer..."
              value={prompt}
              onChange={handlePromptChange}
              className="mb-4 min-h-[100px]"
            />
            
            <div className="flex justify-end">
              <Button 
                onClick={generateRoadmap} 
                disabled={isGenerating}
                className="gap-2"
              >
                {isGenerating ? (
                  <>
                    <div className="h-4 w-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                    {isAiThinking ? 'Thinking...' : 'Generating...'}
                  </>
                ) : (
                  <>Generate Roadmap</>
                )}
              </Button>
            </div>
            
            {aiSuggestion && (
              <div className="mt-4 p-4 bg-muted rounded-md text-sm">
                <p className="font-medium mb-1">AI Suggestion:</p>
                <p>{aiSuggestion}</p>
              </div>
            )}
          </div>
          
          {roadmaps.length > 0 && (
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold">Your Roadmaps</h2>
              
              {roadmaps.map((roadmap) => (
                <Card 
                  key={roadmap.id} 
                  className={`overflow-hidden border-t-4 ${roadmap.aiGenerated ? 'border-t-accent' : 'border-t-primary'} ${getCardGradientClass(roadmap.difficulty)}`}
                >
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-md bg-primary/10 text-primary">
                          {roadmap.icon}
                        </div>
                        <div>
                          <CardTitle>{roadmap.title}</CardTitle>
                          <CardDescription className="mt-1">{roadmap.description}</CardDescription>
                        </div>
                      </div>
                      
                      {roadmap.difficulty && (
                        <div className={getDifficultyTagClass(roadmap.difficulty)}>
                          {roadmap.difficulty.charAt(0).toUpperCase() + roadmap.difficulty.slice(1)}
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pb-4">
                    <div className="mb-4">
                      <div className="text-sm font-medium mb-2">Roadmap Steps:</div>
                      <ol className="space-y-2 list-decimal pl-5 text-sm">
                        {roadmap.steps.map((step, index) => (
                          <li key={index}>{step}</li>
                        ))}
                      </ol>
                    </div>
                    
                    {showDetails === roadmap.id && (
                      <div className="space-y-4 mt-6 pt-4 border-t">
                        {roadmap.timeEstimate && (
                          <div>
                            <div className="text-sm font-medium mb-1">Estimated Time:</div>
                            <div className="text-sm">{roadmap.timeEstimate}</div>
                          </div>
                        )}
                        
                        {roadmap.resources && roadmap.resources.length > 0 && (
                          <div>
                            <div className="text-sm font-medium mb-2">Recommended Resources:</div>
                            <div className="grid gap-2">
                              {roadmap.resources.map((resource, index) => (
                                <div key={index} className="flex items-start gap-2">
                                  <div className={getResourceTagClass(resource.type)}>
                                    {resource.type}
                                  </div>
                                  <div className="text-sm flex-grow">
                                    <a href={resource.url} target="_blank" rel="noopener noreferrer" className="hover:underline font-medium">
                                      {resource.title}
                                    </a>
                                    {resource.platform && (
                                      <span className="text-muted-foreground"> • {resource.platform}</span>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {roadmap.tools && roadmap.tools.length > 0 && (
                          <div>
                            <div className="text-sm font-medium mb-1">Tools & Technologies:</div>
                            <div className="flex flex-wrap gap-2">
                              {roadmap.tools.map((tool, index) => (
                                <div key={index} className="skill-tag">
                                  {tool}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {roadmap.platforms && roadmap.platforms.length > 0 && (
                          <div>
                            <div className="text-sm font-medium mb-1">Learning Platforms:</div>
                            <div className="flex flex-wrap gap-2">
                              {roadmap.platforms.map((platform, index) => (
                                <div key={index} className="skill-tag">
                                  {platform}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {roadmap.certifications && roadmap.certifications.length > 0 && (
                          <div>
                            <div className="text-sm font-medium mb-1">Recommended Certifications:</div>
                            <div className="space-y-1">
                              {roadmap.certifications.map((certification, index) => (
                                <div key={index} className="text-sm">
                                  • {certification}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                  
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      onClick={() => toggleRoadmapDetails(roadmap.id)}
                      className="w-full gap-1"
                    >
                      {showDetails === roadmap.id ? (
                        <>Hide Details <ArrowUp className="h-4 w-4" /></>
                      ) : (
                        <>Show Details <ArrowDown className="h-4 w-4" /></>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RoadmapGenerator;
