import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Eye, Cpu, BarChart2, Shield, Zap, Code, Github } from "lucide-react";
import { ScrollLinkedText } from "@/components/ScrollLinkedText";

type SectionHeaderProps = { number: string; title: string; subtitle?: string };
const SectionHeader = ({ number, title, subtitle }: SectionHeaderProps) => (
  <div className="mb-10">
    <div className="flex items-center gap-4 mb-3">
      <span className="font-mono text-xs text-muted-foreground tracking-wider">{number}</span>
      <div className="h-px flex-1 bg-border" />
    </div>
    <ScrollLinkedText as="h2" className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</ScrollLinkedText>
    {subtitle && <p className="mt-3 text-muted-foreground text-base leading-relaxed">{subtitle}</p>}
  </div>
);

type ArchCardProps = { title: string; icon: JSX.Element; items: string[]; accent: "primary"|"accent"|"terminal" };
const ArchCard = ({ title, icon, items, accent }: ArchCardProps) => (
  <div className="rounded-xl border border-border bg-card p-6">
    <div className={`mb-4 ${accent==="primary"?"text-primary":accent==="accent"?"text-accent":"text-terminal"}`}>{icon}</div>
    <ScrollLinkedText as="h3" className="text-lg font-semibold mb-3">{title}</ScrollLinkedText>
    <ul className="space-y-2 text-sm text-muted-foreground">
      {items.map(i=><li key={i} className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span>{i}</span></li>)}
    </ul>
  </div>
);

type FlowStepProps = { number: number; title: string; description: string; isLast: boolean };
const FlowStep = ({ number, title, description, isLast }: FlowStepProps) => (
  <div className="relative flex gap-4 pb-8">
    {!isLast && <div className="absolute left-5 top-10 bottom-0 w-px bg-border" />}
    <div className="flex-shrink-0">
      <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center font-mono text-sm text-primary">{number}</div>
    </div>
    <div className="pt-1">
      <ScrollLinkedText as="h4" className="text-lg font-semibold">{title}</ScrollLinkedText>
      <p className="text-muted-foreground mt-1">{description}</p>
    </div>
  </div>
);

type EvidenceImageProps = { src: string; alt: string; caption: string; category: string };
const EvidenceImage = ({ src, alt, caption, category }: EvidenceImageProps) => (
  <div className="group">
    <div className="relative overflow-hidden rounded-xl border border-border bg-card">
      <div className="absolute top-3 left-3 z-10">
        <span className="font-mono text-xs bg-background/90 backdrop-blur-sm text-muted-foreground px-2 py-1 rounded border border-border">{category}</span>
      </div>
      <img src={src} alt={alt} className="w-full object-contain" loading="lazy" />
    </div>
    <p className="mt-3 text-sm text-muted-foreground font-mono">{caption}</p>
  </div>
);

type ObjItemProps = { text: string; index: number };
const ObjItem = ({ text, index }: ObjItemProps) => (
  <div className="flex items-start gap-4 p-5 rounded-xl border border-border bg-card">
    <div className="w-8 h-8 rounded-lg border border-border flex items-center justify-center font-mono text-xs text-muted-foreground flex-shrink-0">{String(index+1).padStart(2,"0")}</div>
    <p className="text-foreground">{text}</p>
  </div>
);

type DDProps = { decision: string; reason: string };
const DD = ({ decision, reason }: DDProps) => (
  <div className="p-6 rounded-xl border border-border bg-card">
    <ScrollLinkedText as="h3" className="text-lg font-semibold">{decision}</ScrollLinkedText>
    <p className="text-muted-foreground mt-3">{reason}</p>
  </div>
);

const LItem = ({ text }: { text: string }) => (
  <div className="flex items-start gap-3 p-5 rounded-xl border border-border bg-card">
    <span className="text-primary mt-0.5">•</span>
    <p className="text-muted-foreground">{text}</p>
  </div>
);

const LimItem = ({ text }: { text: string }) => (
  <div className="p-5 rounded-xl border border-border bg-card">
    <p className="text-muted-foreground">{text}</p>
  </div>
);

