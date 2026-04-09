import OpenAI from 'openai'

// This file exposes a shared openai client or helpers if needed out of Route handlers.
// Currently the route handler creates the client to inject the API key securely.

export function getOpenAIClient() {
  if (!process.env.OPENAI_API_KEY) {
    return null
  }
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })
}
