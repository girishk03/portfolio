import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Brain, MessageSquare, Youtube, Zap, Shield, Code, Github } from "lucide-react";
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
      {items.map(i => <li key={i} className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span>{i}</span></li>)}
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

const HateSpeechDetection = () => {
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
    "Build an NLP classifier that generalises across hate speech and clean text",
    "Create a live YouTube comment analyser with toxicity scoring",
    "Implement real-time AI chatroom moderation via SocketIO",
    "Package Flask interfaces with smoke-tested CI and documented deployment limits",
    "Achieve balanced Macro F1 across both classes, not just accuracy",
  ];

  const flowSteps = [
    { title: "Text Input", description: "User submits text, YouTube URL, or chatroom message" },
    { title: "Preprocessing", description: "NLTK tokenization → stopword removal → TF-IDF vectorization" },
    { title: "Classification", description: "LinearSVC predicts hate/clean with confidence score" },
    { title: "YouTube Pipeline", description: "youtube-comment-downloader fetches comments → batch classify → toxicity report" },
    { title: "Chatroom Moderation", description: "SocketIO intercepts message → classify → rewrite if toxic → broadcast polite version" },
    { title: "Response", description: "Result returned with label, confidence, and keyword highlights" },
  ];

  const designDecisions = [
    { decision: "TF-IDF + LinearSVC over deep learning", reason: "Lightweight, fast inference, and interpretable — ideal for real-time moderation without GPU requirements" },
    { decision: "SocketIO for chatroom", reason: "Real-time bidirectional communication enables live message interception and rewriting without page reload" },
    { decision: "YouTube comment integration", reason: "Demonstrates real-world applicability — not just a toy classifier but a usable moderation tool" },
    { decision: "Macro F1 as primary metric", reason: "Balanced evaluation across both classes prevents the model from ignoring the minority hate speech class" },
  ];

  const limitations = [
    "Model accuracy limited by dataset size (6,424 samples)",
    "No context window — classifies each message independently",
    "YouTube API rate limits affect large comment volumes",
    "Chatroom rewriting quality depends on LLM prompt tuning",
    "No multilingual support — English only",
  ];

  const learnings = [
    "End-to-end NLP pipeline from raw text to deployed API",
    "Real-time SocketIO architecture for live moderation",
    "Evaluation discipline — Macro F1 over raw accuracy",
    "Integrating third-party APIs (YouTube) into ML pipelines",
    "Deployment constraints and CI/CD with Render",
    "Balancing inference speed vs model complexity",
  ];

  const evidence = [
    { src: "/projects/hate-speech/01-youtube-home.png", alt: "YouTube Home", caption: "fig.01 — YouTube URL input for comment analysis", category: "YOUTUBE" },
    { src: "/projects/hate-speech/02-youtube-results.png", alt: "YouTube Results", caption: "fig.02 — Per-comment toxicity scores and labels", category: "YOUTUBE" },
    { src: "/projects/hate-speech/03-youtube-results-full.png", alt: "Full Results", caption: "fig.03 — Full comment analysis report", category: "YOUTUBE" },
    { src: "/projects/hate-speech/04-comment-list.png", alt: "Comment List", caption: "fig.04 — Classified comment list with highlights", category: "RESULTS" },
    { src: "/projects/hate-speech/05-insights-panel.png", alt: "Insights Panel", caption: "fig.05 — Toxicity insights and breakdown panel", category: "INSIGHTS", pair: true },
    { src: "/projects/hate-speech/06-insights-scans.png", alt: "Scans", caption: "fig.06 — Scan history and batch results", category: "INSIGHTS", pair: true },
    { src: "/projects/hate-speech/07-chatroom-home.png", alt: "Chatroom Home", caption: "fig.07 — AI polite chatroom entry screen", category: "CHATROOM" },
    { src: "/projects/hate-speech/07-chatroom-result.png", alt: "Chatroom Result", caption: "fig.08 — Real-time hate speech detection in chatroom", category: "CHATROOM" },
    { src: "/projects/hate-speech/08-chatroom-result.png", alt: "Chatroom Moderation", caption: "fig.09 — Moderated message rewritten as polite version", category: "CHATROOM" },
    { src: "/projects/hate-speech/09-polite-conversion.png", alt: "Polite Conversion", caption: "fig.10 — AI polite conversion output", category: "CHATROOM" },
  ];

  return (
    <div ref={rootRef} className="min-h-screen bg-background">
      <div className="fixed left-4 top-4 z-50">
        <Button variant="outline" size="sm" onClick={goBackToProjects}>Back</Button>
      </div>
      <header className="border-b border-border">
        <div className="container mx-auto px-6 py-24">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-semibold tracking-tight mb-6">Hate Speech Detection</h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
              NLP classifier + live YouTube comment analyser + AI polite chatroom with real-time SocketIO moderation. 78.5% accuracy, Macro F1: 0.78 on 6,424 samples.
            </p>
            <div className="flex flex-wrap gap-2 mt-10">
              {["Flask","TF-IDF","LinearSVC","NLTK","SocketIO","scikit-learn","Render"].map(t=>(
                <span key={t} className="font-mono text-xs text-muted-foreground px-3 py-1.5 rounded-full border border-border">{t}</span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 mt-10">
              <Button variant="outline" asChild><a href="https://github.com/girishk03/hate-speech-detection" target="_blank" rel="noopener noreferrer">View Code</a></Button>
              <Button variant="outline" asChild><a href="https://hate-speech-detection-zqjy.onrender.com" target="_blank" rel="noopener noreferrer">Live Demo</a></Button>
              <Button variant="outline" asChild><Link to="/">Back to Portfolio</Link></Button>
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-6 py-24 space-y-28">
        <section>
          <SectionHeader number="01" title="Problem Statement" subtitle="The moderation gap" />
          <div className="max-w-3xl">
            <div className="rounded-xl border border-border bg-card p-8">
              <p className="text-lg text-foreground leading-relaxed">Online hate speech is growing faster than manual moderation can handle. YouTube comment sections, chatrooms, and social feeds generate millions of messages daily that no human team can review.</p>
              <p className="text-muted-foreground mt-4 leading-relaxed"><strong className="text-foreground">Hate Speech Detection</strong> demonstrates a <span className="text-primary">lightweight NLP classification workflow</span> with <span className="text-accent"> SocketIO chatroom assistance</span> and a <span className="text-terminal"> YouTube comment-analysis interface</span>, with human review required for moderation decisions.</p>
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
          <SectionHeader number="03" title="System Architecture" subtitle="Layered component design" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <ArchCard title="NLP Pipeline" icon={<Brain className="w-5 h-5"/>} items={["NLTK tokenization","Stopword removal","TF-IDF vectorization","LinearSVC inference"]} accent="primary"/>
            <ArchCard title="Flask Backend" icon={<Shield className="w-5 h-5"/>} items={["REST API endpoints","SocketIO server","YouTube comment fetcher","Batch classification"]} accent="accent"/>
            <ArchCard title="Chatroom" icon={<MessageSquare className="w-5 h-5"/>} items={["Real-time SocketIO","Message interception","AI rewriting","Broadcast moderation"]} accent="terminal"/>
            <ArchCard title="YouTube Analyser" icon={<Youtube className="w-5 h-5"/>} items={["URL-based comment fetch","Batch toxicity scoring","Keyword highlighting","Per-comment results"]} accent="primary"/>
          </div>
        </section>
        <section>
          <SectionHeader number="04" title="Data & Control Flow" subtitle="Request pipeline step-by-step" />
          <div className="max-w-2xl">
            {flowSteps.map((s,i)=><FlowStep key={i} number={i+1} title={s.title} description={s.description} isLast={i===flowSteps.length-1}/>)}
          </div>
        </section>
        <section>
          <SectionHeader number="05" title="Model Performance" subtitle="Evaluation results" />
          <div className="max-w-3xl">
            <div className="rounded-xl border border-border bg-card p-8">
              <div className="flex items-start gap-4 mb-4">
                <Zap className="w-8 h-8 text-accent flex-shrink-0"/>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">TF-IDF + LinearSVC Results</h3>
                  <p className="text-muted-foreground mt-2">Evaluated on 6,424 test samples with balanced class distribution.</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                {[{label:"Accuracy",value:"78.5%"},{label:"Macro F1",value:"0.78"},{label:"Test Samples",value:"6,424"}].map(m=>(
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
          <div className="grid gap-10 md:grid-cols-[minmax(260px,360px)_1fr] md:gap-16">
            <div className="md:sticky md:top-24 md:self-start">
              <SectionHeader number="06" title="Execution Evidence" subtitle="System UI snapshots"/>
            </div>
            <div className="grid gap-8">
              {evidence.map((img, i) => {
                if (img.src === "/projects/hate-speech/05-insights-panel.png") {
                  const next = evidence[i + 1];
                  return (
                    <div key={i} className="grid grid-cols-2 gap-4">
                      <EvidenceImage src={img.src} alt={img.alt} caption={img.caption} category={img.category}/>
                      {next && <EvidenceImage src={next.src} alt={next.alt} caption={next.caption} category={next.category}/>}
                    </div>
                  );
                }
                if (img.src === "/projects/hate-speech/06-insights-scans.png") return null;
                return <EvidenceImage key={i} src={img.src} alt={img.alt} caption={img.caption} category={img.category}/>;
              })}
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
              "Hate Speech Detection is a moderation-assistance prototype combining a verified classifier with Flask interfaces while documenting dataset licensing, privacy, and human-review limitations."
            </blockquote>
          </div>
        </section>
      </main>
      <footer className="border-t border-border pt-2 pb-10">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center gap-4">
              <Button variant="outline" asChild><a href="https://github.com/girishk03/hate-speech-detection" target="_blank" rel="noopener noreferrer"><Github className="w-4 h-4 mr-2"/>View Code on GitHub</a></Button>
              <Button variant="outline" asChild><a href="https://hate-speech-detection-zqjy.onrender.com" target="_blank" rel="noopener noreferrer">Live Demo</a></Button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">Project documentation for academic portfolio purposes.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default HateSpeechDetection;
