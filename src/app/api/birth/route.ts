import { NextResponse } from 'next/server';
import prisma from '../../lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { animalTag, birthDate, pups, observation, type } = body;

    if (!animalTag || !birthDate || pups === undefined) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const animal = await prisma.animal.findUnique({
      where: { tag: animalTag },
    });
    if(!animal) {
      return NextResponse.json(
        { error:  `Animal with tag ${animalTag} does not exist` },
        { status: 404 }
      );
    }

    const birth = await prisma.births.create({
      data: {
        birthDate: new Date(birthDate),
        pups: parseInt(pups, 10),
        observation: observation || "",
        event: {
          create: {
            type: type || "BIRTH",
            date: new Date(birthDate),
            description: observation || "",
            animalTag,
          },
        },
        animal: {
          connect: { tag: animalTag  },
        },
      },
      include: {
        event: true,
        animal: true,
      },
    });

    console.log("Birth created successfully:", birth);
    return NextResponse.json(birth, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/birth:", error.message, error.stack);
    return NextResponse.json(
      { error: "Failed to create birth" },
      { status: 500 }
    );
  }
}
export async function GET(req: Request) {
  try {
    const births = await prisma.births.findMany({
      include: {
        event: true,
        animal: true,
      },
    });
    return NextResponse.json(births, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/birth:", error.message, error.stack);
    return NextResponse.json(
      { error: "Failed to fetch births" },
      { status: 500 }
    );
  }
}