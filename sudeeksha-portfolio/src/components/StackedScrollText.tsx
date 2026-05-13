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

type StackedScrollItemProps<T> = {
  item: T;
  index: number;
  itemCount: number;
  renderItem: (item: T, index: number) => ReactNode;
  getKey?: (item: T, index: number) => string;
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
  dimOpacity: number;
  translatePx: number;
  overlap: number;
};

const StackedScrollItem = <T,>({
  item,
  index,
  itemCount,
  renderItem,
  getKey,
  scrollYProgress,
  dimOpacity,
  translatePx,
  overlap,
}: StackedScrollItemProps<T>) => {
  const key = getKey ? getKey(item, index) : String(index);

  const safeCount = Math.max(1, itemCount);
  const start = safeCount <= 1 ? 0 : index / safeCount;
  const end = safeCount <= 1 ? 1 : (index + 1) / safeCount;

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
    <motion.div key={key} className="absolute inset-0 flex items-center" style={{ opacity, y }}>
      {renderItem(item, index)}
    </motion.div>
  );
};

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
          {items.map((item, index) => (
            <StackedScrollItem
              key={getKey ? getKey(item, index) : String(index)}
              item={item}
              index={index}
              itemCount={itemCount}
              renderItem={renderItem}
              getKey={getKey}
              scrollYProgress={scrollYProgress}
              dimOpacity={dimOpacity}
              translatePx={translatePx}
              overlap={overlap}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
