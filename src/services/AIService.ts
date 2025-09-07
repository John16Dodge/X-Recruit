
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
    type: 'book' | 'video' | 'course' | 'article' | 'tool' | 'community';
    platform?: string;
  }>;
  tools: string[];
  platforms: string[];
  certifications: string[];
}

export class AIService {
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
          model: 'gpt-4o-mini',
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
  
  private static buildPrompt(request: AIRoadmapRequest): string {
    return `
Generate a comprehensive career roadmap for someone who wants to become a ${request.careerGoal}.

Additional context:
- Current skills: ${request.currentSkills?.join(', ') || 'None specified'}
- Experience level: ${request.experience || 'Not specified'}
- Desired timeframe: ${request.timeframe || 'Not specified'}
- Learning style: ${request.learningStyle || 'Not specified'}

Please provide a detailed roadmap in the following JSON format (respond with ONLY valid JSON, no additional text):
{
  "title": "Career title (e.g., 'Full Stack Developer')",
  "description": "Brief description of the career path",
  "difficulty": "beginner|intermediate|advanced",
  "timeEstimate": "Realistic timeframe (e.g., '6-12 months')",
  "steps": [
    "Learn HTML, CSS, and JavaScript fundamentals (2 weeks)",
    "Master React.js for frontend development (3 weeks)",
    "... continue with 8-12 steps"
  ],
  "resources": [
    {
      "title": "Resource name",
      "url": "https://developer.mozilla.org",
      "type": "book|video|course|article|tool|community",
      "platform": "Platform name (optional)"
    }
  ],
  "tools": ["Tool1", "Tool2", "Tool3"],
  "platforms": ["Platform1", "Platform2", "Platform3"],
  "certifications": ["Certification1", "Certification2"]
}

Make sure to:
1. Provide real, actionable steps
2. Include actual resources with real URLs when possible
3. Consider the person's current skill level and experience
4. Be specific about tools and technologies
5. Suggest relevant certifications for the field
6. Provide a realistic timeline
7. Include duration estimates for each step (e.g., "Learn Python basics (2 weeks)")
8. Respond with ONLY the JSON object, no markdown formatting or additional text
`;
  }
}
