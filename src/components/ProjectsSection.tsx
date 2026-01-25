import { useState } from 'react';
import { Github, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ScrollLinkedText } from './ScrollLinkedText';

const projects = [
  {
    id: 1,
    title: 'Smart Marine - AI Debris Detection',
    description:
      'Computer vision system for operator-assisted plastic waste detection from drone/video feeds, with production-minded testing, benchmarking, and deployment docs.',
    image: '/projects/smart-marine/smart-marine-01.png',
    gallery: [
      { src: '/projects/smart-marine/smart-marine-01.png', caption: 'Landing / Title screen' },
      { src: '/projects/smart-marine/smart-marine-02.png', caption: 'Upload / Inference UI' },
      { src: '/projects/smart-marine/smart-marine-03.png', caption: 'Single image detection' },
      { src: '/projects/smart-marine/smart-marine-04.png', caption: 'Video / Frame detection' },
      { src: '/projects/smart-marine/smart-marine-05.png', caption: 'Analytics dashboard' },
      { src: '/projects/smart-marine/smart-marine-06.png', caption: 'System / UI snapshot' },
    ],
    technologies: ['Python', 'YOLOv5', 'PyTorch', 'FastAPI', 'OpenCV', 'Docker', 'pytest', 'psutil'],
    category: 'AI',
    highlights: [
      'FastAPI API (+ request IDs) with health checks and error handling',
      'Benchmarks with FPS + p50/p95/p99 latency + CPU/RSS memory (JSON reports)',
      'Reliability: retry/skip policy and low-confidence warnings + summaries',
    ],
    githubUrl: 'https://github.com/girishk03/ai-marine-cleanup-sim',
    liveUrl: '/project/marine-plastic-detection',
    featured: true,
    details: {
      ownership: [
        'Built an end-to-end inference system (model integration + image/video pipelines) with auditable outputs (run_id, model_version)',
        'Implemented automated tests (unit + processing edge cases + API smoke tests) and made them runnable from repo root',
        'Added reproducible benchmarking + stress mode (time-based runs with RSS sampling and error-rate reporting)',
      ],
      decisions: [
        'Chose YOLOv5 for stable integration + a strong speed/accuracy baseline (CPU demo first, GPU/ONNX paths documented)',
        'Kept confidence thresholds configurable and added low-confidence warnings to improve operator trust',
        'Prioritized observability: structured logging, benchmark artifacts, and reproducible run metadata',
      ],
      risks: [
        'False positives/negatives can waste collection effort; intended as decision-support only',
        'Domain shift risk (weather, lighting, camera angle) without field calibration',
        'Real-time 30+ FPS requires GPU or an optimized runtime (ONNX/TensorRT); CPU baseline is documented but not sufficient for all deployments',
      ],
      production: [
        'Run GPU benchmarks on target hardware and record numbers (FPS/p50/p95/p99 + memory) in the repo',
        'Evaluate ONNX Runtime / TensorRT for throughput and end-to-end latency stability',
        'Perform multi-hour stress runs on representative drone footage and track error rates + memory trends',
        'Add drift monitoring and field calibration workflow for different locations/conditions',
      ],
      portfolio: {
        overview:
          'Smart Marine is an end-to-end AI system that detects plastic waste in marine environments using computer vision. It can process video streams from drones or webcams and outputs structured, traceable results, complete with benchmarking, stress testing, and Dockerized deployment.',
        problemSolved: [
          'Manual monitoring of plastic in water bodies is slow, costly, and error-prone.',
          'Many demo projects detect objects but ignore reliability, benchmarking, and deployment readiness.',
          'Smart Marine automates detection, tracks performance metrics, and stays auditable through run metadata and logs.',
        ],
        primaryUsers: ['Drone operators / survey teams', 'NGOs or municipal marine cleanup teams'],
        techStack: [
          { layer: 'AI', technology: 'YOLOv5 (PyTorch)', purpose: 'Object detection of plastic waste' },
          { layer: 'Video', technology: 'OpenCV', purpose: 'Video capture & frame processing (webcam/video file)' },
          { layer: 'API', technology: 'FastAPI', purpose: 'Serve detection results over HTTP endpoints' },
          { layer: 'Deployment', technology: 'Docker', purpose: 'Reproducible environment & deployment' },
          { layer: 'Benchmarking', technology: 'psutil', purpose: 'CPU, memory profiling; stress testing' },
          { layer: 'Testing', technology: 'pytest', purpose: 'Unit & integration testing' },
          { layer: 'Logging', technology: 'Python logging', purpose: 'Structured, traceable logs of system events' },
        ],
        architecture: {
          workflow: [
            {
              title: 'Video Input',
              items: ['Accepts drone recordings, live webcam feed, or a folder of images'],
            },
            {
              title: 'Frame Extraction',
              items: ['Frames captured via OpenCV'],
            },
            {
              title: 'Plastic Detection (PlasticDetector)',
              items: [
                'Detects plastic objects and returns boxes + confidence',
                'Tracks low-confidence warnings',
                'Retries transient failures and skips persistent failures (counts included in summary)',
                'Outputs include run_id, model_version, timestamps, and config snapshot for auditability',
              ],
            },
            {
              title: 'Batch & Summary Processing',
              items: [
                'Summarizes total frames, failed/retried frames, and low-confidence frames',
                'Produces JSON artifacts for reproducibility',
              ],
            },
            {
              title: 'Benchmarking & Stress Testing',
              items: [
                'Measures FPS and latency percentiles (p50/p95/p99)',
                'Tracks RSS memory and CPU usage',
                'Supports time-based stress mode (e.g., 10-minute runs) with error-rate reporting',
              ],
            },
            {
              title: 'API Layer (FastAPI)',
              items: ['GET /health for status', 'POST /detect for inference + JSON response'],
            },
            {
              title: 'Deployment',
              items: [
                'Dockerized runtime for reproducibility',
                'CPU demo supported; GPU/ONNX optimization guidance documented for real-time targets',
              ],
            },
          ],
          diagram: [
            'Video Input (Drone/Webcam/File)',
            '↓',
            'Frame Loader (OpenCV)',
            '↓',
            'PlasticDetector (YOLOv5)',
            '├── Retry/Skip Logic',
            '├── Low-Confidence Warnings',
            '└── Structured Logging',
            '↓',
            'Results + Batch Summary (JSON)',
            '↓',
            'API Server (FastAPI)',
            '↓',
            'Docker Deployment / Benchmarking Scripts',
          ],
        },
        features: [
          {
            title: 'Detection Pipeline',
            items: [
              'Single-frame and batch processing',
              'Low-confidence warning system for operator trust',
              'Retry/skip mechanism for robustness',
              'Structured logging with run metadata (run_id, model_version)',
            ],
          },
          {
            title: 'Benchmarking & Performance',
            items: [
              'FPS measurement (CPU baseline)',
              'Latency metrics (p50/p95/p99)',
              'Memory tracking (RSS) and CPU snapshots',
              '10-minute stress mode for stability checks',
            ],
          },
          {
            title: 'Deployment & Reproducibility',
            items: ['Docker container runtime', 'Environment-variable configuration for model path', 'GPU/ONNX optimization path documented'],
          },
          {
            title: 'Testing & Reliability',
            items: ['Unit + integration tests', 'Corrupt/missing input handling', 'Benchmark resilience tests'],
          },
        ],
        performanceMetrics: {
          note: 'Real-time 30+ FPS typically requires GPU / ONNX / TensorRT optimization.',
          rows: [
            {
              mode: 'Webcam (CPU)',
              fps: '18.68',
              p50: '52 ms',
              p95: '59 ms',
              peakMem: '~2.02 GB',
              notes: 'Demo mode',
            },
            {
              mode: 'Video (CPU)',
              fps: '11.50',
              p50: '86 ms',
              p95: '92 ms',
              peakMem: '~0.84 GB',
              notes: 'Batch processing',
            },
            {
              mode: '10-min Stress',
              fps: 'Stable',
              p50: 'Stable',
              p95: 'Stable',
              peakMem: 'No leaks',
              notes: 'Long-duration reliability',
            },
          ],
        },
        limitations: [
          'CPU cannot achieve 30+ FPS at 640x640 resolution.',
          'Multi-hour drone flights are not fully field-tested.',
          'ONNX export/benchmarking is documented; runtime integration is an optional next step.',
          'High-resolution video and complex codecs can reduce FPS; GPU is recommended for real-time use.',
        ],
        futureImprovements: [
          'ONNX / TensorRT integration for real-time performance',
          'Multi-camera video streams',
          'Alerts for detected plastic hotspots',
          'Extended stress testing and memory leak detection',
        ],
        demoPortfolioReady: [
          'DEMO_MEDIA.md for screenshots/GIF workflow',
          'Structured logging and run metadata for reproducibility',
          'Benchmark JSON reports for performance validation',
          'Docker + README guidance for professional deployment',
        ],
        roleStatement:
          'Designed the full system architecture and implemented the AI inference pipeline, reliability mechanisms, benchmarking, stress-testing, API endpoints, Docker deployment, and documentation. AI tools were used only as coding accelerators; design, integration, testing, and QA decisions were made by me.',
      },
    },
  },
  {
    id: 2,
    title: 'Power Theft Detection System',
    description:
      'AI-based intrusion detection for smart grid power theft, built as a research/learning project with a dashboard for monitoring and review.',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80',
    technologies: ['Python', 'Random Forest', 'LSTM', 'CNN-LSTM', 'Flask'],
    category: 'AI',
    highlights: ['Compared RF vs LSTM vs CNN-LSTM', 'Flask monitoring dashboard', 'Emphasis on evaluation (ROC/CM) over accuracy-only'],
    githubUrl: 'https://github.com/girishk03/power-theft-detection-system',
    liveUrl: null,
    featured: true,
    details: {
      ownership: [
        'Implemented an end-to-end training + evaluation workflow and a Flask dashboard UI',
        'Owned model comparison and reporting (confusion matrix / ROC / metrics)',
        'Documented the system architecture and how to reproduce results locally',
      ],
      decisions: [
        'Used Random Forest as a strong baseline and evaluated deep learning (LSTM/CNN-LSTM) for temporal patterns',
        'Handled class imbalance explicitly (SMOTE) and tracked multiple metrics (precision/recall/AUC)',
        'Kept the dashboard focused on monitoring + review rather than automated actions',
      ],
      risks: [
        'False positives have real-world consequences (legal/ethical); must be human-reviewed in real deployments',
        'Data realism risk if trained on synthetic/clean data; real smart meter data is noisy and adversarial',
        'Threshold calibration + audit trails are required for regulated environments',
      ],
      production: [
        'Calibrate thresholds (cost-sensitive) and add manual override + investigation workflow',
        'Add drift detection and a retraining strategy (scheduled + triggered)',
        'Introduce monitoring for segment-level errors (region/customer type) to reduce unfair impact',
        'Harden security and logging (access control, rate limiting, tamper-evident audit logs)',
      ],
    },
  },
  {
    id: 3,
    title: 'GlobalCart 360 - E-Commerce Analytics Platform',
    description:
      'End-to-end analytics + backend demo: PostgreSQL star schema, near real-time KPIs, retention analytics, and forecasting with an admin/shop UI.',
    image: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=800&q=80',
    technologies: ['PostgreSQL', 'FastAPI', 'Docker', 'Python', 'SQL'],
    category: 'Data',
    highlights: ['PostgreSQL star schema as single source of truth', 'One-command pipeline + incremental refresh simulation', 'Admin + storefront routes served by FastAPI'],
    githubUrl: 'https://github.com/girishk03/globalscart-transaction-pipeline',
    liveUrl: null,
    featured: true,
    details: {
      ownership: [
        'Designed the data model and KPI layer (star schema + views) and the supporting Python pipeline',
        'Built a FastAPI backend that serves both APIs and demo-ready shop/admin routes',
        'Added reproducibility via Docker Compose + environment configuration',
      ],
      decisions: [
        'Used PostgreSQL + a star schema to keep KPI definitions consistent across SQL/Python/BI',
        'Implemented an incremental refresh simulation with watermarks + idempotent upserts',
        'Kept the system modular (sql/, src/, backend/, frontend/) to scale scope without monolith sprawl',
      ],
      risks: [
        'Scalability needs explicit pagination, caching, and indexing strategy at higher traffic/data volumes',
        'Security must be treated as baseline (strong auth, rate limiting, input validation)',
        'Data quality and schema migrations need first-class handling in production',
      ],
      production: [
        'Add DB migrations (Alembic), indexes, and query performance profiling',
        'Implement pagination + filtering on APIs and adopt caching for hot KPIs',
        'Harden auth (hashed passwords, rotation, secrets management) and add rate limiting',
        'Add observability (structured logs, tracing, metrics) and CI/CD with tests',
      ],
    },
  },
];

