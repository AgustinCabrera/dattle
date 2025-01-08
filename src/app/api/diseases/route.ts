import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const diseases = await prisma.disease.findMany({
      where: {
        animal: {
          ownerId: session.user.id,
        },
      },
      include: {
        event: true,
        animal: true,
      },
    });
    if (!diseases) {
      return new NextResponse(JSON.stringify({ error: "Diseases not found" }), {
        status: 404,
      });
    }
    return new NextResponse(JSON.stringify(diseases), { status: 200 });
  } catch {
    console.error("Error in GET /api/diseases:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to fetch diseases" }),
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const body = await req.json();
    const { animalTag, name, observation, eventId } = body;

    // Validate the incoming request body
    if (!animalTag || !observation || !name || !eventId) {
      return new NextResponse(
        JSON.stringify({ error: "Fields not filled successfully" }),
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
      return new NextResponse(
        JSON.stringify({
          error: `Animal with tag ${animalTag} does not exist for this user`,
        }),
        { status: 404 }
      );
    }

    // Create a new disease associated with an event
    const disease = await prisma.disease.create({
      data: {
        animal: { connect: { id: animal.id } },
        name: body.name,
        observation: body.observation,
        event: {
          create: {
            type: "DISEASE",
            date: new Date(),
            description: observation,
            animal: { connect: { id: animal.id } },
          },
        },
      },
      include: {
        event: true,
        animal: true,
      },
    });
    console.log("Disease created successfully", disease);
    return new NextResponse(JSON.stringify(disease), { status: 201 });
  } catch (error) {
    console.error("Error creating disease in POST: /api/disease:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to create disease", details: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500 }
    );
  }
}
