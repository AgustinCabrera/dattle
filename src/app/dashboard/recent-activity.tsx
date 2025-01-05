export function RecentActivity() {
  const activities = [
    {
      type: "Service",
      animalId: "A123",
      description: "Service registered",
      date: "2 hours ago",
    },
    {
      type: "Birth",
      animalId: "A145",
      description: "Succesfully birth - 2 cows",
      date: "5 hours ago",
    },
    {
      type: "Disease",
      animalId: "A167",
      description: "Beggining of treatment",
      date: "1 day ago",
    },
  ]

  return (
    <div className="space-y-8">
      {activities.map((activity, index) => (
        <div key={index} className="flex items-center">
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
              {activity.type} - Animal {activity.animalId}
            </p>
            <p className="text-sm text-muted-foreground">
              {activity.description}
            </p>
            <p className="text-xs text-muted-foreground">
              {activity.date}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

