import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: Request, { params }: { params: { id: number } }) {
  try {
    const event = await prisma.event.findUnique({
      where: { id: params.id },
      include: { animal: true },
    })
    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }
    return NextResponse.json(event)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch event' }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: number } }) {
  try {
    const body = await request.json()
    const event = await prisma.event.update({
      where: { id: params.id },
      data: {
        name: body.name,
        date: new Date(body.date),
        animalId: body.animalId,
        type: body.type,
      },
    })
    return NextResponse.json(event)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update event' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: number } }) {
  try {
    await prisma.event.delete({
      where: { id: params.id },
    })
    return NextResponse.json({ message: 'Event deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 })
  }
}

