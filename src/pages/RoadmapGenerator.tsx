import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import Footer from '@/components/layout/Footer';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"
import { Circle } from 'lucide-react';

interface RoadmapItem {
  id: number;
  title: string;
  description: string;
  estimatedTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  resources: Resource[];
  completed: boolean;
}

interface Resource {
  id: number;
  title: string;
  type: 'Book' | 'Video' | 'Course' | 'Article' | 'Tool' | 'Community';
  url: string;
}

const initialRoadmap: RoadmapItem[] = [
  {
    id: 1,
    title: 'Learn HTML Fundamentals',
    description: 'Understand the basic structure of HTML documents, elements, and attributes.',
    estimatedTime: '4-8 hours',
    difficulty: 'Beginner',
    resources: [
      { id: 101, title: 'HTML Crash Course', type: 'Video', url: 'https://www.example.com/html-video' },
      { id: 102, title: 'HTML Basics Book', type: 'Book', url: 'https://www.example.com/html-book' },
    ],
    completed: false,
  },
  {
    id: 2,
    title: 'Master CSS Styling',
    description: 'Learn how to style HTML elements using CSS, including selectors, properties, and values.',
    estimatedTime: '8-16 hours',
    difficulty: 'Beginner',
    resources: [
      { id: 201, title: 'CSS Tutorial', type: 'Course', url: 'https://www.example.com/css-course' },
      { id: 202, title: 'CSS Reference', type: 'Article', url: 'https://www.example.com/css-reference' },
    ],
    completed: false,
  },
  {
    id: 3,
    title: 'Introduction to JavaScript',
    description: 'Get started with JavaScript by learning about variables, data types, operators, and control flow.',
    estimatedTime: '12-24 hours',
    difficulty: 'Intermediate',
    resources: [
      { id: 301, title: 'JavaScript Basics', type: 'Book', url: 'https://www.example.com/js-book' },
      { id: 302, title: 'JS Codecademy', type: 'Course', url: 'https://www.example.com/js-codecademy' },
    ],
    completed: false,
  },
  {
    id: 4,
    title: 'Deep Dive into React',
    description: 'Learn React components, JSX, state management, and event handling.',
    estimatedTime: '20-40 hours',
    difficulty: 'Intermediate',
    resources: [
      { id: 401, title: 'React Official Docs', type: 'Article', url: 'https://reactjs.org/docs' },
      { id: 402, title: 'React Tutorial', type: 'Video', url: 'https://www.example.com/react-tutorial' },
    ],
    completed: false,
  },
  {
    id: 5,
    title: 'Explore Advanced React Concepts',
    description: 'Understand hooks, context API, and performance optimization techniques in React.',
    estimatedTime: '24-48 hours',
    difficulty: 'Advanced',
    resources: [
      { id: 501, title: 'Advanced React Patterns', type: 'Book', url: 'https://www.example.com/advanced-react' },
      { id: 502, title: 'React Performance', type: 'Article', url: 'https://www.example.com/react-performance' },
    ],
    completed: false,
  },
  {
    id: 6,
    title: 'Build a Portfolio Project',
    description: 'Create a personal portfolio to showcase your skills and projects.',
    estimatedTime: '16-32 hours',
    difficulty: 'Intermediate',
    resources: [
      { id: 601, title: 'Portfolio Examples', type: 'Community', url: 'https://www.example.com/portfolio-examples' },
      { id: 602, title: 'Best Portfolio Tools', type: 'Tool', url: 'https://www.example.com/portfolio-tools' },
    ],
    completed: false,
  },
  {
    id: 7,
    title: 'Deploy Your Application',
    description: 'Learn how to deploy your web application to platforms like Netlify or Vercel.',
    estimatedTime: '4-8 hours',
    difficulty: 'Beginner',
    resources: [
      { id: 701, title: 'Netlify Deployment', type: 'Article', url: 'https://www.example.com/netlify-deploy' },
      { id: 702, title: 'Vercel Guide', type: 'Article', url: 'https://www.example.com/vercel-guide' },
    ],
    completed: false,
  },
  {
    id: 8,
    title: 'Testing and Debugging',
    description: 'Implement testing strategies and debugging techniques to ensure code quality.',
    estimatedTime: '12-24 hours',
    difficulty: 'Intermediate',
    resources: [
      { id: 801, title: 'Jest Testing Framework', type: 'Tool', url: 'https://jestjs.io/' },
      { id: 802, title: 'Debugging JavaScript', type: 'Video', url: 'https://www.example.com/debug-js' },
    ],
    completed: false,
  },
  {
    id: 9,
    title: 'Version Control with Git',
    description: 'Use Git for version control to manage and track changes in your project.',
    estimatedTime: '8-16 hours',
    difficulty: 'Beginner',
    resources: [
      { id: 901, title: 'Git Handbook', type: 'Book', url: 'https://www.example.com/git-handbook' },
      { id: 902, title: 'GitHub Tutorial', type: 'Video', url: 'https://www.example.com/github-tutorial' },
    ],
    completed: false,
  },
  {
    id: 10,
    title: 'Continuous Integration/Continuous Deployment (CI/CD)',
    description: 'Set up CI/CD pipelines to automate testing and deployment processes.',
    estimatedTime: '16-32 hours',
    difficulty: 'Advanced',
    resources: [
      { id: 1001, title: 'CI/CD Best Practices', type: 'Article', url: 'https://www.example.com/ci-cd-best' },
      { id: 1002, title: 'Jenkins Setup', type: 'Tool', url: 'https://www.example.com/jenkins-setup' },
    ],
    completed: false,
  },
];

