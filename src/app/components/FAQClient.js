"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function FAQItem({ item, index, isOpen, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      viewport={{ once: true }}
      className="border border-slate-700 rounded-2xl overflow-hidden bg-slate-800/50 backdrop-blur-sm">
      <button onClick={onToggle} className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group">
        <span className="text-white font-semibold text-base md:text-xl group-hover:text-cyan-400 transition-colors duration-300">
          {item.pertanyaan}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0 w-7 h-7 rounded-full bg-slate-700 group-hover:bg-cyan-500/20 border border-slate-600 group-hover:border-cyan-500 flex items-center justify-center text-cyan-400 transition-colors duration-300 text-lg">
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden">
            <div className="px-6 pb-5">
              <div className="h-px bg-slate-700 mb-4" />
              <p className="text-white leading-relaxed text-base md:text-lg whitespace-pre-line">{item.jawaban}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQClient({ faqs }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="flex flex-col gap-3">
      {faqs.map((item, index) => (
        <FAQItem key={item.id} item={item} index={index} isOpen={openIndex === index} onToggle={() => setOpenIndex(openIndex === index ? null : index)} />
      ))}
    </div>
  );
}