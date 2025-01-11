"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Baby, ArrowLeft } from 'lucide-react'

const BirthComponent = () => {
  const router = useRouter();

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Birth Management</CardTitle>
          <CardDescription>Register new births</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => router.push("/birth/register-births")} className="w-full">
            <Baby className="mr-2 h-4 w-4" /> Register Birth
          </Button>
          <Button onClick={() => router.push("/dashboard")} variant="ghost" className="w-full mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default BirthComponent;

