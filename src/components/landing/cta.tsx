import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CTA() {
  return (
    <section className="py-20 bg-blue-600 text-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Cattle Management?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join thousands of satisfied ranchers and dairy farmers who have revolutionized their operations with CattleTrack.
        </p>
        <Link href="/register">
          <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
            Start Your Free 30-Day Trial
          </Button>
        </Link>
        <p className="mt-4 text-sm">No credit card required. Cancel anytime.</p>
      </div>
    </section>
  )
}

