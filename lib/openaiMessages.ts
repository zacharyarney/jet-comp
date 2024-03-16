import { Jet } from '@prisma/client';
import OpenAI from 'openai';
import ChatCompletionMessageParam = OpenAI.Chat.ChatCompletionMessageParam;

export type Metric = 'top speed' | 'fuel efficiency' | 'max seats';

export interface ComparisonRequest {
  planes: Jet[];
  metric: Metric;
}

/**
 * OpenAI system message.
 */
export const openaiSystemMessage: ChatCompletionMessageParam = {
  role: 'system',
  content:
    'You are an aviation expert and the assistant in a "Jet Comparison Tool," a web application that displays information about various charter jets and allows users to use an AI to compare them based on selected criteria. Your job is to help users make decisions about what jet to charter based on top speed, fuel efficiency, and maximum seats.',
};

/**
 * Generates a user message based on the selected Jets and comparison metric.
 * @param input - ComparisonRequest
 */
export function userMessage(
  input: ComparisonRequest
): ChatCompletionMessageParam {
  const planes = input.planes.map(plane => plane.name).join('\n- ');
  let value = '';

  switch (input.metric) {
    case 'top speed':
      value = 'the top speed of the plane in Mach number';
      break;
    case 'fuel efficiency':
      value = 'the fuel consumption of the plane in gallons per hour';
      break;
    case 'max seats':
      value = 'the number of seats in the plane using the metric "seats"';
      break;
  }
  // I didn't put a lot of time into this prompt.
  // The responses are not always accurate, but they are consistent in my testing.
  const content = `Please rank the following aircraft based on ${input.metric}. 
- ${planes}
Your response should be a JSON string where the data is an array of objects representing the planes in their ranked order. The plane objects should be formatted like this:
{name: string, rank: number, value: string}
where the value is ${value}. The response should only include valid JSON.`;
  return {
    role: 'user',
    content,
  };
}
