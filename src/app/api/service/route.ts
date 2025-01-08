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
    const { animalTag, date, observation, type } = body;

    if (!animalTag || !date) {
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

    const service = await prisma.heatService.create({
      data: {
        animal: { connect: { id: animal.id } },
        date: new Date(),
        event: {
          create: {
            type: type || "SERVICE",
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

    console.log("Service created successfully:", service);
    return NextResponse.json({ success: true, data: service }, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/service:", error);
    return NextResponse.json(
      { 
        error: "Failed to create service", 
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

    const service = await prisma.heatService.findMany({
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
    return NextResponse.json({ success: true, data: service });
  } catch (error) {
    console.error("Error in GET /api/service:", error);
    return NextResponse.json(
      { 
        error: "Failed to fetch services", 
        details: error instanceof Error ? error.message : "Unknown error" 
      },
      { status: 500 }
    );
  }
}

