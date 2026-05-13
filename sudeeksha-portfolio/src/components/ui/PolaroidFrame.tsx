import { cn } from "@/lib/utils";

interface PolaroidFrameProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: "portrait" | "square" | "landscape";
}

export const PolaroidFrame = ({ 
  src, 
  alt, 
  className,
  aspectRatio = "portrait" 
}: PolaroidFrameProps) => {
  const aspectRatioClasses = {
    portrait: "aspect-[3/4]",
    square: "aspect-square",
    landscape: "aspect-[4/3]"
  };

  return (
    <div 
      className={cn(
        "relative group",
        "bg-white",
        "p-4 pb-12",
        "rounded-sm",
        "shadow-[0_18px_45px_rgba(0,0,0,0.12)]",
        "ring-1 ring-black/5",
        "transition-transform duration-300",
        "hover:-translate-y-1",
        "max-w-sm mx-auto",
        "select-none",
        className
      )}
      style={{
        backgroundColor: "#fbfaf8",
        backgroundImage: `
          radial-gradient(circle at 20% 10%, rgba(0,0,0,0.02) 0 1px, transparent 1px),
          radial-gradient(circle at 80% 30%, rgba(0,0,0,0.02) 0 1px, transparent 1px),
          radial-gradient(circle at 40% 70%, rgba(0,0,0,0.02) 0 1px, transparent 1px),
          radial-gradient(circle at 70% 85%, rgba(0,0,0,0.02) 0 1px, transparent 1px)
        `
      }}
    >
      {/* Subtle grain texture overlay */}
      <div 
        className="absolute inset-0 rounded-sm opacity-25 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-radial-gradient(
              circle at 0 0,
              rgba(0,0,0,0.06) 0,
              rgba(0,0,0,0.06) 1px,
              transparent 1px,
              transparent 3px
            )
          `,
          mixBlendMode: "multiply"
        }}
      />

      {/* Photo area */}
      <div className={cn(
        "relative overflow-hidden bg-neutral-100",
        aspectRatioClasses[aspectRatio]
      )}>
        <img
          src={src}
          alt={alt}
          className={cn(
            "h-full w-full object-cover object-center",
            "transition-transform duration-700",
            "group-hover:scale-[1.03]"
          )}
          draggable={false}
        />

        {/* Subtle vignette effect */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at center, rgba(255,255,255,0.00) 55%, rgba(0,0,0,0.10) 100%)",
            mixBlendMode: "multiply"
          }}
        />
      </div>

      {/* Polaroid shadow effect */}
      <div 
        className="absolute -bottom-1 left-4 right-4 h-2 bg-black/10 rounded-full blur-md"
        style={{
          transform: "translateY(2px)"
        }}
      />
    </div>
  );
};
