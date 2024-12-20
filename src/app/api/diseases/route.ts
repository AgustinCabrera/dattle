import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient({});

export async function GET(req: NextRequest) {
  try {
    const diseases = await prisma.diseases.findMany({ include: { event: true } });
    if (!diseases) {
      return new NextResponse(JSON.stringify({ error: 'Animals not found' }), { status: 404 });
    }
    return new NextResponse(JSON.stringify(diseases), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Failed to fetch animals' }), { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body) {
      return new NextResponse(JSON.stringify({ error: 'Fields not filled succesfully' }), { status: 400 });
    }
    const diseases = await prisma.diseases.create({
      data:
        {
          event: body.event,
          diagnosis: body.diagnosis,
          diagnosisDate: new Date(body.diagnosisDate),
          treatmentDetails: body.treatmentDetails,
          treatmentEndDate: body.treatmentEndDate,
          treatmentStartDate: body.treatmentStartDate,
          veterinarianId: body.veterinarianId,
        },
      });
      return new NextResponse(JSON.stringify(diseases), { status: 201 });
    }
    catch (error) {
      return new NextResponse(JSON.stringify({ error: 'Failed to create disease' }), { status: 500 });
    }
  }