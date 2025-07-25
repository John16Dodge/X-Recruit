import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { BookOpen, Code, Lightbulb, LineChart, ArrowDown, ArrowUp, Globe, LaptopIcon, Youtube, Database, Server, PencilRuler, BookMarked, FileText as FileTextIcon, Users as UsersIcon, Terminal, ShieldCheck, Smartphone, Gamepad, Brush, Cog, Brain, Aperture, Headphones, CloudSun, LineChart as Analytics, Network, GitBranch, Blocks } from 'lucide-react';
import ApiKeyManager from '@/components/roadmap/ApiKeyManager';
import RoadmapForm from '@/components/roadmap/RoadmapForm';
import { AIService } from '@/services/AIService';

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
  const [isGenerating, setIsGenerating] = useState(false);
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [showDetails, setShowDetails] = useState<number | null>(null);
  const [hasApiKey, setHasApiKey] = useState(false);

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

  // Get icon for career type
  const getCareerIcon = (title: string): React.ReactNode => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('web') || titleLower.includes('frontend') || titleLower.includes('full stack')) {
      return <Code />;
    } else if (titleLower.includes('data')) {
      return <Database />;
    } else if (titleLower.includes('ui') || titleLower.includes('ux') || titleLower.includes('design')) {
      return <PencilRuler />;
    } else if (titleLower.includes('cloud')) {
      return <CloudSun />;
    } else if (titleLower.includes('devops')) {
      return <GitBranch />;
    } else if (titleLower.includes('machine learning') || titleLower.includes('ai')) {
      return <Brain />;
    } else if (titleLower.includes('cyber') || titleLower.includes('security')) {
      return <ShieldCheck />;
    } else if (titleLower.includes('blockchain')) {
      return <Blocks />;
    } else if (titleLower.includes('mobile')) {
      return <Smartphone />;
    } else if (titleLower.includes('game')) {
      return <Gamepad />;
    }
    return <Code />;
  };

  // Generate AI roadmap
  const generateAIRoadmap = async (formData: any) => {
    setIsGenerating(true);
    
    try {
      const aiResponse = await AIService.generateRoadmap({
        careerGoal: formData.careerGoal,
        currentSkills: formData.currentSkills,
        experience: formData.experience,
        timeframe: formData.timeframe,
        learningStyle: formData.learningStyle
      });

      const newRoadmap: Roadmap = {
        id: Date.now(),
        title: aiResponse.title,
        description: aiResponse.description,
        steps: aiResponse.steps,
        icon: getCareerIcon(aiResponse.title),
        difficulty: aiResponse.difficulty,
        timeEstimate: aiResponse.timeEstimate,
        resources: aiResponse.resources,
        tools: aiResponse.tools,
        platforms: aiResponse.platforms,
        certifications: aiResponse.certifications,
        aiGenerated: true
      };

      setRoadmaps(prev => [newRoadmap, ...prev]);
      
      toast({
        title: "AI Roadmap Generated!",
        description: `Your personalized roadmap for ${aiResponse.title} has been created.`
      });
      
    } catch (error) {
      console.error('Error generating AI roadmap:', error);
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Failed to generate roadmap. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
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
            <h1 className="text-4xl font-bold tracking-tight mb-4">AI-Powered Tech Career Roadmap Generator</h1>
            <p className="text-lg text-muted-foreground">
              Get personalized, AI-generated career roadmaps tailored to your goals, skills, and learning style.
            </p>
          </div>
          
          <ApiKeyManager onApiKeySet={setHasApiKey} />
          
          {hasApiKey && (
            <div className="mb-12">
              <RoadmapForm onSubmit={generateAIRoadmap} isGenerating={isGenerating} />
            </div>
          )}
          
          {roadmaps.length > 0 && (
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold">Your AI-Generated Roadmaps</h2>
              
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
                          <CardTitle className="flex items-center gap-2">
                            {roadmap.title}
                            {roadmap.aiGenerated && (
                              <Brain className="h-4 w-4 text-accent" />
                            )}
                          </CardTitle>
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
