// Legacy interfaces - keeping for compatibility
interface CustomRoadmapRequest {
  careerGoal: string;
  currentSkills: string[];
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
  timeCommitment: string;
  preferredLearningStyle: 'visual' | 'hands-on' | 'reading' | 'mixed';
  budget: 'free' | 'low' | 'medium' | 'high';
  specificInterests?: string[];
}

interface GeneratedRoadmap {
  id: string;
  title: string;
  description: string;
  steps: Array<{
    title: string;
    description: string;
    estimatedTime: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    resources: Array<{
      title: string;
      url: string;
      type: 'book' | 'video' | 'course' | 'article' | 'tool' | 'community';
      platform?: string;
      isFree: boolean;
    }>;
    prerequisites?: string[];
    outcomes: string[];
  }>;
  totalEstimatedTime: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tools: string[];
  certifications: string[];
  milestones: Array<{
    title: string;
    description: string;
    stepIndices: number[];
  }>;
}

// Export legacy types for compatibility
export type { CustomRoadmapRequest, GeneratedRoadmap };


interface AIRoadmapRequest {
  careerGoal: string;
  currentSkills?: string[];
  experience?: string;
  timeframe?: string;
  learningStyle?: string;
}

interface AIRoadmapResponse {
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  timeEstimate: string;
  steps: string[];
  resources: Array<{
    title: string;
    url: string;
    type: 'book' | 'video' | 'course' | 'article' | 'tool' | 'community' | 'github';
    platform?: string;
    description?: string;
  }>;
  tools: string[];
  platforms: string[];
  certifications: string[];
}

