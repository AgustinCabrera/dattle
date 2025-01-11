"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/dashboard/overview"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { MetricCard } from "@/components/dashboard/metric-card"
import { AnimalDistribution } from "@/components/dashboard/animal-distribution"
import { Calendar, Activity, Stethoscope, Baby } from 'lucide-react'


export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Animals"
          value="24"
          description="+2 from last month"
          icon={<Activity className="h-4 w-4 text-blue-500" />}
        />
        <MetricCard
          title="Active Heats"
          value="6"
          description="4 pending services"
          icon={<Calendar className="h-4 w-4 text-rose-500" />}
        />
        <MetricCard
          title="Health Issues"
          value="3"
          description="2 under treatment"
          icon={<Stethoscope className="h-4 w-4 text-yellow-500" />}
        />
        <MetricCard
          title="Recent Births"
          value="8"
          description="+3 this month"
          icon={<Baby className="h-4 w-4 text-green-500" />}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Health Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentActivity />
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Analysis</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <AnimalDistribution />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Breeding Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <div className="relative h-[220px] w-[220px]">
                {/* Add circular progress component here */}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

