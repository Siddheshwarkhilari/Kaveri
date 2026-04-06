import { Download, Users, Factory, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PageHeader from "@/components/PageHeader";

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        title="About us"
        subtitle="Kaveri GS Automech is a manufacturing-led company in Chakan, Pune, focused on hardware, fabricated parts, and dependable delivery for industrial buyers."
      />

      <section className="py-14 md:py-20 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="space-y-5 text-slate-600 leading-relaxed text-[15px]">
              <h2 className="text-xl font-heading font-semibold text-slate-900">Establishment & growth</h2>
              <p>
                Founded in 2016 as a partnership firm, the company emphasised measurable quality and clear process
                discipline. In 2021 the business moved to a private limited structure—bringing formal systems, clearer
                accountability, and room to scale capacity without losing control of the shop floor.
              </p>
              <p>
                The Chakan location places us close to automotive and general engineering supply chains, with access to
                skilled labour, tooling suppliers, and road links for timely despatches across western India.
              </p>
              <p>
                We support both custom one-off requirements and repeatable batch work from customer drawings. Parts are
                checked against agreed criteria before packing, so what ships matches what was approved.
              </p>
            </div>

            <Card className="border-slate-200/90 shadow-md">
              <CardContent className="p-8">
                <h3 className="text-lg font-heading font-semibold text-slate-900 mb-2">Company brochure</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  PDF overview of capabilities, typical product families, and contact details. Use it for internal sharing
                  or vendor onboarding.
                </p>
                <Button
                  size="lg"
                  className="w-full sm:w-auto"
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = "/brochure/company-brochure.pdf";
                    link.download = "Kaveri-GS-Automech-Brochure.pdf";
                    link.click();
                  }}
                  data-testid="button-download-brochure"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download brochure
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-slate-50/50 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <h2 className="text-center text-xl md:text-2xl font-heading font-semibold text-slate-900 mb-12">
            At a glance
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-4">
            <Card className="text-center border-slate-200/90 shadow-sm">
              <CardContent className="p-8">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-200/90 shadow-sm">
                  <Factory className="h-8 w-8 text-slate-700" />
                </div>
                <div className="text-3xl font-heading font-semibold text-slate-900 mb-1">10+</div>
                <p className="text-slate-600 text-sm">Years in operation</p>
              </CardContent>
            </Card>

            <Card className="text-center border-slate-200/90 shadow-sm">
              <CardContent className="p-8">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-200/90 shadow-sm">
                  <Users className="h-8 w-8 text-slate-700" />
                </div>
                <div className="text-3xl font-heading font-semibold text-slate-900 mb-1">50+</div>
                <p className="text-slate-600 text-sm">Active customer relationships</p>
              </CardContent>
            </Card>

            <Card className="text-center border-slate-200/90 shadow-sm">
              <CardContent className="p-8">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-200/90 shadow-sm">
                  <TrendingUp className="h-8 w-8 text-slate-700" />
                </div>
                <div className="text-3xl font-heading font-semibold text-slate-900 mb-1">100+</div>
                <p className="text-slate-600 text-sm">Product lines dispatched (cumulative)</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-slate-200/90 shadow-sm">
              <CardContent className="p-8">
                <h3 className="text-lg font-heading font-semibold text-slate-900 mb-4">Mission</h3>
                <p className="text-slate-600 leading-relaxed text-[15px]">
                  Deliver manufacturing solutions that meet print, schedule, and cost expectations—while improving
                  methods and tooling so repeat orders stay efficient and predictable.
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200/90 shadow-sm">
              <CardContent className="p-8">
                <h3 className="text-lg font-heading font-semibold text-slate-900 mb-4">Vision</h3>
                <p className="text-slate-600 leading-relaxed text-[15px]">
                  Be a preferred hardware partner for OEMs and Tier suppliers who value transparent communication,
                  documented quality, and consistent delivery from a single Pune-area source.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
