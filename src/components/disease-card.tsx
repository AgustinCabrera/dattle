import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Disease {
  id: string;
  name: string;
  observation?: string;
}

interface Event {
  id: string;
  date: string;
  type: string;
  disease?: Disease | null;
}

interface Animal {
  id: string;
  tag: string;
  breed: string;
  events: Event[];
}

interface DiseaseCardProps {
  animal: Animal;
}

const DiseaseCard = ({ animal }: DiseaseCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!animal) {
    return <div>No data available for this animal.</div>;
  }

  {
    /*Filter out events that don't have disease information*/
  }
  const diseaseEvents = (animal.events || []).filter(
    (event) => event && event.disease
  );

  return (
    <Card className="w-full mb-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Animal Tag: {animal.tag || "Unknown"}
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? <ChevronUp /> : <ChevronDown />}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium">Breed:</span>
            <span className="text-sm">{animal.breed || "Unknown"}</span>
          </div>
          {isExpanded && (
            <>
              <h4 className="text-sm font-medium mt-4">Diseases:</h4>
              {diseaseEvents.length > 0 ? (
                diseaseEvents.map((event) => {
                  if (!event.disease) return null;

                  return (
                    <div
                      key={event.id}
                      className="bg-muted p-3 rounded-lg mb-2"
                    >
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Disease:</span>
                        <span className="text-sm">
                          {event.disease.name || "Unknown"}
                        </span>
                      </div>
                      {/* Here i added some checks before rendering certain elements because it throwed some errors*/}
                      {event.disease.observation && (
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">
                            Observation:
                          </span>
                          <span className="text-sm">
                            {event.disease.observation}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Date:</span>
                        <span className="text-sm">
                          {/*added some checks too before formating*/}
                          {event.date
                            ? new Date(event.date).toLocaleDateString()
                            : "Unknown date"}
                        </span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-sm text-muted-foreground">
                  No diseases recorded for this animal.
                </div>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DiseaseCard;
