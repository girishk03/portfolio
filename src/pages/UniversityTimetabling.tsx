import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Cpu, Calendar, BarChart2, Layers, Zap, Code, Github } from "lucide-react";
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
      <img src={src} alt={alt} className="w-full aspect-video object-cover object-top" loading="lazy" />
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

const UniversityTimetabling = () => {
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
    "Formulate university scheduling as a Constraint Programming problem",
    "Detect and repair infeasible timetables automatically",
    "Evaluate included ITC-2019 instances and document solution quality",
    "Expose configurable solve and LNS budgets for instances of different sizes",
    "Build a live interactive dashboard for results visualization",
    "Expose the solver through a FastAPI wrapper for programmatic access",
  ];

  const flowSteps = [
    { title: "ITC-2019 XML Input", description: "Parses standard instances: rooms, courses, students, time slots, and hard constraints" },
    { title: "Infeasibility Detection", description: "Identifies room-capacity bottlenecks and student clash hotspots before solving" },
    { title: "CP-SAT Model", description: "Formulates scheduling as CSP with 5-tier lexicographic objectives" },
    { title: "LNS Improvement", description: "Large Neighbourhood Search iteratively destroys and repairs solution fragments" },
    { title: "Validation", description: "Validates zero student clashes and generates ranked diagnostic recommendations" },
    { title: "JSON Output + Dashboard", description: "Structured output consumed by interactive GitHub Pages dashboard" },
  ];

  const designDecisions = [
    { decision: "CP-SAT over heuristic-only solver", reason: "OR-Tools CP-SAT can return feasible incumbents under a time limit and prove optimality when the search completes" },
    { decision: "LNS as improvement layer", reason: "Pure CP-SAT on large instances is slow; LNS improves solution quality incrementally without full re-solve" },
    { decision: "ITC-2019 benchmark format", reason: "A recognized instance format makes parser behavior and constraint inputs easier to inspect and reproduce" },
    { decision: "FastAPI wrapper", reason: "A thin HTTP boundary reuses the CLI solver path and makes XML-to-JSON execution available to other clients" },
  ];

  const limitations = [
    "Solve time grows with instance size and depends on the configured time budget",
    "Hybrid mode (online/physical) adds constraint complexity not in base ITC-2019",
    "No live database integration — inputs are file-based XML",
    "Dashboard is read-only — no drag-and-drop manual adjustment",
    "Room preference soft constraints are approximated, not exact",
  ];

  const learnings = [
    "Constraint Programming formulation for NP-hard combinatorial problems",
    "OR-Tools CP-SAT API — variable domains, constraints, and objective functions",
    "Large Neighbourhood Search design patterns for local improvement",
    "ITC-2019 problem format and evaluation criteria",
    "FastAPI wrapper design and asynchronous file-upload handling",
    "Building interactive dashboards for algorithmic output visualisation",
  ];

  const evidence = [
    { src: "/projects/timetabling/dashboard.jpeg", alt: "Dashboard", caption: "fig.01 — Live GitHub Pages dashboard showing solved timetable", category: "DASHBOARD" },
    { src: "/projects/timetabling/dashboard.jpeg", alt: "Results", caption: "fig.02 — Physical versus hybrid feasibility view for the included demo", category: "RESULTS" },
    { src: "/projects/timetabling/dashboard.jpeg", alt: "Schedule", caption: "fig.03 — Student schedule view with zero clash validation", category: "SCHEDULE" },
  ];

  return (
    <div ref={rootRef} className="min-h-screen bg-background">
      <div className="fixed left-4 top-4 z-50">
        <Button variant="outline" size="sm" onClick={goBackToProjects}>Back</Button>
      </div>
      <header className="border-b border-border">
        <div className="container mx-auto px-6 py-24">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-semibold tracking-tight mb-6">University Timetabling Solver</h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
              Hybrid CP-SAT + LNS optimizer that detects infeasible university timetables and generates feasible schedules. The included solution artifact reports Quality Score 100; this is sample-specific, not a general benchmark.
            </p>
            <div className="flex flex-wrap gap-2 mt-10">
              {["OR-Tools","CP-SAT","LNS","FastAPI","Python","ITC-2019","GitHub Pages"].map(t=>(
                <span key={t} className="font-mono text-xs text-muted-foreground px-3 py-1.5 rounded-full border border-border">{t}</span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 mt-10">
              <Button variant="outline" asChild><a href="https://github.com/girishk03/University-Timetabling-Solver" target="_blank" rel="noopener noreferrer">View Code</a></Button>
              <Button variant="outline" asChild><a href="https://girishk03.github.io/University-Timetabling-Solver/" target="_blank" rel="noopener noreferrer">Live Dashboard</a></Button>
              <Button variant="outline" asChild><Link to="/">Back to Portfolio</Link></Button>
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-6 py-24 space-y-28">
        <section>
          <SectionHeader number="01" title="Problem Statement" subtitle="The scheduling complexity gap" />
          <div className="max-w-3xl">
            <div className="rounded-xl border border-border bg-card p-8">
              <p className="text-lg text-foreground leading-relaxed">University scheduling is NP-hard. With hundreds of courses, limited rooms, and thousands of student enrolments, even small constraint violations cascade into timetable failures that affect entire cohorts.</p>
              <p className="text-muted-foreground mt-4 leading-relaxed"><strong className="text-foreground">University Timetabling Solver</strong> demonstrates a <span className="text-primary">hybrid CP-SAT and LNS workflow</span> that <span className="text-accent"> detects infeasibility</span>, generates feasible schedules, and validates hard constraints on included examples.</p>
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
          <SectionHeader number="03" title="System Architecture" subtitle="From benchmark input to independently validated output" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ArchCard title="XML Parser" icon={<Code className="w-5 h-5"/>} items={["ITC-2019 / UniTime XML","Courses, rooms, and students","Allowed times and capacities","Normalized internal model"]} accent="primary"/>
            <ArchCard title="Constraint Builder" icon={<Layers className="w-5 h-5"/>} items={["Boolean decision variables","Room and time exclusivity","Capacity and attendance rules","Ordered quality objectives"]} accent="accent"/>
            <ArchCard title="CP-SAT Solver" icon={<Cpu className="w-5 h-5"/>} items={["Feasible incumbent search","Configurable time limits","Strict or bounded relaxation","Objective tuple tracking"]} accent="primary"/>
            <ArchCard title="LNS Improvement" icon={<Zap className="w-5 h-5"/>} items={["Destroy selected assignments","Fix the remaining incumbent","Re-optimize the neighborhood","Accept improving candidates"]} accent="accent"/>
            <ArchCard title="Validation Engine" icon={<Calendar className="w-5 h-5"/>} items={["Student clash checks","Room capacity checks","Schedule consistency","Diagnostics and recommendations"]} accent="terminal"/>
            <ArchCard title="Output Surfaces" icon={<BarChart2 className="w-5 h-5"/>} items={["Structured solution JSON","FastAPI /solve wrapper","Static analytics dashboard","GitHub Pages visualization"]} accent="primary"/>
          </div>
          <div className="mt-6 rounded-xl border border-border bg-card p-5 font-mono text-xs md:text-sm text-muted-foreground overflow-x-auto">
            <span className="text-primary">ITC-2019 XML</span> → Parser → Constraint Builder → <span className="text-accent">CP-SAT</span> → LNS → Validation → <span className="text-terminal">JSON / Dashboard</span>
          </div>
        </section>
        <section>
          <SectionHeader number="04" title="Solver Pipeline" subtitle="Step-by-step optimisation flow" />
          <div className="max-w-2xl">
            {flowSteps.map((s,i)=><FlowStep key={i} number={i+1} title={s.title} description={s.description} isLast={i===flowSteps.length-1}/>)}
          </div>
        </section>
        <section>
          <SectionHeader number="05" title="Constraint Model" subtitle="Validity rules versus optimization preferences" />
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl">
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-primary">Hard Constraints</h3>
              <p className="mt-2 text-sm text-muted-foreground">A strict-mode solution is rejected when these invariants fail.</p>
              <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
                {["Each class uses exactly one allowed time", "A physical room hosts at most one class at a time", "Room capacity and class subscription limits are respected", "A student cannot attend overlapping classes", "Room, delivery mode, and hybrid capability remain consistent"].map(item=><li key={item} className="flex gap-2"><span className="text-primary">•</span><span>{item}</span></li>)}
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-accent">Soft Constraints & Objectives</h3>
              <p className="mt-2 text-sm text-muted-foreground">The solver optimizes applicable preferences in priority order.</p>
              <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
                {["Maximize students receiving an attended class", "Minimize bounded relaxation penalties", "Minimize timetable changes during repair", "Maximize elective-module satisfaction", "Minimize delivery-mode, late-class, and consecutive-class penalties"].map(item=><li key={item} className="flex gap-2"><span className="text-accent">•</span><span>{item}</span></li>)}
              </ul>
            </div>
          </div>
        </section>
        <section>
          <SectionHeader number="06" title="Included Solution Artifact" subtitle="Sample-specific evidence, not a general benchmark claim" />
          <div className="max-w-3xl">
            <div className="rounded-xl border border-border bg-card p-8">
              <div className="flex items-start gap-4 mb-4">
                <Zap className="w-8 h-8 text-accent flex-shrink-0"/>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Committed <code>full_solution.json</code></h3>
                  <p className="text-muted-foreground mt-2">The included artifact contains 150 scheduled classes and reports an optimal status for that run.</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                {[{label:"Quality Score",value:"100"},{label:"Recorded Solve Time",value:"90.04s"},{label:"Reported Violations",value:"0"}].map(m=>(
                  <div key={m.label} className="rounded-lg border border-border bg-muted/10 p-4 text-center">
                    <div className="text-2xl font-bold text-primary">{m.value}</div>
                    <div className="text-xs text-muted-foreground mt-1">{m.label}</div>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-sm text-muted-foreground">
                These values describe one committed solution artifact. The repository does not record hardware, repeated-run statistics, or a cross-instance benchmark, so the result should not be generalized.
              </p>
            </div>
          </div>
        </section>
        <section>
          <SectionHeader number="07" title="Sample Solver Output" subtitle="Excerpt from the committed schedule artifact" />
          <div className="max-w-3xl rounded-xl border border-border bg-card p-6 overflow-x-auto">
            <pre className="font-mono text-sm text-terminal leading-7"><code>{`Class 1   → time 4  → room 6 → in_person\nClass 10  → time 95 → room 3 → in_person\nClass 100 → time 98 → room 2 → in_person\n\nstatus: OPTIMAL\nstudent_overlaps: 0\nroom_overflow: 0`}</code></pre>
            <p className="mt-4 text-xs text-muted-foreground">Internal identifiers are preserved because human-readable room labels are not stored in the solution artifact.</p>
          </div>
        </section>
        <section>
          <div className="grid gap-10 md:grid-cols-[minmax(260px,360px)_1fr] md:gap-16">
            <div className="md:sticky md:top-24 md:self-start">
              <SectionHeader number="08" title="Execution Evidence" subtitle="Dashboard and results snapshots"/>
            </div>
            <div className="grid gap-8">
              {evidence.map((img,i)=><EvidenceImage key={i} src={img.src} alt={img.alt} caption={img.caption} category={img.category}/>)}
            </div>
          </div>
        </section>
        <section>
          <SectionHeader number="09" title="Design Decisions" subtitle="Reasoning behind implementation choices"/>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
            {designDecisions.map((d,i)=><DD key={i} decision={d.decision} reason={d.reason}/>)}
          </div>
        </section>
        <section>
          <SectionHeader number="10" title="Limitations & Constraints" subtitle="Explicit scope boundaries"/>
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl">
            {limitations.map((l,i)=><LimItem key={i} text={l}/>)}
          </div>
        </section>
        <section>
          <SectionHeader number="11" title="Learning Outcomes" subtitle="Skills developed through implementation"/>
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
              "University Timetabling Solver demonstrates constraint programming, infeasibility diagnostics,
              optimization workflows, and independent schedule validation using OR-Tools CP-SAT and LNS."
            </blockquote>
          </div>
        </section>
      </main>
      <footer className="border-t border-border pt-2 pb-10">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center gap-4">
              <Button variant="outline" asChild><a href="https://github.com/girishk03/University-Timetabling-Solver" target="_blank" rel="noopener noreferrer"><Github className="w-4 h-4 mr-2"/>View Code on GitHub</a></Button>
              <Button variant="outline" asChild><a href="https://girishk03.github.io/University-Timetabling-Solver/" target="_blank" rel="noopener noreferrer">Live Dashboard</a></Button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">Project documentation for academic portfolio purposes.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default UniversityTimetabling;
