import { OpenAI } from 'openai';

/**
 * OpenAI API client
 */
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default openai;
