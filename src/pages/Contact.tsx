import ContactCta from "@/components/contact/ContactCta";
import ContactDetails from "@/components/contact/ContactDetails";
import ContactIntro from "@/components/contact/ContactIntro";
import EnquiryForm from "@/components/contact/EnquiryForm";
import LocationSection from "@/components/contact/LocationSection";

export default function Contact() {
  return (
    <div className="bg-white">
      <ContactIntro />

      <div className="relative bg-steel-50 bg-[linear-gradient(to_bottom,#ffffff,#F5F7FA_8rem)]" data-testid="section-contact-main">
        <div
          aria-hidden="true"
          className="bg-blueprint-light pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,#000_12rem,#000_85%,transparent)]"
        />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 pb-20 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-10 lg:pb-28 xl:gap-10">
          <div className="min-w-0 lg:col-span-7 xl:col-span-8">
            <EnquiryForm />
          </div>
          <div className="min-w-0 lg:col-span-5 xl:col-span-4">
            <ContactDetails />
          </div>
        </div>
      </div>

      <LocationSection />
      <ContactCta />
    </div>
  );
}
