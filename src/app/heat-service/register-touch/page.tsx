"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const RegisterTouchPage = () => {
  const [formData, setFormData] = useState({
    animalTag: "",
    animalTouch: "",
    observation: "",
    detectionDate: "",
  });
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/heat/touch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "TOUCH",
          animalTag: formData.animalTag.trim(),
          animalTouch: formData.animalTouch.trim(),
          observation: formData.observation.trim(),
          detectionDate: formData.detectionDate,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to register touch");
      }
      alert("Touch registered successfully");
      console.log("Touch registered successfully");

      console.log({
        type: "TOUCH",
        animalTag: formData.animalTag,
        animalTouch: formData.animalTouch,
        observation: formData.observation,
        detectionDate: formData.detectionDate,
      });

      setFormData({
        animalTag: "",
        animalTouch: "",
        observation: "",
        detectionDate: "",
      });
    } catch (error) {
      console.error("Error registering touch:", error);
      alert("Failed to register touch");
    }
  };

  return (
    <div className="container mx-auto py-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Register Touch</h1>
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
              <label htmlFor="animalStatus" className="text-sm font-medium">
                Animal Status
              </label>
              <Select
                value={formData.animalTouch}
                onValueChange={(value) =>
                  setFormData({ ...formData, animalTouch: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an animal status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dobtfulpregnancy">
                    Doubtful pregnancy
                  </SelectItem>
                  <SelectItem value="pregnant">Pregnant</SelectItem>
                  <SelectItem value="empty">Empty</SelectItem>
                </SelectContent>
              </Select>
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
            <Button type="submit">Register Touch</Button>
          </form>
          <Button onClick={() => router.push("/heat-service")}>Back</Button>
        </CardContent>
      </Card>

      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
    </div>
  );
};

export default RegisterTouchPage;
