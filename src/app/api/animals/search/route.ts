import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const animalTag = searchParams.get('animalTag');
    const breed = searchParams.get('breed');

    let whereClause = {};

    if (animalTag) {
      whereClause = { tag: animalTag };
    } else if (breed) {
      whereClause = { breed: { contains: breed } };
    }

    const animals = await prisma.animal.findMany({
      where: whereClause,
      include: {
        events: {
          include: {
            diseases: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(animals);
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Failed to search animals' },
      { status: 500 }
    );
  }
}

