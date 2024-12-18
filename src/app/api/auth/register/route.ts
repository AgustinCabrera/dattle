import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient({});
export async function POST (req: NextResponse){
  const data = await req.json();
  const salt = await bcrypt.genSalt(10);
  data.password = await bcrypt.hash(data.password, salt);
  console.log(data);
  const newUser = await prisma.user.create({data});
  const {password, ...user} = newUser
  return new NextResponse(JSON.stringify(user), { status: 201 });
}