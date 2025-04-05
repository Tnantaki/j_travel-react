import { motion } from "motion/react";
import { HTMLAttributes } from "react";

const FadeInSection = ({
  children,
  className,
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <motion.section
      className={className}
      initial={{ opacity: 0, y: "15%" }}
      whileInView={{ opacity: 1, y: "0", transition: { duration: 0.8 } }}
      viewport={{ once: true, amount: 0.25 }}
    >
      {children}
    </motion.section>
  );
};

export default FadeInSection;
