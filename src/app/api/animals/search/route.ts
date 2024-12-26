import { NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const animalTag = searchParams.get('animalTag')
  const breed = searchParams.get('breed')
  try {
    let animals;

    if (animalTag) {
      animals = await prisma.animal.findMany({
        where: { tag: animalTag },
        include: {
          events: {
            include: {
              diseases: true
            }
          }
        }
      });
    } else if (breed) {
      animals = await prisma.animal.findMany({
        where: { breed: { contains: breed } },
        include: {
          events: {
            include: {
              diseases: true
            }
          }
        }
      });
    } else {
      animals = await prisma.animal.findMany({
        include: {
          events: {
            include: {
              diseases: true
            }
          }
        }
      });
    }

    return NextResponse.json(animals)
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json({ error: 'An error occurred while searching.' }, { status: 500 })
  }
}

