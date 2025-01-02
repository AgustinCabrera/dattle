import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const service = searchParams.get("service");

  try {
    const heats = await prisma.heatService.findMany({
      where: {
        animalTag: service,
      },
      include: {
        event: true,
        animal: true,
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
