import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ScrollLinkedText } from '@/components/ScrollLinkedText';
import { StackedScrollText } from '@/components/StackedScrollText';

type GalleryItem = {
  title: string;
  src: string;
  caption: string;
};

type PresentationSlide = {
  title: string;
  image: GalleryItem;
  body?: string;
  bullets?: string[];
  kind:
    | 'overview'
    | 'problem'
    | 'architecture'
    | 'tech_stack'
    | 'benchmarks'
    | 'reliability'
    | 'limitations'
    | 'future'
    | 'ownership';
};

type TechStackRow = {
  layer: string;
  technology: string;
  purpose: string;
};

type BenchmarkRow = {
  mode: string;
  fps: string;
  p50: string;
  p95: string;
  memory: string;
  notes: string;
};

const SmartMarine = () => {
  const navigate = useNavigate();

  const goBackToProjects = () => {
    navigate('/');
    window.setTimeout(() => {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  };

  const galleryItems = useMemo<GalleryItem[]>(
    () => [
      {
        title: 'Landing / Title Screen',
        src: '/projects/smart-marine/smart-marine-01.png',
        caption:
          'Illustrative screenshot used for the case study flow (not a production monitoring UI).',
      },
      {
        title: 'Upload / Inference UI',
        src: '/projects/smart-marine/smart-marine-02.png',
        caption:
          'Illustrative UI screenshot (conceptual; not a live dashboard).',
      },
      {
        title: 'Single Image Detection',
        src: '/projects/smart-marine/smart-marine-03.png',
        caption:
          'Illustrative detection output with bounding boxes (demo image; not a production monitoring UI).',
      },
      {
        title: 'Video / Frame Detection',
        src: '/projects/smart-marine/smart-marine-04.png',
        caption:
          'Illustrative frame-level detection view (conceptual; not a live dashboard).',
      },
      {
        title: 'Analytics / Reporting View',
        src: '/projects/smart-marine/smart-marine-05.png',
        caption:
          'Illustrative dashboard view for summaries and reporting (conceptual; not a live dashboard).',
      },
      {
        title: 'System Architecture Overview',
        src: '/projects/smart-marine/smart-marine-06.png',
        caption:
          'Illustrative / conceptual architecture view used to communicate the system workflow (not a live dashboard).',
      },
    ],
    []
  );

  const imageByKey = useMemo<Record<string, GalleryItem>>(
    () => ({
      landing: galleryItems[0],
      upload: galleryItems[1],
      detection: galleryItems[2],
      video: galleryItems[3],
      analytics: galleryItems[4],
      architecture: galleryItems[5],
    }),
    [galleryItems]
  );

  const techStack = useMemo<TechStackRow[]>(
    () => [
      { layer: 'AI', technology: 'YOLOv5 (PyTorch)', purpose: 'Object detection for plastic waste' },
      { layer: 'Video', technology: 'OpenCV', purpose: 'Frame extraction and video processing' },
      { layer: 'API', technology: 'FastAPI', purpose: 'Serve inference via HTTP endpoints' },
      { layer: 'Deployment', technology: 'Docker', purpose: 'Reproducible runtime and environment' },
      { layer: 'Testing', technology: 'pytest', purpose: 'Unit and integration testing' },
      { layer: 'Benchmarking', technology: 'psutil', purpose: 'CPU/RSS memory tracking + stress testing' },
      { layer: 'Observability', technology: 'Python logging', purpose: 'Structured logs + run metadata (run_id, model_version)' },
    ],
    []
  );

  const benchmarks = useMemo<BenchmarkRow[]>(
    () => [
      { mode: 'Webcam (CPU)', fps: '18.7', p50: '52 ms', p95: '59 ms', memory: '~2.0 GB', notes: 'Demo baseline' },
      { mode: 'Video (CPU)', fps: '11.5', p50: '86 ms', p95: '92 ms', memory: '~0.8 GB', notes: 'Batch processing' },
      {
        mode: '10-minute stress run',
        fps: 'Stable',
        p50: 'Stable',
        p95: 'Stable',
        memory: 'No leaks',
        notes: 'Long-duration reliability check',
      },
    ],
    []
  );

  const architectureSteps = useMemo(
    () => [
      {
        title: 'Video Input (Drone / Webcam / File)',
        desc: 'Accepts drone footage, webcam streams, or file-based inputs for batch processing.',
      },
      { title: 'Frame Extraction (OpenCV)',
        desc: 'Extracts frames consistently and normalizes resolution / color format.' },
      { title: 'Plastic Detection (YOLOv5)', desc: 'Runs object detection and outputs bounding boxes + confidence scores.' },
      { title: 'Retry & Skip Logic', desc: 'Retries transient errors and skips persistently failing frames with counts in summary.' },
      { title: 'Low-Confidence Warning System', desc: 'Flags uncertain detections to support operator trust and review.' },
      {
        title: 'Structured Logging',
        desc: 'Records run_id, model_version, timestamps and config snapshot for traceability.',
      },
      { title: 'JSON Results & Batch Summary', desc: 'Writes per-frame detections + batch-level summaries as artifacts.' },
      { title: 'API Layer (FastAPI)', desc: 'Exposes /health + inference endpoints for integration with downstream tools.' },
      { title: 'Dockerized Deployment', desc: 'Packages runtime and dependencies for reproducible deployment.' },
    ],
    []
  );

  const slides = useMemo<PresentationSlide[]>(
    () => [
      {
        kind: 'overview',
        title: 'Project Overview',
        image: imageByKey.landing,
        body:
          'Smart Marine is an end-to-end inference system that detects plastic waste in marine environments. It exists to reduce manual monitoring effort by providing fast, traceable detections from drone footage and video feeds. The primary users are drone operators, survey teams, and NGOs that need auditable outputs, repeatable runs, and realistic performance measurements.',
      },
      {
        kind: 'problem',
        title: 'Problem Statement',
        image: imageByKey.detection,
        bullets: [
          'Manual marine plastic monitoring is slow, expensive, and hard to scale.',
          'Many AI demos focus on detection accuracy but ignore reliability, benchmarking, and deployment readiness.',
          'This project prioritizes engineering quality: traceable outputs, stress testing, and reproducible deployment.',
        ],
      },
      {
        kind: 'architecture',
        title: 'System Architecture',
        image: imageByKey.architecture,
        body: 'Pipeline view of how video becomes structured, auditable detections.',
      },
      {
        kind: 'tech_stack',
        title: 'Tech Stack',
        image: imageByKey.architecture,
        body: 'Layered stack used to keep the system modular and production-ready.',
      },
      {
        kind: 'benchmarks',
        title: 'Performance & Benchmarks',
        image: imageByKey.analytics,
        body:
          'Benchmarks are captured as artifacts (JSON summaries) and used to validate throughput, latency percentiles, and memory trends.',
      },
      {
        kind: 'reliability',
        title: 'Reliability & Testing',
        image: imageByKey.upload,
        bullets: [
          'Retry/skip policy for failed frames to keep long runs stable.',
          'Low-confidence warnings to improve operator trust and review workflow.',
          'Unit + integration tests to validate pipeline behavior and API smoke checks.',
          'Stress testing to detect memory leaks and FPS drift over time.',
        ],
      },
      {
        kind: 'limitations',
        title: 'Limitations',
        image: imageByKey.video,
        bullets: [
          'CPU throughput is limited; high-resolution video reduces FPS.',
          'Domain shift (lighting, water conditions, camera angle) can affect accuracy.',
          'Real-time constraints without GPU acceleration for high-FPS targets.',
        ],
      },
      {
        kind: 'future',
        title: 'Future Improvements',
        image: imageByKey.architecture,
        bullets: [
          'ONNX / TensorRT integration for higher throughput.',
          'GPU benchmarks on target deployment hardware.',
          'Multi-camera support and scalable ingestion.',
          'Hotspot alerting for repeated detections by location/segment.',
          'Long-duration field testing on representative conditions.',
        ],
      },
      {
        kind: 'ownership',
        title: 'My Role & Ownership',
        image: imageByKey.landing,
        bullets: [
          'Designed the system architecture and data flow end-to-end.',
          'Implemented the inference pipeline and output formats (JSON artifacts, summaries).',
          'Added benchmarking, stress testing, and observability (structured logging, run_id, model_version).',
          'Wrote Docker deployment and documentation to make the project reproducible.',
          'Used AI tools only as coding accelerators; architecture, integration, testing, and QA decisions were mine.',
        ],
      },
    ],
    [architectureSteps, benchmarks, galleryItems, imageByKey, techStack]
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed left-4 top-4 z-50">
        <Button
          variant="heroOutline"
          size="sm"
          onClick={goBackToProjects}
          className="transition-all hover:-translate-y-0.5 hover:glow-primary"
        >
          Back
        </Button>
      </div>
      <main className="pt-28">
        <div className="section-container">
          <div className="flex flex-col gap-3">
            <div className="text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">Smart Marine</span>
              <ScrollLinkedText as="p" className="max-w-3xl">
                Computer vision system for detecting marine plastic waste from drone and video feeds, with
                production-grade benchmarking and deployment.
              </ScrollLinkedText>
            </div>
            <Button variant="heroOutline" asChild>
              <a href="https://github.com/girishk03/ai-marine-cleanup-sim" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </Button>
          </div>

          <section className="mt-8 grid gap-4">
            <div className="rounded-2xl border border-border bg-card overflow-hidden">
              <div className="px-5 py-4 border-b border-border">
                <div className="text-sm font-medium">Hero</div>
                <div className="text-xs text-muted-foreground">Architecture / system overview diagram (placeholder)</div>
              </div>
              <img
                src="/projects/smart-marine/smart-marine-06.png"
                alt="System overview diagram"
                className="h-64 w-full object-cover md:h-96"
              />
            </div>
          </section>

          <section className="mt-10 grid gap-4">
            <ScrollLinkedText as="h2" className="text-xl font-semibold">Case Study (PPT-style)</ScrollLinkedText>
            <StackedScrollText
              items={slides}
              getKey={(s) => s.title}
              sectionHeightVh={85}
              dimOpacity={0.15}
              translatePx={24}
              renderItem={(s, idx) => {
                const reverse = idx % 2 === 1;
                return (
                  <div className="mx-auto w-full max-w-5xl rounded-2xl border border-border bg-card p-4">
                    <div
                      className={`grid gap-4 items-start ${
                        reverse ? 'md:grid-cols-[1fr_1.2fr]' : 'md:grid-cols-[1.2fr_1fr]'
                      }`}
                    >
                      <div className={reverse ? 'order-2 md:order-1' : 'order-2 md:order-2'}>
                        <div className="text-lg font-semibold text-foreground">{s.title}</div>

                        {s.body && <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>}

                        {s.bullets && (
                          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                            {s.bullets.map((b) => (
                              <li key={b} className="flex gap-2">
                                <span className="text-primary">•</span>
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {s.kind === 'architecture' && (
                          <div className="mt-4 grid gap-3">
                            {architectureSteps.map((step, i) => (
                              <div key={step.title} className="rounded-xl border border-border bg-muted/10 p-3">
                                <div className="flex items-start gap-3">
                                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary text-xs font-semibold">
                                    {i + 1}
                                  </div>
                                  <div className="grid gap-1">
                                    <div className="text-sm font-medium text-foreground">{step.title}</div>
                                    <div className="text-sm text-muted-foreground">{step.desc}</div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {s.kind === 'tech_stack' && (
                          <div className="mt-4 overflow-x-auto rounded-xl border border-border">
                            <table className="w-full text-sm">
                              <thead className="bg-muted/50">
                                <tr>
                                  <th className="text-left px-3 py-2 font-medium">Layer</th>
                                  <th className="text-left px-3 py-2 font-medium">Technology</th>
                                  <th className="text-left px-3 py-2 font-medium">Purpose</th>
                                </tr>
                              </thead>
                              <tbody>
                                {techStack.map((row) => (
                                  <tr key={`${row.layer}-${row.technology}`} className="border-t border-border">
                                    <td className="px-3 py-2 text-muted-foreground whitespace-nowrap">{row.layer}</td>
                                    <td className="px-3 py-2">{row.technology}</td>
                                    <td className="px-3 py-2 text-muted-foreground">{row.purpose}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}

                        {s.kind === 'benchmarks' && (
                          <div className="mt-4 grid gap-3">
                            <div className="overflow-x-auto rounded-xl border border-border">
                              <table className="w-full text-sm">
                                <thead className="bg-muted/50">
                                  <tr>
                                    <th className="text-left px-3 py-2 font-medium">Mode</th>
                                    <th className="text-left px-3 py-2 font-medium">FPS</th>
                                    <th className="text-left px-3 py-2 font-medium">p50</th>
                                    <th className="text-left px-3 py-2 font-medium">p95</th>
                                    <th className="text-left px-3 py-2 font-medium">Memory</th>
                                    <th className="text-left px-3 py-2 font-medium">Notes</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {benchmarks.map((row) => (
                                    <tr key={row.mode} className="border-t border-border">
                                      <td className="px-3 py-2">{row.mode}</td>
                                      <td className="px-3 py-2 text-muted-foreground">{row.fps}</td>
                                      <td className="px-3 py-2 text-muted-foreground">{row.p50}</td>
                                      <td className="px-3 py-2 text-muted-foreground">{row.p95}</td>
                                      <td className="px-3 py-2 text-muted-foreground">{row.memory}</td>
                                      <td className="px-3 py-2 text-muted-foreground">{row.notes}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Real-time 30+ FPS typically requires GPU acceleration or optimized runtimes (ONNX / TensorRT).
                            </p>
                          </div>
                        )}
                      </div>

                      <div className={reverse ? 'order-1 md:order-2' : 'order-1 md:order-1'}>
                        <div className="relative overflow-hidden rounded-xl border border-border bg-muted/10">
                          <img
                            src={s.image.src}
                            alt={s.image.title}
                            className="h-56 w-full object-cover sm:h-72"
                          />
                          <div className="p-3 border-t border-border">
                            <div className="text-xs text-muted-foreground">{s.image.caption}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }}
            />

            <div className="flex justify-between items-center mt-2">
              <Button variant="heroOutline" asChild>
                <Link to="/">Back to Portfolio</Link>
              </Button>
              <Button variant="hero" asChild>
                <a href="https://github.com/girishk03/smart_marine_project" target="_blank" rel="noopener noreferrer">
                  View Code
                </a>
              </Button>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SmartMarine;
