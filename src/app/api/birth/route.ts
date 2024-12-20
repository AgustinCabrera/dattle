import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient({});

export async function POST(req: NextRequest,){
  try {
    const body = await req.json();
    const birth = await prisma.births.create({
      data: {
        birthDate: new Date(body.birthDate),
        notes: body.notes,
        offspringSex: body.offspringSex,
        numberOfOffspring: body.numberOfOffspring,
        offspringState: body.offspringState,
        event: body.event
      },
    })
    return new NextResponse(JSON.stringify(birth), {status: 201});
  } catch (error) {
    return new NextResponse(JSON.stringify({error: 'Failed to create birth'}), {status: 500});
  }
}


export async function GET(req: NextRequest){
  try {
    const births = await prisma.births.findMany({
      include: {event: true},
    })
    return new NextResponse(JSON.stringify(births), {status: 200});
  } catch (error) {
    return new NextResponse(JSON.stringify({error: 'Failed to fetch births'}), {status: 500});
  }
}