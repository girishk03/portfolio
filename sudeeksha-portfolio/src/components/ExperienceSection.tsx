import { useMemo, useState } from 'react';
import { Briefcase, GraduationCap, Award, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollReveal } from './ScrollReveal';
import { ScrollLinkedText } from './ScrollLinkedText';

const experiences = [
  {
    type: 'work',
    title: 'Fresher - Entry Level Candidate',
    company: 'Open to Opportunities',
    period: '2026',
    description: 'Built and delivered academic projects across AI, machine learning, and web applications using Python, Streamlit, and Flask.',
    highlights: ['Python', 'Machine Learning', 'Web Applications'],
  },
];

const education = [
  {
    type: 'education',
    title: 'B.Tech, Computer Science and Engineering (GPA: 7.5)',
    company: 'Gurunanak Institutions Technical Campus, Hyderabad',
    period: '2023 - 2026 (Pursuing)',
    description: 'Currently pursuing B.Tech in Computer Science and Engineering.',
    highlights: ['Computer Science', 'AI/ML', 'Web Development'],
  },
  {
    type: 'education',
    title: 'Diploma, Electronics and Communication Engineering (GPA: 7.0)',
    company: 'Ratnapuri Institute of Technology (Polytechnic)',
    period: '2020 - 2023',
    description: 'Completed Diploma in Electronics and Communication Engineering.',
    highlights: ['Electronics', 'Communication Engineering'],
  },
  {
    type: 'education',
    title: "SSC (GPA: 9.5)",
    company: "St. Joseph's High School",
    period: '2020',
    description: 'Completed SSC.',
    highlights: ['SSC'],
  },
];

const certifications = [
  { name: 'National Cadet Corps (NCC) - B Certificate', issuer: 'NCC', year: '2024', pdfFile: null },
  { name: 'National Cadet Corps (NCC) - C Certificate', issuer: 'NCC', year: '2025', pdfFile: null },
];

