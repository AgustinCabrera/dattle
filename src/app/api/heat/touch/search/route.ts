import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const touch = searchParams.get('touch');

  if(!touch){
    return NextResponse.json({error: "Animal tag is required"},{status:400})
  }

  try {
    const touches = await prisma.heatService.findMany({
      where:{
        animalTag: touch,
        serviceDate:{not:null}
      },
      include:{
        event:true,
        animal:true
      }
    })
    return NextResponse.json(touches)
  } catch (error) {
    console.error('Error searching touches', error)
    return NextResponse.json({error: error.message},{status:500})
  }
}