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
  id: string;
  animalTag: string;
  date: string;
  observation: string | null;
  animalTouch?: string | null;
  serviceDate?: string | null;
  animal?: {
    tag: string;
    breed: string;
  };
  event?: {
    date: string;
    description: string;
  };
}

const SearchPage = () => {
  const [searchType, setSearchType] = useState<"heat" | "service" | "touch">(
    "heat"
  );
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [noRecordsFound, setNoRecordsFound] = useState(false);

  const router = useRouter();

  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);
    setSearchResults([]);
    setNoRecordsFound(false);

    try {
      let response;

      switch (searchType) {
        case "heat":
          response = await fetch(
            `/api/heat/search?animalTag=${encodeURIComponent(searchValue)}`
          );
          break;
        case "service":
          response = await fetch(
            `/api/service/search?service=${encodeURIComponent(searchValue)}`
          );
          break;
        case "touch":
          response = await fetch(
            `/api/heat/touch/search?touch=${encodeURIComponent(searchValue)}`
          );
          break;
        default:
          throw new Error("Invalid search type");
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to fetch ${searchType}`);
      }

      const data = await response.json();
      if (data.length === 0) {
        setNoRecordsFound(true);
      } else {
        setSearchResults(data);
      }
    } catch (error) {
      setError(
        error.message || "An error occurred while searching. Please try again."
      );
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="container mx-auto py-6 max-w-2xl">
      <Card className="mb-6">
        <CardContent className="pt-6">
          <h1 className="text-2xl font-bold mb-6">{`Search ${searchType}`}</h1>
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
          <Button onClick={() => router.push("/heat-service")} className="w-full mt-4">
            Back
          </Button>
        </CardContent>
      </Card>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      {noRecordsFound && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          No records found for the specified animal tag
        </div>
      )}

      {searchResults.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Search Results</h2>
          {searchResults.map((result) => (
            <Card key={result.id} className="mb-4">
              <CardContent className="pt-6">
                <p>
                  <strong>Animal Tag:</strong>{" "}
                  {result.animalTag || result.animal?.tag}
                </p>
                {result.animal?.breed && (
                  <p>
                    <strong>Breed:</strong> {result.animal.breed}
                  </p>
                )}
                <p>
                  <strong>Date:</strong> {formatDate(result.date)}
                </p>
                {result.serviceDate && (
                  <p>
                    <strong>Service Date:</strong>{" "}
                    {formatDate(result.serviceDate)}
                  </p>
                )}
                {result.animalTouch && (
                  <p>
                    <strong>Animal Touch:</strong> {result.animalTouch}
                  </p>
                )}
                {result.event?.description && (
                  <p>
                    <strong>Description:</strong> {result.event.description}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
