import { Brain, Code2, Target, Zap } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { ScrollLinkedText } from './ScrollLinkedText';

const highlights = [
  { icon: Brain, title: 'AI & ML', description: 'YOLOv5, LSTM, CNN, Random Forest' },
  { icon: Code2, title: 'Python Dev', description: 'Clean, efficient Python code' },
  { icon: Target, title: 'Problem Solver', description: 'Data structures & algorithms' },
  { icon: Zap, title: 'Full Stack', description: 'Flask, Streamlit dashboards' },
];

export const AboutSection = () => {
  return (
    <section id="about" className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="section-container relative">
        <div className="text-center mb-16">
          <span className="text-primary font-mono text-sm tracking-wider uppercase mb-4 block">
            About Me
          </span>
          <ScrollLinkedText as="h2" className="text-4xl md:text-5xl font-bold mb-6">
            Passionate About
            <span className="gradient-text"> Technology</span>
          </ScrollLinkedText>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
                I'm an <span className="text-foreground font-medium">entry-level Software Developer</span> focused on 
                Python, machine learning, and backend-driven dashboards. I built a YOLOv5-based marine debris detection system, 
                focusing on dataset curation, evaluation metrics, and deployment-ready pipelines.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
                I developed a <span className="text-primary">power theft detection system</span> using smart meter data and compared ML models 
                (Random Forest, LSTM, CNN-LSTM). I prioritized evaluation using ROC curves, confusion matrices, and error analysis rather than accuracy alone, 
                and shipped monitoring dashboards using <span className="text-secondary">Streamlit and Flask</span>.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
                Strong foundation in computer science fundamentals including data structures, algorithms, 
                and computer networking. Currently pursuing B.Tech in Computer Science at Anurag University.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
                I focus on building systems end-to-end — from data and models to APIs, dashboards, and evaluation — not just training models in notebooks.
            </p>

              {/* Highlight Cards */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                {highlights.map((item) => (
                  <div
                    key={item.title}
                    className="glass rounded-xl p-4 card-hover"
                  >
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
