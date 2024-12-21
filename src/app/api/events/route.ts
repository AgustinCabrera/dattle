import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(req: Request) {
  try {
    const events = await prisma.event.findMany({
      include: { animal: true },
    })
    return NextResponse.json(events)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Request body:", body);

    const requiredFields = ['type', 'animalId', 'description', 'date'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const newEvent = await prisma.event.create({
      data: {
        type: body.type,
        animalId: body.animalId,
        description: body.description,
        date: new Date(body.date),
      },
    });

    console.log("New Event Created:", newEvent);

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "Failed to create event", details: error.message },
      { status: 500 }
    );
  }
}

