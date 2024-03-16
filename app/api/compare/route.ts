import { NextRequest, NextResponse } from 'next/server';
import openai from '@/lib/openai';
import { openaiSystemMessage, userMessage } from '@/lib/openaiMessages';
import { ComparisonItem } from '@/lib/hooks/useCompare';
import { OPENAI_MODEL } from '@/lib/constants';

export interface CompletionResponse {
  data: ComparisonItem[];
}

/**
 * POST /api/compare
 * @summary Makes a request to OpenAI API with a prompt generated from the user input and parses the response to JSON
 * @param {Jet[]} req.body.planes.required - array of selected jets - application/json
 * @return {Promise<NextResponse>} 200 - success response - application/json
 * @return {Promise<NextResponse>} 400 - error response - application/json
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

  /**
   * Using OpenAI's Chat API over the new Assistant API mostly for cost reasons.
   * This application doesn't require the context window or need to ask questions.
   *
   * With a static list of jets, this endpoint could be cached so that we're not
   * hitting OpenAI on every request. The response it gives should be consistent.
   * We could even create a new database table for stored responses since there
   * is a relatively small number of possible comparisons.
   *
   * But if the list of jets is dynamic, we would want a way to invalidate the
   * cache when the list changes and may opt for a more temporary caching solution.
   */
  const completion = await openai.chat.completions.create({
    messages,
    model: OPENAI_MODEL,
  });

  const data = completion.choices[0].message.content;

  if (data?.startsWith('```')) {
    console.log('DATA:', data);
  }

  // Sanitize the data to ensure it is valid JSON
  let sanitizedData = data
    ? data.replace('```json', '').replace('```', '')
    : '';

  const jsonData: CompletionResponse = sanitizedData
    ? JSON.parse(sanitizedData)
    : { data: [] };

  return NextResponse.json(
    {
      success: true,
      data: jsonData.data,
    },
    {
      status: 200,
    }
  );
}
