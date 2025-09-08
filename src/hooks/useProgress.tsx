import { useState, useCallback } from 'react';

interface ProgressState {
  isLoading: boolean;
  progress: number;
  status: string;
}

export const useProgress = () => {
  const [state, setState] = useState<ProgressState>({
    isLoading: false,
    progress: 0,
    status: ''
  });

  const setProgress = useCallback((progress: number, status: string = '') => {
    setState(prev => ({
      ...prev,
      progress: Math.min(100, Math.max(0, progress)),
      status
    }));
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    setState(prev => ({
      ...prev,
      isLoading: loading
    }));
  }, []);

  const reset = useCallback(() => {
    setState({
      isLoading: false,
      progress: 0,
      status: ''
    });
  }, []);

  return {
    ...state,
    setProgress,
    setLoading,
    reset
  };
};