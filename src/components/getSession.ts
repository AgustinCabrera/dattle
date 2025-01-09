import { getServerSession } from "next-auth";
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { NextResponse } from 'next/server';


export const GetSession = async() => {
  const session = await getServerSession(authOptions);
      if (!session || !session.user) {
        return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
          status: 401,
        });
      }
  
}


