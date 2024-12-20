import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient({});

export async function GET(req: NextRequest , {params}: {params : {id: string}}){
  try {
    const disease = await prisma.diseases.findUnique({
      where: {id: (params.id)},
      include: {event: true},
    })
    if (!disease) {
      return new NextResponse(JSON.stringify({error: 'Disease not found'}), {status: 404});
    }
    return new NextResponse(JSON.stringify(disease), {status: 200});
  } catch (error) {
    return new NextResponse(JSON.stringify({error: 'Failed to fetch disease'}), {status: 500});
  }
}

export async function PUT(req: NextRequest , {params}: {params : {id: string}}){
  try {
    const body = await req.json();
    const disease = await prisma.diseases.update({
      where: {id: (params.id)},
      data: {
        diagnosis: body.diagnosis,
        diagnosisDate: new Date(body.diagnosisDate),
        treatmentDetails: body.treatmentDetails,
        treatmentEndDate: body.treatmentEndDate,
        treatmentStartDate: body.treatmentStartDate,
        veterinarianId: body.veterinarianId,
      },
    })
    if (!disease) {
      return new NextResponse(JSON.stringify({error: 'Disease not found'}), {status: 404});
    }
    return new NextResponse(JSON.stringify(disease), {status: 200});
  } catch (error) {
    return new NextResponse(JSON.stringify({error: 'Failed to update disease'}), {status: 500});
  }
}
export async function DELETE(req: NextRequest , {params}: {params : {id: string}}){
  try {
    const disease = await prisma.diseases.delete({
      where: {id: (params.id)},
    })
    if (!disease) {
      return new NextResponse(JSON.stringify({error: 'Disease not found'}), {status: 404});
    }
    return new NextResponse(JSON.stringify({message: 'Disease deleted successfully'}), {status: 200});
  } catch (error) {
    return new NextResponse(JSON.stringify({error: 'Failed to delete disease'}), {status: 500});
  }
}