export class AIService {
  static generateMockRoadmap(request: AIRoadmapRequest): AIRoadmapResponse {
    // Mock data based on the request
    const mockData = {
      'react': {
        title: 'React Developer Roadmap',
        description: 'Complete guide to becoming a proficient React developer',
        difficulty: 'intermediate' as const,
        timeEstimate: '4-6 months',
        steps: [
          'Learn JavaScript ES6+ fundamentals',
          'Understand React basics and JSX',
          'Master components and props',
          'Learn state management with hooks',
          'Practice routing with React Router',
          'Build projects with real APIs',
          'Learn testing with Jest and RTL',
          'Deploy applications'
        ],
        resources: [
          { title: 'React Official Documentation', url: 'https://react.dev', type: 'article' as const, platform: 'React', description: 'Official React documentation with latest features' },
          { title: 'React Complete Course', url: 'https://www.coursera.org/learn/react-basics', type: 'course' as const, platform: 'Coursera', description: 'Meta React Developer Certificate' },
          { title: 'React Router GitHub Repo', url: 'https://github.com/remix-run/react-router', type: 'github' as const, platform: 'GitHub', description: 'Official React Router source code and examples' },
          { title: 'React Dev Tools', url: 'https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi', type: 'tool' as const, platform: 'Chrome Store', description: 'Browser extension for debugging React' },
          { title: 'React Handbook', url: 'https://reacthandbook.com', type: 'book' as const, platform: 'Online', description: 'Comprehensive React guide' },
          { title: 'Traversy Media React Course', url: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8', type: 'video' as const, platform: 'YouTube', description: 'Complete React crash course' },
          { title: 'FreeCodeCamp React Curriculum', url: 'https://www.freecodecamp.org/learn/front-end-development-libraries/', type: 'course' as const, platform: 'FreeCodeCamp', description: 'Free React certification course' },
          { title: 'Awesome React', url: 'https://github.com/enaqx/awesome-react', type: 'github' as const, platform: 'GitHub', description: 'Curated list of React resources and libraries' }
        ],
        tools: ['React', 'Node.js', 'Webpack', 'Babel', 'ESLint', 'Prettier'],
        platforms: ['Netlify', 'Vercel', 'GitHub Pages', 'Heroku'],
        certifications: ['Meta React Developer', 'React Nanodegree', 'freeCodeCamp React']
      },
      'python': {
        title: 'Python Developer Roadmap',
        description: 'Comprehensive path to Python mastery',
        difficulty: 'beginner' as const,
        timeEstimate: '3-5 months',
        steps: [
          'Learn Python syntax and basics',
          'Master data structures and algorithms',
          'Understand OOP concepts',
          'Work with libraries (requests, pandas)',
          'Build web apps with Flask/Django',
          'Learn database integration',
          'Practice testing and debugging',
          'Create portfolio projects'
        ],
        resources: [
          { title: 'Python Official Documentation', url: 'https://docs.python.org/3/', type: 'article' as const, platform: 'Python.org', description: 'Official Python 3 documentation' },
          { title: 'Python for Everybody Specialization', url: 'https://www.coursera.org/specializations/python', type: 'course' as const, platform: 'Coursera', description: 'University of Michigan Python course' },
          { title: 'Automate the Boring Stuff with Python', url: 'https://automatetheboringstuff.com', type: 'book' as const, platform: 'Online', description: 'Free Python book for practical programming' },
          { title: 'Python Crash Course', url: 'https://nostarch.com/pythoncrashcourse2e', type: 'book' as const, platform: 'No Starch Press', description: 'Best-selling Python programming book' },
          { title: 'Python GitHub Repository', url: 'https://github.com/python/cpython', type: 'github' as const, platform: 'GitHub', description: 'Official Python source code' },
          { title: 'Real Python Tutorials', url: 'https://realpython.com', type: 'article' as const, platform: 'Real Python', description: 'High-quality Python tutorials and articles' },
          { title: 'Python Tutorial for Beginners', url: 'https://www.youtube.com/watch?v=_uQrJ0TkZlc', type: 'video' as const, platform: 'YouTube', description: 'Complete Python course by Programming with Mosh' },
          { title: 'Awesome Python', url: 'https://github.com/vinta/awesome-python', type: 'github' as const, platform: 'GitHub', description: 'Curated list of Python frameworks and libraries' }
        ],
        tools: ['Python', 'PyCharm', 'Jupyter', 'Git', 'Docker', 'PostgreSQL'],
        platforms: ['GitHub', 'Heroku', 'PythonAnywhere', 'AWS'],
        certifications: ['Python Institute PCAP', 'Google Python', 'Microsoft Python']
      }
    };

    // Simple keyword matching
    const goal = request.careerGoal.toLowerCase();
    let selectedMock;
    
    if (goal.includes('react') || goal.includes('frontend')) {
      selectedMock = mockData.react;
    } else if (goal.includes('python') || goal.includes('data')) {
      selectedMock = mockData.python;
    } else {
      // Generic fallback
      selectedMock = {
        title: `${request.careerGoal} Learning Roadmap`,
        description: `Structured learning path for ${request.careerGoal}`,
        difficulty: 'intermediate' as const,
        timeEstimate: '4-8 months',
        steps: [
          'Learn the fundamentals',
          'Practice with small projects',
          'Study advanced concepts',
          'Build portfolio projects',
          'Learn industry best practices',
          'Contribute to open source',
          'Network with professionals',
          'Apply for positions'
        ],
        resources: [
          { title: 'Official Documentation', url: 'https://example.com', type: 'article' as const },
          { title: 'Online Course', url: 'https://example.com', type: 'course' as const },
          { title: 'Reference Book', url: 'https://example.com', type: 'book' as const },
          { title: 'Video Tutorials', url: 'https://example.com', type: 'video' as const }
        ],
        tools: ['VS Code', 'Git', 'Terminal', 'Browser DevTools'],
        platforms: ['GitHub', 'Stack Overflow', 'Dev Community'],
        certifications: ['Industry Certification', 'Professional Certificate']
      };
    }

    return selectedMock;
  }
  private static API_KEY_STORAGE_KEY = 'openai_api_key';
  
  static saveApiKey(apiKey: string): void {
    localStorage.setItem(this.API_KEY_STORAGE_KEY, apiKey);
  }
  
  static getApiKey(): string | null {
    return localStorage.getItem(this.API_KEY_STORAGE_KEY);
  }
  
  static async generateRoadmap(request: AIRoadmapRequest): Promise<AIRoadmapResponse> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error('OpenAI API key not found. Please set your API key first.');
    }

