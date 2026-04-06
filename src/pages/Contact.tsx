import ContactForm from "@/components/ContactForm";
import ContactInfo from "@/components/ContactInfo";
import PageHeader from "@/components/PageHeader";

export default function Contact() {
  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        title="Contact"
        subtitle="Reach the team for quotations, technical questions, or visit planning. We respond to business enquiries on working days."
      />

      <section className="py-14 md:py-20 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </section>
    </div>
  );
}
