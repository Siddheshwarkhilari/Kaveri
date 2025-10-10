import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ContactInfo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="bg-primary/10 p-3 rounded-lg">
            <Phone className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold mb-1">Phone</h4>
            <p className="text-muted-foreground" data-testid="text-contact-phone">+91 9356561166</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="bg-primary/10 p-3 rounded-lg">
            <Mail className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold mb-1">Email</h4>
            <p className="text-muted-foreground" data-testid="text-contact-email">kaveri.gs01@gmail.com</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="bg-primary/10 p-3 rounded-lg">
            <MapPin className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold mb-1">Address</h4>
            <p className="text-muted-foreground" data-testid="text-contact-address">
              Plot no:1, Gate No. 483 Mahalaxmi Industrial Street,<br />
              Near Bhangare West,<br />
              Mahalunge-Varude Road, Chakan<br />
              Pune-410501, India
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="bg-primary/10 p-3 rounded-lg">
            <Clock className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold mb-1">Business Hours</h4>
            <div className="text-muted-foreground space-y-1" data-testid="text-business-hours">
              <p>Monday to Friday: 9:00 AM - 6:00 PM IST</p>
              <p>Saturday: 9:00 AM - 1:00 PM IST</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
