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
export async function GET(req: Request){
  try {
    const touches = await prisma.heatService.findMany({
      where: { detectionDate: { not: null } },
      include: { event: true, animal: true }
    })
    if(!touches){
      return NextResponse.json({error: "Animal tag is required"},{status:400})
    }
    return new NextResponse(JSON.stringify(touches), { status: 200 })
  } catch (error) {
    console.error('Error searching touches', error)
    return NextResponse.json({error: error.message},{status:500})
  }

}