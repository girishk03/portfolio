import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Typewriter } from './Typewriter';
import { ScrollLinkedText } from './ScrollLinkedText';

export const HeroSection = () => {
  const roles = [
    'Python Developer',
    'Software Engineer',
    'AI/ML Enthusiast',
    'Problem Solver',
  ];

  return (
    <section className="min-h-screen flex items-center">
      <div className="section-container">
        <div className="max-w-4xl">
          <div className="mb-10">
            <span className="font-mono text-xs tracking-wider uppercase text-muted-foreground">
              Available for opportunities
            </span>
          </div>

          <ScrollLinkedText as="h1" className="type-h1">
            CHALLA VENKATA SAI GIRISH
          </ScrollLinkedText>

          {/* Typewriter Effect */}
          <div className="mt-6 text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground h-12">
            <Typewriter words={roles} />
          </div>

          {/* Tagline */}
          <ScrollLinkedText as="p" className="type-body mt-6 max-w-2xl">
            Entry-level software developer focused on building reliable systems across backend engineering and applied AI.
          </ScrollLinkedText>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <ScrollLinkedText as="p" className="text-sm">
              <span className="font-medium">Applied AI</span> — end-to-end pipelines with measurable performance.
            </ScrollLinkedText>
            <ScrollLinkedText as="p" className="text-sm">
              <span className="font-medium">Engineering quality</span> — testing, benchmarking, and observability.
            </ScrollLinkedText>
            <ScrollLinkedText as="p" className="text-sm">
              <span className="font-medium">Deployment</span> — dockerized runtimes and clean docs.
            </ScrollLinkedText>
          </div>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
            <Button variant="outline" size="xl" asChild>
              <a href="#projects">
                View Projects
                <ArrowDown className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <a href="#contact">Contact Me</a>
            </Button>
          </div>

          {/* Social Links */}
          <div className="mt-10 flex items-center gap-4">
            <a
              href="https://github.com/girishk03"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github size={24} />
            </a>
            <a
              href="https://linkedin.com/in/challagirish"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="mailto:saigirishchalla574@gmail.com"
              className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Email"
            >
              <Mail size={24} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
