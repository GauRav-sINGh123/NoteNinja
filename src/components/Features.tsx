'use client';
import { motion } from "framer-motion";
import { Bot, Sparkles, FileText } from "lucide-react";

const features = [
  {
    icon: <Bot className="w-6 h-6" />,
    title: "AI-Powered",
    description: "Smart note generation and organization",
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Enhanced Clarity",
    description: "Automatic formatting and structuring",
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Easy Export",
    description: "Export to multiple formats instantly",
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      staggerChildren: 0.2,
      when: "beforeChildren",
    },
  },
};

const cardVariants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 120, damping: 12 } },
  hover: { scale: 1.05, rotate: 1, transition: { type: "spring", stiffness: 150, damping: 10 } },
};

const iconVariants = {
  initial: { y: 0 },
  hover: { y: -8, transition: { yoyo: Infinity, duration: 1.4, ease: "easeInOut" } },
};

export default function Features() {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {features.map((feature, index) => (
        <motion.div
          key={index}
          className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm cursor-pointer hover:bg-white/10 transition-all"
          variants={cardVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
        >
          <motion.div
            className="bg-black p-3 rounded-xl w-fit border border-white/10 mb-4"
            variants={iconVariants}
          >
            {feature.icon}
          </motion.div>
          <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
          <p className="text-gray-400">{feature.description}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}
