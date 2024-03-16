import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Jet, Prisma } from '@prisma/client';

/**
 * GET /api/jets
 * @summary View all jets
 * @return {array<Jet>} 200 - success response - application/json
 */
export async function GET() {
  try {
    const jets: Jet[] = await prisma.jet.findMany();
    return NextResponse.json(
      {
        success: true,
        data: jets,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }
  }
}
