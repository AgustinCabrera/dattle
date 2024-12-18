import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="py-20 bg-gradient-to-r from-green-400 to-blue-500 text-white">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Revolutionize Your Cattle</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Dattle software helps you streamline operations, improve herd health, and boost productivity with our comprehensive cattle management software.
        </p>
        <Link href="/auth/register">
          <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
            Start Your Free Trial
          </Button>
        </Link>
      </div>
    </section>
  )
}

