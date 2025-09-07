import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface MindMapNode {
  id: string;
  title: string;
  duration: string;
  description: string;
  level: number;
  category: string;
  x?: number;
  y?: number;
}

interface MindMapLink {
  source: string;
  target: string;
}

interface MindMapVisualizationProps {
  nodes: MindMapNode[];
  links: MindMapLink[];
  title: string;
}

const MindMapVisualization: React.FC<MindMapVisualizationProps> = ({ nodes, links, title }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (!svgRef.current || nodes.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 800;
    const height = 600;
    const centerX = width / 2;
    const centerY = height / 2;

    // Create zoom behavior
    const zoomBehavior = d3.zoom()
      .scaleExtent([0.1, 3])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
        setZoom(event.transform.k);
      });

    svg.call(zoomBehavior as any);

    const g = svg.append('g');

    // Create simulation
    const simulation = d3.forceSimulation(nodes as any)
      .force('link', d3.forceLink(links).id((d: any) => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(centerX, centerY))
      .force('collision', d3.forceCollide().radius(60));

    // Create links
    const link = g.append('g')
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke', '#94a3b8')
      .attr('stroke-width', 2)
      .attr('stroke-opacity', 0.6);

    // Create nodes
    const node = g.append('g')
      .selectAll('g')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', 'node')
      .style('cursor', 'pointer');

    // Add circles for nodes
    node.append('circle')
      .attr('r', (d) => Math.max(30, d.title.length * 2))
      .attr('fill', (d) => {
        const colors = {
          'foundation': '#3b82f6',
          'core': '#8b5cf6',
          'advanced': '#ef4444',
          'specialization': '#10b981',
          'project': '#f59e0b'
        };
        return colors[d.category as keyof typeof colors] || '#6b7280';
      })
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 3)
      .style('filter', 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))');

    // Add text labels
    node.append('text')
      .text((d) => d.title)
      .attr('text-anchor', 'middle')
      .attr('dy', '-0.5em')
      .attr('fill', 'white')
      .attr('font-size', '12px')
      .attr('font-weight', 'bold')
      .style('pointer-events', 'none');

    // Add duration labels
    node.append('text')
      .text((d) => d.duration)
      .attr('text-anchor', 'middle')
      .attr('dy', '1em')
      .attr('fill', 'white')
      .attr('font-size', '10px')
      .style('pointer-events', 'none');

    // Add hover effects
    node.on('mouseover', function(event, d) {
      d3.select(this).select('circle')
        .transition()
        .duration(200)
        .attr('r', (d: any) => Math.max(35, d.title.length * 2.2));
      
      // Show tooltip
      const tooltip = d3.select('body').append('div')
        .attr('class', 'tooltip')
        .style('position', 'absolute')
        .style('background', 'rgba(0, 0, 0, 0.8)')
        .style('color', 'white')
        .style('padding', '8px')
        .style('border-radius', '4px')
        .style('font-size', '12px')
        .style('pointer-events', 'none')
        .style('z-index', '1000')
        .html(`<strong>${d.title}</strong><br/>Duration: ${d.duration}<br/>${d.description}`)
        .style('left', (event.pageX + 10) + 'px')
        .style('top', (event.pageY - 10) + 'px');
    })
    .on('mouseout', function() {
      d3.select(this).select('circle')
        .transition()
        .duration(200)
        .attr('r', (d: any) => Math.max(30, d.title.length * 2));
      
      d3.selectAll('.tooltip').remove();
    });

    // Update positions on simulation tick
    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node.attr('transform', (d: any) => `translate(${d.x},${d.y})`);
    });

    // Add drag behavior
    const drag = d3.drag()
      .on('start', (event, d: any) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on('drag', (event, d: any) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on('end', (event, d: any) => {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      });

    node.call(drag as any);

  }, [nodes, links]);

  const handleZoomIn = () => {
    const svg = d3.select(svgRef.current);
    svg.transition().call(
      d3.zoom().scaleBy as any,
      1.5
    );
  };

  const handleZoomOut = () => {
    const svg = d3.select(svgRef.current);
    svg.transition().call(
      d3.zoom().scaleBy as any,
      1 / 1.5
    );
  };

  const handleReset = () => {
    const svg = d3.select(svgRef.current);
    svg.transition().call(
      d3.zoom().transform as any,
      d3.zoomIdentity
    );
    setZoom(1);
  };

  const downloadAsPNG = async () => {
    if (!containerRef.current) return;
    
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(containerRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true
      });
      
      const link = document.createElement('a');
      link.download = `${title.replace(/\s+/g, '_')}_mindmap.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Error downloading PNG:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const downloadAsPDF = async () => {
    if (!containerRef.current) return;
    
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(containerRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true
      });
      
      const pdf = new jsPDF('landscape', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${title.replace(/\s+/g, '_')}_mindmap.pdf`);
    } catch (error) {
      console.error('Error downloading PDF:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <span>MindMap: {title}</span>
          </CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleZoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleZoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleReset}>
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={downloadAsPNG}
              disabled={isDownloading}
            >
              <Download className="h-4 w-4 mr-1" />
              PNG
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={downloadAsPDF}
              disabled={isDownloading}
            >
              <Download className="h-4 w-4 mr-1" />
              PDF
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div ref={containerRef} className="w-full h-[600px] border rounded-lg bg-gray-50 overflow-hidden">
          <svg
            ref={svgRef}
            width="100%"
            height="100%"
            viewBox="0 0 800 600"
            className="w-full h-full"
          />
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          <p>💡 <strong>Tip:</strong> Drag nodes to rearrange, hover for details, use zoom controls, and download for offline reference.</p>
          <p className="mt-1">Current zoom: {(zoom * 100).toFixed(0)}%</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MindMapVisualization;