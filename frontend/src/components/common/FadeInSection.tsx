import { motion, useAnimation, useInView } from "motion/react";
import { HTMLAttributes, useEffect, useRef } from "react";

const FadeInSection = ({
  children,
  className,
}: HTMLAttributes<HTMLDivElement>) => {
  const ref = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(ref, { amount: 0.25, once: true });

  useEffect(() => {
    if (isInView) {
      controls.start({ opacity: 1, y: 0, transition: { duration: 0.8 } });
    }
  }, [isInView, controls]);

  return (
    <motion.section
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: "15%" }}
      animate={controls}
      viewport={{ once: true, amount: 0.25 }}
    >
      {children}
    </motion.section>
  );
};

export default FadeInSection;
