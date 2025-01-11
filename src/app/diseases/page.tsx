"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Stethoscope, Search, ArrowLeft } from 'lucide-react'

const DiseaseComponent = () => {
  const router = useRouter();

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Disease Management</CardTitle>
          <CardDescription>Register or search for diseases</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button onClick={() => router.push("/diseases/register-diseases")} className="w-full">
            <Stethoscope className="mr-2 h-4 w-4" /> Register Disease
          </Button>
          <Button onClick={() => router.push("/diseases/search-diseases")} variant="outline" className="w-full">
            <Search className="mr-2 h-4 w-4" /> Search Disease
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

export default DiseaseComponent;

