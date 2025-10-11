import { Download, Users, Factory, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">About Us</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Discover the story behind Kaveri GS Automech and our commitment to excellence in manufacturing
          </p>
        </div>
      </div>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-heading font-bold mb-6">Our Establishment</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Founded in 2016, Kaveri GS AutoMech established as a partnership firm with a strong emphasis on delivering quality and precision
                in every project.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Became Private Limited in 2021Transitioned to a structured, growth-focused company with formal systems and long-term vision,
                Significantly expanded our capabilities
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Situated in Chakan, a thriving industrial hub near Pune, providing us with access to a robust ecosystem of talent, suppliers,
                and logistical advantages.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Every component undergoes a comprehensive series of stringent quality checks, ensuring exceptional precision and adherence 
                to standards before being dispatched to our customers.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We offer flexible manufacturing services, ranging from highly customized single-piece production to efficient batch production, 
                precisely tailored to customer drawings and specifications.
              </p>
            </div>

            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-heading font-bold mb-4">Company Brochure</h3>
                <p className="text-muted-foreground mb-6">
                  Download our comprehensive company brochure to learn more about our products, capabilities, and services.
                </p>
                <Button 
                  size="lg" 
                  className="w-full md:w-auto"
                  onClick={() => {
                    // TODO: Implement actual brochure download
                    const link = document.createElement('a');
                    link.href = '/brochure/company-brochure.pdf';
                    link.download = 'Kaveri-GS-Automech-Brochure.pdf';
                    link.click();
                  }}
                  data-testid="button-download-brochure"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Download Brochure
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12">A SMALL GLANCE AT US</h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Factory className="h-10 w-10 text-primary" />
                </div>
                <div className="text-4xl font-heading font-bold text-primary mb-2">10+</div>
                <p className="text-muted-foreground">Years of Experience</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-10 w-10 text-primary" />
                </div>
                <div className="text-4xl font-heading font-bold text-primary mb-2">50+</div>
                <p className="text-muted-foreground">Satisfied Clients</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-10 w-10 text-primary" />
                </div>
                <div className="text-4xl font-heading font-bold text-primary mb-2">100+</div>
                <p className="text-muted-foreground">Products Delivered</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="grid md:grid-cols-2 gap-12">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-heading font-bold mb-4">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To provide innovative, high-quality manufacturing solutions that exceed customer expectations. We are committed to continuous improvement, technological advancement, and sustainable practices that benefit our clients, employees, and the environment.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-heading font-bold mb-4">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To be recognized as the leading provider of industrial hardware solutions, setting new standards in quality, reliability, and customer service. We aspire to build lasting partnerships and contribute to the success of industries worldwide.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
