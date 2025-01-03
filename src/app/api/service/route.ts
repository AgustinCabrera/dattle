import { NextResponse } from "next/server";
import prisma from '../../lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { animalTag, serviceDate, observation, type } = body;

    if (!animalTag || !serviceDate) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const animal = await prisma.animal.findUnique({
      where: { tag: String(animalTag) },
    });

    if (!animal) {
      return NextResponse.json(
        { error: `Animal with tag ${animalTag} does not exist` },
        { status: 404 }
      );
    }

    const heatService = await prisma.heatService.create({
      data: {
        serviceDate: new Date(serviceDate),
        observation: observation || "",
        event: {
          create: {
            type: type || "SERVICE",
            date: new Date(serviceDate),
            description: observation || "",
            animalTag,
          },
        },
        animal: {
          connect: { tag: animalTag },
        },
      },
    });
    console.log(heatService)
    console.log("Service created successfully:", heatService);
    return NextResponse.json(heatService, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/service:", error.message, error.stack);
    return NextResponse.json(
      { error: "Failed to create heat" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const services = await prisma.heatService.findMany({
      include: { 
        event: true,
        animal: true
      },
    });
    return NextResponse.json(services);
  } catch (error) {
    console.error("Error in GET /api/heat:", error.message, error.stack);
    return NextResponse.json(
      { error: "Failed to fetch heats" },
      { status: 500 }
    );
  }
}