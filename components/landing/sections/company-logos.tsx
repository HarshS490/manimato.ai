import WidthWrapper from "@/components/layout/width-wrapper";
import companyLogos from "@/data/company-logos.json";

export function CompanyLogos() {
  return (
    <section className="py-20 border-t">
      <WidthWrapper>
        <div className="text-center mb-16">
          <p className="text-muted-foreground font-medium">
            Trusted by researchers and educators at
          </p>
        </div>
        <div className="flex items-center justify-center flex-wrap gap-12 lg:gap-16">
          {companyLogos.map((logo) => (
            <div
              key={logo}
              className="text-2xl font-semibold text-muted hover:text-muted-foreground transition-colors"
            >
              {logo}
            </div>
          ))}
        </div>
      </WidthWrapper>
    </section>
  );
}
