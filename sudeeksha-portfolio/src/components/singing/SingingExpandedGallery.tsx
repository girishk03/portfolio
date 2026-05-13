import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import p1 from "@/assets/portraits/11.jpg";
import p2 from "@/assets/portraits/12.jpg";
import p3 from "@/assets/portraits/13.jpg";
import p4 from "@/assets/portraits/14.jpg";

const galleryImages = [
  { src: p1, alt: "Sudeeksha portrait 1", size: "large" },
  { src: p2, alt: "Sudeeksha on stage", size: "tall" },
  { src: p3, alt: "Live performance moment", size: "small" },
  { src: p4, alt: "Stage portrait", size: "large" },
  { src: p1, alt: "Portrait 5", size: "small" },
  { src: p2, alt: "Performance 6", size: "tall" },
  { src: p3, alt: "Concert moment 7", size: "large" },
  { src: p4, alt: "Stage photo 8", size: "small" },
];

const videoThumbnails = [
  { id: 1, title: "Devotional Performance", duration: "3:45" },
  { id: 2, title: "Stage Performance", duration: "4:20" },
  { id: 3, title: "Rehearsal Session", duration: "2:15" },
  { id: 4, title: "Live Concert", duration: "5:30" },
];

export const SingingExpandedGallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"photos" | "videos">("photos");

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % galleryImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  return (
    <section className="bg-black/35 backdrop-blur-[2px] py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-white/80">
            Gallery
          </p>
          <h2 className="text-3xl font-medium text-white md:text-4xl">Gallery</h2>
          <div className="mx-auto mt-6 h-px w-20 bg-primary/35" />
        </div>

        {/* Tabs */}
        <div className="mb-8 flex justify-center gap-4">
          <button
            onClick={() => setActiveTab("photos")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === "photos"
                ? "bg-primary text-primary-foreground"
                : "bg-white/10 text-white/70 hover:bg-white/20"
            }`}
          >
            Photos
          </button>
          <button
            onClick={() => setActiveTab("videos")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === "videos"
                ? "bg-primary text-primary-foreground"
                : "bg-white/10 text-white/70 hover:bg-white/20"
            }`}
          >
            Videos
          </button>
        </div>

        {/* Photos Grid */}
        {activeTab === "photos" && (
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
              {galleryImages.map((img, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => openLightbox(index)}
                  className={`relative overflow-hidden cursor-pointer group ${
                    img.size === "large"
                      ? "col-span-2 row-span-2"
                      : img.size === "tall"
                      ? "row-span-2"
                      : ""
                  }`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white text-sm font-medium">View</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Videos Grid */}
        {activeTab === "videos" && (
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {videoThumbnails.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative aspect-video overflow-hidden rounded-lg cursor-pointer group bg-black/60"
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-colors">
                      <svg
                        className="w-6 h-6 text-white ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-white text-sm font-medium truncate">{video.title}</p>
                    <p className="text-white/60 text-xs">{video.duration}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center"
              onClick={closeLightbox}
            >
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <ChevronLeft className="w-8 h-8 text-white" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <ChevronRight className="w-8 h-8 text-white" />
              </button>

              <motion.img
                key={selectedImage}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                src={galleryImages[selectedImage].src}
                alt={galleryImages[selectedImage].alt}
                className="max-h-[90vh] max-w-[90vw] object-contain"
                onClick={(e) => e.stopPropagation()}
              />

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
                {selectedImage + 1} / {galleryImages.length}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
