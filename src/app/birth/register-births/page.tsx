"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const RegisterBirthComponent = () => {
  const [formData, setFormData] = useState({
    animalTag: "",
    birthDate: "",
    pups: "",
    observation: "",
  });

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("/api/birth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "BIRTH",
          animalTag: formData.animalTag.trim(),
          observation: formData.observation.trim(),
          birthDate: formData.birthDate || new Date().toISOString().slice(0, 10),
          pups: formData.pups,
        }),
      });

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Failed to create birth");
        }
        
        setSuccess("Birth registered successfully");
        setFormData({
          animalTag: "",
          birthDate: "",
          pups: "",
          observation: "",
        });
        
        alert ("Birth registered successfully");
      } else {
        const text = await response.text();
        console.error("Non-JSON response:", text);
        throw new Error("Received non-JSON response from server");
      }
    } catch (error) {
      console.error("Error creating birth:", error);
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Register Birth</h1>
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="animalTag" className="text-sm font-medium">
                Animal Tag:
              </label>
              <Input
                id="animalTag"
                value={formData.animalTag}
                onChange={(e) =>
                  setFormData({ ...formData, animalTag: e.target.value })
                }
                placeholder="Enter animal tag"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="birthDate" className="text-sm font-medium">
                Birth Date:
              </label>
              <Input
                id="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={(e) =>
                  setFormData({ ...formData, birthDate: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="pups" className="text-sm font-medium">
                Number of Pups:
              </label>
              <Input
                id="pups"
                type="number"
                value={formData.pups}
                onChange={(e) =>
                  setFormData({ ...formData, pups: e.target.value })
                }
                placeholder="Enter number of pups"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="observation" className="text-sm font-medium">
                Observation:
              </label>
              <Input
                id="observation"
                value={formData.observation}
                onChange={(e) =>
                  setFormData({ ...formData, observation: e.target.value })
                }
                placeholder="Enter observation"
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Registering..." : "Register Birth"}
            </Button>
          </form>
          <Button onClick={() => router.push("/birth")} className="mt-4">
            Back
          </Button>
        </CardContent>
      </Card>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
          {error}
        </div>
      )}
    </div>
  );
};

export default RegisterBirthComponent;