    const prompt = this.buildPrompt(request);
    
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4.1-2025-04-14',
          messages: [
            {
              role: 'system',
              content: 'You are an expert career counselor and learning path designer. Generate detailed, personalized career roadmaps in JSON format. Be specific, actionable, and include real resources.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 2000,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices[0].message.content;
      
      // Parse the JSON response
      const roadmapData = JSON.parse(content);
      return roadmapData;
      
    } catch (error) {
      console.error('Error generating roadmap:', error);
      throw new Error('Failed to generate roadmap. Please try again.');
    }
  }
  
  static async generateOllamaRoadmap(request: AIRoadmapRequest): Promise<AIRoadmapResponse> {
    const prompt = this.buildPrompt(request);

    try {
      const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama3', // Ensure you have this model pulled
          prompt: prompt,
          stream: false, // For simplicity, get the full response at once
          format: 'json',
        }),
      });

      if (!response.ok) {
        throw new Error(`Ollama API error: ${response.status}`);
      }

      const data = await response.json();
      const roadmapData = JSON.parse(data.response);
      return roadmapData;

    } catch (error) {
      console.error('Error generating roadmap with Ollama:', error);
      throw new Error('Failed to generate roadmap with Ollama. Is Ollama running and the model pulled?');
    }
  }
  
  private static buildPrompt(request: AIRoadmapRequest): string {
    return `
Generate a comprehensive career roadmap for someone who wants to become a ${request.careerGoal}.

Additional context:
- Current skills: ${request.currentSkills?.join(', ') || 'None specified'}
- Experience level: ${request.experience || 'Not specified'}
- Desired timeframe: ${request.timeframe || 'Not specified'}
- Learning style: ${request.learningStyle || 'Not specified'}

Please provide a detailed roadmap in the following JSON format:
{
  "title": "Career title (e.g., 'Full Stack Developer')",
  "description": "Brief description of the career path",
  "difficulty": "beginner|intermediate|advanced",
  "timeEstimate": "Realistic timeframe (e.g., '6-12 months')",
  "steps": [
    "Step 1: Specific actionable step",
    "Step 2: Another specific step",
    "... continue with 8-12 steps"
  ],
  "resources": [
    {
      "title": "Resource name",
      "url": "https://exact-real-url.com",
      "type": "book|video|course|article|tool|community|github",
      "platform": "Platform name",
      "description": "Specific description of why this resource is valuable"
    }
  ],
  "tools": ["Tool1", "Tool2", "Tool3"],
  "platforms": ["Platform1", "Platform2", "Platform3"],
  "certifications": ["Certification1", "Certification2"]
}

CRITICAL REQUIREMENTS:
1. **REAL URLs ONLY**: Every resource must have a valid, working URL. Do not use placeholder URLs.
2. **SPECIFIC RESOURCES**: Include actual, well-known resources like:
   - Official documentation (e.g., https://react.dev, https://docs.python.org)
   - Real courses (e.g., https://www.coursera.org/learn/machine-learning, https://www.freecodecamp.org)
   - Actual books (with real Amazon/publisher links)
   - Specific YouTube channels (e.g., https://www.youtube.com/c/TraversyMedia)
   - Real GitHub repositories (e.g., https://github.com/awesome-lists/awesome-javascript)
   - Actual tools (e.g., https://code.visualstudio.com, https://github.com/features)
   - Real communities (e.g., https://stackoverflow.com, https://reddit.com/r/programming)

3. **QUALITY OVER QUANTITY**: Focus on the absolute best, most recommended resources in each category.
4. **CURRENT AND ACTIVE**: Only include resources that are actively maintained and up-to-date.
5. **DIVERSE LEARNING STYLES**: Include resources for visual learners (videos), readers (books/docs), and hands-on learners (tutorials/projects).
6. **FREE AND PAID OPTIONS**: Mix of both free and premium resources, clearly indicate which are free.
7. **PROGRESSIVE DIFFICULTY**: Order resources from beginner-friendly to advanced.

For GitHub repositories, prioritize:
- Official repositories of tools/frameworks
- "Awesome" lists (curated resources)
- Popular project templates
- Learning repositories with tutorials
- Open source projects for contribution

For courses, prioritize:
- University courses on Coursera/edX
- Professional certificates from major companies
- Highly-rated bootcamp-style courses
- Free comprehensive courses (freeCodeCamp, The Odin Project)

Ensure each resource includes a compelling description explaining why it's valuable for learning that specific skill.
`;
  }
}
