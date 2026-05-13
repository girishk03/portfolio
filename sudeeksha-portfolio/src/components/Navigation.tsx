import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isProfessionalPage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 inset-x-0 z-50"
    >
      <div
        className={`w-full flex items-center justify-between px-8 py-5 transition-all duration-300 ${
          isScrolled ? 'bg-background' : 'bg-background'
        }`}
      >
        {/* Desktop Navigation */}
        <div className="hidden md:flex w-full items-center gap-8">
          <div className="flex items-center gap-2">
            <Button variant={location.pathname === '/' ? 'hero' : 'heroOutline'} size="sm" asChild>
              <Link to="/">Professional</Link>
            </Button>
            <Button variant={location.pathname === '/singing' ? 'hero' : 'heroOutline'} size="sm" asChild>
              <Link to="/singing">Singing</Link>
            </Button>
          </div>

          {isProfessionalPage ? (
            <div className="ml-auto flex items-center gap-8 justify-end">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-base text-muted-foreground hover:text-foreground transition-colors link-underline"
                >
                  {link.name}
                </a>
              ))}

              <Button variant="hero" size="sm" asChild>
                <a href="#contact">Hire Me</a>
              </Button>
            </div>
          ) : null}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-foreground" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden glass-strong mt-2 rounded-xl p-4"
        >
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant={location.pathname === '/' ? 'hero' : 'heroOutline'}
                size="sm"
                asChild
              >
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                  Professional
                </Link>
              </Button>
              <Button
                variant={location.pathname === '/singing' ? 'hero' : 'heroOutline'}
                size="sm"
                asChild
              >
                <Link to="/singing" onClick={() => setIsMobileMenuOpen(false)}>
                  Singing
                </Link>
              </Button>
            </div>
            {isProfessionalPage
              ? navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ))
              : null}
            {isProfessionalPage ? (
              <Button variant="hero" size="sm" asChild>
                <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
                  Hire Me
                </a>
              </Button>
            ) : null}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};
