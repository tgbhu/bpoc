import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ArrowLeft, Calendar, Heart, MessageCircle } from 'lucide-react';

interface ArchiveScreenProps {
  onBack: () => void;
  onViewAnswer: (questionId: string) => void;
}

interface ArchivedQuestion {
  id: string;
  date: string;
  question: string;
  answered: boolean;
}

export function ArchiveScreen({ onBack, onViewAnswer }: ArchiveScreenProps) {
  // Mock archived questions
  const archivedQuestions: ArchivedQuestion[] = [
    {
      id: '1',
      date: 'September 19, 2025',
      question: 'What was your first impression of me, and how has it changed?',
      answered: true
    },
    {
      id: '2', 
      date: 'September 18, 2025',
      question: 'If we could spend a perfect day together, what would we do?',
      answered: true
    },
    {
      id: '3',
      date: 'September 17, 2025',
      question: 'What\'s something I do that always makes you smile?',
      answered: true
    },
    {
      id: '4',
      date: 'September 16, 2025',
      question: 'When do you feel most connected to me?',
      answered: true
    },
    {
      id: '5',
      date: 'September 15, 2025',
      question: 'What\'s a memory of us that you treasure the most?',
      answered: true
    }
  ];

  return (
    <motion.div 
      className="flex flex-col min-h-screen bg-gradient-to-b from-[#0f0a1a] via-[#1a0f2e] to-[#2a1f3d] px-8 py-12"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
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
        <div className="ml-4">
          <h1 className="text-2xl font-bold text-[#f8fafc]">Your Journey</h1>
          <p className="text-[#cbd5e1] text-sm">
            {archivedQuestions.length} questions answered together
          </p>
        </div>
      </div>

      {/* Stats */}
      <motion.div 
        className="grid grid-cols-2 gap-4 mb-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-gradient-to-br from-[#f472b6]/20 to-[#ef4444]/20 border-[#f472b6]/30">
          <CardContent className="p-4 text-center">
            <Heart className="w-8 h-8 text-[#f472b6] mx-auto mb-2" />
            <p className="text-2xl font-bold text-[#f8fafc]">{archivedQuestions.length}</p>
            <p className="text-[#cbd5e1] text-sm">Questions</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-[#fbbf24]/20 to-[#f59e0b]/20 border-[#fbbf24]/30">
          <CardContent className="p-4 text-center">
            <MessageCircle className="w-8 h-8 text-[#fbbf24] mx-auto mb-2" />
            <p className="text-2xl font-bold text-[#f8fafc]">{archivedQuestions.length * 2}</p>
            <p className="text-[#cbd5e1] text-sm">Answers</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Questions List */}
      <div className="flex-1 space-y-4">
        <h2 className="text-lg font-semibold text-[#f8fafc] mb-4">Past Questions</h2>
        
        {archivedQuestions.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 * index }}
          >
            <Card 
              className="bg-[#2a1f3d] border-[#4c1d95]/30 hover:border-[#f472b6]/30 transition-colors cursor-pointer"
              onClick={() => onViewAnswer(item.id)}
            >
              <CardContent className="p-5">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#f472b6] to-[#fbbf24] rounded-full flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-[#0f0a1a]" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[#fbbf24] text-sm font-medium">
                        {item.date}
                      </p>
                      {item.answered && (
                        <div className="w-3 h-3 bg-[#10b981] rounded-full"></div>
                      )}
                    </div>
                    <p className="text-[#f8fafc] leading-relaxed line-clamp-2">
                      {item.question}
                    </p>
                    <p className="text-[#94a3b8] text-sm mt-2">
                      Tap to view answers
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Empty State (if no questions) */}
      {archivedQuestions.length === 0 && (
        <motion.div 
          className="flex-1 flex flex-col items-center justify-center text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <MessageCircle className="w-16 h-16 text-[#94a3b8] mb-4" />
          <h3 className="text-xl font-semibold text-[#f8fafc] mb-2">
            No Questions Yet
          </h3>
          <p className="text-[#cbd5e1] max-w-sm leading-relaxed">
            Start answering daily questions and they'll appear here. Your journey together begins with the first question!
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}