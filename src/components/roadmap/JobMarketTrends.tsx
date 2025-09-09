import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Users, Briefcase, MapPin } from 'lucide-react';

interface JobTrend {
  year: number;
  month: string;
  demand: number;
  salary: number;
  openings: number;
  location: string;
  skill: string;
}

interface JobMarketTrendsProps {
  title: string;
  trends?: JobTrend[];
}

const JobMarketTrends: React.FC<JobMarketTrendsProps> = ({ title, trends }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedSkill, setSelectedSkill] = useState<string>('all');

  // Sample data - in a real app, this would come from an API
  const sampleTrends: JobTrend[] = trends || [
    { year: 2024, month: 'Jan', demand: 85, salary: 75000, openings: 1200, location: 'Remote', skill: 'React' },
    { year: 2024, month: 'Feb', demand: 88, salary: 78000, openings: 1350, location: 'Remote', skill: 'React' },
    { year: 2024, month: 'Mar', demand: 92, salary: 82000, openings: 1500, location: 'Remote', skill: 'React' },
    { year: 2024, month: 'Apr', demand: 89, salary: 80000, openings: 1420, location: 'Remote', skill: 'React' },
    { year: 2024, month: 'May', demand: 95, salary: 85000, openings: 1680, location: 'Remote', skill: 'React' },
    { year: 2024, month: 'Jun', demand: 98, salary: 88000, openings: 1800, location: 'Remote', skill: 'React' },
    { year: 2024, month: 'Jul', demand: 94, salary: 86000, openings: 1720, location: 'Remote', skill: 'React' },
    { year: 2024, month: 'Aug', demand: 96, salary: 87000, openings: 1750, location: 'Remote', skill: 'React' },
    { year: 2024, month: 'Sep', demand: 100, salary: 90000, openings: 1900, location: 'Remote', skill: 'React' },
    { year: 2024, month: 'Oct', demand: 97, salary: 88500, openings: 1850, location: 'Remote', skill: 'React' },
    { year: 2024, month: 'Nov', demand: 99, salary: 89500, openings: 1880, location: 'Remote', skill: 'React' },
    { year: 2024, month: 'Dec', demand: 102, salary: 92000, openings: 1950, location: 'Remote', skill: 'React' },
    
    // Node.js trends
    { year: 2024, month: 'Jan', demand: 78, salary: 72000, openings: 980, location: 'Remote', skill: 'Node.js' },
    { year: 2024, month: 'Feb', demand: 82, salary: 75000, openings: 1100, location: 'Remote', skill: 'Node.js' },
    { year: 2024, month: 'Mar', demand: 85, salary: 78000, openings: 1250, location: 'Remote', skill: 'Node.js' },
    { year: 2024, month: 'Apr', demand: 83, salary: 77000, openings: 1200, location: 'Remote', skill: 'Node.js' },
    { year: 2024, month: 'May', demand: 87, salary: 80000, openings: 1350, location: 'Remote', skill: 'Node.js' },
    { year: 2024, month: 'Jun', demand: 90, salary: 82000, openings: 1450, location: 'Remote', skill: 'Node.js' },
    { year: 2024, month: 'Jul', demand: 88, salary: 81000, openings: 1400, location: 'Remote', skill: 'Node.js' },
    { year: 2024, month: 'Aug', demand: 91, salary: 83000, openings: 1480, location: 'Remote', skill: 'Node.js' },
    { year: 2024, month: 'Sep', demand: 93, salary: 85000, openings: 1550, location: 'Remote', skill: 'Node.js' },
    { year: 2024, month: 'Oct', demand: 89, salary: 82500, openings: 1450, location: 'Remote', skill: 'Node.js' },
    { year: 2024, month: 'Nov', demand: 92, salary: 84000, openings: 1500, location: 'Remote', skill: 'Node.js' },
    { year: 2024, month: 'Dec', demand: 95, salary: 87000, openings: 1600, location: 'Remote', skill: 'Node.js' },
    
    // Python trends
    { year: 2024, month: 'Jan', demand: 95, salary: 85000, openings: 2000, location: 'Remote', skill: 'Python' },
    { year: 2024, month: 'Feb', demand: 97, salary: 87000, openings: 2100, location: 'Remote', skill: 'Python' },
    { year: 2024, month: 'Mar', demand: 100, salary: 90000, openings: 2300, location: 'Remote', skill: 'Python' },
    { year: 2024, month: 'Apr', demand: 98, salary: 88000, openings: 2200, location: 'Remote', skill: 'Python' },
    { year: 2024, month: 'May', demand: 102, salary: 92000, openings: 2400, location: 'Remote', skill: 'Python' },
    { year: 2024, month: 'Jun', demand: 105, salary: 95000, openings: 2500, location: 'Remote', skill: 'Python' },
    { year: 2024, month: 'Jul', demand: 103, salary: 93000, openings: 2450, location: 'Remote', skill: 'Python' },
    { year: 2024, month: 'Aug', demand: 106, salary: 96000, openings: 2550, location: 'Remote', skill: 'Python' },
    { year: 2024, month: 'Sep', demand: 108, salary: 98000, openings: 2600, location: 'Remote', skill: 'Python' },
    { year: 2024, month: 'Oct', demand: 105, salary: 95000, openings: 2500, location: 'Remote', skill: 'Python' },
    { year: 2024, month: 'Nov', demand: 107, salary: 97000, openings: 2550, location: 'Remote', skill: 'Python' },
    { year: 2024, month: 'Dec', demand: 110, salary: 100000, openings: 2700, location: 'Remote', skill: 'Python' },
  ];

  const skills = ['all', ...Array.from(new Set(sampleTrends.map(t => t.skill)))];
  const filteredTrends = selectedSkill === 'all' 
    ? sampleTrends 
    : sampleTrends.filter(t => t.skill === selectedSkill);

  useEffect(() => {
    if (!svgRef.current || filteredTrends.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const margin = { top: 20, right: 30, bottom: 40, left: 60 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Create scales
    const xScale = d3.scaleBand()
      .domain(filteredTrends.map(d => d.month))
      .range([0, width])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(filteredTrends, d => d.demand) || 100])
      .range([height, 0]);

    const yScaleSalary = d3.scaleLinear()
      .domain([0, d3.max(filteredTrends, d => d.salary) || 100000])
      .range([height, 0]);

    // Create line generator for demand trend
    const demandLine = d3.line<JobTrend>()
      .x(d => (xScale(d.month) || 0) + xScale.bandwidth() / 2)
      .y(d => yScale(d.demand))
      .curve(d3.curveMonotoneX);

    // Create line generator for salary trend
    const salaryLine = d3.line<JobTrend>()
      .x(d => (xScale(d.month) || 0) + xScale.bandwidth() / 2)
      .y(d => yScaleSalary(d.salary))
      .curve(d3.curveMonotoneX);

    // Add demand line
    g.append("path")
      .datum(filteredTrends)
      .attr("fill", "none")
      .attr("stroke", "#3b82f6")
      .attr("stroke-width", 3)
      .attr("d", demandLine);

    // Add salary line
    g.append("path")
      .datum(filteredTrends)
      .attr("fill", "none")
      .attr("stroke", "#10b981")
      .attr("stroke-width", 3)
      .attr("d", salaryLine);

    // Add demand dots
    g.selectAll(".demand-dot")
      .data(filteredTrends)
      .enter().append("circle")
      .attr("class", "demand-dot")
      .attr("cx", d => (xScale(d.month) || 0) + xScale.bandwidth() / 2)
      .attr("cy", d => yScale(d.demand))
      .attr("r", 4)
      .attr("fill", "#3b82f6")
      .attr("stroke", "white")
      .attr("stroke-width", 2);

    // Add salary dots
    g.selectAll(".salary-dot")
      .data(filteredTrends)
      .enter().append("circle")
      .attr("class", "salary-dot")
      .attr("cx", d => (xScale(d.month) || 0) + xScale.bandwidth() / 2)
      .attr("cy", d => yScaleSalary(d.salary))
      .attr("r", 4)
      .attr("fill", "#10b981")
      .attr("stroke", "white")
      .attr("stroke-width", 2);

    // Add X axis
    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .style("font-size", "12px")
      .style("fill", "currentColor");

    // Add Y axis for demand
    g.append("g")
      .call(d3.axisLeft(yScale).tickFormat(d => `${d}%`))
      .selectAll("text")
      .style("font-size", "12px")
      .style("fill", "currentColor");

    // Add Y axis for salary (right side)
    g.append("g")
      .attr("transform", `translate(${width},0)`)
      .call(d3.axisRight(yScaleSalary).tickFormat(d => `$${(d / 1000).toFixed(0)}k`))
      .selectAll("text")
      .style("font-size", "12px")
      .style("fill", "currentColor");

    // Add grid lines
    g.append("g")
      .attr("class", "grid")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale)
        .tickSize(-height)
        .tickFormat(() => ""))
      .style("stroke", "currentColor")
      .style("opacity", 0.1);

    g.append("g")
      .attr("class", "grid")
      .call(d3.axisLeft(yScale)
        .tickSize(-width)
        .tickFormat(() => ""))
      .style("stroke", "currentColor")
      .style("opacity", 0.1);

  }, [filteredTrends]);

  const getAverageDemand = () => {
    const avg = filteredTrends.reduce((sum, trend) => sum + trend.demand, 0) / filteredTrends.length;
    return Math.round(avg);
  };

  const getAverageSalary = () => {
    const avg = filteredTrends.reduce((sum, trend) => sum + trend.salary, 0) / filteredTrends.length;
    return Math.round(avg);
  };

  const getTotalOpenings = () => {
    return filteredTrends.reduce((sum, trend) => sum + trend.openings, 0);
  };

  const getTrendDirection = () => {
    if (filteredTrends.length < 2) return 'stable';
    const first = filteredTrends[0].demand;
    const last = filteredTrends[filteredTrends.length - 1].demand;
    return last > first ? 'up' : last < first ? 'down' : 'stable';
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Job Market Trends: {title}
          </CardTitle>
          <div className="flex gap-2">
            <select
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              className="px-3 py-1 border rounded-md text-sm bg-background text-foreground"
            >
              {skills.map(skill => (
                <option key={skill} value={skill}>
                  {skill === 'all' ? 'All Skills' : skill}
                </option>
              ))}
            </select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div ref={containerRef} className="w-full">
          <svg
            ref={svgRef}
            width="100%"
            height="400"
            viewBox="0 0 800 400"
            className="w-full"
          />
        </div>
        
        {/* Legend */}
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-blue-500"></div>
            <span className="text-sm text-muted-foreground">Demand (%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-green-500"></div>
            <span className="text-sm text-muted-foreground">Salary ($)</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Avg Demand</span>
            </div>
            <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{getAverageDemand()}%</div>
            <div className="flex items-center gap-1 mt-1">
              {getTrendDirection() === 'up' ? (
                <TrendingUp className="h-3 w-3 text-green-500" />
              ) : getTrendDirection() === 'down' ? (
                <TrendingDown className="h-3 w-3 text-red-500" />
              ) : (
                <div className="w-3 h-0.5 bg-gray-400"></div>
              )}
              <span className="text-xs text-muted-foreground">
                {getTrendDirection() === 'up' ? 'Growing' : getTrendDirection() === 'down' ? 'Declining' : 'Stable'}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-2 mb-2">
              <Briefcase className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-700 dark:text-green-300">Avg Salary</span>
            </div>
            <div className="text-2xl font-bold text-green-900 dark:text-green-100">
              ${(getAverageSalary() / 1000).toFixed(0)}k
            </div>
            <div className="text-xs text-muted-foreground">per year</div>
          </div>

          <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Total Openings</span>
            </div>
            <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">
              {getTotalOpenings().toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">this year</div>
          </div>

          <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="h-4 w-4 text-amber-600" />
              <span className="text-sm font-medium text-amber-700 dark:text-amber-300">Location</span>
            </div>
            <div className="text-2xl font-bold text-amber-900 dark:text-amber-100">Remote</div>
            <div className="text-xs text-muted-foreground">primary</div>
          </div>
        </div>

        <div className="mt-4 text-sm text-muted-foreground">
          <p>💡 <strong>Insight:</strong> This data shows the current job market trends for {selectedSkill === 'all' ? 'all skills' : selectedSkill}. 
          Use this information to make informed decisions about your learning path and career development.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobMarketTrends;

