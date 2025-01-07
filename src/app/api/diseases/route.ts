import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient({});

export async function GET() {
  try {
    const diseases = await prisma.disease.findMany();
    if (!diseases) {
      return new NextResponse(JSON.stringify({ error: "Diseases not found" }), { status: 404 });
    }
    return new NextResponse(JSON.stringify(diseases), { status: 200 });
  } catch {
    return new NextResponse(JSON.stringify({ error: "Failed to fetch diseases" }), { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate the incoming request body
    if (!body.eventId || !body.observation) {
      return new NextResponse(
        JSON.stringify({ error: "Fields not filled successfully" }),
        { status: 400 }
      );
    }

    // Create a new disease associated with an event
    const disease = await prisma.disease.create({
      data: {
        animalId: body.animalId,
        name: body.name,
        observation: body.observation,
        eventId: body.eventId,
      },
      include: {
        event: true,
        animal: true,
      },
    });

    return new NextResponse(JSON.stringify(disease), { status: 201 });
  } catch (error) {
    console.error("Error creating disease:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to create disease" }),
      { status: 500 }
    );
  }
}
