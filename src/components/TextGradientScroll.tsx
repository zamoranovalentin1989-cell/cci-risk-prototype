import { createContext, useContext, useRef } from "react";
import { useScroll, useTransform, motion, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

type TextOpacityEnum = "none" | "soft" | "medium";

type TextGradientScrollContextType = {
  textOpacity?: TextOpacityEnum;
};

const TextGradientScrollContext = createContext<TextGradientScrollContextType>({});

function useGradientScroll() {
  return useContext(TextGradientScrollContext);
}

export function TextGradientScroll({
  text,
  className,
  textOpacity = "soft",
}: {
  text: string;
  className?: string;
  textOpacity?: TextOpacityEnum;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.5"],
  });

  const words = text.split(" ");

  return (
    <TextGradientScrollContext.Provider value={{ textOpacity }}>
      <p ref={ref} className={cn("relative flex flex-wrap m-0", className)}>
        {words.map((word, i) => {
          const start = i / words.length;
          const end = (i + 1) / words.length;
          return (
            <Word key={i} progress={scrollYProgress} range={[start, end]}>
              {word}
            </Word>
          );
        })}
      </p>
    </TextGradientScrollContext.Provider>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: number[];
}) {
  const opacity = useTransform(progress, range, [0, 1]);
  const { textOpacity } = useGradientScroll();

  return (
    <span className="relative me-[0.3em] mt-1">
      <span
        className={cn("absolute", {
          "opacity-0": textOpacity === "none",
          "opacity-10": textOpacity === "soft",
          "opacity-30": textOpacity === "medium",
        })}
      >
        {children}
      </span>
      <motion.span style={{ opacity, willChange: "opacity" }}>
        {children}
      </motion.span>
    </span>
  );
}
