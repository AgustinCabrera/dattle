"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MilkIcon as Cow, Search, ArrowLeft } from 'lucide-react'

const AnimalComponent = () => {
  const router = useRouter();

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Animal Management</CardTitle>
          <CardDescription>Register or search for animals</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button onClick={() => router.push("/animals/register-animals")} className="w-full">
            <Cow className="mr-2 h-4 w-4" /> Register Animal
          </Button>
          <Button onClick={() => router.push("/animals/search-animals")} variant="outline" className="w-full">
            <Search className="mr-2 h-4 w-4" /> Search Animal
          </Button>
        </CardContent>
        <CardFooter>
          <Button onClick={() => router.push("/dashboard")} variant="ghost" className="w-full">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AnimalComponent;

