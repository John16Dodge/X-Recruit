
import React from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const RoadmapGenerator = () => {
  return (
    <div className="container mx-auto py-20 px-4">
      <Helmet>
        <title>Roadmap Generator | X-Recruit</title>
        <style>
          {`
            .roadmap-container {
              max-width: 800px;
              margin: 0 auto;
            }
          `}
        </style>
      </Helmet>
      <div className="roadmap-container">
        <h1 className="text-3xl font-bold mb-6 text-center">Career Roadmap Generator</h1>
        <p className="text-center text-muted-foreground mb-8">
          Generate personalized career roadmaps based on your skills and goals
        </p>
        <div className="text-center">
          <Button className="bg-xr-blue hover:bg-xr-blue-dark group">
            Generate Roadmap
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoadmapGenerator;
