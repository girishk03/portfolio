import { useState } from 'react';
import { type LucideIcon, Binary, Brain, Code2, Database, Globe, Network, Palette, Server, Target } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { ScrollLinkedText } from './ScrollLinkedText';

const skillIcons: Record<string, LucideIcon> = {
  Python: Code2, TypeScript: Code2, JavaScript: Code2, SQL: Database, Bash: Code2,
  FastAPI: Server, Flask: Server, Docker: Server, Render: Server, 'GitHub Actions': Code2,
  'scikit-learn': Brain, YOLOv8: Target, 'OR-Tools': Brain, NLP: Brain, PyTorch: Brain, OpenCV: Target,
  PostgreSQL: Database, MySQL: Database, MongoDB: Database,
  React: Globe, HTML: Globe, CSS: Palette, Git: Code2, GitHub: Code2,
  'Data Structures': Binary, Networking: Network,
};

const brandIcon: Record<string, string> = {
  Python: 'python', JavaScript: 'javascript', TypeScript: 'typescript',
  React: 'react', HTML: 'html5', CSS: 'css3', Git: 'git', GitHub: 'github',
  MySQL: 'mysql', PostgreSQL: 'postgresql', MongoDB: 'mongodb',
  Flask: 'flask', Docker: 'docker', PyTorch: 'pytorch', OpenCV: 'opencv', FastAPI: 'fastapi',
};

const SkillIcon = ({ name }: { name: string }) => {
  const slug = brandIcon[name];
  const [failed, setFailed] = useState(false);
  if (slug && !failed) {
    return <img src={`https://cdn.simpleicons.org/${slug}/ffffff`} alt="" className="h-10 w-10" loading="lazy" onError={() => setFailed(true)} />;
  }
  const Icon = skillIcons[name] ?? Code2;
  return <Icon className="h-10 w-10 text-foreground/90" />;
};

const skillGroups = [
  { title: 'Languages', skills: ['Python', 'TypeScript', 'JavaScript', 'SQL', 'Bash'] },
  { title: 'Backend & Infra', skills: ['FastAPI', 'Flask', 'Docker', 'GitHub Actions', 'Render'] },
  { title: 'AI & ML', skills: ['scikit-learn', 'YOLOv8', 'PyTorch', 'OR-Tools', 'NLP', 'OpenCV'] },
  { title: 'Databases', skills: ['PostgreSQL', 'MySQL', 'MongoDB'] },
  { title: 'Web & Tools', skills: ['React', 'HTML', 'CSS', 'Git', 'GitHub'] },
];

export const SkillsSection = () => {
  return (
    <section id="skills" className="section-padding relative">
      <div className="section-container">
        <div className="text-center mb-16">
          <span className="text-primary font-mono text-sm tracking-wider uppercase mb-4 block">Skills & Expertise</span>
          <ScrollLinkedText as="h2" className="text-4xl md:text-5xl font-bold mb-6">
            My<span className="gradient-text"> Tech Stack</span>
          </ScrollLinkedText>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Built through five documented projects across backend systems, optimization, NLP, analytics, and computer vision
          </p>
        </div>
        <ScrollReveal delay={0.2}>
          <div className="max-w-6xl mx-auto">
            <div className="grid gap-10">
              {skillGroups.map((group) => (
                <div key={group.title} className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">{group.title}</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {group.skills.map((skill) => (
                      <div key={`${group.title}-${skill}`}
                        className="glass rounded-2xl aspect-square p-4 flex flex-col items-center justify-center gap-3 text-center transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_30px_hsl(var(--primary)_/_0.15)]">
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
