import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const body = await req.json();
    const { animalTag, animalTouch, date, observation } = body;

    if (!animalTag || !animalTouch || !date || !observation) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const animal = await prisma.animal.findUnique({
      where: {
        tag_ownerId: {
          tag: animalTag,
          ownerId: session.user.id,
        },
      },
    });

    if (!animal) {
      return NextResponse.json(
        { error: `Animal with tag ${animalTag} does not exist for this user` },
        { status: 404 }
      );
    }

    const touch = await prisma.heatService.create({
      data: {
        animal: { connect: { id: animal.id } },
        date: new Date(),
        animalTouch,
        observation,
        event: {
          create: {
            type: "TOUCH",
            date: new Date(),
            description: observation || "",
            animal: { connect: { id: animal.id } },
          },
        },
      },
      include: {
        event: true,
        animal: true,
      },
    });
    console.log("Touch created successfully:", touch);
    return NextResponse.json({ success: true, data: touch }, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/heat/touch:", error.message, error.stack);
    return NextResponse.json(
      {
        error: "Failed to create tocuh",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const touches = await prisma.heatService.findMany({
      where: {
        animal: {
          ownerId: session.user.id,
        },
      },
      include: { event: true, animal: true },
    });
    if (!touches) {
      return NextResponse.json(
        { error: "Animal tag is required" },
        { status: 400 }
      );
    }
    return new NextResponse(JSON.stringify(touches), { status: 200 });
  } catch (error) {
    console.error("Error searching touches", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
