import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const service = searchParams.get("service");

  if(!service){
    return NextResponse.json({error: "Animal tag is required"},{status:400})
  }

  try {
    const services = await prisma.heatService.findMany({
      where:{
        animalTag: service,
        serviceDate:{not:null}
      },
      include:{
        event:true,
        animal:true
      }
    })
    return NextResponse.json(services)
  } catch (error) {
    console.error('Error searching services', error)
    return NextResponse.json({error: error.message},{status:500})
  }
}