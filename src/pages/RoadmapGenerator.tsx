
import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { 
  FileCode, 
  Briefcase, 
  Rocket, 
  Database,
  PenTool,
  Brain,
  BarChart,
  Globe,
  Layers,
  Server,
  Smartphone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Roadmap } from '@/types/roadmap';

// Define the form schema using Zod
const formSchema = z.object({
  careerPath: z.string().min(2, "Please select a career path"),
  experienceLevel: z.string().min(2, "Please select your experience level"),
  interests: z.string().min(2, "Please enter your interests")
});

// Sample predefined roadmaps data
const predefinedRoadmaps: Roadmap[] = [
  {
    id: 1,
    title: "Frontend Web Development",
    description: "Master modern frontend technologies and frameworks",
    difficulty: "beginner",
    timeEstimate: "6-9 months",
    steps: [
      "Learn HTML, CSS, and basic JavaScript",
      "Understand responsive design principles",
      "Master a JavaScript framework (React, Vue, or Angular)",
      "Learn state management",
      "Study web performance optimization",
      "Build a portfolio of projects",
      "Apply for entry-level positions"
    ],
    icon: <FileCode />,
    resources: [
      {
        title: "JavaScript: The Definitive Guide",
        url: "https://www.oreilly.com/library/view/javascript-the-definitive/9781491952016/",
        type: "book"
      },
      {
        title: "React Documentation",
        url: "https://reactjs.org/docs/getting-started.html",
        type: "article"
      },
      {
        title: "Frontend Masters",
        url: "https://frontendmasters.com/",
        type: "course",
        platform: "Frontend Masters"
      }
    ],
    tools: ["VS Code", "Chrome DevTools", "GitHub", "npm/yarn"],
    platforms: ["GitHub Pages", "Vercel", "Netlify"],
    certifications: ["Meta Frontend Developer Certificate", "freeCodeCamp Responsive Web Design"]
  },
  {
    id: 2,
    title: "UX/UI Design",
    description: "Learn to create beautiful and user-friendly interfaces",
    difficulty: "intermediate",
    timeEstimate: "8-12 months",
    steps: [
      "Learn design fundamentals and principles",
      "Master a design tool (Figma, Adobe XD)",
      "Study user research methodologies",
      "Learn interaction design patterns",
      "Build a portfolio of design projects",
      "Network with other designers",
      "Apply for junior design positions"
    ],
    icon: <PenTool />,
    resources: [
      {
        title: "Don't Make Me Think",
        url: "https://www.nngroup.com/books/dont-make-me-think-revisited/",
        type: "book"
      },
      {
        title: "Figma Tutorials",
        url: "https://www.figma.com/resources/learn-design/",
        type: "video"
      },
      {
        title: "Interaction Design Foundation Courses",
        url: "https://www.interaction-design.org/",
        type: "course",
        platform: "Interaction Design Foundation"
      }
    ],
    tools: ["Figma", "Adobe XD", "Sketch", "InVision"],
    platforms: ["Dribbble", "Behance"],
    certifications: ["Google UX Design Professional Certificate", "Nielsen Norman Group UX Certification"]
  },
  {
    id: 3,
    title: "Data Science",
    description: "Learn to analyze and interpret complex data",
    difficulty: "advanced",
    timeEstimate: "12-18 months",
    steps: [
      "Learn Python programming",
      "Study statistics and probability",
      "Master data cleaning and preprocessing",
      "Learn machine learning algorithms",
      "Study data visualization techniques",
      "Work on real-world data projects",
      "Build a portfolio on GitHub",
      "Prepare for data science interviews"
    ],
    icon: <Brain />,
    resources: [
      {
        title: "Python Data Science Handbook",
        url: "https://jakevdp.github.io/PythonDataScienceHandbook/",
        type: "book"
      },
      {
        title: "Kaggle Learn",
        url: "https://www.kaggle.com/learn",
        type: "course",
        platform: "Kaggle"
      },
      {
        title: "Fast.ai",
        url: "https://www.fast.ai/",
        type: "course",
        platform: "fast.ai"
      }
    ],
    tools: ["Python", "Jupyter Notebooks", "Pandas", "NumPy", "Scikit-learn", "TensorFlow"],
    platforms: ["Kaggle", "GitHub"],
    certifications: ["IBM Data Science Professional Certificate", "Microsoft Certified: Azure Data Scientist Associate"]
  }
];

