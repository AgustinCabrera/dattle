"use client";
import React, { useState, useEffect } from "react";
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
import { useRouter } from "next/navigation";

const RegisterDiseaseComponent = () => {
  const [formData, setFormData] = useState({
    animalTag: "",
    name: "",
    observation: "",
  });
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      {
        /*First i create a event id */
      }
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
      {
        /*Then i use the id to create a disease  */
      }
      const diseaseResponse = await fetch("/api/diseases", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          animalTag: formData.animalTag,
          name: formData.name,
          observation: formData.observation,
          eventId,
        }),
      });

      if (!diseaseResponse.ok) {
        const errorData = await diseaseResponse.json();
        throw new Error(`Failed to save disease data: ${errorData.error}`);
      }

      setFormData({
        animalTag: "",
        name: "",
        observation: "",
      });
      alert("Disease data saved successfully!");
      router.push("/diseases");
    } catch (error) {
      console.error(error);
      alert(`An error occurred while saving the data: ${error.message}`);
    }
  };

  return (
    <div className="container mx-auto py-6 max-w-2xl">
      <Card>
        <CardContent className="pt-6">
          <h1 className="text-2xl font-bold mb-6">Register Disease</h1>
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
                  <SelectItem value="anthrax">Anthrax</SelectItem>
                  <SelectItem value="brucellosis">Brucellosis (BCS)</SelectItem>
                  <SelectItem value="pneumonia">
                    Bovine respiratory disease (BRD)
                  </SelectItem>
                  <SelectItem value="spongiform ">
                    Bovine spongiform encephalopathy (BSE)
                  </SelectItem>
                  <SelectItem value="tuberculosis">
                    Bovine tuberculosis (TB)
                  </SelectItem>
                  <SelectItem value="diarrhea">
                    Bovine viral diarrhea (BVD)
                  </SelectItem>
                  <SelectItem value="coccidiosis">Coccidiosis</SelectItem>
                  <SelectItem value="clostridial">
                    Clostridial diseases
                  </SelectItem>
                  <SelectItem value="footandmouth">
                    Foot and mouth disease (FMD)
                  </SelectItem>
                  <SelectItem value="leptospirosis">Leptospirosis</SelectItem>
                  <SelectItem value="mastitis">Mastitis</SelectItem>
                  <SelectItem value="trichomoniasis">Trichomoniasis</SelectItem>
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
          <Button className="w-full mt-4" onClick={() => router.push("/diseases")}>Back</Button>
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
