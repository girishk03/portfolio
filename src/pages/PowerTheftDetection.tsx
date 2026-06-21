import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BarChart2, Cpu, Database, Shield, Zap, Code, Github } from "lucide-react";
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

const PowerTheftDetection = () => {
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
    "Build a smart grid monitoring system with heuristic risk scoring",
    "Implement transparent heuristic risk scoring for investigation prioritization",
    "Document data quality, missing readings, and label distribution",
    "Validate Flask routes, real-data sampling, and container builds in CI",
    "Keep future ML work separate from the implemented risk-scoring behavior",
  ];

  const flowSteps = [
    { title: "Smart Meter Data Input", description: "Simulated mode by default or the first 1,000 rows of the documented 2015 dataset" },
    { title: "Heuristic Risk Scoring", description: "Compares actual consumption with an expected baseline and clamps the resulting review score" },
    { title: "Risk Categorization", description: "Transparent thresholds assign high, medium, or lower-priority investigation status" },
    { title: "Data-Quality Reporting", description: "Documents missing readings, label distribution, and source/license uncertainty" },
    { title: "Dashboard Visualisation", description: "Displays customer risk scores and supporting consumption summaries" },
    { title: "Deployment Configuration", description: "Flask and Gunicorn startup with Docker and GitHub Actions validation" },
  ];

  const designDecisions = [
    { decision: "Heuristic scoring instead of unsupported ML", reason: "Transparent rules match the included implementation and avoid claiming unavailable training or evaluation evidence" },
    { decision: "Investigation prioritization", reason: "Risk scores support analyst review rather than claiming definitive theft classification" },
    { decision: "Data-quality-first reporting", reason: "Missing readings, label imbalance, and provenance uncertainty are documented before interpreting dashboard output" },
    { decision: "Flask + Gunicorn on Render", reason: "Lightweight deployment stack suitable for a monitoring dashboard without heavyweight infrastructure" },
  ];

  const limitations = [
    "Runtime defaults to simulated data; the included 2015 dataset has unverified source and licensing",
    "No live data ingestion — dashboard uses pre-computed results",
    "No trained theft-classification model or reproducible ML evaluation is included",
    "Heuristic thresholds manually tuned — not learned from data",
    "No real-time alerting system or notification pipeline",
  ];

  const learnings = [
    "Transparent consumption-feature and threshold analysis",
    "Data-quality reporting for incomplete and imbalanced datasets",
    "Smart grid domain knowledge — consumption patterns and theft signatures",
    "Flask dashboard design for operational monitoring use cases",
    "Testing data loading, API behavior, and risk-category boundaries",
  ];

  const evidence = [
    { src: "/projects/power-theft/dashboard.png", alt: "Dashboard", caption: "fig.01 — Power theft detection login dashboard", category: "DASHBOARD" },
  ];

  return (
    <div ref={rootRef} className="min-h-screen bg-background">
      <div className="fixed left-4 top-4 z-50">
        <Button variant="outline" size="sm" onClick={goBackToProjects}>Back</Button>
      </div>
      <header className="border-b border-border">
        <div className="container mx-auto px-6 py-24">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-semibold tracking-tight mb-6">Power Theft Detection</h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
              Flask dashboard for heuristic electricity-risk scoring and investigation prioritization. It defaults to simulated data and can sample the first 1,000 rows of the documented 2015 dataset.
            </p>
            <div className="flex flex-wrap gap-2 mt-10">
              {["Python","Flask","Heuristic Scoring","Pandas","pytest","Docker","Gunicorn","Render"].map(t=>(
                <span key={t} className="font-mono text-xs text-muted-foreground px-3 py-1.5 rounded-full border border-border">{t}</span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 mt-10">
              <Button variant="outline" asChild><a href="https://github.com/girishk03/power-theft-detection-system" target="_blank" rel="noopener noreferrer">View Code</a></Button>
              <Button variant="outline" asChild><a href="https://power-theft-detection-system.onrender.com" target="_blank" rel="noopener noreferrer">Live Dashboard</a></Button>
              <Button variant="outline" asChild><Link to="/">Back to Portfolio</Link></Button>
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-6 py-24 space-y-28">
        <section>
          <SectionHeader number="01" title="Problem Statement" subtitle="The smart grid monitoring gap" />
          <div className="max-w-3xl">
            <div className="rounded-xl border border-border bg-card p-8">
              <p className="text-lg text-foreground leading-relaxed">Smart-meter monitoring systems often use statistical, heuristic, or machine-learning approaches to prioritize suspicious consumption patterns for analyst review.</p>
              <p className="text-muted-foreground mt-4 leading-relaxed"><strong className="text-foreground">Power Theft Detection</strong> implements a <span className="text-primary">transparent heuristic ranking workflow</span> with <span className="text-accent"> data-quality reporting</span> and a <span className="text-terminal"> Flask monitoring dashboard</span>. It prioritizes records for investigation rather than claiming definitive theft detection.</p>
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
          <SectionHeader number="03" title="System Architecture" subtitle="Layered monitoring design" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <ArchCard title="Data Pipeline" icon={<Database className="w-5 h-5"/>} items={["Simulated mode by default","First 1,000 real-data rows","2015 daily readings","Missing-value handling"]} accent="primary"/>
            <ArchCard title="Risk Engine" icon={<Cpu className="w-5 h-5"/>} items={["Consumption features","Transparent thresholds","Risk-score clamp","Priority categories"]} accent="accent"/>
            <ArchCard title="Validation" icon={<BarChart2 className="w-5 h-5"/>} items={["30 automated tests","API route coverage","Real-data sampling","Docker build validation"]} accent="terminal"/>
            <ArchCard title="Dashboard" icon={<Shield className="w-5 h-5"/>} items={["Heuristic risk scoring","Customer prioritization","Consumption summaries","Analyst review workflow"]} accent="primary"/>
          </div>
        </section>
        <section>
          <SectionHeader number="04" title="System Pipeline" subtitle="Step-by-step data and model flow" />
          <div className="max-w-2xl">
            {flowSteps.map((s,i)=><FlowStep key={i} number={i+1} title={s.title} description={s.description} isLast={i===flowSteps.length-1}/>)}
          </div>
        </section>
        <section>
          <SectionHeader number="05" title="Data Scope" subtitle="Documented runtime boundaries" />
          <div className="max-w-3xl">
            <div className="rounded-xl border border-border bg-card p-8">
              <div className="flex items-start gap-4 mb-4">
                <Zap className="w-8 h-8 text-accent flex-shrink-0"/>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">2015 Customer Dataset</h3>
                  <p className="text-muted-foreground mt-2">The repository documents 9,957 customer rows and 365 daily columns; runtime real-data mode samples the first 1,000 rows.</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                {[{label:"Customer Rows",value:"9,957"},{label:"Runtime Sample",value:"1,000"},{label:"Dataset Period",value:"2015"}].map(m=>(
                  <div key={m.label} className="rounded-lg border border-border bg-muted/10 p-4 text-center">
                    <div className="text-2xl font-bold text-primary">{m.value}</div>
                    <div className="text-xs text-muted-foreground mt-1">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section>
          <SectionHeader number="06" title="Risk-Scoring Heuristic" subtitle="Exact runtime rule used for investigation ranking" />
          <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] max-w-5xl">
            <div className="rounded-xl border border-border bg-card p-6 overflow-x-auto">
              <pre className="font-mono text-sm text-terminal leading-7"><code>{`raw_score = 1 - (actual_consumption / expected_consumption)\nrisk_score = clamp(raw_score, 0.30, 0.95)\n\nif baseline is missing or invalid:\n    risk_score = 0.80`}</code></pre>
              <p className="mt-4 text-xs text-muted-foreground">The score is a review-ranking heuristic, not a calibrated theft probability.</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold">Priority thresholds</h3>
              <div className="mt-5 space-y-3 text-sm">
                <div className="flex items-center justify-between rounded-lg border border-border p-3"><span className="text-muted-foreground">HIGH</span><code className="text-primary">score &gt; 0.70</code></div>
                <div className="flex items-center justify-between rounded-lg border border-border p-3"><span className="text-muted-foreground">MEDIUM</span><code className="text-accent">score ≥ 0.40</code></div>
                <div className="flex items-center justify-between rounded-lg border border-border p-3"><span className="text-muted-foreground">LOW</span><code className="text-terminal">score &lt; 0.40</code></div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="grid gap-10 md:grid-cols-[minmax(260px,360px)_1fr] md:gap-16">
            <div className="md:sticky md:top-24 md:self-start">
              <SectionHeader number="07" title="Execution Evidence" subtitle="Dashboard and results snapshots"/>
            </div>
            <div className="grid gap-8">
              {evidence.map((img,i)=><EvidenceImage key={i} src={img.src} alt={img.alt} caption={img.caption} category={img.category}/>)}
            </div>
          </div>
        </section>
        <section>
          <SectionHeader number="08" title="Design Decisions" subtitle="Reasoning behind implementation choices"/>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
            {designDecisions.map((d,i)=><DD key={i} decision={d.decision} reason={d.reason}/>)}
          </div>
        </section>
        <section>
          <SectionHeader number="09" title="Limitations & Constraints" subtitle="Explicit scope boundaries"/>
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl">
            {limitations.map((l,i)=><LimItem key={i} text={l}/>)}
          </div>
        </section>
        <section>
          <SectionHeader number="10" title="Learning Outcomes" subtitle="Skills developed through implementation"/>
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
              "Power Theft Detection demonstrates <span className="text-primary font-medium">heuristic risk scoring,
              data-quality reporting, and investigation prioritization workflows</span> for smart-meter monitoring while
              explicitly documenting implementation and evaluation boundaries."
            </blockquote>
          </div>
        </section>
      </main>
      <footer className="border-t border-border pt-2 pb-10">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center gap-4">
              <Button variant="outline" asChild><a href="https://github.com/girishk03/power-theft-detection-system" target="_blank" rel="noopener noreferrer"><Github className="w-4 h-4 mr-2"/>View Code on GitHub</a></Button>
              <Button variant="outline" asChild><a href="https://power-theft-detection-system.onrender.com" target="_blank" rel="noopener noreferrer">Live Dashboard</a></Button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">Project documentation for academic portfolio purposes.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default PowerTheftDetection;
