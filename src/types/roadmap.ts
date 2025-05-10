
import { ReactNode } from 'react';

export interface Resource {
  title: string;
  url: string;
  type: 'book' | 'video' | 'course' | 'article' | 'tool' | 'community';
  platform?: string;
}

export interface Roadmap {
  id: number;
  title: string;
  description: string;
  steps: string[];
  icon: ReactNode;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  timeEstimate?: string;
  resources?: Resource[];
  tools?: string[];
  platforms?: string[];
  certifications?: string[];
  aiGenerated?: boolean;
}
