import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
   
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const animalTag = searchParams.get('animalTag');
    const breed = searchParams.get('breed');

    let whereClause: any = {
      ownerId: session.user.id,
    };

    if (animalTag) {
      whereClause.tag = animalTag;
    } else if (breed) {
      whereClause.breed = { contains: breed };
    }

    const animals = await prisma.animal.findMany({
      where: whereClause,
      include: {
        events: {
          select: {
            id: true,
            type: true,
            date: true,
            description: true,
          }
        },
        births: {
          select: {
            id: true,
            date: true,
          }
        },
        heat: {
          select: {
            id: true,
            date: true,
          }
        },
        owner: {
          select: {
            name: true,
          }
        },
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

