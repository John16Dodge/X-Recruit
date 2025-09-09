import React from 'react';
import MindMapVisualization from './MindMapVisualization';

interface RoadmapData {
  title: string;
  steps: string[];
  tools: string[];
  resources: any[];
  certifications: string[];
  difficulty: string;
}

interface RoadmapMindMapProps {
  roadmapData: RoadmapData;
}

const RoadmapMindMap: React.FC<RoadmapMindMapProps> = ({ roadmapData }) => {
  // Transform roadmap data to mind map format
  const transformToMindMapData = (data: RoadmapData) => {
    const nodes = [
      {
        id: 'root',
        title: data.title,
        duration: '',
        description: `Complete ${data.title} learning path`,
        level: 0,
        category: 'root'
      }
    ];

    const links: Array<{ source: string; target: string }> = [];

    // Add steps as nodes
    data.steps.forEach((step, index) => {
      const stepId = `step-${index}`;
      nodes.push({
        id: stepId,
        title: `Step ${index + 1}`,
        duration: '2-4 weeks',
        description: step,
        level: 1,
        category: 'step'
      });
      links.push({ source: 'root', target: stepId });
    });

    // Add tools as nodes
    data.tools.forEach((tool, index) => {
      const toolId = `tool-${index}`;
      nodes.push({
        id: toolId,
        title: tool,
        duration: '',
        description: `Essential tool for ${data.title}`,
        level: 2,
        category: 'tool'
      });
      // Connect tools to first few steps
      if (index < 3 && data.steps.length > 0) {
        links.push({ source: `step-${index % data.steps.length}`, target: toolId });
      }
    });

    // Add certifications as nodes
    data.certifications.forEach((cert, index) => {
      const certId = `cert-${index}`;
      nodes.push({
        id: certId,
        title: cert,
        duration: '',
        description: 'Professional certification',
        level: 2,
        category: 'certification'
      });
      // Connect certifications to later steps
      if (data.steps.length > 2) {
        links.push({ source: `step-${Math.max(data.steps.length - 2, 0)}`, target: certId });
      }
    });

    return { nodes, links };
  };

  const { nodes, links } = transformToMindMapData(roadmapData);

  return (
    <MindMapVisualization
      nodes={nodes}
      links={links}
      title={`${roadmapData.title} Mind Map`}
    />
  );
};

export default RoadmapMindMap;