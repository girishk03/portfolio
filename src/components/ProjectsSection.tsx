import { ExternalLink, Github, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollLinkedText } from './ScrollLinkedText';

const projects = [
  {
    id: 1,
    title: 'GlobalScart',
    description: 'Production e-commerce backend with multi-vendor support, JWT auth, async order processing, and real-time inventory management. Deployed live on Render with full CI/CD pipeline.',
    image: '/projects/globalscart/01-welcome-screen.png',
    technologies: ['FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'CI/CD'],
    category: 'Backend Engineering',
    highlights: ['Multi-vendor support with JWT authentication', 'Async order processing and real-time inventory', 'Deployed on Render with GitHub Actions CI/CD'],
    githubUrl: 'https://github.com/girishk03/GlobalScart',
    liveUrl: 'https://globalscart.onrender.com',
  },
  {
    id: 2,
    title: 'University Timetabling Solver',
    description: 'Constraint Programming + Large Neighbourhood Search optimizer solving NP-hard university scheduling in under 2 seconds. FastAPI wrapper and live GitHub Pages dashboard.',
    image: '/projects/timetabling/dashboard.png',
    technologies: ['OR-Tools', 'CP-SAT', 'FastAPI', 'Python', 'LNS'],
    category: 'Optimisation & Backend',
    highlights: ['CP-SAT + LNS solving NP-hard scheduling in <2s', 'FastAPI wrapper with live API endpoint', 'GitHub Pages interactive dashboard'],
    githubUrl: 'https://github.com/girishk03/University-Timetabling-Solver',
    liveUrl: 'https://university-timetabling-solver.onrender.com',
  },
  {
    id: 3,
    title: 'Hate Speech Detection',
    description: 'TF-IDF + LinearSVC classifier achieving 78.5% accuracy on 6,424 samples. Live YouTube comment analyser and AI polite chatroom with real-time SocketIO moderation.',
    image: '/projects/hate-speech/01-youtube-home.png',
    technologies: ['Flask', 'scikit-learn', 'NLP', 'SocketIO', 'TF-IDF'],
    category: 'NLP & AI',
    highlights: ['TF-IDF + LinearSVC, 78.5% accuracy on 6,424 samples', 'YouTube comment classifier with toxicity scoring', 'AI polite chatroom with real-time SocketIO moderation'],
    githubUrl: 'https://github.com/girishk03/hate-speech-detection',
    liveUrl: 'https://hate-speech-detection-zqjy.onrender.com',
  },
  {
    id: 4,
    title: 'Power Theft Detection',
    description: 'Smart grid monitoring system comparing Random Forest, LSTM, and CNN-LSTM on smart meter data. Evaluation-focused reporting with ROC curves and confusion matrices. Live Flask dashboard.',
    image: '/projects/power-theft/dashboard.png',
    technologies: ['Python', 'Random Forest', 'LSTM', 'CNN-LSTM', 'Flask'],
    category: 'AI & Data Engineering',
    highlights: ['Compared RF vs LSTM vs CNN-LSTM on smart meter data', 'Evaluation-focused: ROC curves, confusion matrices, AUC', 'Live Flask monitoring dashboard on Render'],
    githubUrl: 'https://github.com/girishk03/power-theft-detection-system',
    liveUrl: 'https://power-theft-detection-system.onrender.com',
  },
  {
    id: 5,
    title: 'Smart Marine AI',
    description: 'YOLOv5-based marine debris detection achieving 92% accuracy. End-to-end pipeline with benchmarking (FPS/latency percentiles), stress testing, and Dockerized FastAPI deployment.',
    image: '/projects/smart-marine/smart-marine-01.png',
    technologies: ['YOLOv5', 'PyTorch', 'FastAPI', 'OpenCV', 'Docker'],
    category: 'Computer Vision',
    highlights: ['YOLOv5 debris detection, 92% accuracy', 'FPS + p50/p95/p99 latency benchmarks with stress mode', 'Dockerized deployment with FastAPI inference endpoint'],
    githubUrl: 'https://github.com/girishk03/smart_marine_project',
    liveUrl: null,
  },
];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="section-padding">
      <div className="section-container">
        <div className="max-w-3xl">
          <ScrollLinkedText as="h2" className="type-h2">Selected Projects</ScrollLinkedText>
          <ScrollLinkedText as="p" className="type-body mt-4">
            5 production systems — backend, ML, NLP, and computer vision, all deployed or fully documented.
          </ScrollLinkedText>
        </div>
        <div className="mt-10 grid gap-6 lg:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div key={project.id} className="rounded-2xl border border-border bg-card overflow-hidden flex flex-col">
              <div className="h-48 border-b border-border overflow-hidden bg-muted">
                <img src={project.image} alt={project.title} className="h-full w-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2">
                  <Layers className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{project.category}</span>
                </div>
                <ScrollLinkedText as="h3" className="mt-4 text-xl font-semibold">{project.title}</ScrollLinkedText>
                <ScrollLinkedText as="p" className="mt-3 text-sm line-clamp-3 text-muted-foreground">{project.description}</ScrollLinkedText>
                <ul className="mt-4 space-y-1 text-sm text-muted-foreground">
                  {project.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-2">
                      <span className="text-primary shrink-0">•</span>
                      <span className="line-clamp-1">{highlight}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span key={tech} className="px-2 py-1 rounded bg-muted text-xs text-muted-foreground">{tech}</span>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button variant="heroOutline" size="sm" asChild className="flex-1 min-w-[120px]">
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-1" />Code
                    </a>
                  </Button>
                  {project.liveUrl ? (
                    <Button variant="gradient" size="sm" asChild className="flex-1 min-w-[120px]">
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-1" />Live Demo
                      </a>
                    </Button>
                  ) : (
                    <Button variant="gradient" size="sm" asChild className="flex-1 min-w-[120px]">
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">View Project</a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};