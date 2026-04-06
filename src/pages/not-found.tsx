import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] w-full flex items-center justify-center px-4 py-20 bg-white">
      <Card className="w-full max-w-lg border-slate-200/90 shadow-md">
        <CardContent className="pt-10 pb-10 px-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 mb-3">404</p>
          <h1 className="text-2xl font-heading font-semibold text-slate-900 mb-3">Page not found</h1>
          <p className="text-slate-600 text-sm leading-relaxed mb-8">
            The address may have changed, or the link may be incomplete. Use the navigation above or return to the home
            page.
          </p>
          <Link href="/" className={cn(buttonVariants())}>
            Back to home
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
