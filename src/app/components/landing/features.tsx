import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MilkIcon as Cow, Stethoscope, TrendingUp, Calendar, Dna, Milk } from 'lucide-react'

const features = [
  {
    title: "Herd Management",
    description: "Keep detailed records of your entire herd, including lineage, health history, and production data.",
    icon: Cow,
  },
  {
    title: "Health Tracking",
    description: "Monitor animal health, schedule vaccinations, and track treatments for optimal herd wellness.",
    icon: Stethoscope,
  },
  {
    title: "Performance Analytics",
    description: "Gain insights into your herd's performance with advanced analytics and reporting tools.",
    icon: TrendingUp,
  },
  {
    title: "Breeding Management",
    description: "Optimize your breeding program with heat detection, insemination scheduling, and genetic tracking.",
    icon: Calendar,
  },
  {
    title: "Genetic Improvement",
    description: "Make data-driven decisions to improve your herd's genetic potential over time.",
    icon: Dna,
  },
  {
    title: "Production Tracking",
    description: "Monitor and analyze milk production data to maximize your dairy operation's efficiency.",
    icon: Milk,
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Powerful Features for Modern Cattle Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <feature.icon className="h-10 w-10 text-blue-500 mb-4" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

