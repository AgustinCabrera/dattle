"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import AnimalsCard from "@/components/animals-card";

export default function SearchAnimalPage() {
  const [searchType, setSearchType] = useState<"tag" | "breed">("tag");
  const [searchValue, setSearchValue] = useState("");
  const [animals, setAnimals] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const queryParam = searchType === "tag" ? "animalTag" : "breed";
      const response = await fetch(
        `/api/animals/search?${queryParam}=${encodeURIComponent(searchValue)}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch animals");
      }

      const data = await response.json();
      setAnimals(data);
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
      const response = await fetch("/api/animals/search");
      if (!response.ok) {
        throw new Error("Failed to fetch animals");
      }

      const data = await response.json();
      setAnimals(data);
    } catch (err) {
      setError("An error occurred while fetching animals. Please try again.");
      console.error("Fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-6 max-w-2xl">
      <Card className="mb-6">
        <CardContent className="pt-6">
          <h1 className="text-2xl font-bold mb-6">Search Your Animals</h1>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <Select
                value={searchType}
                onValueChange={(value: "tag" | "breed") => setSearchType(value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Search by..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tag">Tag</SelectItem>
                  <SelectItem value="breed">Breed</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex-1">
                <Input
                  placeholder={`Enter animal ${searchType}...`}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
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
              View All Your Animals
            </Button>
          </div>
          <Button
            onClick={() => router.push("/animals")}
            className="w-full mt-4"
          >
            Back
          </Button>
        </CardContent>
      </Card>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-8">Loading...</div>
      ) : animals.length > 0 ? (
        <div className="space-y-4">
          {animals.map((animal) => (
            <AnimalsCard key={animal.id} animal={animal} />
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
