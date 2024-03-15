import { NextRequest, NextResponse } from 'next/server';
import openai from '@/lib/openai';
import { openaiSystemMessage, userMessage } from '@/lib/openaiMessages';

export async function POST(req: NextRequest) {
  const { body } = await req.json();

  const messages = [openaiSystemMessage, userMessage(body)];
  const completion = await openai.chat.completions.create({
    messages,
    model: 'gpt-3.5-turbo',
  });

  return NextResponse.json(
    {
      success: true,
      data: completion.choices[0].message.content,
    },
    {
      status: 200,
    }
  );
}
