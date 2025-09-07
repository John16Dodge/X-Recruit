import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Brain, Sparkles, Loader2 } from 'lucide-react';
import { AIService } from '@/services/AIService';
import RoadmapForm from './RoadmapForm';
import RoadmapVisualizer from './RoadmapVisualizer';
import ApiKeyManager from './ApiKeyManager';

const AIRoadmapGenerator: React.FC = () => {
  const [generatedRoadmap, setGeneratedRoadmap] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasApiKey, setHasApiKey] = useState(false);

  const handleGenerateRoadmap = async (formData: any) => {
    setIsGenerating(true);
    setError(null);
    
    try {
      const roadmap = await AIService.generateRoadmap({
        careerGoal: formData.careerGoal,
        currentSkills: formData.currentSkills,
        experience: formData.experience,
        timeframe: formData.timeframe,
        learningStyle: formData.learningStyle
      });
      
      setGeneratedRoadmap(roadmap);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while generating the roadmap');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleClearRoadmap = () => {
    setGeneratedRoadmap(null);
    setError(null);
  };

  return (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-primary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            AI-Powered Roadmap Generator
          </CardTitle>
          <CardDescription>
            Generate personalized learning roadmaps with visual MindMaps and timeline graphs using advanced AI.
          </CardDescription>
        </CardHeader>
      </Card>

      <ApiKeyManager onApiKeySet={setHasApiKey} />

      {hasApiKey && (
        <>
          {!generatedRoadmap ? (
            <div className="space-y-6">
              <RoadmapForm onSubmit={handleGenerateRoadmap} isGenerating={isGenerating} />
              
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              {isGenerating && (
                <Card>
                  <CardContent className="flex items-center justify-center py-12">
                    <div className="text-center">
                      <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
                      <h3 className="text-lg font-semibold mb-2">Generating Your Personalized Roadmap</h3>
                      <p className="text-muted-foreground">
                        Our AI is analyzing your goals and creating a customized learning path...
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">Your AI-Generated Roadmap</h2>
                </div>
                <Button variant="outline" onClick={handleClearRoadmap}>
                  Generate New Roadmap
                </Button>
              </div>
              
              <RoadmapVisualizer roadmap={generatedRoadmap} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AIRoadmapGenerator;