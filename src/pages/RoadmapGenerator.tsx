import React from 'react';
import AIRoadmapGenerator from '@/components/roadmap/AIRoadmapGenerator';

const RoadmapGenerator: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Career Roadmap Generator
            </h1>
            <p className="text-xl text-muted-foreground">
              Create your personalized learning path with AI-powered insights
            </p>
          </div>
          <AIRoadmapGenerator />
        </div>
      </div>
    </div>
  );
};

export default RoadmapGenerator;