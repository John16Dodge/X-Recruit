import { useState, useEffect } from 'react';

interface ProgressData {
  [roadmapId: string]: {
    [stepIndex: number]: boolean;
  };
}

export const useProgress = () => {
  const [progress, setProgress] = useState<ProgressData>({});

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('roadmapProgress');
    if (savedProgress) {
      try {
        setProgress(JSON.parse(savedProgress));
      } catch (error) {
        console.error('Error loading progress:', error);
      }
    }
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('roadmapProgress', JSON.stringify(progress));
  }, [progress]);

  const toggleStepCompletion = (roadmapId: string, stepIndex: number) => {
    setProgress(prev => ({
      ...prev,
      [roadmapId]: {
        ...prev[roadmapId],
        [stepIndex]: !prev[roadmapId]?.[stepIndex]
      }
    }));
  };

  const getStepCompletion = (roadmapId: string, stepIndex: number): boolean => {
    return progress[roadmapId]?.[stepIndex] || false;
  };

  const getRoadmapProgress = (roadmapId: string, totalSteps: number): number => {
    const completedSteps = Object.values(progress[roadmapId] || {}).filter(Boolean).length;
    return Math.round((completedSteps / totalSteps) * 100);
  };

  const resetRoadmapProgress = (roadmapId: string) => {
    setProgress(prev => ({
      ...prev,
      [roadmapId]: {}
    }));
  };

  const clearAllProgress = () => {
    setProgress({});
    localStorage.removeItem('roadmapProgress');
  };

  return {
    toggleStepCompletion,
    getStepCompletion,
    getRoadmapProgress,
    resetRoadmapProgress,
    clearAllProgress
  };
};
