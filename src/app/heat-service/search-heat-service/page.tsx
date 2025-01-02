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

interface SearchResult {
  id: string
  animalTag: string
  detectionDate: string
  serviceDate: string | null
  observation: string
}

const SearchPage = () => {
  const [searchType, setSearchType] = useState<"heat" | "service" | "touch">(
    "heat"
  );
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const router = useRouter();

  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);
    setSearchResults([]);

    try {
      let response

      if (searchType === "service") {
        response = await fetch(`/api/service/search?service=${encodeURIComponent(searchValue)}`);
      } else if (searchType === "heat") {
        response = await fetch(`/api/heat/search?service=${encodeURIComponent(searchValue)}`);
      } else if (searchType === "touch") {
        response = await fetch(`/api/heat/touch/search?touch=${encodeURIComponent(searchValue)}`);
      }
      if (!response || !response.ok) {
        throw new Error(`Failed to fetch ${searchType}`);
      }
      const data = await response.json();
      setSearchResults(data);

    } catch (error) {
      setError("An error occurred while searching. Please try again.");
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">{`Search ${searchType}`}</h1>
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <Select
                value={searchType}
                onValueChange={(value: "heat" | "service" | "touch") =>
                  setSearchType(value)
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Search by..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="heat">Heat</SelectItem>
                  <SelectItem value="service">Service</SelectItem>
                  <SelectItem value="touch">Touch</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex-1">
                <Input
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder={`Search ${searchType} by animal tag`}
                  className="ml-4"
                  required
                />
              </div>
              <Button
                onClick={handleSearch}
                className="ml-4"
                disabled={isLoading}
              >
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {searchResults.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Search Results</h2>
          {searchResults.map((result) => (
            <Card key={result.id} className="mb-4">
              <CardContent className="pt-6">
                <p><strong>Animal Tag:</strong> {result.animalTag}</p>
                {
                  searchType === "heat" && (
                    <div>
                      <p><strong>Heat Date:</strong> {new Date(result.detectionDate).toLocaleDateString()}</p>
                    </div>
                  )
                }
                {searchType === "service" && (
                  <p><strong>Service Date:</strong> {new Date(result.serviceDate).toLocaleDateString()}</p>
                )}
                <p><strong>Observation:</strong> {result.observation}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Button onClick={() => router.push("/heat-service")} className="mt-4">Back</Button>
    </div>
  );
};

export default SearchPage;
