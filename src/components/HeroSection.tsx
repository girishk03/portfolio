import { ArrowDown, FileText, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ParticleBackground } from './ParticleBackground';
import { Typewriter } from './Typewriter';

export const HeroSection = () => {
  const roles = [
    'Backend Engineer',
    'Python Developer',
    'Machine Learning Engineer',
    'FastAPI & PostgreSQL',
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <ParticleBackground />
        <div className="absolute inset-0 bg-background/60" />
      </div>

      <div className="relative z-10 section-container w-full">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-10 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/30 px-4 py-2 text-xs text-muted-foreground backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="font-mono tracking-wider">Available for opportunities</span>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight">
            Hi, I&apos;m{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Girish Challa
            </span>
          </h1>

          <div className="mt-4 text-xl sm:text-2xl md:text-3xl font-medium text-primary h-9 sm:h-10 md:h-11">
            <Typewriter words={roles} />
          </div>

          <p className="mt-6 mx-auto max-w-2xl text-muted-foreground">
            Final-year CS student at Anurag University building production-grade backends with{' '}
            <span className="text-primary">FastAPI</span>,{' '}
            <span className="text-primary">PostgreSQL</span>, and{' '}
            <span className="text-primary">OR-Tools</span>. 5 deployed systems including ML pipelines and constraint optimisers.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="gradient" size="xl" className="w-full sm:w-72" asChild>
              <a href="#projects">
                View Projects
                <ArrowDown className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button variant="heroOutline" size="xl" className="w-full sm:w-72" asChild>
              <a href="/girish_resume.pdf" download>
                <FileText className="h-5 w-5" />
                View Resume
              </a>
            </Button>
          </div>

          <div className="mt-10 flex items-center justify-center gap-4">
            <a href="https://github.com/girishk03" target="_blank" rel="noopener noreferrer"
              className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors" aria-label="GitHub">
              <Github size={24} />
            </a>
            <a href="https://linkedin.com/in/challagirish" target="_blank" rel="noopener noreferrer"
              className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors" aria-label="LinkedIn">
              <Linkedin size={24} />
            </a>
            <a href="mailto:saigirish050704@gmail.com"
              className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors" aria-label="Email">
              <Mail size={24} />
            </a>
          </div>

          <div className="mt-10 text-xs text-muted-foreground">
            Scroll to see my work
            <div className="mt-2 flex justify-center">
              <ArrowDown className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};