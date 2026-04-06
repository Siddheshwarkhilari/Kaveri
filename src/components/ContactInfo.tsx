import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ContactInfo() {
  return (
    <Card className="border-slate-200/90 shadow-md h-fit">
      <CardHeader>
        <CardTitle className="font-heading text-lg font-semibold text-slate-900">Direct details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="bg-slate-100 p-3 rounded-md border border-slate-200/80">
            <Phone className="h-5 w-5 text-slate-700" aria-hidden />
          </div>
          <div>
            <h4 className="font-medium text-slate-900 mb-1 text-sm">Phone</h4>
            <a href="tel:+919356561166" className="text-slate-600 hover:text-slate-900 text-sm" data-testid="text-contact-phone">
              +91 9356561166
            </a>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="bg-slate-100 p-3 rounded-md border border-slate-200/80">
            <Mail className="h-5 w-5 text-slate-700" aria-hidden />
          </div>
          <div>
            <h4 className="font-medium text-slate-900 mb-1 text-sm">Email</h4>
            <a href="mailto:kaveri.gs01@gmail.com" className="text-slate-600 hover:text-slate-900 text-sm break-all" data-testid="text-contact-email">
              kaveri.gs01@gmail.com
            </a>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="bg-slate-100 p-3 rounded-md border border-slate-200/80">
            <MapPin className="h-5 w-5 text-slate-700" aria-hidden />
          </div>
          <div>
            <h4 className="font-medium text-slate-900 mb-1 text-sm">Address</h4>
            <p className="text-slate-600 text-sm leading-relaxed" data-testid="text-contact-address">
              Plot no:1, Gate No. 483 Mahalaxmi Industrial Street,
              <br />
              Near Bhangare West,
              <br />
              Mahalunge-Varude Road, Chakan
              <br />
              Pune-410501, India
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="bg-slate-100 p-3 rounded-md border border-slate-200/80">
            <Clock className="h-5 w-5 text-slate-700" aria-hidden />
          </div>
          <div>
            <h4 className="font-medium text-slate-900 mb-1 text-sm">Hours (IST)</h4>
            <div className="text-slate-600 text-sm space-y-1" data-testid="text-business-hours">
              <p>Monday–Saturday: 9:00 – 18:00</p>
              <p>Sunday: closed</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
