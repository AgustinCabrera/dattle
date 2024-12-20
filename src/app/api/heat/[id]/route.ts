import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const primsa = new PrismaClient({});

export async function GET(req: NextRequest, res: NextResponse, {params} : {params:{id:string}}){
  try {
    const heat = await primsa.heatService.findUnique({
      where: {id: (params.id)},
      include: {event: true},
    })
    if (!heat) {
      return new NextResponse(JSON.stringify({error: 'Heat not found'}), {status: 404});
    }
    return new NextResponse(JSON.stringify(heat), {status: 200});
  } catch (error) {
    return new NextResponse(JSON.stringify({error: 'Failed to fetch heat'}), {status: 500});
  }
}
export async function PUT(req: NextRequest, res: NextResponse, {params} : {params:{id:string}}){
  try {
    const body = await req.json();
    const heat = await primsa.heatService.update({
      where: {id: (params.id)},
      data: {
        detectionDate: body.detectionDate,
        serviceDate: body.serviceDate,
        observation: body.observation,
        event: body.event,
        type: body.type,
      },
    })
    if (!heat) {
      return new NextResponse(JSON.stringify({error: 'Heat not found'}), {status: 404});
    }
    return new NextResponse(JSON.stringify(heat), {status: 200});
  } catch (error) {
    return new NextResponse(JSON.stringify({error: 'Failed to update heat'}), {status: 500});
  }
}
export async function DELETE(req: NextRequest, res: NextResponse, {params} : {params:{id:string}}){
  try {
    const heat = await primsa.heatService.delete({
      where: {id: (params.id)},
    })
    if (!heat) {
      return new NextResponse(JSON.stringify({error: 'Heat not found'}), {status: 404});
    }
    return new NextResponse(JSON.stringify({message: 'Heat deleted successfully'}), {status: 200});
  } catch (error) {
    return new NextResponse(JSON.stringify({error: 'Failed to delete heat'}), {status: 500});
  }
}
