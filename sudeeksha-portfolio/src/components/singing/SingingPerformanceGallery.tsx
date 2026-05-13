import { useMemo, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";

const devotional = {
  title: "Devotional Singing",
  subtitle: "Featured video",
  description:
    "A soulful devotional performance — calm, expressive, and heartfelt. Best experienced with headphones.",
};

const favoriteSinger = {
  name: "Shreya Ghoshal",
  subtitle: "My Favourite Singer",
  description:
    "Shreya Ghoshal is an acclaimed Indian playback singer known for her melodious voice and versatile repertoire across multiple Indian languages. She has received numerous awards for her contributions to Indian music.",
  videoPath: "/media/shreyaaa.mp4",
};

// Other performance links removed — keeping devotional video only

export const SingingPerformanceGallery = () => {
  const devotionalVideoUrl = useMemo(() => "/devotional.mp4", []);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [errored, setErrored] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [theatreOpen, setTheatreOpen] = useState(false);
  const [theatreVideo, setTheatreVideo] = useState<
    "devotional" | "shreya_old" | "shreya_new"
  >("devotional");

  // Shreya reel state
  const shreyaOldVideoUrl = useMemo(() => "/media/shreya-ghoshal.mp4", []);
  const shreyaNewVideoUrl = useMemo(() => favoriteSinger.videoPath, []);
  const [shreyaVariant, setShreyaVariant] = useState<"old" | "new">("new");
  const shreyaVideoUrl = shreyaVariant === "new" ? shreyaNewVideoUrl : shreyaOldVideoUrl;
  const shreyaRef = useRef<HTMLVideoElement>(null);
  const shreyaContainerRef = useRef<HTMLDivElement>(null);
  const [shReady, setShReady] = useState(false);
  const [shErrored, setShErrored] = useState(false);
  const [shPlaying, setShPlaying] = useState(false);
  const [shShowControls, setShShowControls] = useState(true);
  const [shFullscreen, setShFullscreen] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const togglePlayShreya = () => {
    if (shreyaRef.current) {
      if (shreyaRef.current.paused) {
        shreyaRef.current.play();
        setShPlaying(true);
      } else {
        shreyaRef.current.pause();
        setShPlaying(false);
      }
    }
  };

  const enterShreyaFullscreen = async () => {
    if (!shreyaContainerRef.current) return;
    try {
      if (shreyaContainerRef.current.requestFullscreen) {
        await shreyaContainerRef.current.requestFullscreen();
      } else if ((shreyaContainerRef.current as any).webkitRequestFullscreen) {
        await (shreyaContainerRef.current as any).webkitRequestFullscreen();
      } else if ((shreyaContainerRef.current as any).mozRequestFullScreen) {
        await (shreyaContainerRef.current as any).mozRequestFullScreen();
      } else if ((shreyaContainerRef.current as any).msRequestFullscreen) {
        await (shreyaContainerRef.current as any).msRequestFullscreen();
      }
      setShFullscreen(true);
    } catch (err) {
      console.error("Error entering shreya fullscreen:", err);
    }
  };

  const exitShreyaFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if ((document as any).webkitExitFullscreen) {
      (document as any).webkitExitFullscreen();
    } else if ((document as any).mozCancelFullScreen) {
      (document as any).mozCancelFullScreen();
    } else if ((document as any).msExitFullscreen) {
      (document as any).msExitFullscreen();
    }
    setShFullscreen(false);
  };

  const enterFullscreen = async () => {
    if (!containerRef.current) return;
    
    try {
      if (containerRef.current.requestFullscreen) {
        await containerRef.current.requestFullscreen();
      } else if ((containerRef.current as any).webkitRequestFullscreen) {
        await (containerRef.current as any).webkitRequestFullscreen();
      } else if ((containerRef.current as any).mozRequestFullScreen) {
        await (containerRef.current as any).mozRequestFullScreen();
      } else if ((containerRef.current as any).msRequestFullscreen) {
        await (containerRef.current as any).msRequestFullscreen();
      }
      setIsFullscreen(true);
    } catch (err) {
      console.error("Error entering fullscreen:", err);
    }
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if ((document as any).webkitExitFullscreen) {
      (document as any).webkitExitFullscreen();
    } else if ((document as any).mozCancelFullScreen) {
      (document as any).mozCancelFullScreen();
    } else if ((document as any).msExitFullscreen) {
      (document as any).msExitFullscreen();
    }
    setIsFullscreen(false);
  };

  const theatreOrder: Array<"devotional" | "shreya_old" | "shreya_new"> = [
    "devotional",
    "shreya_old",
    "shreya_new",
  ];

  const openTheatre = (which: "devotional" | "shreya_old" | "shreya_new") => {
    setTheatreVideo(which);
    setTheatreOpen(true);
  };

  const closeTheatre = () => {
    setTheatreOpen(false);
  };

  const theatreNext = () => {
    setTheatreVideo((v) => {
      const idx = theatreOrder.indexOf(v);
      return theatreOrder[(idx + 1) % theatreOrder.length];
    });
  };

  const theatrePrev = () => {
    setTheatreVideo((v) => {
      const idx = theatreOrder.indexOf(v);
      return theatreOrder[(idx - 1 + theatreOrder.length) % theatreOrder.length];
    });
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement
      );
      setIsFullscreen(isCurrentlyFullscreen);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("msfullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
      document.removeEventListener("msfullscreenchange", handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    if (!theatreOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeTheatre();
        return;
      }
      if (e.key === "ArrowRight") theatreNext();
      if (e.key === "ArrowLeft") theatrePrev();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [theatreOpen]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => {
      setIsPlaying(true);
      setShowControls(false);
    };
    const handlePause = () => {
      setIsPlaying(false);
      setShowControls(true);
    };
    const handleClick = () => {
      setShowControls(true);
      if (isPlaying) {
        setTimeout(() => setShowControls(false), 2000);
      }
    };

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("click", handleClick);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("click", handleClick);
    };
  }, [isPlaying]);

  useEffect(() => {
    const video = shreyaRef.current;
    if (!video) return;

    const handlePlay = () => {
      setShPlaying(true);
      setShShowControls(false);
    };
    const handlePause = () => {
      setShPlaying(false);
      setShShowControls(true);
    };
    const handleClick = () => {
      setShShowControls(true);
      if (shPlaying) {
        setTimeout(() => setShShowControls(false), 2000);
      }
    };

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("click", handleClick);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("click", handleClick);
    };
  }, [shPlaying]);

  return (
    <section id="performances" className="bg-black/35 backdrop-blur-[2px] py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-white/80">
            Performances
          </p>
          <h2 className="text-3xl font-medium text-white md:text-4xl">Performances</h2>
          <div className="mx-auto mt-6 h-px w-20 bg-primary/35" />
        </div>

        <div className="mx-auto max-w-5xl">

          {/* Devotional reel: caption left, vertical video right */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.25 }}
            className="rounded-3xl bg-white/5 p-5 md:p-6 border border-white/10"
          >
            <div className="grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-center">
              {/* Caption / devotional text – left */}
              <div className="space-y-3 text-left">
                <p className="text-[11px] uppercase tracking-[0.3em] text-white/70">
                  Devotional Singing
                </p>
                <h3 className="text-2xl md:text-3xl font-medium text-white">
                  {devotional.title}
                </h3>
                <p className="text-sm md:text-base text-white/75 max-w-xl">
                  {devotional.description}
                </p>
                <p className="text-xs text-white/60">
                  Shot in a calm, intimate setting — framed in a vertical, reel-style format.
                </p>
              </div>

              {/* Vertical reel video – right */}
              <div className="flex justify-end">
                <motion.div
                  ref={containerRef}
                  whileHover={!isFullscreen ? { y: -4 } : {}}
                  transition={{ type: "spring", stiffness: 220, damping: 18 }}
                  className={`relative w-full max-w-[260px] ${isFullscreen ? "fixed inset-0 z-[9999] flex items-center justify-center bg-black" : ""}`}
                  style={isFullscreen ? { maxWidth: "100vw", height: "100vh" } : {}}
                >
                  <div
                    className={`aspect-[9/16] w-full overflow-hidden rounded-2xl bg-black/60 border border-white/15 ${isFullscreen ? "aspect-[9/16] max-h-[100vh] max-w-[calc(100vh*9/16)] rounded-none border-0" : ""}`}
                  >
                    <video
                      ref={videoRef}
                      className="h-full w-full object-cover"
                      preload="metadata"
                      playsInline
                      controlsList="nodownload nofullscreen"
                      disablePictureInPicture
                      onLoadedMetadata={() => setReady(true)}
                      onCanPlay={() => setReady(true)}
                      onError={() => setErrored(true)}
                      onClick={togglePlay}
                    >
                      <source src={devotionalVideoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>

                    {/* Custom play/pause button */}
                    <AnimatePresence>
                      {(showControls || !isPlaying) && (
                        <motion.button
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.2 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            togglePlay();
                          }}
                          className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-10"
                        >
                          <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 0.3, repeat: isPlaying ? 0 : Infinity, repeatDelay: 1 }}
                            className="rounded-full bg-white/20 p-4 backdrop-blur-md"
                          >
                            {isPlaying ? (
                              <Pause className="h-8 w-8 text-white" fill="white" />
                            ) : (
                              <Play className="h-8 w-8 text-white ml-1" fill="white" />
                            )}
                          </motion.div>
                        </motion.button>
                      )}
                    </AnimatePresence>

                    {/* Fullscreen button */}
                    {!isFullscreen && (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          openTheatre("devotional");
                        }}
                        className="absolute bottom-4 right-4 rounded-full bg-black/60 p-2 backdrop-blur-md border border-white/20 hover:bg-black/80 transition-colors"
                        aria-label="Enter fullscreen"
                      >
                        <Maximize2 className="h-4 w-4 text-white" />
                      </motion.button>
                    )}

                    {isFullscreen && (
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          exitFullscreen();
                        }}
                        className="absolute top-4 right-4 rounded-full bg-black/60 p-2 backdrop-blur-md border border-white/20 hover:bg-black/80 transition-colors z-10"
                        aria-label="Exit fullscreen"
                      >
                        <Maximize2 className="h-4 w-4 text-white rotate-45" />
                      </motion.button>
                    )}
                  </div>

                  {/* Loading / error overlays */}
                  {!ready && !errored ? (
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                      <div className="rounded-full border border-white/20 bg-black/55 px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-white/80 backdrop-blur">
                        Loading devotional…
                      </div>
                    </div>
                  ) : null}

                  {errored ? (
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                      <div className="w-full rounded-2xl border border-white/20 bg-black/75 p-4 text-center backdrop-blur">
                        <div className="text-xs font-medium text-white">Video couldn’t load here.</div>
                        <div className="mt-2 text-xs text-white/75">
                          Open directly:{" "}
                          <a
                            className="text-primary underline underline-offset-4 pointer-events-auto"
                            href={devotionalVideoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            devotional.mp4
                          </a>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Shreya Ghoshal reel (vertical) — placed after devotional */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.25 }}
            className="rounded-3xl bg-white/5 p-5 md:p-6 border border-white/10 mt-8"
          >
            <div className="grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-center">
              <div className="space-y-3 text-left">
                <p className="text-[11px] uppercase tracking-[0.3em] text-white/70">
                  {favoriteSinger.subtitle}
                </p>
                <h3 className="text-2xl md:text-3xl font-medium text-white">{favoriteSinger.name}</h3>
                <p className="text-sm md:text-base text-white/75 max-w-xl">{favoriteSinger.description}</p>

                <div className="pt-2">
                  <div className="inline-flex items-center rounded-full bg-white/5 p-1 border border-white/10">
                    <button
                      type="button"
                      onClick={() => {
                        setShreyaVariant("old");
                        setShReady(false);
                        setShErrored(false);
                        setShPlaying(false);
                        setShShowControls(true);
                      }}
                      className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                        shreyaVariant === "old"
                          ? "bg-primary text-primary-foreground"
                          : "text-white/70 hover:text-white"
                      }`}
                    >
                      Video 1
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShreyaVariant("new");
                        setShReady(false);
                        setShErrored(false);
                        setShPlaying(false);
                        setShShowControls(true);
                      }}
                      className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                        shreyaVariant === "new"
                          ? "bg-primary text-primary-foreground"
                          : "text-white/70 hover:text-white"
                      }`}
                    >
                      Video 2
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <div className="relative w-full max-w-[260px]">
                  <motion.div
                    ref={shreyaContainerRef}
                    whileHover={!shFullscreen ? { y: -4 } : {}}
                    transition={{ type: "spring", stiffness: 220, damping: 18 }}
                    className={`relative w-full ${shFullscreen ? "fixed inset-0 z-[9999] flex items-center justify-center bg-black" : ""}`}
                    style={shFullscreen ? { maxWidth: "100vw", height: "100vh" } : {}}
                  >
                    <div className={`aspect-[9/16] w-full overflow-hidden rounded-2xl bg-black/60 border border-white/15 ${shFullscreen ? "aspect-[9/16] max-h-[100vh] max-w-[calc(100vh*9/16)] rounded-none border-0" : ""}`}>
                      <video
                        key={shreyaVideoUrl}
                        ref={shreyaRef}
                        className="h-full w-full object-cover"
                        preload="metadata"
                        playsInline
                        controlsList="nodownload nofullscreen"
                        disablePictureInPicture
                        onLoadedMetadata={() => setShReady(true)}
                        onCanPlay={() => setShReady(true)}
                        onError={() => setShErrored(true)}
                        onClick={togglePlayShreya}
                      >
                        <source src={shreyaVideoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>

                      {/* Custom play/pause button for Shreya */}
                      <AnimatePresence>
                        {(shShowControls || !shPlaying) && (
                          <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.2 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              togglePlayShreya();
                            }}
                            className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-10"
                          >
                            <motion.div
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ duration: 0.3, repeat: shPlaying ? 0 : Infinity, repeatDelay: 1 }}
                              className="rounded-full bg-white/20 p-4 backdrop-blur-md"
                            >
                              {shPlaying ? (
                                <Pause className="h-8 w-8 text-white" fill="white" />
                              ) : (
                                <Play className="h-8 w-8 text-white ml-1" fill="white" />
                              )}
                            </motion.div>
                          </motion.button>
                        )}
                      </AnimatePresence>

                      {/* Fullscreen button for Shreya */}
                      {!shFullscreen && (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            openTheatre(shreyaVariant === "new" ? "shreya_new" : "shreya_old");
                          }}
                          className="absolute bottom-4 right-4 rounded-full bg-black/60 p-2 backdrop-blur-md border border-white/20 hover:bg-black/80 transition-colors"
                          aria-label="Enter fullscreen"
                        >
                          <Maximize2 className="h-4 w-4 text-white" />
                        </motion.button>
                      )}

                      {shFullscreen && (
                        <motion.button
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            exitShreyaFullscreen();
                          }}
                          className="absolute top-4 right-4 rounded-full bg-black/60 p-2 backdrop-blur-md border border-white/20 hover:bg-black/80 transition-colors z-10"
                          aria-label="Exit fullscreen"
                        >
                          <Maximize2 className="h-4 w-4 text-white rotate-45" />
                        </motion.button>
                      )}
                    </div>

                    {/* Loading / error overlays for Shreya */}
                    {!shReady && !shErrored ? (
                      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                        <div className="rounded-full border border-white/20 bg-black/55 px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-white/80 backdrop-blur">
                          Loading video…
                        </div>
                      </div>
                    ) : null}

                    {shErrored ? (
                      <div className="absolute inset-0 flex items-center justify-center p-4">
                        <div className="w-full rounded-2xl border border-white/20 bg-black/75 p-4 text-center backdrop-blur">
                          <div className="text-xs font-medium text-white">Video couldn’t load here.</div>
                          <div className="mt-2 text-xs text-white/75">
                            Open directly: {" "}
                            <a className="text-primary underline underline-offset-4 pointer-events-auto" href={shreyaVideoUrl} target="_blank" rel="noopener noreferrer">
                              {favoriteSinger.name}
                            </a>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Removed other performance cards — devotional video retained above */}
        </div>
      </div>

      <AnimatePresence>
        {theatreOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/95"
          >
            <div className="absolute inset-0" onClick={closeTheatre} />

            <div className="relative mx-auto flex h-full w-full max-w-6xl items-center justify-center px-4 py-6">
              <button
                type="button"
                onClick={closeTheatre}
                className="absolute top-4 right-4 z-10 rounded-full bg-white/10 p-2 hover:bg-white/20 transition-colors"
                aria-label="Close"
              >
                <X className="h-6 w-6 text-white" />
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  theatrePrev();
                }}
                className="absolute left-4 z-10 rounded-full bg-white/10 p-2 hover:bg-white/20 transition-colors"
                aria-label="Previous video"
              >
                <ChevronLeft className="h-8 w-8 text-white" />
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  theatreNext();
                }}
                className="absolute right-4 z-10 rounded-full bg-white/10 p-2 hover:bg-white/20 transition-colors"
                aria-label="Next video"
              >
                <ChevronRight className="h-8 w-8 text-white" />
              </button>

              <div className="w-full" onClick={(e) => e.stopPropagation()}>
                <div className="mx-auto w-full max-w-[520px]">
                  <div className="aspect-[9/16] w-full overflow-hidden rounded-2xl bg-black/60 border border-white/15">
                    <video
                      key={theatreVideo}
                      className="h-full w-full object-contain"
                      controls
                      playsInline
                      preload="metadata"
                      controlsList="nodownload"
                      disablePictureInPicture
                    >
                      <source
                        src={
                          theatreVideo === "devotional"
                            ? devotionalVideoUrl
                            : theatreVideo === "shreya_new"
                              ? shreyaNewVideoUrl
                              : shreyaOldVideoUrl
                        }
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <div className="mt-3 text-center text-sm text-white/70">
                    {theatreVideo === "devotional"
                      ? devotional.title
                      : theatreVideo === "shreya_new"
                        ? "Video 2"
                        : "Video 1"}
                  </div>
                  <div className="mt-1 text-center text-xs text-white/50">
                    Tip: use Left/Right arrow keys to switch videos, Esc to close.
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
