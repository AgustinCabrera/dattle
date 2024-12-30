import { NextResponse } from "next/server";
import prisma from '../../../lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {animalTag, animalTouch, detectionDate, observation} = body

    if(!animalTag || !animalTouch || !detectionDate){
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const animal = await prisma.animal.findUnique({
      where: { tag: animalTag }
    })
    if(!animal){
      return NextResponse.json(
        { error: `Animal with tag ${animalTag} does not exist` },
        { status: 404 }
      );
    }
    const touch = await prisma.heatService.create({
      data: {
        detectionDate: new Date(detectionDate),
        observation: observation || "",
        animalTouch,
        event: {
          create: {
            type: "TOUCH",
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
    })
    console.log("Touch created successfully:", touch);
    return NextResponse.json(touch, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/heat/touch:", error.message, error.stack);
    return NextResponse.json(
      { error: "Failed to create heat" },
      { status: 500 }
    );
  }
}