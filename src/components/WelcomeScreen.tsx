import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Heart, Sparkles } from 'lucide-react';

interface WelcomeScreenProps {
  onLogin: () => void;
  onRegister: () => void;
}

export function WelcomeScreen({ onLogin, onRegister }: WelcomeScreenProps) {
  return (
    <motion.div 
      className="flex flex-col min-h-screen bg-gradient-to-b from-[#0f0a1a] via-[#1a0f2e] to-[#2a1f3d] px-8 py-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="flex items-center justify-center mb-16">
        <div className="relative">
          <Heart className="w-12 h-12 text-[#f472b6] fill-[#f472b6]" />
          <motion.div
            className="absolute -top-1 -right-1 w-5 h-5 bg-[#fbbf24] rounded-full flex items-center justify-center"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-[#0f0a1a] text-xs font-bold">69</span>
          </motion.div>
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#f472b6] to-[#fbbf24] bg-clip-text text-transparent ml-3">
          Birdie69
        </h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center items-center text-center">
        <motion.div
          className="mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          <Sparkles className="w-16 h-16 text-[#fbbf24] mx-auto mb-6" />
        </motion.div>

        <motion.h2 
          className="text-2xl font-bold text-[#f8fafc] mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Discover your partner,
        </motion.h2>
        <motion.h2 
          className="text-2xl font-bold bg-gradient-to-r from-[#f472b6] to-[#ef4444] bg-clip-text text-transparent mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          one question at a time
        </motion.h2>

        <motion.p 
          className="text-[#cbd5e1] text-lg mb-12 max-w-sm leading-relaxed"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Deepen your connection through intimate daily questions designed to bring you closer together
        </motion.p>
      </div>

      {/* Buttons */}
      <motion.div 
        className="space-y-4"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Button 
          onClick={onRegister}
          className="w-full h-14 bg-gradient-to-r from-[#f472b6] to-[#ef4444] hover:from-[#ec4899] hover:to-[#dc2626] text-white font-semibold rounded-xl shadow-lg"
        >
          Get Started
        </Button>
        <Button 
          onClick={onLogin}
          variant="outline"
          className="w-full h-14 border-2 border-[#f472b6] text-[#f472b6] bg-transparent hover:bg-[#f472b6]/10 font-semibold rounded-xl"
        >
          Already have an account? Log In
        </Button>
      </motion.div>

      {/* Footer */}
      <motion.p 
        className="text-center text-[#94a3b8] text-sm mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        Your privacy is our priority. All conversations stay between you two.
      </motion.p>
    </motion.div>
  );
}