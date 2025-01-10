import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const animalTag = searchParams.get("animalTag");

    if (!animalTag) {
      return NextResponse.json(
        { error: "Animal tag is required" },
        { status: 400 }
      );
    }

    const heats = await prisma.heatService.findMany({
      where: {
        animal: {
          tag: animalTag,
        },
        event: {
          type: "HEAT",
        },
      },
      include: {
        animal: {
          select: {
            tag: true,
            breed: true,
          },
        },
        event: {
          select: {
            date: true,
            description: true,
          },
        },
      },
      orderBy: {
        date: "desc",
      },
    });

    return NextResponse.json(heats);
  } catch (error) {
    console.error("Error searching heats:", error);
    return NextResponse.json(
      { error: "Failed to search heats" },
      { status: 500 }
    );
  }
}
