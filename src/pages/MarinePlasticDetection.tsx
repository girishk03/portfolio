import type { ElementType } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  BarChart,
  Code,
  Cpu,
  Github,
  Image,
  Layers,
  Lightbulb,
  Monitor,
  Navigation,
  Rocket,
  Target,
  Users,
  Video,
  Zap,
  ArrowLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const MarinePlasticDetection = () => {
  const navigate = useNavigate();

  const goBackToProjects = () => {
    navigate('/');
    window.setTimeout(() => {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  };


  const features = [
    {
      icon: Target,
      title: 'Marine-Debris Candidate Detection (YOLOv8n)',
      bullets: [
        'Pretrained YOLOv8n runtime with selected COCO container classes used as debris proxies',
        'Confidence thresholds and heuristic filtering support operator review but do not classify material',
      ],
    },
    {
      icon: Monitor,
      title: 'Real-Time & Batch Inference Pipeline',
      bullets: [
        'Supports live webcam streams and offline image analysis',
        'Frame-level processing with skip/retry logic for unstable or corrupt inputs',
      ],
    },
    {
      icon: Image,
      title: 'Detection Visualization (Conceptual)',
      bullets: [
        'Bounding-box overlays with confidence scores for detected plastic waste',
        'Visualization layer clearly separated from inference logic (conceptual, not a live dashboard)',
      ],
    },
    {
      icon: Layers,
      title: 'Modular System Architecture',
      bullets: [
        'Decoupled components for detection, simulation, UI, and API access',
        'Enables reuse across CLI tools, web applications, and external integrations',
      ],
    },
    {
      icon: Navigation,
      title: 'Vessel & Collection Simulation',
      bullets: [
        'Simulated GPS navigation and waste collection tracking',
        'Designed to validate detection-to-action workflows without physical marine hardware',
      ],
    },
    {
      icon: Code,
      title: 'Structured Logging & Result Export',
      bullets: ['JSON-based detection summaries generated per run', 'Designed for future analytics, monitoring, and auditability'],
    },
    {
      icon: Github,
      title: 'Deployment-Ready Design',
      bullets: ['Dockerized setup for consistent environment reproduction', 'Suitable for local testing and cloud-based deployment workflows'],
    },
  ];

  const technologies: Record<string, Array<{ name: string; definition: string }>> = {
    'AI / Machine Learning': [
      { name: 'YOLOv8n', definition: 'Runtime object detector for selected debris-proxy classes' },
      { name: 'PyTorch', definition: 'Model loading, inference, and confidence threshold tuning' },
      { name: 'OpenCV', definition: 'Video capture, frame extraction, and preprocessing' },
    ],
    'Application Layer': [
      { name: 'Streamlit', definition: 'Interactive web interface for webcam-assisted and batch detection' },
      { name: 'Custom CSS', definition: 'Dark, marine-themed UI styling' },
    ],
    'Backend & APIs': [
      { name: 'FastAPI', definition: 'REST API for detection endpoints and system health checks' },
      { name: 'Python', definition: 'Core inference pipeline, orchestration, and integration logic' },
    ],
    'Infrastructure & Deployment': [
      { name: 'Docker', definition: 'Containerized, reproducible runtime environment' },
      { name: 'Railway', definition: 'Cloud deployment for demo hosting and API access' },
    ],
  };

  const roles = [
    'Designed the complete system architecture and detection pipeline',
    'Integrated YOLOv8n candidate detection with configurable confidence thresholds',
    'Implemented simulated vessel movement and GPS-based collection logic for workflow validation',
    'Built a REST API using FastAPI for detection and system health checks',
    'Added benchmarking, stress testing, and structured logging for performance validation',
    'Containerized the system using Docker for reproducible deployment',
  ];

  const constraints = [
    'Committed CPU timing observations range from roughly 11–19 FPS and recorded zero detections per frame',
    'No supported GPU benchmark is included',
    'Detection quality depends on dataset quality and environmental conditions',
    'Designed as a research and academic prototype, not a production-ready autonomous system',
  ];

  const useCases = [
    {
      title: 'Academic Demonstrations',
      description:
        'Demonstrates AI-based computer vision techniques applied to environmental and marine monitoring use cases.',
    },
    {
      title: 'Environmental Research Prototyping',
      description:
        'Simulates marine plastic detection scenarios to study visual characteristics and detection challenges in ocean environments.',
    },
    {
      title: 'Proof-of-Concept for Cleanup Systems',
      description: 'Validates the technical feasibility of AI-assisted marine cleanup workflows before real-world hardware deployment.',
    },
  ];

  const futureImprovements = [
    'Real-time inference using GPU acceleration or optimized runtimes (ONNX / TensorRT)',
    'Integration with real drone or autonomous vessel hardware for live field testing',
    'Expansion of training datasets with marine-specific plastic classes and conditions',
    'Introduction of basic route and collection-path optimization algorithms for simulated cleanup planning',
  ];

  const workflowSteps = [
    {
      step: 1,
      icon: Image,
      title: 'Upload Image or Start Webcam',
      description:
        'The system accepts input through multiple modes: single image upload, video processing, or live webcam feed. Users can drag and drop files or browse to select images for analysis.',
      imageAlt: 'Smart Marine Project upload interface with drag and drop functionality',
      imageSrc: '/projects/smart-marine/smart-marine-01.png',
    },
    {
      step: 2,
      icon: Target,
      title: 'Candidate Detection with YOLOv8n',
      description:
        'The uploaded image is processed through YOLOv8n. Selected COCO container classes are displayed as possible debris candidates; this does not classify material composition.',
      imageAlt: 'Detection result showing plastic bottle with 72% confidence bounding box',
      imageSrc: '/projects/smart-marine/smart-marine-02.png',
    },
    {
      step: 3,
      icon: Video,
      title: 'Live Webcam Detection',
      description:
        'The browser webcam workflow processes frames and displays candidate detections. Confidence is not calibrated material probability, and results require human review.',
      imageAlt: 'Live webcam detection showing plastic bottle detected with 95% confidence',
      imageSrc: '/projects/smart-marine/smart-marine-03.png',
    },
    {
      step: 4,
      icon: BarChart,
      title: 'Analytics Dashboard',
      description:
        'Track detection metrics including images processed, total detections, session time, detection timeline, and confidence distribution charts for comprehensive analysis.',
      imageAlt: 'Analytics dashboard showing detection statistics and charts',
      imageSrc: '/projects/smart-marine/smart-marine-05.png',
    },
    {
      step: 5,
      icon: Navigation,
      title: 'GPS Navigation & Autonomous Collection',
      description:
        'The vessel simulation module enables autonomous navigation with GPS positioning, mission statistics, and interactive map showing plastic waste locations for collection planning.',
      imageAlt: 'GPS navigation interface with autonomous vessel control and mission statistics',
      imageSrc: '/projects/smart-marine/smart-marine-06.png',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed left-4 top-4 z-50">
        <Button variant="heroOutline" size="sm" onClick={goBackToProjects}>
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      <div className="h-[100dvh] overflow-y-auto snap-y snap-mandatory">
        <section className="min-h-[100dvh] snap-start bg-gradient-to-b from-card to-background border-b border-border flex">
          <div className="container mx-auto px-6 pt-28 pb-12 md:pb-16 flex-1 flex items-center">
            <div className="w-full max-w-4xl flex flex-col">
              <Badge variant="secondary" className="mb-4 bg-accent text-accent-foreground w-fit">
                AI / Computer Vision
              </Badge>
              <h1 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
                Smart Marine Vessels for AI-Driven Plastic Clean-up
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mb-6">
                A computer-vision prototype using YOLOv8n to flag container-like objects as possible marine-debris candidates. Features a
                Streamlit interface, software-only vessel simulation, and experimental API components.
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge variant="outline" className="text-xs border-border">
                  Python
                </Badge>
                <Badge variant="outline" className="text-xs border-border">
                  YOLOv8n
                </Badge>
                <Badge variant="outline" className="text-xs border-border">
                  Streamlit
                </Badge>
                <Badge variant="outline" className="text-xs border-border">
                  Docker
                </Badge>
              </div>
            </div>
          </div>
        </section>

        <section className="min-h-[100dvh] snap-start flex">
          <div className="container mx-auto px-6 py-16 self-center w-full">
            <SectionHeader icon={Layers} title="Project Overview" />
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-foreground">
                    <span className="inline-flex items-center rounded-full bg-primary/15 px-3 py-1 text-primary shadow-[0_0_18px_rgba(59,130,246,0.25)]">
                      The Problem
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm leading-relaxed">
                  <p className="mb-4">
                    Marine plastic pollution is a growing global crisis, with millions of tons of plastic entering oceans
                    every year. Detecting and monitoring this waste at scale presents several challenges:
                  </p>
                  <ul className="space-y-3">
                    <li>
                      <span className="text-foreground">Manual monitoring does not scale</span>
                      <br />
                      Human surveys using boats or shoreline inspection are slow, costly, and cover limited areas.
                    </li>
                    <li>
                      <span className="text-foreground">AI demos lack operational reliability</span>
                      <br />
                      Many computer vision projects focus only on detection accuracy and ignore failure handling,
                      detection confidence, performance consistency, and traceability of results.
                    </li>
                    <li>
                      <span className="text-foreground">Lack of trust and observability</span>
                      <br />
                      Cleanup teams and operators often cannot answer critical questions such as: Which model produced
                      this detection? Under what configuration? How reliable was the result? How did the system perform
                      over time?
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-foreground">
                    <span className="inline-flex items-center rounded-full bg-primary/15 px-3 py-1 text-primary shadow-[0_0_18px_rgba(59,130,246,0.25)]">
                      The Solution
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm leading-relaxed">
                  <p className="mb-4">
                    Smart Marine addresses these gaps by implementing a robust, auditable, and benchmarked AI detection
                    pipeline for marine plastic waste.
                  </p>
                  <div className="space-y-4">
                    <div>
                      <div className="text-foreground">AI-Based Detection</div>
                      <ul className="mt-2 space-y-1">
                        <li>Uses YOLOv8n to flag selected object classes as possible debris candidates from images, webcam input, and batches</li>
                        <li>Outputs bounding boxes with confidence scores for operator review</li>
                      </ul>
                    </div>
                    <div>
                      <div className="text-foreground">Reliability &amp; Trust Mechanisms</div>
                      <ul className="mt-2 space-y-1">
                        <li>Retry and skip logic to handle transient failures during batch processing</li>
                        <li>Low-confidence warnings to flag detections that may require human verification</li>
                        <li>Tracks failed frames, retried frames, and warning counts to avoid silent errors</li>
                      </ul>
                    </div>
                    <div>
                      <div className="text-foreground">Traceability &amp; Observability</div>
                      <ul className="mt-2 space-y-1">
                        <li>Each run is tagged with run_id, model_version, and full configuration snapshot</li>
                        <li>Structured logging records key lifecycle events for debugging and auditing</li>
                        <li>Results and summaries stored as structured JSON artifacts for reproducibility</li>
                      </ul>
                    </div>
                    <div>
                      <div className="text-foreground">Performance Benchmarking</div>
                      <ul className="mt-2 space-y-1">
                        <li>Captures FPS, latency percentiles (p50/p95/p99), CPU usage, and RSS memory</li>
                        <li>Supports time-based stress testing to identify performance drift or memory issues</li>
                      </ul>
                    </div>
                    <div>
                      <div className="text-foreground">API &amp; Deployment</div>
                      <ul className="mt-2 space-y-1">
                        <li>FastAPI REST API + Dockerized runtime for reproducible deployment</li>
                        <li>CPU mode supported for demos and batch analysis</li>
                        <li>Future GPU and optimized-runtime paths documented without unsupported performance claims</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="min-h-[100dvh] snap-start flex">
          <div className="container mx-auto px-6 py-16 self-center w-full">
            <SectionHeader icon={Zap} title="Key Features" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map((feature) => (
                <Card key={feature.title} className="bg-card border-border hover:border-primary/30 transition-colors">
                  <CardContent className="pt-6">
                    <feature.icon className="w-5 h-5 text-primary mb-3" />
                    <h3 className="font-medium text-foreground mb-2">{feature.title}</h3>
                    <ul className="mt-3 space-y-2 list-disc pl-4 text-sm text-muted-foreground">
                      {feature.bullets.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card className="bg-card border-border mt-6">
              <CardContent className="pt-6">
                <div className="text-foreground font-semibold mb-3">Engineering Focus</div>
                <ul className="space-y-2 list-disc pl-4 text-sm text-muted-foreground">
                  <li>Designed to scale from single-camera testing to multi-source inputs</li>
                  <li>Prioritized detection reliability over UI polish</li>
                  <li>Built as a solo project with full ownership of design, implementation, and testing</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="min-h-[100dvh] snap-start flex">
          <div className="container mx-auto px-6 py-16 self-center w-full">
            <SectionHeader icon={Monitor} title="How It Works" />
            <p className="text-muted-foreground mb-8">
              A step-by-step walkthrough of the detection and visualization pipeline using the actual application
              interface.
            </p>
            <div className="space-y-8">
              {workflowSteps.map((item) => (
                (() => {
                  const isOdd = item.step % 2 === 1;

                  const textOrderClass = isOdd ? 'lg:order-2' : 'lg:order-1';
                  const imageOrderClass = isOdd ? 'lg:order-1' : 'lg:order-2';

                  return (
                <Card key={item.step} className="bg-card border-border overflow-hidden rounded-none">
                  <div className="grid lg:grid-cols-2 gap-0">
                    <div
                      className={`p-6 lg:p-8 flex flex-col justify-center order-2 ${textOrderClass}`}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <span className="text-primary font-semibold">{item.step}</span>
                        </div>
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                    <div
                      className={`bg-muted/30 flex items-stretch justify-stretch p-0 order-1 ${imageOrderClass}`}
                    >
                      <div className="relative w-full aspect-video bg-transparent rounded-none border-0 overflow-hidden">
                        {(item as { imageSrc?: string }).imageSrc ? (
                          <img
                            src={(item as { imageSrc?: string }).imageSrc}
                            alt={item.imageAlt}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-center text-muted-foreground p-4">
                            <item.icon className="w-12 h-12 mx-auto mb-3 opacity-40" />
                            <p className="text-sm font-medium">Step {item.step}</p>
                            <p className="text-xs mt-1 opacity-70">{item.imageAlt}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
                  );
                })()
              ))}
            </div>
          </div>
        </section>

        <section className="min-h-[100dvh] snap-start flex">
          <div className="container mx-auto px-6 py-16 self-center w-full">
            <SectionHeader icon={Cpu} title="System Architecture" />
            <img
              src="/projects/smart-marine/system-architecture-pipeline.png"
              alt="System pipeline: Input → YOLOv8n candidate detection → filtering → output visualization"
              className="w-full rounded-none border border-border"
            />
          </div>
        </section>

        <section className="min-h-[100dvh] snap-start flex">
          <div className="container mx-auto px-6 py-16 self-center w-full">
            <SectionHeader icon={Code} title="Technologies Used" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(technologies).map(([category, techs]) => (
                <Card key={category} className="bg-card border-border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{category}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {techs.map((tech) => (
                      <div key={tech.name} className="grid grid-cols-1 gap-2 sm:gap-3">
                        <div className="flex items-start gap-3">
                          <Badge variant="outline" className="font-normal border-border whitespace-nowrap">
                            {tech.name}
                          </Badge>
                          <div className="text-sm text-muted-foreground leading-relaxed">{tech.definition}</div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="min-h-[100dvh] snap-start flex">
          <div className="container mx-auto px-6 py-16 self-center w-full">
            <div className="space-y-10">
              <div>
                <SectionHeader icon={Users} title="My Role (Solo Project)" />
                <Card className="bg-card border-border">
                  <CardContent className="pt-6">
                    <ul className="space-y-3">
                      {roles.map((role) => (
                        <li key={role} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          {role}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div>
                <SectionHeader icon={AlertTriangle} title="Performance & Constraints" />
                <Card className="bg-muted/20 border-border">
                  <CardContent className="pt-6">
                    <ul className="space-y-3">
                      {constraints.map((constraint) => (
                        <li key={constraint} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <AlertTriangle className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                          {constraint}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="min-h-[100dvh] snap-start flex">
          <div className="container mx-auto px-6 py-16 self-center w-full">
            <div className="space-y-10">
              <div>
                <SectionHeader icon={Lightbulb} title="Use Cases" />
                <div className="grid sm:grid-cols-3 gap-4">
                  {useCases.map((useCase) => (
                    <Card key={useCase.title} className="bg-card border-border">
                      <CardContent className="pt-6">
                        <h3 className="font-medium text-foreground mb-2">{useCase.title}</h3>
                        <p className="text-sm text-muted-foreground">{useCase.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <SectionHeader icon={Rocket} title="Future Improvements" />
                <Card className="bg-card border-border">
                  <CardContent className="pt-6">
                    <ul className="space-y-3">
                      {futureImprovements.map((improvement) => (
                        <li key={improvement} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <Rocket className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          {improvement}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="border-t border-border pt-10">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="gap-2" asChild>
                    <a href="https://github.com/girishk03/smart_marine_project" target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4" />
                      View Code on GitHub
                    </a>
                  </Button>
                </div>
                <div className="mt-6 text-center text-sm text-muted-foreground">
                  Project documentation for academic portfolio purposes.
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const SectionHeader = ({ icon: Icon, title }: { icon: ElementType; title: string }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="p-2 rounded-lg bg-accent">
      <Icon className="w-5 h-5 text-primary" />
    </div>
    <h2 className="text-xl font-semibold text-foreground">{title}</h2>
  </div>
);

export default MarinePlasticDetection;
