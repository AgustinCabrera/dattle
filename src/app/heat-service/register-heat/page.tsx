"use client";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const RegisterHeatPage = () => {
  const [formData, setFormData] = useState({
    animalTag: "",
    observation: "",
    detectionDate: "", 
  });

  const router = useRouter();

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/heat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "HEAT",
          animalTag: formData.animalTag.trim(),
          observation: formData.observation.trim(),
          detectionDate: formData.detectionDate, 
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to register heat");
      }
      alert("Heat registered successfully");
      console.log("Heat registered successfully");

      console.log({
        type: "HEAT",
        animalTag: formData.animalTag,
        observation: formData.observation,
        dateTime: formData.detectionDate,
      })

      setFormData({
        animalTag: "",
        observation: "",
        detectionDate: "",
      });

      router.push("/heat");
    } catch (error) {
      console.error("Error registering heat:", error);
      alert("Failed to register heat");
    }
  };

  return (
    <div className="container mx-auto py-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Register Heat</h1>
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="animalTag" className="text-sm font-medium">
                Animal Tag
              </label>
              <Input
                type="text"
                value={formData.animalTag}
                onChange={(e) =>
                  setFormData({ ...formData, animalTag: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="dateTime" className="text-sm font-medium">
                Date and Time
              </label>
              <Input
                type="datetime-local"
                value={formData.detectionDate}
                onChange={(e) =>
                  setFormData({ ...formData, detectionDate: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="observation" className="text-sm font-medium">
                Observation
              </label>
              <Input
                type="text"
                value={formData.observation}
                onChange={(e) =>
                  setFormData({ ...formData, observation: e.target.value })
                }
              />
            </div>
            <Button type="submit">Register Heat</Button>
          </form>
        </CardContent>
        <Button onClick={() => router.push("/heat-service")}>Back</Button>
      </Card>
      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
    </div>
  );
};

export default RegisterHeatPage;
