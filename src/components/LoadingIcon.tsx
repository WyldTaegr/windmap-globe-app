'use client';
import { useGlobalLoading } from '@/app/context/LoadingContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingIcon() {
  const { isGlobalLoading } = useGlobalLoading();

  if (!isGlobalLoading) return null;

  return (
    <AnimatePresence mode="wait">
      {isGlobalLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8, transition: { duration: 1.5 } }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center"
        >
          {/* Outer container */}
          <div className="p-3 bg-black/60 backdrop-blur-md rounded-full shadow-lg">
            {/* Spinner */}
            <div className="h-6 w-6 border-4 border-white/70 border-t-transparent rounded-full animate-spin" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
