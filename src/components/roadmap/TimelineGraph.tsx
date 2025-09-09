import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Clock } from 'lucide-react';
import html2canvas from 'html2canvas';

interface TimelineData {
  name: string;
  duration: number;
  category: string;
  description: string;
}

interface TimelineGraphProps {
  data: TimelineData[];
  title: string;
}

const TimelineGraph: React.FC<TimelineGraphProps> = ({ data, title }) => {
  const chartRef = React.useRef<HTMLDivElement>(null);

  const categoryColors = {
    'foundation': '#3b82f6',
    'core': '#8b5cf6',
    'advanced': '#ef4444',
    'specialization': '#10b981',
    'project': '#f59e0b'
  };

  const downloadChart = async () => {
    if (!chartRef.current) return;
    
    try {
      const canvas = await html2canvas(chartRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true
      });
      
      const link = document.createElement('a');
      link.download = `${title.replace(/\s+/g, '_')}_timeline.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Error downloading chart:', error);
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-semibold">{label}</p>
          <p className="text-sm text-blue-600">Duration: {data.duration} weeks</p>
          <p className="text-sm text-gray-600 mt-1">{data.description}</p>
        </div>
      );
    }
    return null;
  };

  const totalDuration = data.reduce((sum, item) => sum + item.duration, 0);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Learning Timeline: {title}
          </CardTitle>
          <Button variant="outline" size="sm" onClick={downloadChart}>
            <Download className="h-4 w-4 mr-1" />
            Download Chart
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div ref={chartRef} className="w-full">
          <div className="mb-4 p-4 bg-blue-50 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Total Duration:</span>
              <span className="text-lg font-bold text-blue-600">{totalDuration} weeks</span>
            </div>
            <div className="text-sm text-gray-600 mt-1">
              Approximately {Math.ceil(totalDuration / 4)} months of dedicated learning
            </div>
          </div>
          
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  fontSize={12}
                />
                <YAxis 
                  label={{ value: 'Duration (weeks)', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="duration" radius={[4, 4, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={categoryColors[entry.category as keyof typeof categoryColors] || '#6b7280'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-2">
            {Object.entries(categoryColors).map(([category, color]) => (
              <div key={category} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: color }}
                />
                <span className="text-xs capitalize">{category}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimelineGraph;