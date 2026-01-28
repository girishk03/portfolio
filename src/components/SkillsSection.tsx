import { useState } from 'react';
import { type LucideIcon, Binary, Brain, Code2, Database, Globe, Network, Palette, Server, Target } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { ScrollLinkedText } from './ScrollLinkedText';

const skillIcons: Record<string, LucideIcon> = {
  Python: Code2,
  Java: Code2,
  JavaScript: Code2,
  React: Code2,
  Git: Code2,
  GitHub: Code2,
  HTML: Globe,
  CSS: Palette,
  Flask: Server,
  FastAPI: Server,
  Docker: Server,
  Streamlit: Server,
  'Machine Learning': Brain,
  'Data Analysis': Brain,
  PyTorch: Brain,
  YOLOv5: Target,
  OpenCV: Target,
  LSTM: Brain,
  'Random Forest': Brain,
  MySQL: Database,
  PostgreSQL: Database,
  MongoDB: Database,
  'Data Structures': Binary,
};

const brandIcon: Record<string, string> = {
  Python: 'python',
  Java: 'java',
  JavaScript: 'javascript',
  React: 'react',
  HTML: 'html5',
  CSS: 'css3',
  Git: 'git',
  MySQL: 'mysql',
  PostgreSQL: 'postgresql',
  MongoDB: 'mongodb',
  Flask: 'flask',
  Streamlit: 'streamlit',
  Docker: 'docker',
  PyTorch: 'pytorch',
  OpenCV: 'opencv',
  GitHub: 'github',
};

const localIcon: Record<string, string> = {
  Java: '/skill-icons/java.png',
  CSS: '/skill-icons/css.png',
};

const SkillIcon = ({ name }: { name: string }) => {
  const localSrc = localIcon[name];
  const slug = brandIcon[name];
  const [failed, setFailed] = useState(false);

  if (localSrc && !failed) {
    return (
      <img
        src={localSrc}
        alt=""
        className="h-10 w-10 object-contain"
        loading="lazy"
        onError={() => setFailed(true)}
      />
    );
  }

  if (slug && !failed) {
    return (
      <img
        src={`https://cdn.simpleicons.org/${slug}/ffffff`}
        alt=""
        className="h-10 w-10"
        loading="lazy"
        onError={() => setFailed(true)}
      />
    );
  }

  const Icon = skillIcons[name] ?? Code2;
  return <Icon className="h-10 w-10 text-foreground/90" />;
};

const skillGroups = [
  {
    title: 'Web & Tools',
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Git', 'GitHub', 'Java'],
  },
  {
    title: 'Core',
    skills: ['Python', 'Machine Learning', 'Data Analysis', 'FastAPI', 'Flask'],
  },
  {
    title: 'ML & AI',
    skills: ['YOLOv5', 'PyTorch', 'LSTM', 'CNN-LSTM', 'Random Forest', 'OpenCV'],
  },
  {
    title: 'Data & Backend',
    skills: ['PostgreSQL (Star Schema)', 'MySQL', 'MongoDB', 'Docker', 'Streamlit'],
  },
];

export const SkillsSection = () => {
  return (
    <section id="skills" className="section-padding relative">
      <div className="section-container">
        <div className="text-center mb-16">
          <span className="text-primary font-mono text-sm tracking-wider uppercase mb-4 block">
            Skills & Expertise
          </span>
          <ScrollLinkedText as="h2" className="text-4xl md:text-5xl font-bold mb-6">
            My
            <span className="gradient-text"> Skills</span>
          </ScrollLinkedText>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit built through academic projects and self-learning
          </p>
        </div>

        <ScrollReveal delay={0.2}>
          <div className="max-w-6xl mx-auto">
            <div className="grid gap-10">
              {skillGroups.map((group) => (
                <div key={group.title} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-foreground">{group.title}</h3>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {group.skills.map((skill) => (
                      <div
                        key={`${group.title}-${skill}`}
                        className="glass rounded-2xl aspect-square p-4 flex flex-col items-center justify-center gap-3 text-center transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_30px_hsl(var(--primary)_/_0.15)]"
                      >
                        <SkillIcon name={skill} />
                        <div className="text-sm font-medium text-foreground/90 leading-tight">{skill}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
