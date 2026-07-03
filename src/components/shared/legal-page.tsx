export function LegalPage({
  title,
  lastUpdated,
  sections,
}: {
  title: string;
  lastUpdated: string;
  sections: { title: string; body: string }[];
}) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-2xl font-medium tracking-[-0.02em] text-foreground">{title}</h1>
      <p className="mt-1 text-sm text-muted-foreground">Last updated {lastUpdated}</p>

      <div className="mt-10 space-y-8">
        {sections.map((section, index) => (
          <div key={section.title}>
            <h2 className="text-lg font-medium tracking-[-0.01em] text-foreground">
              {index + 1}. {section.title}
            </h2>
            <p className="mt-2 leading-relaxed text-muted-foreground">{section.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
