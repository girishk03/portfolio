import { Braces, Boxes, Container, GraduationCap, Server } from 'lucide-react';

const highlights = [
  { icon: Boxes, value: '5', label: 'Documented projects' },
  { icon: Server, value: 'FastAPI', label: 'Backend and API focus' },
  { icon: Braces, value: 'PostgreSQL', label: 'Transactional data systems' },
  { icon: Container, value: 'Docker + CI', label: 'Tested delivery workflows' },
  { icon: GraduationCap, value: 'B.Tech CSE', label: 'Computer Science graduate' },
];

export const HighlightsSection = () => (
  <section aria-label="Engineering highlights" className="border-y border-border bg-card/30 py-8">
    <div className="section-container grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {highlights.map((item) => (
        <div key={item.label} className="rounded-xl border border-border bg-background/60 p-4">
          <item.icon className="mb-3 h-5 w-5 text-primary" />
          <p className="font-semibold text-foreground">{item.value}</p>
          <p className="mt-1 text-xs text-muted-foreground">{item.label}</p>
        </div>
      ))}
    </div>
  </section>
);
