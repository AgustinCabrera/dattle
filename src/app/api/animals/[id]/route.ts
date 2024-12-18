import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({});

export async function GET(request: Request, { params }: { params: { id: number } }) {
  try {
    const animal = await prisma.animal.findUnique({
      where: { id: params.id },
      include: { events: true },
    })
    if (!animal) {
      return NextResponse.json({ error: 'Animal not found' }, { status: 404 })
    }
    return new NextResponse(JSON.stringify(animal), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Failed to fetch animal' }), { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: number } }) {
  try {
    const body = await request.json()
    const animal = await prisma.animal.update({
      where: { id: params.id },
      data: {
        identification: body.identification,
        breed: body.breed,
        birthDate: new Date(body.birthDate),
        gender: body.gender,
      },
    })
    if (!animal) {
      return NextResponse.json({ error: 'Animal not found' }, { status: 404 })
    }

    return new NextResponse(JSON.stringify(animal), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Failed to update animal' }), { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: number } }) {
  try {
    const animal = await prisma.animal.delete({
      where: { id: params.id },
    })
    if (!animal) {
      return NextResponse.json({ error: 'Animal not found' }, { status: 404 })
    };
    return new NextResponse(JSON.stringify({message:"animal deleted succesfully"}),{ status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete animal' }, { status: 500 })
  }
}

