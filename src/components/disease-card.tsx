'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

{/*DiseaseCardProps is the interface for the props that the DiseaseCard component will receive*/}

interface DiseaseCardProps {
  disease: {
    id: string;
    name: string;
    observation: string;
    createdAt: string;
    event: {
      date: string;
      animal: {
        tag: string;
        breed: string;
      };
    };
  };
}

{/*DiseaseCard is a component that displays information about a disease*/}
export function DiseaseCard({ disease }: DiseaseCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="w-full mb-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Animal Tag: {disease.event.animal.tag}
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
            <span className="text-sm font-medium">Disease:</span>
            <span className="text-sm">{disease.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium">Date:</span>
            <span className="text-sm">
              {new Date(disease.event.date).toLocaleDateString()}
            </span>
          </div>
          {isExpanded && (
            <>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Breed:</span>
                <span className="text-sm">{disease.event.animal.breed || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Observation:</span>
                <span className="text-sm">{disease.observation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Created:</span>
                <span className="text-sm">
                  {new Date(disease.createdAt).toLocaleDateString()}
                </span>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

