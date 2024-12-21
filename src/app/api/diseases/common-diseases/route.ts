import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const diseases = await prisma.commonDisease.findMany();
    return NextResponse.json(diseases, { status: 200 });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch diseases" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, description } = await req.json();

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const newDisease = await prisma.commonDisease.create({
      data: {
        name,
        description,
      },
    });

    return NextResponse.json(newDisease, { status: 201 });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json({ error: "Failed to create disease" }, { status: 500 });
  }
}