const RoadmapGenerator = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<'' | 'Beginner' | 'Intermediate' | 'Advanced'>('');
  const [estimatedTimeRange, setEstimatedTimeRange] = useState<number[]>([0, 48]);
  const [roadmap, setRoadmap] = useState<RoadmapItem[]>(initialRoadmap);
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  useEffect(() => {
    document.title = 'Roadmap Generator - X-Recruit';
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleDifficultyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDifficultyFilter(event.target.value as '' | 'Beginner' | 'Intermediate' | 'Advanced');
  };

  const handleTimeRangeChange = (values: number[]) => {
    setEstimatedTimeRange(values);
  };

  const toggleRoadmapItem = (id: number) => {
    setExpandedItems((prevExpanded) =>
      prevExpanded.includes(id) ? prevExpanded.filter((itemId) => itemId !== id) : [...prevExpanded, id]
    );
  };

  const handleCompleteChange = (id: number) => {
    setRoadmap((prevRoadmap) =>
      prevRoadmap.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const filteredRoadmap = roadmap.filter((item) => {
    const searchMatch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const difficultyMatch = difficultyFilter ? item.difficulty === difficultyFilter : true;
    const [minTime, maxTime] = estimatedTimeRange;
    const timeMatch = (() => {
      const time = parseInt(item.estimatedTime.split('-')[1].split(' ')[0]);
      return time >= minTime && time <= maxTime;
    })();

    return searchMatch && difficultyMatch && timeMatch;
  });

  const completedCount = roadmap.filter((item) => item.completed).length;
  const progress = (completedCount / roadmap.length) * 100;

  return (
    <div>
      <Layout>
        <section className="bg-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">
              AI-Powered Roadmap Generator
            </h1>
            <p className="text-gray-600 mb-8">
              Customize your learning path with our AI-driven roadmap generator.
              Tailor your journey by specifying your interests, skill level, and
              time commitment to receive a personalized curriculum.
            </p>

            {/* Search and Filter Section */}
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-8">
              <Input
                type="text"
                placeholder="Search roadmap items..."
                className="flex-grow"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <select
                className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-300"
                value={difficultyFilter}
                onChange={handleDifficultyChange}
              >
                <option value="">All Difficulties</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            {/* Time Range Filter */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-700 mb-3">
                Estimated Time Range (Hours)
              </h2>
              <div className="flex items-center space-x-4">
                <Slider
                  defaultValue={estimatedTimeRange}
                  max={48}
                  step={1}
                  onValueChange={handleTimeRangeChange}
                />
                <span className="text-gray-600">
                  {estimatedTimeRange[0]} - {estimatedTimeRange[1]} hours
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-700 mb-3">
                Your Progress
              </h2>
              <Progress value={progress} />
              <p className="text-gray-600 mt-2">
                {completedCount} of {roadmap.length} items completed
              </p>
            </div>

            {/* Roadmap Items */}
            <Accordion type="multiple" collapsible>
              {filteredRoadmap.map((item) => (
                <AccordionItem key={item.id} value={String(item.id)}>
                  <AccordionTrigger className="flex items-center justify-between py-3">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id={`item-${item.id}`}
                        checked={item.completed}
                        onCheckedChange={() => handleCompleteChange(item.id)}
                      />
                      <label
                        htmlFor={`item-${item.id}`}
                        className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {item.title}
                      </label>
                    </div>
                    <Badge className={`ml-2 ${
                      item.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                        item.difficulty === 'Intermediate' ? 'bg-amber-100 text-amber-800' :
                          'bg-rose-100 text-rose-800'
                    }`}>
                      {item.difficulty}
                    </Badge>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Separator className="my-4" />
                    <p className="mb-4">{item.description}</p>
                    <h3 className="text-md font-semibold text-gray-700 mb-2">
                      Estimated Time: {item.estimatedTime}
                    </h3>
                    <h4 className="text-md font-semibold text-gray-700 mb-2">Resources:</h4>
                    <ul className="list-disc pl-5">
                      {item.resources.map((resource) => (
                        <li key={resource.id} className="mb-1">
                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                          >
                            {resource.title} ({resource.type})
                          </a>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </Layout>

      <Footer />

      <style>{`
        .tag-beginner {
          @apply bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium;
        }
        .tag-intermediate {
          @apply bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs font-medium;
        }
        .tag-advanced {
          @apply bg-rose-100 text-rose-800 px-2 py-1 rounded text-xs font-medium;
        }
        .tag-resource-book {
          @apply bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs font-medium;
        }
        .tag-resource-video {
          @apply bg-red-100 text-red-800 px-2 py-1 rounded-md text-xs font-medium;
        }
        .tag-resource-course {
          @apply bg-purple-100 text-purple-800 px-2 py-1 rounded-md text-xs font-medium;
        }
        .tag-resource-article {
          @apply bg-teal-100 text-teal-800 px-2 py-1 rounded-md text-xs font-medium;
        }
        .tag-resource-tool {
          @apply bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-xs font-medium;
        }
        .tag-resource-community {
          @apply bg-amber-100 text-amber-800 px-2 py-1 rounded-md text-xs font-medium;
        }
        .card-gradient-green {
          @apply bg-gradient-to-br from-white to-green-50;
        }
        .card-gradient-amber {
          @apply bg-gradient-to-br from-white to-amber-50;
        }
        .card-gradient-rose {
          @apply bg-gradient-to-br from-white to-rose-50;
        }
        .card-gradient-blue {
          @apply bg-gradient-to-br from-white to-blue-50;
        }
      `}</style>
    </div>
  );
};

export default RoadmapGenerator;
