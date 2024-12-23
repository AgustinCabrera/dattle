import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const animalTag = searchParams.get('animalTag');
    const diseaseName = searchParams.get('disease');

    let whereClause = {};

    if (animalTag) {
      whereClause = {
        event: {
          animal: {
            tag: animalTag
          }
        }
      };
    } else if (diseaseName) {
      whereClause = {
        name: diseaseName
      };
    }

    const diseases = await prisma.disease.findMany({
      where: whereClause,
      include: {
        event: {
          include: {
            animal: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(diseases);
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Failed to search diseases' },
      { status: 500 }
    );
  }
}

