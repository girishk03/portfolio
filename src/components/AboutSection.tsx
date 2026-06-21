import { Brain, Code2, Database, Zap } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { ScrollLinkedText } from './ScrollLinkedText';

const highlights = [
  { icon: Code2, title: 'Backend Engineering', description: 'FastAPI, Flask, PostgreSQL, JWT, RBAC' },
  { icon: Zap, title: 'API Development', description: 'REST APIs, validation, testing, and error handling' },
  { icon: Brain, title: 'Optimization Systems', description: 'OR-Tools CP-SAT, LNS, and constraint validation' },
  { icon: Database, title: '5 Portfolio Projects', description: 'Backend, optimization, NLP, analytics, and CV' },
];

export const AboutSection = () => {
  return (
    <section id="about" className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="section-container relative">
        <div className="text-center mb-16">
          <span className="text-primary font-mono text-sm tracking-wider uppercase mb-4 block">About Me</span>
          <ScrollLinkedText as="h2" className="text-4xl md:text-5xl font-bold mb-6">
            Backend Engineering<span className="gradient-text"> & Applied AI</span>
          </ScrollLinkedText>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm a <span className="text-foreground font-medium">Computer Science graduate and Python backend developer</span> based in Hyderabad. I build APIs and backend systems with FastAPI, Flask, PostgreSQL, Docker, automated tests, and GitHub Actions.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              My work includes <span className="text-primary">GlobalScart</span>, a transactional commerce backend, and a <span className="text-primary">University Timetabling Solver</span> using CP-SAT and LNS. I also apply backend engineering to NLP, analytics, and computer-vision prototypes while documenting evidence, limitations, and human-review boundaries.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-8">
              {highlights.map((item) => (
                <div key={item.title} className="glass rounded-xl p-4 card-hover">
                  <item.icon className="h-8 w-8 text-primary mb-3" />
                  <h4 className="font-semibold mb-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
