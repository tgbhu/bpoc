import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { ArrowLeft, Eye, EyeOff, Sparkles } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface AddQuestionScreenProps {
  onBack: () => void;
  onSave: (question: string) => void;
}

export function AddQuestionScreen({ onBack, onSave }: AddQuestionScreenProps) {
  const [question, setQuestion] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      onSave(question.trim());
      toast("Secret question added! 🤫✨");
      onBack();
    }
  };

  const exampleQuestions = [
    "What's your biggest fantasy that you've never told me about?",
    "If we could relive any moment together, which would you choose?",
    "What's something you've always wanted to try with me?",
    "When do you feel most attractive around me?"
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
        <h1 className="text-2xl font-bold text-[#f8fafc] ml-4">Add Secret Question</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
        {/* Mystery Info */}
        <motion.div 
          className="bg-gradient-to-r from-[#4c1d95]/20 to-[#7c2d12]/20 border border-[#f472b6]/20 rounded-xl p-6 mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center space-x-3 mb-3">
            <div className="flex items-center space-x-2">
              {isAnonymous ? (
                <EyeOff className="w-5 h-5 text-[#fbbf24]" />
              ) : (
                <Eye className="w-5 h-5 text-[#f472b6]" />
              )}
              <Sparkles className="w-5 h-5 text-[#fbbf24]" />
            </div>
            <h3 className="text-[#f8fafc] font-semibold">Anonymous Question</h3>
          </div>
          <p className="text-[#cbd5e1] text-sm leading-relaxed">
            Your partner will not know this question came from you. It will appear as a regular daily question, adding mystery to your connection.
          </p>
        </motion.div>

        {/* Question Input */}
        <div className="flex-1 space-y-4 mb-8">
          <div className="space-y-2">
            <label htmlFor="question" className="text-[#cbd5e1] font-medium block">
              Your Secret Question
            </label>
            <Textarea
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="What would you like to ask your partner?"
              className="min-h-[150px] bg-[#1a0f2e] border-[#4c1d95]/30 text-[#f8fafc] placeholder-[#94a3b8] rounded-xl focus:border-[#f472b6] focus:ring-[#f472b6] resize-none text-lg leading-relaxed"
              required
            />
            <p className="text-[#94a3b8] text-sm">
              {question.length}/500 characters
            </p>
          </div>
        </div>

        {/* Example Questions */}
        <motion.div 
          className="mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-[#cbd5e1] font-medium mb-4">Need inspiration? Try these:</h3>
          <div className="space-y-3">
            {exampleQuestions.map((example, index) => (
              <motion.button
                key={index}
                type="button"
                onClick={() => setQuestion(example)}
                className="w-full text-left p-4 bg-[#2a1f3d] border border-[#4c1d95]/20 rounded-xl hover:border-[#f472b6]/30 hover:bg-[#2a1f3d]/80 transition-all"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <p className="text-[#cbd5e1] text-sm leading-relaxed">"{example}"</p>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Submit Button */}
        <Button 
          type="submit"
          disabled={!question.trim()}
          className="w-full h-14 bg-gradient-to-r from-[#f472b6] to-[#ef4444] hover:from-[#ec4899] hover:to-[#dc2626] text-white font-semibold rounded-xl shadow-lg disabled:opacity-50"
        >
          <Sparkles className="w-5 h-5 mr-2" />
          Add Secret Question
        </Button>
      </form>

      <motion.p 
        className="text-center text-[#94a3b8] text-sm mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        Your question will appear randomly in the coming days
      </motion.p>
    </motion.div>
  );
}