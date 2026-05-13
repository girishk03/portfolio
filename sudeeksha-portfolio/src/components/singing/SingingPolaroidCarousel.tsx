import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Grid3X3, Plus, X } from "lucide-react";
import p1 from "@/assets/portraits/11.jpg";
import p2 from "@/assets/portraits/12.jpg";
import p3 from "@/assets/portraits/13.jpg";
import p4 from "@/assets/portraits/14.jpg";
import p5 from "@/assets/portraits/21.jpg";
import p6 from "@/assets/portraits/22.jpg";
import p7 from "@/assets/portraits/23.jpg";
import p8 from "@/assets/portraits/24.jpg";

const originals = [p1, p2, p3, p4, p5, p6, p7, p8];
const images = [...originals, originals[0]];
const placeholders = 2;

export const SingingPolaroidCarousel = () => {
  const [index, setIndex] = useState(0);
  const [transition, setTransition] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIndex((i) => i + 1);
    }, 3000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (index === originals.length) {
      setTimeout(() => {
        setTransition(false);
        setIndex(0);
      }, 700);

      setTimeout(() => {
        setTransition(true);
      }, 750);
    }
  }, [index]);

  useEffect(() => {
    if (!galleryOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedIndex(null);
        setGalleryOpen(false);
        return;
      }

      if (selectedIndex === null) return;

      if (e.key === "ArrowRight") {
        setSelectedIndex((i) => (i === null ? 0 : (i + 1) % originals.length));
      }
      if (e.key === "ArrowLeft") {
        setSelectedIndex((i) =>
          i === null ? 0 : (i - 1 + originals.length) % originals.length
        );
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [galleryOpen, selectedIndex]);

  const openGallery = () => setGalleryOpen(true);
  const closeGallery = () => {
    setSelectedIndex(null);
    setGalleryOpen(false);
  };

  const openViewer = (i: number) => setSelectedIndex(i);
  const closeViewer = () => setSelectedIndex(null);
  const next = () =>
    setSelectedIndex((i) => (i === null ? 0 : (i + 1) % originals.length));
  const prev = () =>
    setSelectedIndex((i) =>
      i === null ? 0 : (i - 1 + originals.length) % originals.length
    );

  const onViewerTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    setTouchStartX(e.touches[0].clientX);
  };

  const onViewerTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const endX = e.changedTouches[0]?.clientX;
    if (typeof endX !== "number") return;

    const delta = endX - touchStartX;
    setTouchStartX(null);

    if (Math.abs(delta) < 50) return;
    if (delta < 0) next();
    if (delta > 0) prev();
  };

  return (
    <section className="bg-black/35 backdrop-blur-[2px] py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-white/80">
            Gallery
          </p>
          <h2 className="text-3xl font-medium text-white md:text-4xl">Photos</h2>
          <div className="mx-auto mt-6 h-px w-20 bg-primary/35" />
        </div>

        <div className="mx-auto max-w-md">
          <div className="relative aspect-[2/3] overflow-hidden bg-black">
            <div
              className="flex h-full w-full"
              style={{
                transform: `translateX(-${index * 100}%)`,
                transition: transition
                  ? "transform 700ms cubic-bezier(.2,.9,.2,1)"
                  : "none",
              }}
            >
              {images.map((src, i) => (
                <div
                  key={i}
                  className="h-full w-full flex-shrink-0 overflow-hidden"
                >
                  <img
                    src={src}
                    alt={`Sudeeksha ${(i % originals.length) + 1}`}
                    className="h-full w-full object-cover scale-105"
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={openGallery}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-medium text-white/80 hover:bg-white/20 transition-colors"
            >
              <Grid3X3 className="h-4 w-4" />
              View all photos
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {galleryOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/95"
          >
            <div className="absolute inset-0" onClick={closeGallery} />

            <div className="relative mx-auto h-full w-full max-w-6xl px-4 py-4 md:px-8 md:py-8">
              <div className="mb-5 flex items-center justify-between">
                <div className="text-white/80 text-sm">Gallery</div>
                <button
                  type="button"
                  onClick={closeGallery}
                  className="rounded-full bg-white/10 p-2 hover:bg-white/20 transition-colors"
                >
                  <X className="h-6 w-6 text-white" />
                </button>
              </div>

              <div className="h-[calc(100%-52px)] overflow-auto">
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4">
                  {originals.map((src, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openViewer(i);
                      }}
                      className="relative aspect-square overflow-hidden bg-black/40"
                    >
                      <img
                        src={src}
                        alt={`Sudeeksha ${i + 1}`}
                        className="h-full w-full object-cover"
                        draggable={false}
                      />
                    </button>
                  ))}

                  {Array.from({ length: placeholders }).map((_, i) => (
                    <div
                      key={`placeholder-${i}`}
                      className="relative aspect-square overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center"
                    >
                      <div className="flex flex-col items-center gap-2 text-white/50">
                        <div className="rounded-full bg-white/5 p-3 border border-white/10">
                          <Plus className="h-5 w-5" />
                        </div>
                        <div className="text-xs">Empty</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <AnimatePresence>
              {selectedIndex !== null && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-10 bg-black/95 flex items-center justify-center"
                  onClick={closeViewer}
                  onTouchStart={onViewerTouchStart}
                  onTouchEnd={onViewerTouchEnd}
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      closeViewer();
                    }}
                    className="absolute top-4 right-4 z-20 rounded-full bg-white/10 p-2 hover:bg-white/20 transition-colors"
                  >
                    <X className="h-6 w-6 text-white" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      prev();
                    }}
                    className="absolute left-4 z-20 rounded-full bg-white/10 p-2 hover:bg-white/20 transition-colors"
                  >
                    <ChevronLeft className="h-8 w-8 text-white" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      next();
                    }}
                    className="absolute right-4 z-20 rounded-full bg-white/10 p-2 hover:bg-white/20 transition-colors"
                  >
                    <ChevronRight className="h-8 w-8 text-white" />
                  </button>

                  <motion.img
                    key={selectedIndex}
                    initial={{ scale: 0.98, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.98, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    src={originals[selectedIndex]}
                    alt={`Sudeeksha ${selectedIndex + 1}`}
                    className="max-h-[90vh] max-w-[92vw] object-contain"
                    onClick={(e) => e.stopPropagation()}
                    draggable={false}
                  />

                  <div
                    className="absolute bottom-14 left-0 right-0 mx-auto w-full max-w-[92vw] px-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex gap-2 overflow-x-auto py-2">
                      {originals.map((src, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setSelectedIndex(i)}
                          className={`h-14 w-14 flex-shrink-0 overflow-hidden border transition-colors ${
                            i === selectedIndex
                              ? "border-white/80"
                              : "border-white/15 hover:border-white/40"
                          }`}
                        >
                          <img
                            src={src}
                            alt={`Thumb ${i + 1}`}
                            className="h-full w-full object-cover"
                            draggable={false}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
                    {selectedIndex + 1} / {originals.length}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
