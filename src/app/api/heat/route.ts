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
    const { animalTag, detectionDate, observation, type } = body;

    if (!animalTag || !detectionDate) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
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

    const heat = await prisma.heatService.create({
      data: {
        animal: { connect: { id: animal.id } },
        date: new Date(detectionDate),
        event: {
          create: {
            type: type || "HEAT",
            date: new Date(detectionDate),
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

    console.log("Heat created successfully:", heat);
    return NextResponse.json({ success: true, data: heat }, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/heat:", error);
    return NextResponse.json(
      { 
        error: "Failed to create heat", 
        details: error instanceof Error ? error.message : "Unknown error" 
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const heats = await prisma.heatService.findMany({
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
    return NextResponse.json({ success: true, data: heats });
  } catch (error) {
    console.error("Error in GET /api/heat:", error);
    return NextResponse.json(
      { 
        error: "Failed to fetch heats", 
        details: error instanceof Error ? error.message : "Unknown error" 
      },
      { status: 500 }
    );
  }
}

