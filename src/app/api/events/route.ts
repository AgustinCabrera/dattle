import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/app/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const events = await prisma.event.findMany({
      where: {
        animal: {
          ownerId: session.user.id
        }
      },
      include: { animal: true },
    });
    return NextResponse.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    console.log("Request body:", body);

    const requiredFields = ["type", "animalTag", "description", "date"];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const { animalTag, type, date, description } = body;

    // Check if the animal exists and belongs to the current user
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

    const event = await prisma.event.create({
      data: {
        animalId: animal.id,
        type,
        date: new Date(date),
        description,
      },
      include: {
        animal: true,
      },
    });

    console.log("New Event Created:", event);

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "Failed to create event", details: error.message },
      { status: 500 }
    );
  }
}