const categories = ['All', 'AI', 'Data'];

export const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = projects.filter(
    (project) => activeCategory === 'All' || project.category === activeCategory
  );

  return (
    <section id="projects" className="section-padding">
      <div className="section-container">
        <div className="max-w-3xl">
          <ScrollLinkedText as="h2" className="type-h2">
            Selected Projects
          </ScrollLinkedText>
          <ScrollLinkedText as="p" className="type-body mt-4">
            Case studies showcasing applied AI, data systems, and engineering execution.
          </ScrollLinkedText>
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {categories.map((category) => {
            const isActive = activeCategory === category;
            const cls = [
              'px-4 py-2 rounded-full text-sm transition-colors border',
              isActive
                ? 'border-foreground text-foreground'
                : 'border-border text-muted-foreground hover:text-foreground',
            ].join(' ');

            return (
              <button key={category} onClick={() => setActiveCategory(category)} className={cls}>
                {category}
              </button>
            );
          })}
        </div>

        <div className="mt-10 grid gap-6 lg:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <div key={project.id} className="rounded-2xl border border-border bg-card overflow-hidden">
              <div className="h-48 border-b border-border overflow-hidden">
                <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2">
                  <Layers className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{project.category}</span>
                </div>

                <ScrollLinkedText as="h3" className="mt-4 text-xl font-semibold">
                  {project.title}
                </ScrollLinkedText>
                <ScrollLinkedText as="p" className="mt-3 text-sm line-clamp-3">
                  {project.description}
                </ScrollLinkedText>

                <ul className="mt-4 space-y-1 text-sm text-muted-foreground">
                  {project.highlights.slice(0, 3).map((highlight) => (
                    <li key={highlight} className="flex gap-2">
                      <span className="text-primary">•</span>
                      <span className="line-clamp-1">{highlight}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span key={tech} className="px-2 py-1 rounded bg-muted text-xs text-muted-foreground">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Button variant="outline" size="sm" asChild className="flex-1 min-w-[120px]">
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-1" />
                      Code
                    </a>
                  </Button>

                  {project.id === 1 ? (
                    <Button variant="outline" size="sm" asChild className="flex-1 min-w-[120px]">
                      <Link to="/project/marine-plastic-detection">View Project</Link>
                    </Button>
                  ) : null}

                  {project.id === 2 ? (
                    <Button variant="outline" size="sm" asChild className="flex-1 min-w-[120px]">
                      <a href="https://smartmeteranomolydetection.lovable.app/" target="_blank" rel="noopener noreferrer">
                        View Project
                      </a>
                    </Button>
                  ) : null}

                  {project.id === 3 ? (
                    <Button variant="outline" size="sm" asChild className="flex-1 min-w-[120px]">
                      <Link to="/project/globalcart-360">View Project</Link>
                    </Button>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
