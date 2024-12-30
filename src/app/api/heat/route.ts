import { NextResponse } from "next/server";
import prisma from '../../lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { animalTag, detectionDate, observation, type } = body;

    if (!animalTag || !detectionDate) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const animal = await prisma.animal.findUnique({
      where: { tag: animalTag },
    });

    if (!animal) {
      return NextResponse.json(
        { error: `Animal with tag ${animalTag} does not exist` },
        { status: 404 }
      );
    }

    const heat = await prisma.heatService.create({
      data: {
        detectionDate: new Date(detectionDate),
        observation: observation || "",
        event: {
          create: {
            type: type || "HEAT",
            date: new Date(detectionDate),
            description: observation || "",
            animalTag,
          },
        },
        animal: {
          connect: { tag: animalTag },
        },
      },
      include: {
        event: true,
        animal: true,
      },
    });

    console.log("Heat created successfully:", heat);
    return NextResponse.json(heat, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/heat:", error.message, error.stack);
    return NextResponse.json(
      { error: "Failed to create heat" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const heats = await prisma.heatService.findMany({
      include: { 
        event: true,
        animal: true
      },
    });
    return NextResponse.json(heats);
  } catch (error) {
    console.error("Error in GET /api/heat:", error.message, error.stack);
    return NextResponse.json(
      { error: "Failed to fetch heats" },
      { status: 500 }
    );
  }
}