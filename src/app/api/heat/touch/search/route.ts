import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const touch = searchParams.get("touch");

    if (!touch) {
      return NextResponse.json(
        { error: "Animal tag is required" },
        { status: 400 }
      );
    }

    const touches = await prisma.heatService.findMany({
      where: {
        animal: {
          tag: touch,
        },
        animalTouch: { not: null },
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

    return NextResponse.json(touches);
  } catch (error) {
    console.error("Error searching touches", error);
    return NextResponse.json(
      { error: "Failed to search touches" },
      { status: 500 }
    );
  }
}
