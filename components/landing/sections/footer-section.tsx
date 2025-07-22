import navigationData from "@/data/navigation.json"

export function Footer() {
  const { brand, footer } = navigationData

  return (
    <footer className="border-t border-gray-800 bg-gray-950">
      <div className="container mx-auto px-8 py-20">
        <div className="grid md:grid-cols-5 gap-12">
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-teal-500 rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-lg">{brand.logo}</span>
              </div>
              <span className="text-2xl font-semibold">{brand.name}</span>
            </div>
            <p className="text-gray-400 text-lg leading-relaxed max-w-md">
              AI-powered mathematical animation platform for researchers, educators, and students worldwide.
            </p>
          </div>

          {footer.sections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-6 text-white text-lg">{section.title}</h3>
              <div className="space-y-4">
                {section.links.map((link) => (
                  <div key={link} className="text-gray-400 hover:text-white cursor-pointer transition-colors">
                    {link}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400">
          <p>&copy; 2024 Manimato. All rights reserved.</p>
          <div className="flex items-center space-x-8 mt-4 md:mt-0">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
