import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface LoadingProps {
  className?: string;
  variant?: "default" | "card" | "text";
}

export function Loading({ className, variant = "default" }: LoadingProps) {
  if (variant === "card") {
    return (
      <div className={cn("w-full p-4 space-y-3", className)}>
        <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
      </div>
    );
  }

  if (variant === "text") {
    return (
      <div className={cn("flex items-center space-x-2", className)}>
        <div className="h-2 w-2 bg-gray-200 rounded-full animate-pulse" />
        <div className="h-2 w-2 bg-gray-200 rounded-full animate-pulse" />
        <div className="h-2 w-2 bg-gray-200 rounded-full animate-pulse" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={cn("flex items-center justify-center", className)}
    >
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </motion.div>
  );
} 