import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient({});

export async function POST (req: Request){
  try {
    const data = await req.json();
    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);
    
    const newUser = await prisma.user.create({data});
    const {password, ...user} = newUser
    console.log(newUser);
    return new NextResponse(JSON.stringify(user), { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error)
    return new NextResponse(JSON.stringify({ error: 'Failed to create user' }), { status: 500 });
  }
}
