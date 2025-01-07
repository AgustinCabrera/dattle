"use client";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useSession } from "next-auth/react";

const RegisterHeatPage = () => {
  const [formData, setFormData] = useState({
    animalTag: "",
    observation: "",
    detectionDate: "", 
  });

  const router = useRouter();
  const { data: session } = useSession();

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (!session) {
        throw new Error("You must be logged in to register heat");
      }

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

      const data = await response.json();

      if (!formData.animalTag.trim() || !formData.detectionDate) {
        setError("Please fill in all required fields");
        setIsLoading(false);
        return;
      }

      if (data.success) {
        alert("Heat registered successfully");
        console.log("Heat registered successfully:", data.data);

        setFormData({
          animalTag: "",
          observation: "",
          detectionDate: "",
        });

        router.push("/heat-service");
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (error) {
      console.error("Error registering heat:", error);
      setError(error instanceof Error ? error.message : "An unknown error occurred");
    } finally {
      setIsLoading(false);
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
                id="animalTag"
                type="text"
                value={formData.animalTag}
                onChange={(e) =>
                  setFormData({ ...formData, animalTag: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="detectionDate" className="text-sm font-medium">
                Date and Time
              </label>
              <Input
                id="detectionDate"
                type="datetime-local"
                value={formData.detectionDate}
                onChange={(e) =>
                  setFormData({ ...formData, detectionDate: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="observation" className="text-sm font-medium">
                Observation
              </label>
              <Input
                id="observation"
                type="text"
                value={formData.observation}
                onChange={(e) =>
                  setFormData({ ...formData, observation: e.target.value })
                }
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Registering..." : "Register Heat"}
            </Button>
          </form>
        </CardContent>
        <Button onClick={() => router.push("/heat-service")} className="mt-4">Back</Button>
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

