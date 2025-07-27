
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  timeEstimate: string;
  resources: Resource[];
  tools: string[];
  platforms: string[];
  certifications: string[];
}

const predefinedRoadmaps: Roadmap[] = [
  {
    id: 1,
    title: "Full Stack Developer",
    description: "Complete web development with frontend and backend skills",
    steps: [
      "Learn HTML, CSS, and JavaScript fundamentals",
      "Master React.js for frontend development",
      "Understand Node.js and Express.js",
      "Learn database management with MongoDB",
      "Practice with REST APIs and GraphQL",
      "Deploy applications to cloud platforms",
      "Build portfolio projects",
      "Learn testing frameworks (Jest, Cypress)"
    ],
    icon: <Code />,
    difficulty: "intermediate",
    timeEstimate: "8-12 months",
    resources: [
      { title: "The Complete Web Developer Course", url: "https://udemy.com", type: "course", platform: "Udemy" },
      { title: "MDN Web Docs", url: "https://developer.mozilla.org", type: "article", platform: "MDN" },
      { title: "React Documentation", url: "https://react.dev", type: "article", platform: "React" }
    ],
    tools: ["React", "Node.js", "MongoDB", "Express.js", "Git", "VS Code"],
    platforms: ["GitHub", "Netlify", "Heroku", "Vercel"],
    certifications: ["AWS Cloud Practitioner", "MongoDB Developer", "React Developer"]
  },
  {
    id: 2,
    title: "Data Scientist",
    description: "Analyze data and build machine learning models",
    steps: [
      "Learn Python programming fundamentals",
      "Master pandas and numpy for data manipulation",
      "Understand statistics and probability",
      "Learn data visualization with matplotlib/seaborn",
      "Study machine learning algorithms",
      "Practice with real datasets",
      "Learn SQL for database queries",
      "Build and deploy ML models"
    ],
    icon: <Database />,
    difficulty: "advanced",
    timeEstimate: "12-18 months",
    resources: [
      { title: "Python for Data Science", url: "https://kaggle.com", type: "course", platform: "Kaggle" },
      { title: "Hands-On Machine Learning", url: "https://amazon.com", type: "book", platform: "Amazon" },
      { title: "Scikit-learn Documentation", url: "https://scikit-learn.org", type: "article", platform: "Scikit-learn" }
    ],
    tools: ["Python", "Pandas", "NumPy", "Scikit-learn", "TensorFlow", "Jupyter"],
    platforms: ["Kaggle", "Google Colab", "AWS SageMaker", "GitHub"],
    certifications: ["Google Data Analytics", "IBM Data Science", "AWS Machine Learning"]
  },
  {
    id: 3,
    title: "UI/UX Designer",
    description: "Create beautiful and user-friendly digital experiences",
    steps: [
      "Learn design principles and color theory",
      "Master Figma or Adobe XD",
      "Understand user research methods",
      "Practice wireframing and prototyping",
      "Learn typography and layout design",
      "Study interaction design patterns",
      "Build a design portfolio",
      "Learn basic HTML/CSS for implementation"
    ],
    icon: <PencilRuler />,
    difficulty: "beginner",
    timeEstimate: "6-9 months",
    resources: [
      { title: "Design Course by Google", url: "https://coursera.org", type: "course", platform: "Coursera" },
      { title: "Figma Academy", url: "https://figma.com", type: "video", platform: "Figma" },
      { title: "Adobe XD Tutorials", url: "https://adobe.com", type: "video", platform: "Adobe" }
    ],
    tools: ["Figma", "Adobe XD", "Sketch", "Principle", "InVision", "Photoshop"],
    platforms: ["Behance", "Dribbble", "Figma Community", "Adobe Creative Cloud"],
    certifications: ["Google UX Design", "Adobe Certified Expert", "Figma Design Systems"]
  },
  {
    id: 4,
    title: "DevOps Engineer",
    description: "Automate and optimize software deployment processes",
    steps: [
      "Learn Linux system administration",
      "Master Docker containerization",
      "Understand CI/CD pipelines",
      "Learn Kubernetes orchestration",
      "Study cloud platforms (AWS/Azure/GCP)",
      "Practice infrastructure as code",
      "Learn monitoring and logging",
      "Understand security best practices"
    ],
    icon: <GitBranch />,
    difficulty: "advanced",
    timeEstimate: "10-15 months",
    resources: [
      { title: "DevOps Handbook", url: "https://amazon.com", type: "book", platform: "Amazon" },
      { title: "Kubernetes Documentation", url: "https://kubernetes.io", type: "article", platform: "Kubernetes" },
      { title: "AWS Training", url: "https://aws.amazon.com", type: "course", platform: "AWS" }
    ],
    tools: ["Docker", "Kubernetes", "Jenkins", "Terraform", "Ansible", "Git"],
    platforms: ["AWS", "Azure", "Google Cloud", "GitHub Actions", "GitLab CI"],
    certifications: ["AWS DevOps Engineer", "Kubernetes Administrator", "Docker Certified Associate"]
  },
  {
    id: 5,
    title: "Mobile App Developer",
    description: "Build native and cross-platform mobile applications",
    steps: [
      "Choose platform (iOS/Android/Cross-platform)",
      "Learn programming language (Swift/Kotlin/React Native)",
      "Understand mobile UI/UX principles",
      "Practice with mobile development tools",
      "Learn app store guidelines",
      "Study mobile testing strategies",
      "Build and publish apps",
      "Learn app analytics and optimization"
    ],
    icon: <Smartphone />,
    difficulty: "intermediate",
    timeEstimate: "8-12 months",
    resources: [
      { title: "React Native Documentation", url: "https://reactnative.dev", type: "article", platform: "React Native" },
      { title: "Swift Programming Guide", url: "https://developer.apple.com", type: "article", platform: "Apple" },
      { title: "Android Developer Guides", url: "https://developer.android.com", type: "article", platform: "Google" }
    ],
    tools: ["React Native", "Flutter", "Xcode", "Android Studio", "Expo", "Firebase"],
    platforms: ["App Store", "Google Play", "TestFlight", "Firebase Console"],
    certifications: ["Google Associate Android Developer", "Apple iOS Developer", "React Native Certification"]
  },
  {
    id: 6,
    title: "Cybersecurity Analyst",
    description: "Protect systems and data from cyber threats",
    steps: [
      "Learn networking fundamentals",
      "Understand security principles",
      "Study common attack vectors",
      "Learn security tools and frameworks",
      "Practice incident response",
      "Study compliance and regulations",
      "Learn penetration testing",
      "Build security monitoring skills"
    ],
    icon: <ShieldCheck />,
    difficulty: "advanced",
    timeEstimate: "12-18 months",
    resources: [
      { title: "CompTIA Security+ Guide", url: "https://comptia.org", type: "book", platform: "CompTIA" },
      { title: "OWASP Top 10", url: "https://owasp.org", type: "article", platform: "OWASP" },
      { title: "Cybrary Security Training", url: "https://cybrary.it", type: "course", platform: "Cybrary" }
    ],
    tools: ["Wireshark", "Nmap", "Metasploit", "Burp Suite", "Splunk", "Nessus"],
    platforms: ["Kali Linux", "Security Onion", "SANS", "Cybrary"],
    certifications: ["CompTIA Security+", "CISSP", "CEH", "CISM"]
  }
];

