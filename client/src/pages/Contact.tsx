import ContactForm from "@/components/ContactForm";
import ContactInfo from "@/components/ContactInfo";

export default function Contact() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Get in touch with our team for any inquiries about our products or services
          </p>
        </div>
      </div>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-12">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </section>
    </div>
  );
}
