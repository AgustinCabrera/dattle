export function RecentActivity() {
  const activities = [
    {
      type: "Servicio",
      animalId: "A123",
      description: "Servicio registrado",
      date: "Hace 2 horas",
    },
    {
      type: "Parto",
      animalId: "A145",
      description: "Parto exitoso - 2 crías",
      date: "Hace 5 horas",
    },
    {
      type: "Enfermedad",
      animalId: "A167",
      description: "Inicio de tratamiento",
      date: "Hace 1 día",
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

