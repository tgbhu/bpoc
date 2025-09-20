import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { ArrowLeft, Lock, Unlock, Heart, User } from 'lucide-react';

interface AnswerRevealScreenProps {
  onBack: () => void;
}

export function AnswerRevealScreen({ onBack }: AnswerRevealScreenProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  // Mock data
  const question = "What's one thing about me that you discovered recently that surprised you in the best way?";
  const myAnswer = "I discovered how thoughtful you are with small gestures. Yesterday when you brought me coffee exactly how I like it without me asking, it made me realize how much you pay attention to the little things that make me happy.";
  const partnerAnswer = "I was surprised by how naturally you make me laugh, even during stressful moments. Last week when I was worried about work, you turned it into this silly game and suddenly I forgot all my stress. You have this magic way of lightening any mood.";

  useEffect(() => {
    if (isRevealed) {
      const timer = setTimeout(() => setAnimationComplete(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [isRevealed]);

  return (
    <motion.div 
      className="flex flex-col min-h-screen bg-gradient-to-b from-[#0f0a1a] via-[#1a0f2e] to-[#2a1f3d] px-8 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="flex items-center mb-8">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onBack}
          className="p-2 text-[#cbd5e1] hover:text-[#f472b6] hover:bg-[#f472b6]/10 rounded-full"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-2xl font-bold text-[#f8fafc] ml-4">Answer Reveal</h1>
      </div>

      {/* Question */}
      <Card className="bg-gradient-to-br from-[#2a1f3d] to-[#4c1d95]/20 border-[#f472b6]/30 mb-8">
        <CardContent className="p-6">
          <p className="text-[#f8fafc] text-lg leading-relaxed">
            {question}
          </p>
        </CardContent>
      </Card>

      {!isRevealed ? (
        /* Lock Screen */
        <motion.div 
          className="flex-1 flex flex-col items-center justify-center text-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className="relative mb-8"
            animate={{ 
              rotate: [0, -5, 5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <div className="w-24 h-24 bg-gradient-to-br from-[#f472b6] to-[#fbbf24] rounded-full flex items-center justify-center shadow-2xl">
              <Lock className="w-12 h-12 text-[#0f0a1a]" />
            </div>
            <motion.div
              className="absolute -top-2 -right-2 w-8 h-8 bg-[#ef4444] rounded-full flex items-center justify-center"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <Heart className="w-4 h-4 text-white fill-white" />
            </motion.div>
          </motion.div>

          <h2 className="text-2xl font-bold text-[#f8fafc] mb-4">
            Ready to Reveal?
          </h2>
          <p className="text-[#cbd5e1] text-lg mb-8 max-w-sm leading-relaxed">
            Both of you have answered. Tap below to unlock and see what you both wrote! 💕
          </p>

          <Button 
            onClick={() => setIsRevealed(true)}
            className="w-full max-w-sm h-16 bg-gradient-to-r from-[#f472b6] via-[#ef4444] to-[#fbbf24] hover:from-[#ec4899] hover:via-[#dc2626] hover:to-[#f59e0b] text-white font-bold text-lg rounded-xl shadow-2xl"
          >
            <Unlock className="w-6 h-6 mr-3" />
            Reveal Answers ✨
          </Button>
        </motion.div>
      ) : (
        /* Answers Revealed */
        <motion.div 
          className="flex-1 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Your Answer */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <Card className="bg-[#2a1f3d] border-[#4c1d95]/30">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="w-12 h-12 border-2 border-[#f472b6]/30">
                    <AvatarFallback className="bg-[#f472b6] text-[#0f0a1a] font-bold">
                      <User className="w-6 h-6" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-[#f472b6] font-semibold mb-3">Your Answer</h3>
                    <p className="text-[#f8fafc] leading-relaxed">
                      {myAnswer}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Partner's Answer */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Card className="bg-[#2a1f3d] border-[#fbbf24]/30">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="w-12 h-12 border-2 border-[#fbbf24]/30">
                    <AvatarFallback className="bg-[#fbbf24] text-[#0f0a1a] font-bold">
                      <User className="w-6 h-6" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-[#fbbf24] font-semibold mb-3">Alex's Answer</h3>
                    <p className="text-[#f8fafc] leading-relaxed">
                      {partnerAnswer}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {animationComplete && (
            <motion.div
              className="text-center py-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex justify-center space-x-2 mb-4">
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
              </div>
              <p className="text-[#cbd5e1] text-lg">
                Beautiful answers! ✨
              </p>
              <p className="text-[#94a3b8] text-sm mt-2">
                Come back tomorrow for your next question
              </p>
            </motion.div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}