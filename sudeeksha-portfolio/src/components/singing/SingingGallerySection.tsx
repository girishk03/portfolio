import p1 from "@/assets/portraits/11.jpg";
import p2 from "@/assets/portraits/12.jpg";
import p3 from "@/assets/portraits/13.jpg";
import p4 from "@/assets/portraits/14.jpg";

const gallery = [
  { src: p1, alt: "Sudeeksha portrait" },
  { src: p2, alt: "Sudeeksha on stage" },
  { src: p3, alt: "Live performance moment" },
  { src: p4, alt: "Stage portrait" },
];

export const SingingGallerySection = () => {
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

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2">
          {gallery.map((img) => (
            <div
              key={img.alt}
              className="aspect-[2/3] overflow-hidden rounded-2xl bg-black/20"
            >
              <img
                src={img.src}
                alt={img.alt}
                draggable={false}
                className="h-full w-full select-none object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
