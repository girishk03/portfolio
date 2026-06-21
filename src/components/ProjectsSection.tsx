import { ExternalLink, Github, Layers, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollLinkedText } from './ScrollLinkedText';

const projects = [
  {
    id: 1,
    title: 'GlobalScart',
    description: 'Production-style FastAPI commerce backend with JWT authentication, RBAC, transactional checkout, PostgreSQL analytics, Docker, and CI.',
    image: '/projects/globalcart-360/globalscart/welcome.jpg',
    technologies: ['FastAPI', 'PostgreSQL', 'JWT', 'Docker', 'CI/CD'],
    category: 'Backend Systems',
    highlights: ['JWT authentication and role-based access', 'Transactional checkout and inventory handling', 'Render deployment configuration with GitHub Actions CI'],
    githubUrl: 'https://github.com/girishk03/GlobalScart',
    liveUrl: 'https://globalscart.onrender.com',
    caseStudyUrl: '/project/globalcart-360',
  },
  {
    id: 2,
    title: 'University Timetabling Solver',
    description: 'Constraint Programming + Large Neighbourhood Search optimizer with infeasibility diagnostics, hard-constraint validation, and a live GitHub Pages dashboard.',
    image: '/projects/timetabling/dashboard.jpeg',
    technologies: ['OR-Tools', 'CP-SAT', 'FastAPI', 'Python', 'LNS'],
    category: 'Optimization Engines',
    highlights: ['Hybrid CP-SAT + LNS optimization', 'Infeasibility diagnostics and schedule validation', 'GitHub Pages interactive dashboard'],
    githubUrl: 'https://github.com/girishk03/University-Timetabling-Solver',
    liveUrl: 'https://girishk03.github.io/University-Timetabling-Solver/',
    caseStudyUrl: '/project/university-timetabling',
  },
  {
    id: 3,
    title: 'Comment Sentiment & Moderation Assistant',
    description: 'Three-class TF-IDF + LinearSVC sentiment classifier with a YouTube analysis interface and separate rule-based SocketIO moderation assistance.',
    image: '/projects/hate-speech/07-chatroom-result.png',
    technologies: ['Flask', 'scikit-learn', 'NLP', 'SocketIO', 'TF-IDF'],
    category: 'Applied NLP',
    highlights: ['TF-IDF + LinearSVC with documented evaluation', 'YouTube sentiment analysis with derived risk indicators', 'Rule-based SocketIO assistance with human-review limits'],
    githubUrl: 'https://github.com/girishk03/hate-speech-detection',
    liveUrl: 'https://hate-speech-detection-zqjy.onrender.com',
    caseStudyUrl: '/project/hate-speech-detection',
  },
  {
    id: 4,
    title: 'Power Theft Detection',
    description: 'Flask dashboard using transparent heuristic risk scoring to prioritize electricity-consumption records for investigation.',
    image: '/projects/power-theft/dashboard.png',
    technologies: ['Python', 'Flask', 'Pandas', 'pytest', 'Docker'],
    category: 'Data Analytics',
    highlights: ['Transparent risk thresholds and documented score clamp', 'Real-data sample and API test coverage', 'Flask dashboard with Docker and CI validation'],
    githubUrl: 'https://github.com/girishk03/power-theft-detection-system',
    liveUrl: 'https://power-theft-detection-system.onrender.com',
    caseStudyUrl: '/project/power-theft-detection',
  },
  {
    id: 5,
    title: 'Smart Marine AI',
    description: 'YOLOv8n and Streamlit prototype that flags selected container-like classes as possible debris candidates and includes software-only vessel simulation.',
    image: '/projects/smart-marine/smart-marine-01.png',
    technologies: ['YOLOv8n', 'PyTorch', 'Streamlit', 'OpenCV', 'pytest'],
    category: 'Computer Vision',
    highlights: ['Debris-proxy detection with explicit material limits', 'Qualified CPU timing observations and automated tests', 'Software-only GPS and collection simulation'],
    githubUrl: 'https://github.com/girishk03/smart_marine_project',
    liveUrl: null,
    caseStudyUrl: '/project/smart-marine',
  },
];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="section-padding">
      <div className="section-container">
        <div className="max-w-3xl">
          <ScrollLinkedText as="h2" className="type-h2">Selected Projects</ScrollLinkedText>
          <ScrollLinkedText as="p" className="type-body mt-4">
            Five production-style projects across backend engineering, optimization, NLP, analytics, and computer vision.
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
                <div className="mt-6 flex flex-wrap gap-2">
                  <Button variant="heroOutline" size="sm" asChild className="flex-1 min-w-[100px]">
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-1" />Code
                    </a>
                  </Button>
                  {project.liveUrl && (
                    <Button variant="gradient" size="sm" asChild className="flex-1 min-w-[100px]">
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-1" />Live Demo
                      </a>
                    </Button>
                  )}
                  {project.caseStudyUrl && (
                    <Button variant="heroOutline" size="sm" asChild className="flex-1 min-w-[100px]">
                      <a href={project.caseStudyUrl}>
                        <BookOpen className="h-4 w-4 mr-1" />Case Study
                      </a>
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
