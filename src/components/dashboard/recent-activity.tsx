import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const activities = [
  {
    id: 1,
    type: "HEAT",
    animalTag: "A123",
    date: "2024-01-10",
    description: "Heat detected",
  },
  {
    id: 2,
    type: "BIRTH",
    animalTag: "B456",
    date: "2024-01-09",
    description: "New birth recorded",
  },
  {
    id: 3,
    type: "DISEASE",
    animalTag: "C789",
    date: "2024-01-08",
    description: "Treatment administered",
  },
]

export function RecentActivity() {
  return (
    <div className="space-y-8">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-blue-100 text-blue-900">
              {activity.type[0]}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              Animal {activity.animalTag}
            </p>
            <p className="text-sm text-muted-foreground">
              {activity.description}
            </p>
          </div>
          <div className="ml-auto text-sm text-muted-foreground">
            {new Date(activity.date).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  )
}

