import express from 'express';
import cors from 'cors';
import process from 'process';
import {
  CopilotRuntime,
  OpenAIAdapter,
  copilotRuntimeNodeHttpEndpoint
} from '@copilotkit/runtime';
import OpenAI from 'openai';
 
const app = express();

console.log('this is in the environment: ', process.env.OPENAI_API_KEY);

const openAI = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

app.use(cors({
  origin: '*', // Allow all origins (adjust as needed)
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type, Authorization, X-CopilotKit-Runtime-Client-GQL-Version, x-copilotkit-runtime-client-gql-version',
}));

const runtime = new CopilotRuntime();
const serviceAdapter = new OpenAIAdapter({ openai: openAI });

app.use('/copilotkit', (req, res, next) => {
  (async () => {
    const runtime = new CopilotRuntime();
    const handler = copilotRuntimeNodeHttpEndpoint({
      endpoint: '/copilotkit',
      runtime,
      serviceAdapter,
    });
 
    return handler(req, res);
  })().catch(next);
});

app.listen(4000, () => {
  console.log('Listening at http://localhost:4000/copilotkit');
});