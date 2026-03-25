import MotionHeaderDark from "../custom/motionHeaderDark";
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import type { StatisticProps } from "@/types";

interface Props {
  t: (obj: { zh: string; en: string }) => string;
  props: StatisticProps;
}

export function Statistics({ t, props }: Props) {
  const { title, subtitle, items } = props;

  // 如果没有数据，直接返回null
  if (items.length === 0) return null;

  return (
    <div className="py-12 bg-gray-900 text-white rounded-lg">
      <MotionHeaderDark t={t} title={title} subtitle={subtitle} />
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="text-center"
          >
            <div className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-2 text-white`}>
              <AnimatedNumber value={item.value} />
            </div>
            <div className={`text-sm md:text-base text-gray-400`}>
              {t(item.label)}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function AnimatedNumber({ value }: { value: string }) {
  const [displayValue, setDisplayValue] = useState('0');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const numericValue = parseInt(value.replace(/\D/g, ''));
      const suffix = value.replace(/[0-9]/g, '');
      const duration = 2000;
      const steps = 60;
      const increment = numericValue / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(current) + suffix);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return <span ref={ref}>{displayValue}</span>;
}
