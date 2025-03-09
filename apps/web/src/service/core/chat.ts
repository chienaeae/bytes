export const streamChat = async (
  question: string,
  handlers: {
    onStart?: () => void;
    onMessage?: (message: string) => void;
    onComplete?: () => void;
  }
) => {
  const response = await fetch(import.meta.env.VITE_API_URL + '/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question }),
  });

  if (!response.ok) {
    throw new Error(`Network error: ${response.statusText}`);
  }

  const reader = response.body?.getReader();
  const decoder = new TextDecoder('utf-8');
  let done = false;
  while (!done) {
    const { value, done: doneReading } = await reader!.read();
    done = doneReading;
    const chunk = decoder.decode(value, { stream: !done });
    const lines = chunk.split('\n').filter((line) => line.trim() !== '');
    for (const line of lines) {
      try {
        const parsed = JSON.parse(line);
        if (parsed.status === 'start') {
          handlers.onStart?.();
        }
        if (parsed.m) {
          handlers.onMessage?.(parsed.m);
        }
        if (parsed.status === 'complete') {
          done = true;
          handlers.onComplete?.();
          break;
        }
      } catch (error) {
        console.error('Error parsing JSON chunk:', error);
      }
    }
  }
};
