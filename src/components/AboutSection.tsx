import { Brain, Code2, Database, Zap } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { ScrollLinkedText } from './ScrollLinkedText';

const highlights = [
  { icon: Brain, title: 'AI & ML', description: 'YOLOv8, scikit-learn, NLP, TF-IDF' },
  { icon: Code2, title: 'Backend', description: 'FastAPI, Flask, PostgreSQL, Redis' },
  { icon: Database, title: 'Data Engineering', description: 'Star schema, pipelines, OR-Tools' },
  { icon: Zap, title: '5 Live Systems', description: 'All deployed on Render with CI/CD' },
];

export const AboutSection = () => {
  return (
    <section id="about" className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="section-container relative">
        <div className="text-center mb-16">
          <span className="text-primary font-mono text-sm tracking-wider uppercase mb-4 block">About Me</span>
          <ScrollLinkedText as="h2" className="text-4xl md:text-5xl font-bold mb-6">
            Passionate About<span className="gradient-text"> Technology</span>
          </ScrollLinkedText>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm a <span className="text-foreground font-medium">Computer Science graduate and fresher</span> based in Hyderabad, focused on Python backend engineering, applied machine learning, and constraint optimisation. I build systems end-to-end — from data and models to APIs, dashboards, tests, and CI/CD pipelines.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I built <span className="text-primary">GlobalScart</span>, a production-style e-commerce backend with FastAPI, PostgreSQL, Docker, and CI. I also built a <span className="text-primary">University Timetabling Solver</span> using OR-Tools CP-SAT + Large Neighbourhood Search with infeasibility diagnostics and hard-constraint validation.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              On the applied-ML side, I built a <span className="text-primary">Hate Speech Detection</span> system using TF-IDF and LinearSVC, a <span className="text-primary">Power Theft Detection</span> dashboard using transparent heuristic risk scoring, and a <span className="text-primary">Smart Marine AI</span> prototype using YOLOv8n with human-review and provenance limitations documented explicitly.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Strong foundation in data structures, algorithms, computer networking, and system design. I prioritise evaluation, observability, and deployment-readiness — not just training models in notebooks.
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
