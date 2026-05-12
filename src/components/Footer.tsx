import { Heart, Github, Linkedin, Mail } from 'lucide-react';

const socialLinks = [
  { icon: Github, href: 'https://github.com/girishk03', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/challagirish', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:saigirish050704@gmail.com', label: 'Email' },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t border-border py-12">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <a href="#" className="text-xl font-bold gradient-text inline-block mb-2">{'<GirishChalla />'}</a>
            <p className="text-sm text-muted-foreground font-mono">"Building backend systems that work at scale."</p>
          </div>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg glass flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                aria-label={social.label}>
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm text-muted-foreground flex items-center gap-1 justify-center md:justify-end">
              © {currentYear} Girish Challa. Built with
              <Heart className="h-4 w-4 text-destructive inline" />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};