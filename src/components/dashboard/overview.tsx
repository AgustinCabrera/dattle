"use client"

import { Line, LineChart, ResponsiveContainer,XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { name: "Jan", health: 12, births: 4 },
  { name: "Feb", health: 8, births: 3 },
  { name: "Mar", health: 15, births: 5 },
  { name: "Apr", health: 10, births: 6 },
  { name: "May", health: 7, births: 4 },
  { name: "Jun", health: 9, births: 3 },
]

export function Overview() {
  return (
    <ChartContainer
      config={{
        health: {
          label: "Health Issues",
          color: "hsl(var(--chart-1))",
        },
        births: {
          label: "Births",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line type="monotone" dataKey="health" strokeWidth={2} activeDot={{ r: 6 }} />
          <Line type="monotone" dataKey="births" strokeWidth={2} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

