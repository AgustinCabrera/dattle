import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const service = searchParams.get("service");

    if (!service) {
      return NextResponse.json(
        { error: "Animal tag is required" },
        { status: 400 }
      );
    }

    const services = await prisma.heatService.findMany({
      where: {
        animal: {
          tag: service,
        },
        event: {
          type: "SERVICE",
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

    return NextResponse.json(services);
  } catch (error) {
    console.error("Error searching services", error);
    return NextResponse.json(
      { error: "Failed to search services" },
      { status: 500 }
    );
  }
}
