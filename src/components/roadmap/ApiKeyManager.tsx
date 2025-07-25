
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Key, Eye, EyeOff } from 'lucide-react';
import { AIService } from '@/services/AIService';

interface ApiKeyManagerProps {
  onApiKeySet: (hasKey: boolean) => void;
}

const ApiKeyManager: React.FC<ApiKeyManagerProps> = ({ onApiKeySet }) => {
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [hasExistingKey, setHasExistingKey] = useState(false);

  useEffect(() => {
    const existingKey = AIService.getApiKey();
    if (existingKey) {
      setHasExistingKey(true);
      onApiKeySet(true);
    }
  }, [onApiKeySet]);

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      AIService.saveApiKey(apiKey.trim());
      setHasExistingKey(true);
      setApiKey('');
      onApiKeySet(true);
    }
  };

  const handleRemoveApiKey = () => {
    localStorage.removeItem('openai_api_key');
    setHasExistingKey(false);
    onApiKeySet(false);
  };

  if (hasExistingKey) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            API Key Status
          </CardTitle>
          <CardDescription>
            Your OpenAI API key is configured and ready to use.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" onClick={handleRemoveApiKey}>
            Remove API Key
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="h-5 w-5" />
          OpenAI API Key Required
        </CardTitle>
        <CardDescription>
          To use AI-powered roadmap generation, please provide your OpenAI API key.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <AlertDescription>
            Get your API key from <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="underline">OpenAI's platform</a>. 
            Your key is stored locally in your browser and never sent to our servers.
          </AlertDescription>
        </Alert>
        
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              type={showApiKey ? 'text' : 'password'}
              placeholder="sk-..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2"
              onClick={() => setShowApiKey(!showApiKey)}
            >
              {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
          <Button onClick={handleSaveApiKey} disabled={!apiKey.trim()}>
            Save Key
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiKeyManager;
