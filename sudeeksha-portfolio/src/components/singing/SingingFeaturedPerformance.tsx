interface SingingFeaturedPerformanceProps {
  embedUrl: string;
}

export const SingingFeaturedPerformance = ({ embedUrl }: SingingFeaturedPerformanceProps) => {
  return (
    <section className="section-gradient py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-primary">
            Featured Performance
          </p>
          <h2 className="text-3xl font-medium text-foreground md:text-4xl">
            Live Vocal
          </h2>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="video-container gold-glow aspect-video">
            <iframe
              src={embedUrl}
              title="Featured Performance - Live Vocal"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
