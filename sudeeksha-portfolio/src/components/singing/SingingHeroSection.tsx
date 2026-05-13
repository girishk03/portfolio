export const SingingHeroSection = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <div className="relative flex min-h-screen items-center">
        <div className="container mx-auto flex justify-end px-6 md:px-12 lg:px-20">
          <div className="max-w-xl text-right">
            <div className="ml-auto w-[280px] sm:w-[360px] md:w-[520px] lg:w-[640px]">
              <div className="text-center">
                <h1 className="font-playfair text-[clamp(48px,8vh,96px)] font-medium leading-none tracking-[0.14em] text-white">
                  SUDEEKSHA
                </h1>
                <p className="mt-4 text-sm font-medium tracking-[0.22em] text-white/80 md:text-base">
                  Singer <span className="mx-3 text-white/60">|</span> Live Performer
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-60">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-widest text-white/70">
            Scroll
          </span>
          <div className="h-12 w-[1px] bg-white/35" />
        </div>
      </div>
    </section>
  );
};
