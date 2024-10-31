import { useState, useCallback } from 'react';

const OLLAMA_API_HOST = process.env.NEXT_PUBLIC_OLLAMA_API_HOST || 'http://localhost:11434';

export interface OllamaMessage {
  role: 'assistant' | 'user';
  content: string;
}

export interface OllamaResponse {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
}

export const useOllama = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateResponse = useCallback(async (
    prompt: string,
    model: string = 'llama2:1b',
    onToken?: (token: string) => void
  ): Promise<string> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${OLLAMA_API_HOST}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          prompt,
          stream: !!onToken,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (onToken) {
        const reader = response.body?.getReader();
        let fullResponse = '';

        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = new TextDecoder().decode(value);
            const lines = chunk.split('\n').filter(Boolean);

            for (const line of lines) {
              const data: OllamaResponse = JSON.parse(line);
              onToken(data.response);
              fullResponse += data.response;
            }
          }
        }
        return fullResponse;
      } else {
        const data: OllamaResponse = await response.json();
        return data.response;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    generateResponse,
    isLoading,
    error,
  };
};