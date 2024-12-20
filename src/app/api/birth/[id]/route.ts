import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient({});

export async function DELETE(req: NextRequest, res: NextResponse, {params} : {params:{id:string}}){
  try {
    const birth = await prisma.births.delete({
      where: {id: (params.id)},
    })
    if (!birth) {
      return new NextResponse(JSON.stringify({error: 'Birth not found'}), {status: 404});
    }
    return new NextResponse(JSON.stringify({message: 'Birth deleted successfully'}), {status: 200});
  } catch (error) {
    return new NextResponse(JSON.stringify({error: 'Failed to delete birth'}), {status: 500});
  }
}
export async function GET(req: NextRequest, res: NextResponse, {params} : {params:{id:string}}){
  try {
    const birth = await prisma.births.findUnique({
      where: {id: (params.id)},
      include: {event: true},
    })
    if (!birth) {
      return new NextResponse(JSON.stringify({error: 'Birth not found'}), {status: 404});
    }
    return new NextResponse(JSON.stringify(birth), {status: 200});
  } catch (error) {
    return new NextResponse(JSON.stringify({error: 'Failed to fetch birth'}), {status: 500});
  }
}
export async function PUT(req: NextRequest, res: NextResponse, {params} : {params:{id:string}}){
  try {
    const body = await req.json();
    const birth = await prisma.births.update({
      where: {id: (params.id)},
      data: {
        birthDate: body.birthDate,
        numberOfOffspring: body.numberOfOffspring,
        offspringSex: body.offspringSex,
        offspringState: body.offspringState,
        event: body.event,
      },
    })
    if (!birth) {
      return new NextResponse(JSON.stringify({error: 'Birth not found'}), {status: 404});
    }
    return new NextResponse(JSON.stringify(birth), {status: 200});
  } catch (error) {
    return new NextResponse(JSON.stringify({error: 'Failed to update birth'}), {status: 500});
  }
}