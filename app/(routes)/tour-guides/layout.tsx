'use client';

import { ReactNode } from 'react';
import EmergencySOSButton from '@/app/components/features/EmergencySOSButton';
import { motion, AnimatePresence } from 'framer-motion';

export default function TourGuidesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="tour-guides"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative min-h-screen"
      >
        {children}
        <EmergencySOSButton />
      </motion.div>
    </AnimatePresence>
  );
} 