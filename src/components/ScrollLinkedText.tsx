import { useRef, type ElementType, type ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

type ScrollLinkedTextProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
};

export const ScrollLinkedText = ({ children, className, as = 'div' }: ScrollLinkedTextProps) => {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'end 0.1'],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [0.15, 1, 1, 0.15]
  );

  const color = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    ['#6b7280', '#e5e7eb', '#e5e7eb', '#6b7280']
  );

  const MotionTag = motion.create(as);

  return (
    <MotionTag ref={ref} className={className} style={{ opacity, color }}>
      {children}
    </MotionTag>
  );
};