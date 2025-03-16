"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-5xl font-bold"
      >
        Home App
      </motion.div>
    </motion.div>
  );
}
