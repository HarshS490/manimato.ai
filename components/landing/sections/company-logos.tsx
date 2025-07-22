import companyLogos from "@/data/company-logos.json"

export function CompanyLogos() {
  return (
    <section className="py-20 border-t border-gray-800">
      <div className="container mx-auto px-8">
        <div className="text-center mb-16">
          <p className="text-gray-500 font-medium">Trusted by researchers and educators at</p>
        </div>
        <div className="flex items-center justify-center flex-wrap gap-12 lg:gap-16">
          {companyLogos.map((logo) => (
            <div key={logo} className="text-2xl font-semibold text-gray-600 hover:text-gray-400 transition-colors">
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
