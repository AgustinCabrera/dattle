import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient({});

export async function GET(req: NextRequest , {params}: {params : {id: string}}){
  try {
    const disease = await prisma.disease.findUnique({
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
    const disease = await prisma.disease.update({
      where: {id: (params.id)},
      data: {
        name: body.name,
        observation: body.observation,
        eventId: body.eventId,
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
    const disease = await prisma.disease.delete({
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
