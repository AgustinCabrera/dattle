import { Header } from "../components/landing/header"
import { Hero } from "../components/landing/hero"
import { Features } from "../components/landing/features"
import { Testimonials } from "../components/landing/testimonials"
import { CTA } from "../components/landing/cta"
import { Footer } from "../components/landing/footer"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Features />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
