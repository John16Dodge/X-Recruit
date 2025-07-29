import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ZoomIn, ZoomOut, RotateCcw, Download, Eye, EyeOff } from 'lucide-react';

interface MindMapNode {
  id: string;
  label: string;
  x: number;
  y: number;
  level: number;
  type: 'root' | 'skill' | 'tool' | 'resource' | 'certification';
  color: string;
  children: string[];
  parent?: string;
}

interface MindMapVisualizationProps {
  roadmapData: {
    title: string;
    steps: string[];
    tools: string[];
    resources: Array<{ title: string; type: string }>;
    certifications: string[];
    difficulty: string;
  };
}

const MindMapVisualization: React.FC<MindMapVisualizationProps> = ({ roadmapData }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showLabels, setShowLabels] = useState(true);
  const [nodes, setNodes] = useState<MindMapNode[]>([]);

  const colors = {
    root: '#3b82f6',
    skill: '#10b981',
    tool: '#f59e0b',
    resource: '#8b5cf6',
    certification: '#ef4444'
  };

  useEffect(() => {
    generateMindMapData();
  }, [roadmapData]);

  const generateMindMapData = () => {
    const centerX = 400;
    const centerY = 300;
    const radiusStep = 150;
    
    const newNodes: MindMapNode[] = [];
    let nodeId = 0;

    // Root node
    const rootNode: MindMapNode = {
      id: `node-${nodeId++}`,
      label: roadmapData.title,
      x: centerX,
      y: centerY,
      level: 0,
      type: 'root',
      color: colors.root,
      children: [],
      parent: undefined
    };
    newNodes.push(rootNode);

    // Skills nodes (first level)
    const skillNodes = roadmapData.steps.slice(0, 6).map((step, index) => {
      const angle = (index * 2 * Math.PI) / 6;
      const x = centerX + Math.cos(angle) * radiusStep;
      const y = centerY + Math.sin(angle) * radiusStep;
      
      const node: MindMapNode = {
        id: `node-${nodeId++}`,
        label: step.length > 30 ? step.substring(0, 30) + '...' : step,
        x,
        y,
        level: 1,
        type: 'skill',
        color: colors.skill,
        children: [],
        parent: rootNode.id
      };
      rootNode.children.push(node.id);
      return node;
    });
    newNodes.push(...skillNodes);

    // Tools nodes (second level)
    const toolNodes = roadmapData.tools.slice(0, 8).map((tool, index) => {
      const parentIndex = index % skillNodes.length;
      const parent = skillNodes[parentIndex];
      const angle = (index * 2 * Math.PI) / 8;
      const x = parent.x + Math.cos(angle) * (radiusStep * 0.7);
      const y = parent.y + Math.sin(angle) * (radiusStep * 0.7);
      
      const node: MindMapNode = {
        id: `node-${nodeId++}`,
        label: tool,
        x,
        y,
        level: 2,
        type: 'tool',
        color: colors.tool,
        children: [],
        parent: parent.id
      };
      parent.children.push(node.id);
      return node;
    });
    newNodes.push(...toolNodes);

    // Resource nodes
    const resourceNodes = roadmapData.resources.slice(0, 6).map((resource, index) => {
      const angle = (index * 2 * Math.PI) / 6 + Math.PI / 6;
      const x = centerX + Math.cos(angle) * (radiusStep * 1.5);
      const y = centerY + Math.sin(angle) * (radiusStep * 1.5);
      
      const node: MindMapNode = {
        id: `node-${nodeId++}`,
        label: resource.title.length > 20 ? resource.title.substring(0, 20) + '...' : resource.title,
        x,
        y,
        level: 1,
        type: 'resource',
        color: colors.resource,
        children: [],
        parent: rootNode.id
      };
      rootNode.children.push(node.id);
      return node;
    });
    newNodes.push(...resourceNodes);

    // Certification nodes
    const certNodes = roadmapData.certifications.slice(0, 4).map((cert, index) => {
      const angle = (index * 2 * Math.PI) / 4 + Math.PI / 4;
      const x = centerX + Math.cos(angle) * (radiusStep * 2);
      const y = centerY + Math.sin(angle) * (radiusStep * 2);
      
      const node: MindMapNode = {
        id: `node-${nodeId++}`,
        label: cert.length > 25 ? cert.substring(0, 25) + '...' : cert,
        x,
        y,
        level: 2,
        type: 'certification',
        color: colors.certification,
        children: [],
        parent: rootNode.id
      };
      rootNode.children.push(node.id);
      return node;
    });
    newNodes.push(...certNodes);

    setNodes(newNodes);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev * 1.2, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev / 1.2, 0.3));
  };

  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setIsDragging(false);
  };

  const downloadSVG = () => {
    try {
      if (svgRef.current) {
        const svgData = new XMLSerializer().serializeToString(svgRef.current);
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const svgUrl = URL.createObjectURL(svgBlob);
        const downloadLink = document.createElement('a');
        downloadLink.href = svgUrl;
        downloadLink.download = `${roadmapData.title.replace(/[^a-z0-9]/gi, '_')}-mindmap.svg`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(svgUrl);
      }
    } catch (error) {
      console.error('Error downloading SVG:', error);
    }
  };

  const renderConnections = () => {
    return nodes.map(node => 
      node.children.map(childId => {
        const child = nodes.find(n => n.id === childId);
        if (!child) return null;
        
        return (
          <line
            key={`${node.id}-${childId}`}
            x1={node.x}
            y1={node.y}
            x2={child.x}
            y2={child.y}
            stroke="#e5e7eb"
            strokeWidth="2"
            opacity="0.6"
          />
        );
      })
    ).flat().filter(Boolean);
  };

  const renderNodes = () => {
    return nodes.map(node => (
      <g key={node.id}>
        <circle
          cx={node.x}
          cy={node.y}
          r={node.type === 'root' ? 60 : 40}
          fill={node.color}
          stroke="#fff"
          strokeWidth="3"
          className="transition-all duration-200 hover:opacity-80 cursor-pointer"
        />
        {showLabels && (
          <text
            x={node.x}
            y={node.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="white"
            fontSize={node.type === 'root' ? '14' : '12'}
            fontWeight={node.type === 'root' ? 'bold' : 'normal'}
            className="pointer-events-none"
          >
            {node.label.split(' ').map((word, i) => (
              <tspan key={i} x={node.x} dy={i === 0 ? 0 : '1.2em'}>
                {word}
              </tspan>
            ))}
          </text>
        )}
      </g>
    ));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Mind Map Visualization</span>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowLabels(!showLabels)}>
              {showLabels ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
            <Button variant="outline" size="sm" onClick={handleZoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleZoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleReset}>
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={downloadSVG}>
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-wrap gap-2">
          <Badge style={{ backgroundColor: colors.root, color: 'white' }}>Career Goal</Badge>
          <Badge style={{ backgroundColor: colors.skill, color: 'white' }}>Skills</Badge>
          <Badge style={{ backgroundColor: colors.tool, color: 'white' }}>Tools</Badge>
          <Badge style={{ backgroundColor: colors.resource, color: 'white' }}>Resources</Badge>
          <Badge style={{ backgroundColor: colors.certification, color: 'white' }}>Certifications</Badge>
        </div>
        
        <div 
          className="border rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-900"
          style={{ height: '600px', cursor: isDragging ? 'grabbing' : 'grab' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <svg
            ref={svgRef}
            width="100%"
            height="100%"
            viewBox="0 0 800 600"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transformOrigin: 'center center'
            }}
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                <feOffset dx="2" dy="2" result="offset"/>
                <feComponentTransfer>
                  <feFuncA type="linear" slope="0.2"/>
                </feComponentTransfer>
                <feMerge> 
                  <feMergeNode/>
                  <feMergeNode in="SourceGraphic"/> 
                </feMerge>
              </filter>
            </defs>
            
            {renderConnections()}
            {renderNodes()}
          </svg>
        </div>
        
        <div className="mt-4 text-sm text-muted-foreground">
          <p>💡 <strong>Tip:</strong> Drag to pan, use zoom controls, and toggle labels for better visibility.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MindMapVisualization;
