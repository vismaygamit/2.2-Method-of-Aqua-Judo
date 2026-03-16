import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Book } from 'lucide-react';

interface GlossaryModalProps {
  term: string | null;
  definition: string | null;
  onClose: () => void;
}

export const GlossaryModal: React.FC<GlossaryModalProps> = ({ term, definition, onClose }) => {
  return (
    <AnimatePresence>
      {term && definition && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-stone/20 dark:bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-white dark:bg-[#1a1a1a] rounded-[2rem] shadow-2xl border border-stone/5 dark:border-white/10 overflow-hidden"
          >
            <div className="p-8 md:p-10 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-aqua-primary/10 flex items-center justify-center text-aqua-primary">
                    <Book size={16} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-aqua-primary">Glossary</span>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-stone/5 dark:hover:bg-white/5 text-stone/40 dark:text-white/40 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <h3 className="text-3xl md:text-4xl font-display font-light uppercase tracking-tighter text-stone dark:text-white">
                  {term}
                </h3>
                <div className="h-px w-12 bg-aqua-primary/30" />
                <p className="text-lg font-serif italic text-stone/60 dark:text-white/80 leading-relaxed">
                  {definition}
                </p>
              </div>

              <div className="pt-4">
                <button 
                  onClick={onClose}
                  className="w-full py-4 rounded-full bg-stone dark:bg-white/10 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-aqua-primary transition-all"
                >
                  Close Definition
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
