"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";

const RegisterDiseaseComponent = () => {
  const [formData, setFormData] = useState({
    animalTag: "",
    name: "",
    observation: "",
  });
  const router = useRouter();

  const [commonDiseases, setCommonDiseases] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  // Fetch the list of common diseases
  useEffect(() => {
    const fetchCommonDiseases = async () => {
      try {
        const response = await fetch("/api/diseases/common-diseases", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch common diseases");
        }
        const data = await response.json();
        setCommonDiseases(data);
      } catch (error) {
        console.error("Error fetching common diseases:", error);
        alert("Failed to load common diseases");
      }
    };

    fetchCommonDiseases();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create an event for the animal
      const eventResponse = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "DISEASE",
          animalTag: formData.animalTag,
          description: formData.observation,
          date: new Date().toISOString().slice(0, 10),
        }),
      });

      if (!eventResponse.ok) {
        const errorData = await eventResponse.json();
        throw new Error(`Failed to create event: ${errorData.error} `);
      }

      const eventData = await eventResponse.json();
      const eventId = eventData.id;

      // Save the disease record linked to the event
      const diseaseData = {
        name: formData.name,
        observation: formData.observation,
        eventId,
      };

      const diseaseResponse = await fetch("/api/diseases", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(diseaseData),
      });

      if (!diseaseResponse.ok) {
        throw new Error("Failed to save disease data");
      }

      setFormData({
        animalTag: "",
        name: "",
        observation: "",
      });

      alert("Disease data saved successfully!");
    } catch (error) {
      console.error(error);
      alert(`An error occurred while saving the data: ${error.message}`);
    }
  };

  return (
    <div className="container mx-auto py-6 max-w-2xl">
    <h1 className="text-2xl font-bold mb-6">Register Disease</h1>
    
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
            <label htmlFor="name" className="text-sm font-medium">
              Disease:
            </label>
            <Select
              value={formData.name}
              onValueChange={(value) =>
                setFormData({ ...formData, name: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a Disease" />
              </SelectTrigger>
              <SelectContent>
                {commonDiseases.map((disease) => (
                  <SelectItem key={disease.id} value={disease.name}>
                    {disease.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Registering..." : "Register Disease"}
          </Button>
        </form>
          <Button onClick={() => router.push('/diseases')}>Back</Button>
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

export default RegisterDiseaseComponent;

