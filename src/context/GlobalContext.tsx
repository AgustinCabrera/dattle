"use client";

import { PrismaClient } from "@prisma/client";
import { SessionProvider } from "next-auth/react";

const prisma = new PrismaClient({});


interface Props{
  children: React.ReactNode
}
function GlobalContext({children}:Props){
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}
export default GlobalContext;