const RoadmapGenerator = () => {
  const [generatedRoadmap, setGeneratedRoadmap] = useState<Roadmap | null>(null);
  const [loading, setLoading] = useState(false);
  const [showDetails, setShowDetails] = useState<number | null>(null);
  
  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      careerPath: "",
      experienceLevel: "",
      interests: ""
    },
  });
  
  // Function to handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Generate a custom roadmap based on form values
      const customRoadmap: Roadmap = {
        id: 100,
        title: `${values.careerPath} Development Roadmap`,
        description: `Personalized roadmap for ${values.careerPath} with ${values.experienceLevel} experience`,
        steps: [
          `Start with fundamentals of ${values.careerPath}`,
          `Build basic projects to reinforce knowledge`,
          `Learn industry standard tools and practices`,
          `Work on more complex projects incorporating ${values.interests}`,
          `Learn advanced concepts in ${values.careerPath}`,
          `Build a portfolio showcasing your work`,
          `Network and apply for positions`
        ],
        icon: <Rocket />,
        difficulty: values.experienceLevel === "No experience" ? "beginner" : 
                 values.experienceLevel === "Some experience" ? "intermediate" : "advanced",
        timeEstimate: values.experienceLevel === "No experience" ? "9-12 months" : 
                     values.experienceLevel === "Some experience" ? "6-9 months" : "3-6 months",
        resources: [
          {
            title: `${values.careerPath} Fundamentals`,
            url: "https://example.com/resources",
            type: "book"
          },
          {
            title: `Advanced ${values.careerPath}`,
            url: "https://example.com/course",
            type: "course",
            platform: "Online Learning Platform"
          }
        ],
        tools: ["Industry Standard Tools", "Version Control", "Project Management Software"],
        platforms: ["GitHub", "Portfolio Website"],
        certifications: [`${values.careerPath} Professional Certificate`],
        aiGenerated: true
      };
      
      setGeneratedRoadmap(customRoadmap);
      setLoading(false);
    }, 2000);
  };

  // Function to toggle roadmap details
  const toggleRoadmapDetails = (id: number) => {
    if (showDetails === id) {
      setShowDetails(null);
    } else {
      setShowDetails(id);
    }
  };
  
  // Function to get difficulty tag class
  const getDifficultyTagClass = (difficulty: 'beginner' | 'intermediate' | 'advanced') => {
    switch (difficulty) {
      case 'beginner':
        return 'px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium';
      case 'intermediate':
        return 'px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm font-medium';
      case 'advanced':
        return 'px-3 py-1 rounded-full bg-red-100 text-red-800 text-sm font-medium';
      default:
        return 'px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium';
    }
  };
  
  // Function to get resource tag class
  const getResourceTagClass = (type: 'book' | 'video' | 'course' | 'article' | 'tool' | 'community') => {
    switch (type) {
      case 'book':
        return 'px-2 py-1 rounded-md bg-blue-100 text-blue-800 text-xs uppercase';
      case 'video':
        return 'px-2 py-1 rounded-md bg-red-100 text-red-800 text-xs uppercase';
      case 'course':
        return 'px-2 py-1 rounded-md bg-purple-100 text-purple-800 text-xs uppercase';
      case 'article':
        return 'px-2 py-1 rounded-md bg-green-100 text-green-800 text-xs uppercase';
      case 'tool':
        return 'px-2 py-1 rounded-md bg-yellow-100 text-yellow-800 text-xs uppercase';
      case 'community':
        return 'px-2 py-1 rounded-md bg-pink-100 text-pink-800 text-xs uppercase';
      default:
        return 'px-2 py-1 rounded-md bg-gray-100 text-gray-800 text-xs uppercase';
    }
  };
  
  // Function to get card gradient class based on difficulty
  const getCardGradientClass = (difficulty?: 'beginner' | 'intermediate' | 'advanced') => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-gradient-to-br from-green-50 to-white';
      case 'intermediate':
        return 'bg-gradient-to-br from-yellow-50 to-white';
      case 'advanced':
        return 'bg-gradient-to-br from-red-50 to-white';
      default:
        return 'bg-gradient-to-br from-blue-50 to-white';
    }
  };

  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Career Roadmap Generator</h1>
            <p className="text-gray-600">Create a personalized career roadmap to guide your professional journey</p>
          </div>
          
          <Card className="mb-12 p-6 shadow-md">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="careerPath"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Career Path</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select career path" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Web Development">Web Development</SelectItem>
                          <SelectItem value="Mobile App Development">Mobile App Development</SelectItem>
                          <SelectItem value="UI/UX Design">UI/UX Design</SelectItem>
                          <SelectItem value="Data Science">Data Science</SelectItem>
                          <SelectItem value="Machine Learning">Machine Learning</SelectItem>
                          <SelectItem value="DevOps">DevOps</SelectItem>
                          <SelectItem value="Cloud Engineering">Cloud Engineering</SelectItem>
                          <SelectItem value="Cybersecurity">Cybersecurity</SelectItem>
                          <SelectItem value="Blockchain Development">Blockchain Development</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Choose the career path you're interested in pursuing
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="experienceLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Experience Level</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select your experience level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="No experience">No experience (Beginner)</SelectItem>
                          <SelectItem value="Some experience">Some experience (Intermediate)</SelectItem>
                          <SelectItem value="Experienced">Experienced (Advanced)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Your current level of experience in the selected field
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="interests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Specific Interests or Goals</FormLabel>
                      <FormControl>
                        <Input placeholder="E.g., Frontend, AI applications, Mobile apps, etc." {...field} />
                      </FormControl>
                      <FormDescription>
                        Any specific areas or technologies you're interested in
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Generating Roadmap...' : 'Generate My Roadmap'}
                </Button>
              </form>
            </Form>
          </Card>
          
          {loading && (
            <div className="space-y-6">
              <div className="text-center mb-4">
                <h2 className="text-xl font-semibold">Generating your personalized roadmap...</h2>
                <p className="text-gray-600 mt-2">This may take a moment</p>
              </div>
              
              <div className="space-y-4">
                <Skeleton className="h-12 w-3/4 mx-auto" />
                <Skeleton className="h-24 w-full" />
                <div className="space-y-2">
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-3/4" />
                </div>
              </div>
            </div>
          )}
          
          {generatedRoadmap && !loading && (
            <div className="space-y-8">
              <div className="text-center">
                <div className="inline-block p-2 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 mb-4">
                  <div className="p-2 rounded-full bg-gradient-to-r from-purple-500/30 to-blue-500/30">
                    {generatedRoadmap.icon}
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-2">{generatedRoadmap.title}</h2>
                <p className="text-gray-600">{generatedRoadmap.description}</p>
                
                {generatedRoadmap.aiGenerated && (
                  <div className="mt-4 inline-block px-3 py-1 rounded-full bg-accent/20 text-accent-foreground text-sm">
                    AI Generated Roadmap
                  </div>
                )}
              </div>
              
              <Card className={`overflow-hidden border-l-4 ${generatedRoadmap.aiGenerated ? 'border-l-accent' : 'border-l-primary'} ${getCardGradientClass(generatedRoadmap.difficulty)}`}>
                <div className="p-6">
                  <div className="flex flex-col md:flex-row justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Your Roadmap Path</h3>
                      <p className="text-gray-600">Follow these steps to achieve your career goals</p>
                    </div>
                    
                    {generatedRoadmap.difficulty && (
                      <div className={`${getDifficultyTagClass(generatedRoadmap.difficulty)} self-start md:self-center mt-2 md:mt-0`}>
                        {generatedRoadmap.difficulty.charAt(0).toUpperCase() + generatedRoadmap.difficulty.slice(1)}
                      </div>
                    )}
                  </div>
                  
                  <ol className="list-decimal pl-5 space-y-4">
                    {generatedRoadmap.steps.map((step, index) => (
                      <li key={index} className="pl-2">{step}</li>
                    ))}
                  </ol>
                  
                  {/* Details section that can be toggled */}
                  <div className="mt-8">
                    <Button 
                      variant="outline" 
                      className="w-full flex items-center justify-center gap-2"
                      onClick={() => toggleRoadmapDetails(generatedRoadmap.id)}
                    >
                      {showDetails === generatedRoadmap.id ? (
                        <>Hide Details <ArrowUp size={16} /></>
                      ) : (
                        <>Show Details <ArrowDown size={16} /></>
                      )}
                    </Button>
                    
                    {showDetails === generatedRoadmap.id && (
                      <div className="mt-6 space-y-6 pt-6 border-t border-dashed">
                        {generatedRoadmap.timeEstimate && (
                          <div>
                            <h4 className="font-medium mb-2">Estimated Time to Complete:</h4>
                            <div className="bg-blue-50 text-blue-700 inline-block px-3 py-1 rounded-md">
                              {generatedRoadmap.timeEstimate}
                            </div>
                          </div>
                        )}
                        
                        {generatedRoadmap.resources && generatedRoadmap.resources.length > 0 && (
                          <div>
                            <h4 className="font-medium mb-3">Recommended Resources:</h4>
                            <div className="space-y-3">
                              {generatedRoadmap.resources.map((resource, index) => (
                                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                                  <div className={`${getResourceTagClass(resource.type)} mt-0.5`}>
                                    {resource.type}
                                  </div>
                                  <div>
                                    <a 
                                      href={resource.url} 
                                      target="_blank" 
                                      rel="noopener noreferrer" 
                                      className="font-medium text-blue-600 hover:text-blue-800"
                                    >
                                      {resource.title}
                                    </a>
                                    {resource.platform && (
                                      <p className="text-sm text-gray-600">Platform: {resource.platform}</p>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {generatedRoadmap.tools && (
                          <div>
                            <h4 className="font-medium mb-2">Tools & Technologies:</h4>
                            <div className="flex flex-wrap gap-2">
                              {generatedRoadmap.tools.map((tool, index) => (
                                <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                                  {tool}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {generatedRoadmap.platforms && (
                          <div>
                            <h4 className="font-medium mb-2">Platforms & Services:</h4>
                            <div className="flex flex-wrap gap-2">
                              {generatedRoadmap.platforms.map((platform, index) => (
                                <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                                  {platform}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {generatedRoadmap.certifications && (
                          <div>
                            <h4 className="font-medium mb-2">Recommended Certifications:</h4>
                            <div className="space-y-2">
                              {generatedRoadmap.certifications.map((certification, index) => (
                                <div key={index} className="px-3 py-2 bg-green-50 text-green-800 rounded-md">
                                  {certification}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          )}
          
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Explore Predefined Roadmaps</h2>
            
            <Accordion type="multiple">
              <AccordionItem value="categories">
                <AccordionTrigger className="text-lg">Browse by Career Category</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-4">
                    <Button variant="outline" className="flex items-center gap-2 justify-start">
                      <Globe size={18} /> Web Development
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2 justify-start">
                      <Database size={18} /> Data Science
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2 justify-start">
                      <Briefcase size={18} /> Business
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2 justify-start">
                      <Server size={18} /> DevOps
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2 justify-start">
                      <Smartphone size={18} /> Mobile Development
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2 justify-start">
                      <BarChart size={18} /> Data Analytics
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <div className="mt-8 space-y-8">
              {predefinedRoadmaps.map((roadmap) => (
                <Card 
                  key={roadmap.id} 
                  className={`overflow-hidden border-l-4 ${roadmap.aiGenerated ? 'border-l-accent' : 'border-l-primary'} ${getCardGradientClass(roadmap.difficulty)} shadow-lg hover:shadow-xl transition-shadow duration-300`}
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 text-primary">
                          {roadmap.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{roadmap.title}</h3>
                          <p className="text-gray-600 mt-1">{roadmap.description}</p>
                        </div>
                      </div>
                      
                      {roadmap.difficulty && (
                        <div className={`${getDifficultyTagClass(roadmap.difficulty)} self-start md:self-center`}>
                          {roadmap.difficulty.charAt(0).toUpperCase() + roadmap.difficulty.slice(1)}
                        </div>
                      )}
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="font-medium mb-3">Roadmap Steps:</h4>
                      <ol className="list-decimal pl-5 space-y-2">
                        {roadmap.steps.map((step, index) => (
                          <li key={index} className="pl-2">{step}</li>
                        ))}
                      </ol>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="w-full flex items-center justify-center gap-2"
                      onClick={() => toggleRoadmapDetails(roadmap.id)}
                    >
                      {showDetails === roadmap.id ? (
                        <>Hide Details <ArrowUp size={16} /></>
                      ) : (
                        <>Show Details <ArrowDown size={16} /></>
                      )}
                    </Button>
                    
                    {showDetails === roadmap.id && (
                      <div className="mt-6 space-y-6 pt-6 border-t border-dashed">
                        {roadmap.timeEstimate && (
                          <div>
                            <h4 className="font-medium mb-2">Estimated Time to Complete:</h4>
                            <div className="bg-blue-50 text-blue-700 inline-block px-3 py-1 rounded-md">
                              {roadmap.timeEstimate}
                            </div>
                          </div>
                        )}
                        
                        {roadmap.resources && roadmap.resources.length > 0 && (
                          <div>
                            <h4 className="font-medium mb-3">Recommended Resources:</h4>
                            <div className="space-y-3">
                              {roadmap.resources.map((resource, index) => (
                                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                                  <div className={`${getResourceTagClass(resource.type)} mt-0.5`}>
                                    {resource.type}
                                  </div>
                                  <div>
                                    <a 
                                      href={resource.url} 
                                      target="_blank" 
                                      rel="noopener noreferrer" 
                                      className="font-medium text-blue-600 hover:text-blue-800"
                                    >
                                      {resource.title}
                                    </a>
                                    {resource.platform && (
                                      <p className="text-sm text-gray-600">Platform: {resource.platform}</p>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {roadmap.tools && (
                          <div>
                            <h4 className="font-medium mb-2">Tools & Technologies:</h4>
                            <div className="flex flex-wrap gap-2">
                              {roadmap.tools.map((tool, index) => (
                                <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                                  {tool}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {roadmap.platforms && (
                          <div>
                            <h4 className="font-medium mb-2">Platforms & Services:</h4>
                            <div className="flex flex-wrap gap-2">
                              {roadmap.platforms.map((platform, index) => (
                                <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                                  {platform}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {roadmap.certifications && (
                          <div>
                            <h4 className="font-medium mb-2">Recommended Certifications:</h4>
                            <div className="space-y-2">
                              {roadmap.certifications.map((certification, index) => (
                                <div key={index} className="px-3 py-2 bg-green-50 text-green-800 rounded-md">
                                  {certification}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RoadmapGenerator;
