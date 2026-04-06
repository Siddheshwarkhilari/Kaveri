import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // TODO: Implement actual form submission logic
    alert("Thank you for contacting us! We will get back to you soon.");
    setFormData({ name: "", company: "", email: "", phone: "", message: "" });
  };

  return (
    <Card className="border-slate-200/90 shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-slate-900 font-heading text-lg font-semibold">
          <MessageSquare className="h-5 w-5 text-slate-600" />
          Enquiry form
        </CardTitle>
        <p className="text-sm text-slate-500">Fields marked * are required.</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Name<span className="text-destructive">*</span>
              </label>
              <Input
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your name"
                data-testid="input-name"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Company</label>
              <Input
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="Company name"
                data-testid="input-company"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                E-mail<span className="text-destructive">*</span>
              </label>
              <Input
                required
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your@email.com"
                data-testid="input-email"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone</label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 XXXXXXXXXX"
                data-testid="input-phone"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              MESSAGE<span className="text-destructive">*</span>
            </label>
            <Textarea
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Your message..."
              rows={6}
              data-testid="input-message"
            />
          </div>

          <Button type="submit" size="lg" className="w-full md:w-auto" data-testid="button-send-message">
            Send Message
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
