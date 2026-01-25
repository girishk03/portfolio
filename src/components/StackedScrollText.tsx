import { useMemo, useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

type StackedScrollTextProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  getKey?: (item: T, index: number) => string;
  className?: string;
  stickyClassName?: string;
  sectionHeightVh?: number;
  dimOpacity?: number;
  translatePx?: number;
  overlap?: number;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export const StackedScrollText = <T,>({
  items,
  renderItem,
  getKey,
  className,
  stickyClassName,
  sectionHeightVh = 85,
  dimOpacity = 0.15,
  translatePx = 24,
  overlap = 0.06,
}: StackedScrollTextProps<T>) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const itemCount = items.length;

  const containerStyle = useMemo(() => {
    return { height: `${Math.max(1, itemCount) * sectionHeightVh}vh` } as const;
  }, [itemCount, sectionHeightVh]);

  return (
    <div ref={ref} className={className} style={containerStyle}>
      <div className={`sticky top-24 ${stickyClassName ?? ''}`.trim()}>
        <div className="relative h-[70vh]">
          {items.map((item, i) => {
            const key = getKey ? getKey(item, i) : String(i);

            const start = itemCount <= 1 ? 0 : i / itemCount;
            const end = itemCount <= 1 ? 1 : (i + 1) / itemCount;

            const opacity = useTransform(
              scrollYProgress,
              [start - overlap, start, end, end + overlap],
              [dimOpacity, 1, 1, dimOpacity]
            );

            const y = useTransform(
              scrollYProgress,
              [start, start + overlap, end - overlap, end],
              [translatePx, 0, 0, -translatePx]
            );

            return (
              <motion.div
                key={key}
                className="absolute inset-0 flex items-center"
                style={{ opacity, y }}
              >
                {renderItem(item, i)}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
