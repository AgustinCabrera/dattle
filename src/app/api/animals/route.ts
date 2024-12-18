import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const animals = await prisma.animal.findMany(
      { include: { events: true } }
    )
    if (!animals) {
      return NextResponse.json({ error: 'Animals not found' }, { status: 404 })
    }

    return new NextResponse(JSON.stringify(animals), { status: 200 })
  }
  catch (error) {
    return NextResponse.json({ error: 'Failed to fetch animals' }, { status: 500 })
  }
}


export async function POST(request: Request) {
  try {
    const body = await request.json()
    if(!body){
      return new NextResponse(JSON.stringify({ error: 'Fields not filled succesfully' }), { status: 400 })
    }
    const animal = await prisma.animal.create({
      data: {
        identification: body.identification,
        breed: body.breed,
        birthDate: new Date(body.birthDate),
        gender: body.gender,
      },
    })
    return new NextResponse(JSON.stringify(animal), { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create animal' }, { status: 500 })
  }
}