export const ExperienceSection = () => {
  const [certificatesOpen, setCertificatesOpen] = useState(false);
  const [certificateQuery, setCertificateQuery] = useState('');

  const timeline = [...experiences, ...education].sort((a, b) => {
    const yearA = parseInt(a.period.split(' - ')[0]);
    const yearB = parseInt(b.period.split(' - ')[0]);
    return yearB - yearA;
  });

  const sortedCertifications = [...certifications].sort((a, b) => {
    const yearDiff = parseInt(b.year) - parseInt(a.year);
    if (yearDiff !== 0) return yearDiff;
    return a.name.localeCompare(b.name);
  });

  const filteredCertifications = useMemo(() => {
    const q = certificateQuery.trim().toLowerCase();
    if (!q) return sortedCertifications;
    return sortedCertifications.filter((c) => {
      return (
        c.name.toLowerCase().includes(q) ||
        c.issuer.toLowerCase().includes(q) ||
        c.year.toLowerCase().includes(q)
      );
    });
  }, [certificateQuery, sortedCertifications]);

  const marqueeCertifications = [...sortedCertifications, ...sortedCertifications];

  return (
    <section id="experience" className="section-padding relative">
      <div className="section-container">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-primary font-mono text-sm tracking-wider uppercase mb-4 block">
              Career Path
            </span>
            <ScrollLinkedText as="h2" className="text-4xl md:text-5xl font-bold mb-6">
              Experience &
              <span className="gradient-text"> Education</span>
            </ScrollLinkedText>
          </div>
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-primary/20" />

          {timeline.map((item, index) => (
            <ScrollReveal key={`${item.title}-${index}`} delay={index * 0.1}>
              <div className={`relative flex items-start gap-8 mb-12 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}>
                {/* Icon */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full glass flex items-center justify-center z-10 glow-primary">
                  {item.type === 'work' ? (
                    <Briefcase className="h-5 w-5 text-primary" />
                  ) : (
                    <GraduationCap className="h-5 w-5 text-secondary" />
                  )}
                </div>

                {/* Content */}
                <div className={`ml-24 md:ml-0 md:w-[calc(50%-3rem)] ${
                  index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'
                }`}>
                  <div className="glass rounded-xl p-6 card-hover">
                    <span className="text-sm text-primary font-mono">{item.period}</span>
                    <ScrollLinkedText as="h3" className="text-xl font-semibold mt-2">{item.title}</ScrollLinkedText>
                    <p className="text-muted-foreground mt-1">{item.company}</p>
                    <p className="text-sm text-muted-foreground mt-3">{item.description}</p>
                    <div className={`flex flex-wrap gap-2 mt-4 ${
                      index % 2 === 0 ? 'md:justify-end' : ''
                    }`}>
                      {item.highlights.map((highlight) => (
                        <span
                          key={highlight}
                          className="px-2 py-1 rounded bg-primary/10 text-primary text-xs"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Certifications */}
        <ScrollReveal delay={0.4}>
          <div className="mt-16">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col items-center gap-4 mb-8 sm:flex-row sm:justify-between">
                <h3 className="text-2xl font-semibold text-center flex items-center justify-center gap-3 sm:text-left">
                  <Award className="h-6 w-6 text-primary" />
                  Certifications ({certifications.length})
                </h3>
                <Dialog open={certificatesOpen} onOpenChange={setCertificatesOpen}>
                  <DialogTrigger asChild>
                    <Button variant="heroOutline" size="sm">View All</Button>
                  </DialogTrigger>
                  <DialogContent className="w-[calc(100vw-2rem)] max-w-5xl p-4 sm:p-6">
                    <DialogHeader>
                      <DialogTitle>Certificates</DialogTitle>
                      <DialogDescription>
                        Search by name, issuer, or year. Use View PDF.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="mt-2">
                      <Input
                        value={certificateQuery}
                        onChange={(e) => setCertificateQuery(e.target.value)}
                        placeholder="Search certificates..."
                      />
                    </div>
                    <div className="mt-4 max-h-[70vh] overflow-y-auto pr-1 sm:pr-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredCertifications.map((cert) => {
                          const pdfHref = cert.pdfFile
                            ? `/certificates/${encodeURIComponent(cert.pdfFile)}`
                            : undefined;
                          const pdfPreviewHref = pdfHref ? `${pdfHref}#page=1&view=FitH` : undefined;

                          return (
                            <div
                              key={`${cert.name}-${cert.pdfFile ?? cert.issuer}`}
                              className="glass rounded-xl p-4"
                            >
                              {pdfPreviewHref && (
                                <div className="mb-4 overflow-hidden rounded-lg border border-border/50 bg-muted/20">
                                  <div className="relative h-[140px] w-full">
                                    <object
                                      data={pdfPreviewHref}
                                      type="application/pdf"
                                      className="absolute inset-0 h-full w-full pointer-events-none"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                                  </div>
                                </div>
                              )}
                              <div className="flex items-start justify-between gap-3">
                                <h4 className="font-semibold text-sm leading-tight">{cert.name}</h4>
                                <span className="text-[10px] px-2 py-1 rounded-full bg-primary/10 text-primary font-mono">
                                  {cert.year}
                                </span>
                              </div>
                              <div className="mt-3 text-xs text-muted-foreground">
                                Issued by <span className="text-foreground">{cert.issuer}</span>
                              </div>
                              {pdfHref && (
                                <div className="mt-4 flex gap-2">
                                  <a
                                    href={pdfHref}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition-all duration-300 hover:bg-primary/90"
                                  >
                                    <ExternalLink className="h-4 w-4" />
                                    View Certificate
                                  </a>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
              <div className="marquee [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
                <div className="marquee-track gap-4 pb-2 px-4 sm:px-6 lg:px-8" style={{ ['--marquee-duration' as never]: '45s' }}>
                {marqueeCertifications.map((cert, index) => {
                  const pdfHref = cert.pdfFile ? `/certificates/${encodeURIComponent(cert.pdfFile)}` : undefined;
                  const pdfPreviewHref = pdfHref ? `${pdfHref}#page=1&view=FitH` : undefined;

                  return (
                    <div
                      key={`${cert.name}-${cert.pdfFile ?? cert.issuer}-${index}`}
                      className="glass rounded-xl p-4 card-hover min-w-[220px] md:min-w-[240px] lg:min-w-[260px]"
                    >
                      {pdfPreviewHref && (
                        <div className="mb-4 overflow-hidden rounded-lg border border-border/50 bg-muted/20">
                          <div className="relative h-[120px] w-full">
                            <object
                              data={pdfPreviewHref}
                              type="application/pdf"
                              className="absolute inset-0 h-full w-full pointer-events-none"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                          </div>
                        </div>
                      )}
                      <div className="flex items-start justify-between gap-3">
                        <h4 className="font-semibold text-sm leading-tight">{cert.name}</h4>
                        <span className="text-[10px] px-2 py-1 rounded-full bg-primary/10 text-primary font-mono">
                          {cert.year}
                        </span>
                      </div>
                      <div className="mt-3 text-xs text-muted-foreground">
                        Issued by <span className="text-foreground">{cert.issuer}</span>
                      </div>
                      {pdfHref && (
                        <div className="mt-4 flex gap-2">
                          <a
                            href={pdfHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition-all duration-300 hover:bg-primary/90"
                          >
                            <ExternalLink className="h-4 w-4" />
                            View Certificate
                          </a>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
