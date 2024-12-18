import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from 'next/image'

export function Header() {
  return (
    <header className="py-4 px-6 bg-white shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
        <Image
                className="h-14 w-auto"
                src="/logo.svg"
                alt="Cattle Software Logo"
                width={32}    // Set a specific width for your logo
                height={32}   // Set a specific height for your logo
                objectFit="contain"  // Ensure the aspect ratio is maintained
              />
        </Link>
        <nav className="hidden md:flex space-x-4">
          <Link href="#features" className="text-sm font-medium text-gray-600 hover:text-gray-900">Features</Link>
          <Link href="#testimonials" className="text-sm font-medium text-gray-600 hover:text-gray-900">Testimonials</Link>
          <Link href="#pricing" className="text-sm font-medium text-gray-600 hover:text-gray-900">Pricing</Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Link href="/auth/login">
            <Button variant="ghost">Log in</Button>
          </Link>
          <Link href="/auth/register">
            <Button>Sign up</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

