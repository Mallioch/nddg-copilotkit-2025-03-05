import express from 'express';
import cors from 'cors';

const app = express();

// Middleware to add CORS headers to all responses
app.use(cors());
app.use(express.json());

app.post('/ollama', async (req, res, next) => {

  console.log('incoming', req.body.prompt);

  try {
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3.1:8b',
        prompt: req.body.prompt,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.statusText}`);
    }
    
    let fullResponse = "";
    const reader = response.body!.getReader();
    const decoder = new TextDecoder();

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        fullResponse += decoder.decode(value, { stream: true });
    }

    const parsedObjects = fullResponse
        .trim()
        .split("\n")
        .map(line => {
            try {
                return JSON.parse(line);
            } catch (error) {
                console.error("Error parsing line:", line, error);
                return null; // Skip invalid lines
            }
        })
        .filter(obj => obj !== null); // Remove null values if any line failed parsing

    let message = '';
    parsedObjects.forEach(obj => {
        if (obj && obj.response) {
            message += obj.response;
        }
    });

    console.log(message);
    res.json({ response: message });
    
  } catch (error) {
    next(error);
  }
});

app.listen(4001, () => {
  console.log('Listening at http://localhost:4001/ollama');
});
