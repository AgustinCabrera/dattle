"use client";
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
import React, { useState } from "react";
import AnimalsCard from "@/components/animals-card";

const SearchAnimalPage = () => {
  const [searchType, setSearchType] = useState<"tag" | "breed">("tag");
  const [searchValue, setSearchValue] = useState("");
  const [animals, setAnimals] = useState<{ id: string }[]>([]);
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
  /*
  const handleDelete = async () => {
    try {
      const response = await fetch(``);
    } catch (error) {
      
    }
  */

  return (
    <div className="container mx-auto py-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Search Animals</h1>
      <Card className="mb-6">
        <CardContent className="pt-6">
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
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder={`Enter animal ${
                    searchType === "tag" ? "tag" : "breed"
                  }`}
                />
              </div>
              <Button onClick={handleSearch} disabled={isLoading}>
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </CardContent>
        <Button onClick={handleViewAll}>View All</Button>
        <Button onClick={() => router.push("/animals")}>Back</Button>
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
          {/**
                <Button
                  variant="outline"
                  onClick={handleDelete}>
                  Delete
                </Button>
                 * 
                 */}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No animals found. Try a different search or view all animals.
        </div>
      )}
    </div>
  );
};

export default SearchAnimalPage;
