import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Event {
  id: string;
  type: string;
  date: string;
  description: string;
}

interface Animal {
  id: string;
  tag: string;
  breed: string;
  createdAt: string;
  events: Event[];
  owner: {
    name: string;
  };
}

interface AnimalsCardProps {
  animal: Animal;
}

const AnimalsCard = ({ animal }: AnimalsCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="w-full mb-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Animal Tag: {animal.tag}
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
            <span className="text-sm">{animal.breed}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium">Owner:</span>
            <span className="text-sm">{animal.owner.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium">Date:</span>
            <span className="text-sm">
              {new Date(animal.createdAt).toLocaleDateString()}
            </span>
          </div>
          {isExpanded && (
            <>
              <h4 className="text-sm font-medium mt-4">Events:</h4>
              {animal.events.length > 0 ? (
                animal.events.map((event) => (
                  <div key={event.id} className="bg-gray-100 p-2 rounded mb-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Type:</span>
                      <span className="text-sm">{event.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Date:</span>
                      <span className="text-sm">
                        {new Date(event.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Description:</span>
                      <span className="text-sm">{event.description}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-sm text-gray-500">No events recorded for this animal.</div>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default AnimalsCard;

