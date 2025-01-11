"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Zap, HandMetal, Search, ArrowLeft } from 'lucide-react'

const HeatServiceComponent = () => {
  const router = useRouter();

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Heat & Service Management</CardTitle>
          <CardDescription>Register heat, service, touch or search records</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button onClick={() => router.push("/heat-service/register-heat")} className="w-full">
            <Heart className="mr-2 h-4 w-4" /> Register Heat
          </Button>
          <Button onClick={() => router.push("/heat-service/register-service")} variant="secondary" className="w-full">
            <Zap className="mr-2 h-4 w-4" /> Register Service
          </Button>
          <Button onClick={() => router.push("/heat-service/register-touch")} variant="secondary" className="w-full">
            <HandMetal className="mr-2 h-4 w-4" /> Register Touch
          </Button>
          <Button onClick={() => router.push("/heat-service/search-heat-service")} variant="outline" className="w-full">
            <Search className="mr-2 h-4 w-4" /> Search Heat & Service
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

export default HeatServiceComponent;

