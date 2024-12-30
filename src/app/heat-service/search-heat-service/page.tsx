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

const SearchPage = () => {
  const [searchType, setSearchType] = useState<"heat" | "service" | "touch">(
    "heat"
  );
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const queryParam = searchType === "heat" ? "service" : "touch";
      if (searchType === "service") {
        const response = await fetch(
          `/api/service/search?${queryParam}=${encodeURIComponent(searchValue)}`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch ${searchType}`);
        }
      } else if (searchType === "heat") {
        const response = await fetch(
          `/api/heat/search?${queryParam}=${encodeURIComponent(searchValue)}`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch ${searchType}`);
        }
      } else if (searchType === "touch") {
        const response = await fetch(
          `/api/heat/touch/search?${queryParam}=${encodeURIComponent(
            searchValue
          )}`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch ${searchType}`);
        }
      }
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
                  <SelectItem value="heat"> Heat</SelectItem>
                  <SelectItem value="service">Service</SelectItem>
                  <SelectItem value="touch">Touch</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex-1">
                <Input
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder={`Search ${searchType}`}
                  className="ml-4"
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
        <Button onClick={() => router.push("/heat-service")}>Back</Button>
      </Card>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
