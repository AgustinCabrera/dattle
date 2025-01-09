"use client";

import { useState } from "react";
import DiseaseCard from "@/components/disease-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SearchDiseasePage() {
  const [searchType, setSearchType] = useState<"tag" | "disease">("tag");
  const [searchValue, setSearchValue] = useState("");
  const [diseases, setDiseases] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const queryParam = searchType === "tag" ? "animalTag" : "disease";
      const response = await fetch(
        `/api/diseases/search?${queryParam}=${encodeURIComponent(searchValue)}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch diseases");
      }

      const data = await response.json();
      setDiseases(data);
    } catch (err) {
      setError("An error occurred while searching. Please try again.");
      console.error("Search error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewAll = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/diseases/search");
      if (!response.ok) {
        throw new Error("Failed to fetch diseases");
      }

      const data = await response.json();
      setDiseases(data);
    } catch (err) {
      setError("An error occurred while fetching diseases. Please try again.");
      console.error("Fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Search Diseases</h1>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <Select
                value={searchType}
                onValueChange={(value: "tag" | "disease") =>
                  setSearchType(value)
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Search by..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tag">Animal Tag</SelectItem>
                  <SelectItem value="disease">Disease Name</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex-1">
                <Input
                  placeholder={`Enter ${
                    searchType === "tag" ? "animal tag" : "disease name"
                  }...`}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                {/* creates a text input field that updates the searchValue state when the user types, 
                and has a dynamic placeholder based on the selected search type. */}
              </div>
              <Button onClick={handleSearch} disabled={isLoading}>
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
            <Button
              variant="outline"
              onClick={handleViewAll}
              disabled={isLoading}
              className="w-full"
            >
              View All Diseases
            </Button>
          </div>
        </CardContent>
        <Button onClick={() => router.push("/diseases")}>Back</Button>
      </Card>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-8">Loading...</div>
      ) : diseases.length > 0 ? (
        <div className="space-y-4">
          {diseases.map((disease) =>
            disease ? (
              <DiseaseCard key={disease.id} animal={disease} />
            ) : (
              <div key={disease.id}>Invalid data for this animal</div>
            )
          )}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No diseases found. Try a different search or view all diseases.
        </div>
      )}
    </div>
  );
}
