import { Brain, Code2, Database, Zap } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { ScrollLinkedText } from './ScrollLinkedText';

const highlights = [
  { icon: Brain, title: 'AI & ML', description: 'YOLOv5, scikit-learn, NLP, TF-IDF' },
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
              I'm a <span className="text-foreground font-medium">final-year CS student</span> at Anurag University, Hyderabad, focused on backend engineering, machine learning, and constraint optimisation. I build systems end-to-end — from data and models to APIs, dashboards, and CI/CD pipelines.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I built <span className="text-primary">GlobalScart</span>, a production e-commerce backend with FastAPI, PostgreSQL, Redis, and Docker — deployed live on Render with a full CI/CD pipeline. I also built a <span className="text-primary">University Timetabling Solver</span> using OR-Tools CP-SAT + Large Neighbourhood Search that solves NP-hard scheduling problems in under 2 seconds.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              On the ML side, I built a <span className="text-primary">Hate Speech Detection</span> system (TF-IDF + LinearSVC, 78.5% accuracy on 6,424 samples) with a live YouTube comment classifier and AI polite chatroom, a <span className="text-primary">Power Theft Detection</span> system comparing Random Forest, LSTM, and CNN-LSTM on smart meter data, and a <span className="text-primary">Smart Marine AI</span> debris detector using YOLOv5 achieving 92% accuracy.
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