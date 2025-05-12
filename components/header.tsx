import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-orange-600">Fishy Flavor Finder</span>
          </Link>

          <div className="flex items-center">
            <nav className="flex items-center mr-4">
              <Link href="/" className="text-orange-900 hover:text-orange-600 font-medium">
                Home
              </Link>
            </nav>

            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Menu</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
