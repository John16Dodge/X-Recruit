
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { BookOpen, Youtube, Code, Link as LinkIcon, Download, Loader2, BookMarked, ExternalLink, FileText, GraduationCap, ArrowRight, Clock, Target, Cpu, Cloud, Github } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { AIService } from '@/services/AIService';
import { toast } from 'sonner';

interface Resource {
  title: string;
  url: string;
  type: 'video' | 'article' | 'book' | 'course' | 'github' | 'other';
  platform?: string;
}

interface RoadmapStep {
  title: string;
  description: string;
  estimatedTime: string;
  resources: Resource[];
}

interface GeneratedRoadmap {
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  timeEstimate: string;
  steps: RoadmapStep[];
  tools: string[];
  certifications: string[];
}

const CustomRoadmapGenerator: React.FC = () => {
  const [techInput, setTechInput] = useState('');
  const [generatedRoadmap, setGeneratedRoadmap] = useState<GeneratedRoadmap | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [useOllama, setUseOllama] = useState(false);
  const [useMock, setUseMock] = useState(true); // Default to mock data

  const handleGenerateRoadmap = async () => {
    if (!techInput.trim()) {
      toast.warning('Please enter the technologies or skills you want to learn.');
      return;
    }
    setIsLoading(true);
    setGeneratedRoadmap(null);

    try {
      let response;
      if (useMock) {
        response = AIService.generateMockRoadmap({
          careerGoal: techInput,
        });
      } else if (useOllama) {
        response = await AIService.generateOllamaRoadmap({
          careerGoal: techInput,
          experience: 'intermediate',
        });
      } else {
        response = await AIService.generateRoadmap({
          careerGoal: techInput,
          experience: 'intermediate',
        });
      }

      // Map the response to the GeneratedRoadmap interface
      const roadmap: GeneratedRoadmap = {
        title: response.title,
        description: response.description,
        difficulty: response.difficulty as 'Beginner' | 'Intermediate' | 'Advanced',
        timeEstimate: response.timeEstimate,
        steps: response.steps.map((step, index) => ({
          title: `Step ${index + 1}: ${step}`,
          description: `Learn ${step.toLowerCase()} with comprehensive understanding and practical application.`,
          estimatedTime: '2-4 weeks',
          resources: response.resources.slice(index * 2, index * 2 + 2),
        })),
        tools: response.tools,
        certifications: response.certifications,
      };

      setGeneratedRoadmap(roadmap);
    } catch (error) {
      console.error('Error generating roadmap:', error);
      const errorMessage = useMock
        ? 'Something went wrong with the mock data generator.'
        : useOllama
        ? 'Failed to generate roadmap with Ollama. Make sure Ollama is running and the model is pulled.'
        : 'Failed to generate roadmap. Please check your API key and try again.';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const exportToPDF = () => {
    if (!generatedRoadmap) return;

    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text(generatedRoadmap.title, 20, 20);

    const tableData = generatedRoadmap.steps.map((step, index) => [
      `Step ${index + 1}`,
      step.title,
      step.description,
      step.resources.map(r => `• ${r.title} (${r.type})`).join('\n'),
    ]);

    autoTable(doc, {
      head: [['#', 'Step', 'Description', 'Resources']],
      body: tableData,
      startY: 30,
      styles: {
        fontSize: 10,
        cellPadding: 3,
      },
      headStyles: {
        fillColor: [59, 130, 246],
        textColor: 255,
      },
      columnStyles: {
        0: { cellWidth: 15 },
        1: { cellWidth: 40 },
        2: { cellWidth: 60 },
        3: { cellWidth: 70 },
      },
    });

    doc.save(`${techInput.replace(/ /g, '_')}_roadmap.pdf`);
  };
  
  const getResourceIcon = (type: Resource['type']) => {
    switch (type) {
      case 'video':
        return <Youtube className="h-4 w-4 text-red-500" />;
      case 'article':
        return <BookOpen className="h-4 w-4 text-blue-500" />;
      case 'book':
        return <BookOpen className="h-4 w-4 text-green-500" />;
      case 'course':
          return <Code className="h-4 w-4 text-purple-500" />;
      case 'github':
          return <Github className="h-4 w-4 text-gray-800" />;
      default:
        return <LinkIcon className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>🚀 Roadmap Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <label htmlFor="tech-input" className="block text-sm font-medium text-gray-700 mb-2">
            What technologies or skills do you want to learn?
          </label>
          <Textarea
            id="tech-input"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            placeholder="e.g., Frontend Development, Data Science, DevOps, etc."
            className="w-full"
          />
        </div>
        
        {/* AI Model Selection */}
        <div className="mb-4 p-4 bg-gray-50 rounded-lg border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Cloud className="h-5 w-5 text-blue-500" />
              <Label htmlFor="ai-toggle" className="text-sm font-medium">
                OpenAI GPT-4
              </Label>
            </div>
            <Switch
              id="ai-toggle"
              checked={useOllama}
              onCheckedChange={setUseOllama}
            />
            <div className="flex items-center space-x-3">
              <Label htmlFor="ai-toggle" className="text-sm font-medium">
                Ollama (Local)
              </Label>
              <Cpu className="h-5 w-5 text-green-500" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {useOllama 
              ? "🔒 Using local Ollama model - Private and free, but requires Ollama installation"
              : "☁️ Using OpenAI GPT-4 - Requires API key but provides high-quality results"
            }
          </p>
        </div>
        
        <Button onClick={handleGenerateRoadmap} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            'Generate Roadmap'
          )}
        </Button>

        {isLoading && (
          <div className="mt-8 text-center">
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-blue-500" />
            <p className="mt-4 text-lg font-semibold">Unleashing AI-powered insights...</p>
            <p className="text-sm text-gray-500">Please wait while we craft your personalized roadmap.</p>
          </div>
        )}

        {generatedRoadmap && (
          <div className="mt-8">
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">{generatedRoadmap.title}</h2>
                <p className="text-gray-500">{generatedRoadmap.description}</p>
              </div>
              <Button onClick={exportToPDF} variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export as PDF
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-sm">
                <Badge variant="outline" className="flex items-center gap-2 p-2">
                    <Target className="h-4 w-4" />
                    Difficulty: {generatedRoadmap.difficulty}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-2 p-2">
                    <Clock className="h-4 w-4" />
                    Estimated Time: {generatedRoadmap.timeEstimate}
                </Badge>
            </div>

            {/* Block Diagram */}
            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Learning Journey</h3>
                <div className="flex items-center space-x-2 overflow-x-auto pb-4">
                    {generatedRoadmap.steps.map((step, index) => (
                        <React.Fragment key={index}>
                            <div className="flex flex-col items-center text-center">
                                <div className="bg-blue-500 text-white rounded-full h-12 w-12 flex items-center justify-center font-bold text-xl">
                                    {index + 1}
                                </div>
                                <p className="mt-2 text-sm font-medium w-32 break-words">{step.title.replace(/Step \d+: /, '')}</p>
                            </div>
                            {index < generatedRoadmap.steps.length - 1 && (
                                <ArrowRight className="h-6 w-6 text-gray-300 shrink-0" />
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Detailed Learning Steps</h3>
              {generatedRoadmap.steps.map((step, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 text-blue-800 rounded-full h-8 w-8 flex items-center justify-center font-bold shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold mb-2">{step.title}</h4>
                      <p className="text-gray-600 mb-3">{step.description}</p>
                      <div className="flex items-center gap-2 mb-3">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-500">{step.estimatedTime}</span>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-700">Resources:</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {step.resources.map((resource, rIndex) => (
                            <a
                              key={rIndex}
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-2 text-sm text-blue-600 hover:underline p-2 bg-gray-50 rounded-md"
                            >
                              {getResourceIcon(resource.type)}
                              <span className="truncate">{resource.title}</span>
                              <ExternalLink className="h-3 w-3 shrink-0" />
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tools & Technologies */}
            {generatedRoadmap.tools && generatedRoadmap.tools.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Essential Tools & Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {generatedRoadmap.tools.map((tool, index) => (
                    <Badge key={index} variant="secondary" className="px-3 py-1">
                      <Code className="h-3 w-3 mr-1" />
                      {tool}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {generatedRoadmap.certifications && generatedRoadmap.certifications.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Recommended Certifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {generatedRoadmap.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                      <GraduationCap className="h-5 w-5 text-green-500" />
                      <span className="text-sm font-medium">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CustomRoadmapGenerator;


