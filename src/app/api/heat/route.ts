import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const primsa = new PrismaClient({});
export async function POST(req: NextRequest,){
  try {
    const body = await req.json();
    const heat = await primsa.heatService.create({
      data: {
      detectionDate: body.detectionDate,
      serviceDate: body.serviceDate,
      observation: body.observation,
      event: body.event,
      type: body.type,
      },
    })
    return new NextResponse(JSON.stringify(heat), {status: 201});
  } catch (error) {
    return new NextResponse(JSON.stringify({error: 'Failed to create heat'}), {status: 500});
  }
}

export async function GET(req: NextRequest){
  try {
    const heats = await primsa.heatService.findMany({
      include: {event: true},
    })
    return new NextResponse(JSON.stringify(heats), {status: 200});
  } catch (error) {
    return new NextResponse(JSON.stringify({error: 'Failed to fetch heats'}), {status: 500});
  }
}