"use client";

import { ReactNode } from "react";
import { motion, MotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionContainerProps extends MotionProps {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  fullWidth?: boolean;
  id?: string;
  as?: keyof JSX.IntrinsicElements;
  containerType?: "default" | "narrow" | "wide";
}

export function SectionContainer({
  children,
  className,
  innerClassName,
  fullWidth = false,
  id,
  as: Component = "section",
  containerType = "default",
  ...motionProps
}: SectionContainerProps) {
  // Determine max-width based on container type
  const containerMaxWidth = {
    default: "max-w-7xl",
    narrow: "max-w-5xl",
    wide: "max-w-8xl"
  };
  
  return (
    <Component
      id={id}
      className={cn(
        "py-16 md:py-24 px-4 sm:px-6 lg:px-8",
        className
      )}
    >
      <motion.div
        className={cn(
          "mx-auto",
          !fullWidth && containerMaxWidth[containerType],
          innerClassName
        )}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        {...motionProps}
      >
        {children}
      </motion.div>
    </Component>
  );
}

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  label?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  label,
  align = "center",
  className
}: SectionHeadingProps) {
  const alignmentClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right"
  };
  
  return (
    <div className={cn("mb-12 md:mb-16", alignmentClasses[align], className)}>
      {label && (
        <motion.span 
          className="inline-block text-primary font-semibold tracking-wider uppercase text-sm mb-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {label}
        </motion.span>
      )}
      
      <motion.h2 
        className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {title}
      </motion.h2>
      
      {subtitle && (
        <motion.p 
          className={cn(
            "mt-2 text-gray-600 max-w-2xl",
            align === "center" && "mx-auto"
          )}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
} 