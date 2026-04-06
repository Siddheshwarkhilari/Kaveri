type PageHeaderProps = {
  title: string;
  subtitle?: string;
  eyebrow?: string;
};

export default function PageHeader({ title, subtitle, eyebrow = "Kaveri GS Automech" }: PageHeaderProps) {
  return (
    <header className="border-b border-slate-200/90 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-20 py-12 md:py-16">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500 mb-3">
          {eyebrow}
        </p>
        <h1 className="text-3xl md:text-[2.25rem] font-heading font-semibold text-slate-900 tracking-tight mb-4">{title}</h1>
        {subtitle ? (
          <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">{subtitle}</p>
        ) : null}
      </div>
    </header>
  );
}
