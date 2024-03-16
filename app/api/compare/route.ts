import { NextRequest, NextResponse } from 'next/server';
import openai from '@/lib/openai';
import { openaiSystemMessage, userMessage } from '@/lib/openaiMessages';
import { ComparisonItem } from '@/lib/hooks/useCompare';

export interface CompletionResponse {
  data: ComparisonItem[];
}

/**
 * POST /api/compare
 * @summary Makes a request to OpenAI API with a prompt generated from the user input and parses the response to JSON
 * @param {Jet[]} req.body.planes.required - array of selected jets - application/json
 * @return {array<ComparisonItem>} 200 - success response - application/json
 * @return {object} 400 - error response - application/json
 */
export async function POST(req: NextRequest) {
  const input = await req.json();

  if (!input.planes.length) {
    return NextResponse.json(
      {
        success: false,
        error: 'No planes selected',
      },
      {
        status: 400,
      }
    );
  }

  const messages = [openaiSystemMessage, userMessage(input)];
  const completion = await openai.chat.completions.create({
    messages,
    model: 'gpt-3.5-turbo',
  });

  const data: CompletionResponse = completion.choices[0].message.content
    ? JSON.parse(completion.choices[0].message.content)
    : { data: [] };

  return NextResponse.json(
    {
      success: true,
      data: data.data,
    },
    {
      status: 200,
    }
  );
}
