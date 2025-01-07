import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/app/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    console.log("Request body:", body);
    const { animalTag, birthDate, pups, observation, type } = body;

    // Input validation
    if (!animalTag || !birthDate || !pups) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const animal = await prisma.animal.findUnique({
      where: {
        tag_ownerId: {
          tag: animalTag,
          ownerId: session.user.id
        }
      }
    });

    if (!animal) {
      return NextResponse.json(
        { error: `Animal with tag ${animalTag} does not exist for this user` },
        { status: 404 }
      );
    }

    const birth = await prisma.births.create({
      data: {
        animalId: animal.id,
        date: new Date(birthDate),
        pups: parseInt(pups, 10),
        event: {
          create: {
            type: type || 'BIRTH',
            date: new Date(birthDate),
            description: observation,
            animalId: animal.id,
          }
        },
      },
      include: {
        event: true,
        animal: true
      }
    });

    console.log("Birth created successfully:", birth);
    return NextResponse.json(birth, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/births:", error);
    return NextResponse.json({ error: 'Failed to create birth' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const births = await prisma.births.findMany({
      where: {
        animal: {
          ownerId: session.user.id
        }
      },
      include: { 
        event: true,
        animal: true
      },
    });
    return NextResponse.json(births);
  } catch (error) {
    console.error("Error fetching births:", error);
    return NextResponse.json({ error: 'Failed to fetch births' }, { status: 500 });
  }
}

