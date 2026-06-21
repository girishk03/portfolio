import { ArrowDown, ArrowRight } from "lucide-react";

const SystemArchitecture = () => {
  const steps = [
    { label: "Input Source", description: "Video / Webcam / Image", color: "bg-primary/20 border-primary/40" },
    { label: "YOLOv8n Runtime", description: "Debris-proxy candidate detection", color: "bg-accent border-accent-foreground/20" },
    { label: "Frame Processing", description: "OpenCV pipeline", color: "bg-accent border-accent-foreground/20" },
    { label: "Visualization", description: "Bounding boxes + scores", color: "bg-primary/20 border-primary/40" },
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 md:p-8">
      <div className="hidden md:flex items-center justify-between gap-2">
        {steps.map((step, index) => (
          <div key={step.label} className="flex items-center gap-2 flex-1">
            <div className={`flex-1 border rounded-lg p-4 text-center ${step.color}`}>
              <div className="font-medium text-foreground text-sm mb-1">{step.label}</div>
              <div className="text-xs text-muted-foreground">{step.description}</div>
            </div>
            {index < steps.length - 1 && <ArrowRight className="w-5 h-5 text-primary flex-shrink-0" />}
          </div>
        ))}
      </div>

      <div className="md:hidden space-y-2">
        {steps.map((step, index) => (
          <div key={step.label} className="flex flex-col items-center">
            <div className={`w-full border rounded-lg p-4 text-center ${step.color}`}>
              <div className="font-medium text-foreground text-sm mb-1">{step.label}</div>
              <div className="text-xs text-muted-foreground">{step.description}</div>
            </div>
            {index < steps.length - 1 && <ArrowDown className="w-5 h-5 text-primary my-2" />}
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border flex flex-wrap gap-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 rounded px-3 py-1.5">
          <span className="w-2 h-2 rounded-full bg-primary" />
          Docker Container
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 rounded px-3 py-1.5">
          <span className="w-2 h-2 rounded-full bg-accent-foreground/70" />
          Streamlit Web App
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 rounded px-3 py-1.5">
          <span className="w-2 h-2 rounded-full bg-primary/70" />
          FastAPI REST
        </div>
      </div>
    </div>
  );
};

export default SystemArchitecture;