const SmartMarine = () => {
  const navigate = useNavigate();
  const rootRef = useRef<HTMLDivElement>(null);
  const goBackToProjects = () => {
    navigate("/");
    window.setTimeout(() => { document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }, 100);
  };

  useEffect(() => {
    const root = rootRef.current; if (!root) return;
    let lastY = window.scrollY, isDown = false;
    const setDown = (next: boolean) => { if (next===isDown) return; isDown=next; root.classList.toggle("scrolling-down",isDown); };
    const onDir = () => { const y=window.scrollY; setDown(y>lastY); lastY=y; };
    onDir(); window.addEventListener("scroll",onDir,{passive:true});
    const supportsScrollDriven = typeof CSS!=="undefined" && typeof (CSS as any).supports==="function" && (CSS as any).supports("animation-timeline","view()");
    const prefersReduced = typeof window!=="undefined" && typeof window.matchMedia==="function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (supportsScrollDriven||prefersReduced) return ()=>window.removeEventListener("scroll",onDir);
    const textEls = Array.from(root.querySelectorAll("p,h1,h2,h3,h4,blockquote,hr")) as HTMLElement[];
    const imgEls = Array.from(root.querySelectorAll("img")) as HTMLElement[];
    const clamp = (v:number)=>Math.min(1,Math.max(0,v));
    let raf=0;
    const update = () => {
      raf=0; const vh=window.innerHeight||1;
      if (!isDown) { for (const el of [...textEls,...imgEls]){el.style.opacity="1";el.style.transform="none";el.style.willChange="auto";} return; }
      for (const el of textEls){const r=el.getBoundingClientRect();const p=clamp((vh-r.top)/(vh*0.7));el.style.opacity=String(p);el.style.transform=`translate3d(0,${(1-p)*128}px,0)`;el.style.willChange="opacity,transform";}
      for (const el of imgEls){const r=el.getBoundingClientRect();const p=clamp((vh-r.top)/(vh*0.5));el.style.opacity=String(p);el.style.transform=`translate3d(0,${(1-p)*64}px,0)`;el.style.willChange="opacity,transform";}
    };
    const schedule = ()=>{ if(raf)return; raf=window.requestAnimationFrame(update); };
    update(); window.addEventListener("scroll",schedule,{passive:true}); window.addEventListener("resize",schedule);
    return ()=>{ window.removeEventListener("scroll",onDir); window.removeEventListener("scroll",schedule); window.removeEventListener("resize",schedule); if(raf)window.cancelAnimationFrame(raf); for(const el of [...textEls,...imgEls]){el.style.removeProperty("opacity");el.style.removeProperty("transform");el.style.removeProperty("will-change");} };
  }, []);

  const objectives = [
    "Build an auditable YOLOv8n-based prototype that flags selected COCO object classes as potential marine-debris candidates",
    "Document the limits of treating selected COCO object classes as debris proxies",
    "Implement FPS, p50/p95 latency benchmarks and stress testing",
    "Add structured logging with run_id, model_version, and config snapshots",
    "Provide reproducible local and configured cloud startup paths",
    "Design retry/skip logic and low-confidence warning system for operator trust",
  ];

  const flowSteps = [
    { title: "Video / Drone Input", description: "Accepts drone footage, webcam streams, or file-based video inputs" },
    { title: "Frame Extraction (OpenCV)", description: "Extracts frames consistently and normalizes resolution and color format" },
    { title: "YOLOv8n Inference", description: "General-purpose object detection outputs candidate classes, boxes, and confidence scores" },
    { title: "Retry & Skip Logic", description: "Retries transient errors, skips persistently failing frames with counts in summary" },
    { title: "Low-Confidence Warning", description: "Flags uncertain detections to support operator review and trust" },
    { title: "Structured Logging & Output", description: "Records run_id, model_version, timestamps; writes per-frame JSON + batch summary artifacts" },
  ];

  const designDecisions = [
    { decision: "YOLOv8n runtime", reason: "Small pretrained runtime model with straightforward Ultralytics integration; historical YOLOv5m artifacts are documented separately" },
    { decision: "Retry/skip policy", reason: "Long-running video inference needs resilience — silent failures corrupt batch summaries without proper error handling" },
    { decision: "Structured logging with run_id", reason: "Traceability is non-negotiable for production systems; enables replay, debugging, and audit without re-running inference" },
    { decision: "Docker for deployment", reason: "Eliminates environment drift between development and deployment; ensures reproducible inference results" },
  ];

  const limitations = [
    "CPU throughput limited — high-resolution video reduces FPS below real-time",
    "Domain shift (lighting, water conditions, camera angle) can affect accuracy",
    "No supported GPU benchmark is included",
    "No live data ingestion — batch file-based processing only",
    "Dataset size constrains generalization to unseen marine environments",
  ];

  const learnings = [
    "End-to-end computer vision pipeline from raw video to structured JSON artifacts",
    "Object-detection integration and confidence-threshold experimentation",
    "Benchmarking discipline — FPS, p50/p95 latency, and memory tracking",
    "Production observability patterns — structured logging, run_id, config snapshots",
    "Docker deployment and reproducible ML runtime management",
    "Stress testing and long-duration reliability validation",
  ];

  const evidence = [
    { src: "/projects/smart-marine/smart-marine-01.png", alt: "Landing Screen", caption: "fig.01 — System landing and title screen", category: "UI" },
    { src: "/projects/smart-marine/smart-marine-02.png", alt: "Upload UI", caption: "fig.02 — Video / image upload and inference interface", category: "INFERENCE" },
    { src: "/projects/smart-marine/smart-marine-03.png", alt: "Detection Output", caption: "fig.03 — Candidate detection output with bounding boxes", category: "DETECTION" },
    { src: "/projects/smart-marine/smart-marine-04.png", alt: "Video Detection", caption: "fig.04 — Frame-level detection on video footage", category: "DETECTION" },
    { src: "/projects/smart-marine/smart-marine-05.png", alt: "Analytics View", caption: "fig.05 — Analytics and batch reporting dashboard", category: "ANALYTICS" },
    { src: "/projects/smart-marine/smart-marine-06.png", alt: "Architecture", caption: "fig.06 — System architecture and pipeline overview", category: "ARCHITECTURE" },
  ];

  return (
    <div ref={rootRef} className="min-h-screen bg-background">
      <div className="fixed left-4 top-4 z-50">
        <Button variant="outline" size="sm" onClick={goBackToProjects}>Back</Button>
      </div>
      <header className="border-b border-border">
        <div className="container mx-auto px-6 py-24">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-semibold tracking-tight mb-6">Smart Marine AI</h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
              YOLOv8n and Streamlit prototype that flags selected container-like COCO classes as possible marine-debris candidates, with qualified CPU timing observations and software-only vessel simulation.
            </p>
            <div className="flex flex-wrap gap-2 mt-10">
              {["YOLOv8n","PyTorch","Streamlit","OpenCV","psutil","pytest"].map(t=>(
                <span key={t} className="font-mono text-xs text-muted-foreground px-3 py-1.5 rounded-full border border-border">{t}</span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 mt-10">
              <Button variant="outline" asChild>
                <a href="https://github.com/girishk03/smart_marine_project" target="_blank" rel="noopener noreferrer">View Code</a>
              </Button>
              <Button variant="outline" asChild><Link to="/">Back to Portfolio</Link></Button>
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-6 py-24 space-y-28">
        <section>
          <SectionHeader number="01" title="Problem Statement" subtitle="The marine monitoring gap" />
          <div className="max-w-3xl">
            <div className="rounded-xl border border-border bg-card p-8">
              <p className="text-lg text-foreground leading-relaxed">Manual marine plastic monitoring is slow, expensive, and hard to scale. Drone footage generates hours of video that no human team can review frame by frame.</p>
              <p className="text-muted-foreground mt-4 leading-relaxed"><strong className="text-foreground">Smart Marine AI</strong> demonstrates an <span className="text-primary">end-to-end computer-vision prototype</span> with <span className="text-accent"> qualified timing evidence</span>, explicit provenance gaps, and <span className="text-terminal"> human-review safeguards</span>.</p>
            </div>
          </div>
        </section>
        <section>
          <SectionHeader number="02" title="Project Objectives" subtitle="Engineering goals" />
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl">
            {objectives.map((o,i)=><ObjItem key={i} text={o} index={i}/>)}
          </div>
        </section>
        <section>
          <SectionHeader number="03" title="System Architecture" subtitle="Layered pipeline design" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <ArchCard title="Vision Pipeline" icon={<Eye className="w-5 h-5"/>} items={["OpenCV frame extraction","YOLOv8n inference","Candidate-class filtering","Bounding box output"]} accent="primary"/>
            <ArchCard title="Reliability Layer" icon={<Shield className="w-5 h-5"/>} items={["Retry/skip policy","Low-confidence warnings","Error counts in summary","Long-run stability"]} accent="accent"/>
            <ArchCard title="Observability" icon={<BarChart2 className="w-5 h-5"/>} items={["Structured logging","run_id + model_version","Config snapshots","JSON batch artifacts"]} accent="terminal"/>
            <ArchCard title="Deployment" icon={<Cpu className="w-5 h-5"/>} items={["Streamlit multi-tab UI","Software-only GPS vessel simulation","pytest unit + integration","psutil memory tracking"]} accent="primary"/>
          </div>
        </section>
        <section>
          <SectionHeader number="04" title="Inference Pipeline" subtitle="Step-by-step data flow" />
          <div className="max-w-2xl">
            {flowSteps.map((s,i)=><FlowStep key={i} number={i+1} title={s.title} description={s.description} isLast={i===flowSteps.length-1}/>)}
          </div>
        </section>
        <section>
          <SectionHeader number="05" title="Benchmarks & Performance" subtitle="Measured on CPU hardware" />
          <div className="max-w-3xl">
            <div className="rounded-xl border border-border bg-card p-8">
              <div className="flex items-start gap-4 mb-6">
                <Zap className="w-8 h-8 text-accent flex-shrink-0"/>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">CPU Inference Results</h3>
                  <p className="text-muted-foreground mt-2">All benchmarks captured as JSON artifacts. 10-minute stress run confirmed no memory leaks or FPS drift.</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[{label:"Observed CPU FPS",value:"10.8–18.7"},{label:"Mean Latency",value:"53–93ms"},{label:"GPU Evidence",value:"None"},{label:"Detection Metric",value:"Not validated"}].map(m=>(
                  <div key={m.label} className="rounded-lg border border-border bg-muted/10 p-4 text-center">
                    <div className="text-2xl font-bold text-primary">{m.value}</div>
                    <div className="text-xs text-muted-foreground mt-1">{m.label}</div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-4">These committed CPU reports recorded zero detections per frame and do not establish useful detection throughput or model accuracy.</p>
            </div>
          </div>
        </section>
        <section>
          <div className="grid gap-10 md:grid-cols-[minmax(260px,360px)_1fr] md:gap-16">
            <div className="md:sticky md:top-24 md:self-start">
              <SectionHeader number="06" title="Execution Evidence" subtitle="Pipeline and detection snapshots"/>
            </div>
            <div className="grid gap-8">
              {evidence.map((img,i)=><EvidenceImage key={i} src={img.src} alt={img.alt} caption={img.caption} category={img.category}/>)}
            </div>
          </div>
        </section>
        <section>
          <SectionHeader number="07" title="Design Decisions" subtitle="Reasoning behind implementation choices"/>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
            {designDecisions.map((d,i)=><DD key={i} decision={d.decision} reason={d.reason}/>)}
          </div>
        </section>
        <section>
          <SectionHeader number="08" title="Limitations & Constraints" subtitle="Explicit scope boundaries"/>
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl">
            {limitations.map((l,i)=><LimItem key={i} text={l}/>)}
          </div>
        </section>
        <section>
          <SectionHeader number="09" title="Learning Outcomes" subtitle="Skills developed through implementation"/>
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl">
            {learnings.map((l,i)=><LItem key={i} text={l}/>)}
          </div>
        </section>
        <section className="pb-12">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-6">
              <Code className="w-5 h-5 text-primary"/>
              <span className="font-mono text-xs text-primary uppercase tracking-wider">Final Statement</span>
            </div>
            <blockquote className="text-xl md:text-2xl text-foreground font-light leading-relaxed">
              "Smart Marine AI is an honest computer-vision prototype: it demonstrates integration, filtering, analytics, and simulation while documenting missing weights, dataset provenance, and evaluation limits."
            </blockquote>
          </div>
        </section>
      </main>
      <footer className="border-t border-border pt-2 pb-10">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center gap-4">
              <Button variant="outline" asChild>
                <a href="https://github.com/girishk03/smart_marine_project" target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2"/>View Code on GitHub
                </a>
              </Button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">Project documentation for academic portfolio purposes.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default SmartMarine;