const RoadmapGenerator = () => {
  const [selectedRoadmaps, setSelectedRoadmaps] = useState<Roadmap[]>([]);
  const [showDetails, setShowDetails] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Roadmaps' },
    { id: 'development', label: 'Development' },
    { id: 'data', label: 'Data & Analytics' },
    { id: 'design', label: 'Design' },
    { id: 'security', label: 'Security' }
  ];

  const getFilteredRoadmaps = () => {
    if (selectedCategory === 'all') return predefinedRoadmaps;
    
    const categoryMap: { [key: string]: string[] } = {
      'development': ['Full Stack Developer', 'Mobile App Developer', 'DevOps Engineer'],
      'data': ['Data Scientist'],
      'design': ['UI/UX Designer'],
      'security': ['Cybersecurity Analyst']
    };
    
    return predefinedRoadmaps.filter(roadmap => 
      categoryMap[selectedCategory]?.includes(roadmap.title)
    );
  };

  const getDifficultyTagClass = (difficulty: 'beginner' | 'intermediate' | 'advanced') => {
    const classes = {
      beginner: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      advanced: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    };
    return classes[difficulty];
  };

  const getResourceTagClass = (type: 'book' | 'video' | 'course' | 'article' | 'tool' | 'community') => {
    const classes = {
      book: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      video: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      course: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      article: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
      tool: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      community: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200'
    };
    return classes[type];
  };

  const selectRoadmap = (roadmap: Roadmap) => {
    if (!selectedRoadmaps.find(r => r.id === roadmap.id)) {
      setSelectedRoadmaps([...selectedRoadmaps, roadmap]);
    }
  };

  const removeRoadmap = (roadmapId: number) => {
    setSelectedRoadmaps(selectedRoadmaps.filter(r => r.id !== roadmapId));
  };

  const toggleRoadmapDetails = (id: number) => {
    setShowDetails(showDetails === id ? null : id);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Tech Career Roadmaps</h1>
            <p className="text-lg text-muted-foreground">
              Discover structured learning paths for popular tech careers. Select roadmaps that match your goals.
            </p>
          </div>

          {/* Category Filter */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map(category => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className="mb-2"
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Available Roadmaps */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Available Roadmaps</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {getFilteredRoadmaps().map((roadmap) => (
                <Card key={roadmap.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-md bg-primary/10 text-primary">
                        {roadmap.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{roadmap.title}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={getDifficultyTagClass(roadmap.difficulty)}>
                            {roadmap.difficulty}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{roadmap.timeEstimate}</span>
                        </div>
                      </div>
                    </div>
                    <CardDescription>{roadmap.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button 
                      onClick={() => selectRoadmap(roadmap)}
                      className="w-full"
                      disabled={selectedRoadmaps.some(r => r.id === roadmap.id)}
                    >
                      {selectedRoadmaps.some(r => r.id === roadmap.id) ? 'Added' : 'Add to My Roadmaps'}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          {/* Selected Roadmaps */}
          {selectedRoadmaps.length > 0 && (
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold">My Selected Roadmaps</h2>
              
              {selectedRoadmaps.map((roadmap) => (
                <Card key={roadmap.id} className="overflow-hidden border-t-4 border-t-primary">
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
                      
                      <div className="flex items-center gap-2">
                        <Badge className={getDifficultyTagClass(roadmap.difficulty)}>
                          {roadmap.difficulty}
                        </Badge>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => removeRoadmap(roadmap.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pb-4">
                    <div className="mb-4">
                      <div className="text-sm font-medium mb-2">Learning Path:</div>
                      <ol className="space-y-2 list-decimal pl-5 text-sm">
                        {roadmap.steps.map((step, index) => (
                          <li key={index}>{step}</li>
                        ))}
                      </ol>
                    </div>
                    
                    {showDetails === roadmap.id && (
                      <div className="space-y-4 mt-6 pt-4 border-t">
                        <div>
                          <div className="text-sm font-medium mb-1">Estimated Time:</div>
                          <div className="text-sm">{roadmap.timeEstimate}</div>
                        </div>
                        
                        <div>
                          <div className="text-sm font-medium mb-2">Recommended Resources:</div>
                          <div className="grid gap-2">
                            {roadmap.resources.map((resource, index) => (
                              <div key={index} className="flex items-start gap-2">
                                <Badge className={getResourceTagClass(resource.type)}>
                                  {resource.type}
                                </Badge>
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
                        
                        <div>
                          <div className="text-sm font-medium mb-1">Tools & Technologies:</div>
                          <div className="flex flex-wrap gap-2">
                            {roadmap.tools.map((tool, index) => (
                              <Badge key={index} variant="secondary">
                                {tool}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-sm font-medium mb-1">Learning Platforms:</div>
                          <div className="flex flex-wrap gap-2">
                            {roadmap.platforms.map((platform, index) => (
                              <Badge key={index} variant="secondary">
                                {platform}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
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
