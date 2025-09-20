import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#0f0a1a] via-[#1a0f2e] to-[#2a1f3d] px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      onAnimationComplete={() => {
        setTimeout(onComplete, 2000);
      }}
    >
      <motion.div
        className="flex items-center justify-center mb-8"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
      >
        <div className="relative">
          <Heart 
            className="w-16 h-16 text-[#f472b6] fill-[#f472b6]" 
          />
          <motion.div
            className="absolute -top-2 -right-2 w-6 h-6 bg-[#fbbf24] rounded-full flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: "spring" }}
          >
            <span className="text-[#0f0a1a] text-xs font-bold">69</span>
          </motion.div>
        </div>
      </motion.div>
      
      <motion.h1 
        className="text-4xl font-bold bg-gradient-to-r from-[#f472b6] to-[#fbbf24] bg-clip-text text-transparent mb-2"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Birdie69
      </motion.h1>
      
      <motion.p 
        className="text-[#cbd5e1] text-center opacity-80"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        Loading your intimate connection...
      </motion.p>
      
      <motion.div 
        className="mt-12 flex space-x-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-[#f472b6] rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}