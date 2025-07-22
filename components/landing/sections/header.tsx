import { Button } from "@/components/ui/button"
import navigationData from "@/data/navigation.json"

export function Header() {
  const { brand, links } = navigationData

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black/90 backdrop-blur-sm">
      <div className="container mx-auto px-8 h-20">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-teal-500 rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-lg">{brand.logo}</span>
            </div>
            <span className="text-2xl font-semibold text-white">{brand.name}</span>
          </div>

          <nav className="hidden md:flex items-center space-x-10">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-400 hover:text-white transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-gray-400 hover:text-white">
              Sign in
            </Button>
            <Button className="bg-white text-black hover:bg-gray-100 font-medium">Get started</Button>
          </div>
        </div>
      </div>
    </header>
  )
}
