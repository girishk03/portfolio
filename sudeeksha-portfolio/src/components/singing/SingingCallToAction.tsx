import { Instagram, Youtube, Mail } from "lucide-react";

const socialLinks = [
  {
    name: "Instagram",
    icon: Instagram,
    href: "",
  },
  {
    name: "YouTube",
    icon: Youtube,
    href: "",
  },
  {
    name: "Email",
    icon: Mail,
    href: "mailto:sudeeksha0724@gmail.com",
  },
];

export const SingingCallToAction = () => {
  return (
    <section className="bg-background/40 backdrop-blur-sm py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-primary">
            Let&apos;s Connect
          </p>
          <h2 className="mb-8 text-2xl font-medium text-foreground md:text-3xl">
            Open to collaborations and live performances
          </h2>

          <div className="flex justify-center gap-6">
            {socialLinks
              .filter((l) => Boolean(l.href))
              .map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  aria-label={link.name}
                  className="social-link text-muted-foreground"
                >
                  <link.icon className="h-5 w-5" />
                </a>
              ))}
          </div>
        </div>
      </div>

      <div className="mt-24 border-t border-border">
        <div className="container mx-auto px-6 py-8 md:px-12 lg:px-20">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} · All rights reserved
          </p>
        </div>
      </div>
    </section>
  );
};
