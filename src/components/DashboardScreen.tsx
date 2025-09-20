import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Heart, MessageCircle, Plus, Archive, Settings, Clock, Send, CheckCircle2, User } from 'lucide-react';

interface DashboardScreenProps {
  onAddQuestion: () => void;
  onViewArchive: () => void;
  onSettings: () => void;
  onAnswerReveal: () => void;
}

export function DashboardScreen({ onAddQuestion, onViewArchive, onSettings, onAnswerReveal }: DashboardScreenProps) {
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [hasAnswered, setHasAnswered] = useState(false);
  const [partnerAnswered, setPartnerAnswered] = useState(true); // Mock state

  // Mock daily question
  const dailyQuestion = "What's one thing about me that you discovered recently that surprised you in the best way?";

  const handleSubmitAnswer = () => {
    if (currentAnswer.trim()) {
      setHasAnswered(true);
      // In a real app, this would submit to backend
      setTimeout(() => {
        onAnswerReveal();
      }, 1000);
    }
  };

  const getStatusMessage = () => {
    if (!hasAnswered && !partnerAnswered) {
      return "Both of you need to answer today's question";
    } else if (!hasAnswered && partnerAnswered) {
      return "Your partner answered – now it's your turn! 💕";
    } else if (hasAnswered && !partnerAnswered) {
      return "Waiting for your partner to answer...";
    } else {
      return "Both answers are ready! Tap to reveal 🔓";
    }
  };

  const getStatusIcon = () => {
    if (hasAnswered && partnerAnswered) {
      return <CheckCircle2 className="w-5 h-5 text-[#10b981]" />;
    } else if (hasAnswered) {
      return <Clock className="w-5 h-5 text-[#fbbf24]" />;
    } else {
      return <MessageCircle className="w-5 h-5 text-[#f472b6]" />;
    }
  };

  return (
    <motion.div 
      className="flex flex-col min-h-screen bg-gradient-to-b from-[#0f0a1a] via-[#1a0f2e] to-[#2a1f3d]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-[#2a1f3d]/50 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Heart className="w-8 h-8 text-[#f472b6] fill-[#f472b6]" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#fbbf24] rounded-full flex items-center justify-center text-[#0f0a1a] text-xs font-bold">
              69
            </span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#f8fafc]">Today's Question</h1>
            <p className="text-[#94a3b8] text-sm">September 20, 2025</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onViewArchive}
            className="p-2 text-[#cbd5e1] hover:text-[#f472b6] hover:bg-[#f472b6]/10 rounded-full"
          >
            <Archive className="w-6 h-6" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onSettings}
            className="p-2 text-[#cbd5e1] hover:text-[#f472b6] hover:bg-[#f472b6]/10 rounded-full"
          >
            <Settings className="w-6 h-6" />
          </Button>
        </div>
      </div>

      <div className="flex-1 px-6 py-8 space-y-6">
        {/* Partner Status */}
        <Card className="bg-[#2a1f3d] border-[#4c1d95]/30">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10 border-2 border-[#f472b6]/20">
                <AvatarFallback className="bg-[#4c1d95] text-[#f472b6]">
                  <User className="w-5 h-5" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-[#f8fafc] font-medium">Connected with Alex</p>
                <div className="flex items-center space-x-2 mt-1">
                  {getStatusIcon()}
                  <p className="text-[#cbd5e1] text-sm">{getStatusMessage()}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Daily Question */}
        <Card className="bg-gradient-to-br from-[#2a1f3d] to-[#4c1d95]/20 border-[#f472b6]/30">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-[#f472b6] to-[#fbbf24] rounded-full flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-4 h-4 text-[#0f0a1a]" />
              </div>
              <div className="flex-1">
                <p className="text-[#f8fafc] text-lg leading-relaxed font-medium">
                  {dailyQuestion}
                </p>
              </div>
            </div>

            {!hasAnswered ? (
              <div className="space-y-4">
                <Textarea
                  value={currentAnswer}
                  onChange={(e) => setCurrentAnswer(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="min-h-[120px] bg-[#1a0f2e] border-[#4c1d95]/30 text-[#f8fafc] placeholder-[#94a3b8] rounded-xl focus:border-[#f472b6] focus:ring-[#f472b6] resize-none"
                />
                <Button 
                  onClick={handleSubmitAnswer}
                  disabled={!currentAnswer.trim()}
                  className="w-full h-12 bg-gradient-to-r from-[#f472b6] to-[#ef4444] hover:from-[#ec4899] hover:to-[#dc2626] text-white font-semibold rounded-xl disabled:opacity-50"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Submit Answer
                </Button>
              </div>
            ) : (
              <div className="text-center py-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <CheckCircle2 className="w-16 h-16 text-[#10b981] mx-auto mb-4" />
                </motion.div>
                <p className="text-[#f8fafc] font-medium mb-2">Answer Submitted!</p>
                <p className="text-[#cbd5e1] text-sm">
                  {partnerAnswered ? "Both answers are ready. Tap below to reveal!" : "Waiting for your partner..."}
                </p>
                {partnerAnswered && (
                  <Button 
                    onClick={onAnswerReveal}
                    className="mt-4 bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] hover:from-[#f59e0b] hover:to-[#d97706] text-[#0f0a1a] font-semibold rounded-xl"
                  >
                    Reveal Answers ✨
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Add Secret Question */}
        <Button 
          onClick={onAddQuestion}
          variant="outline"
          className="w-full h-14 border-2 border-dashed border-[#4c1d95] text-[#cbd5e1] bg-transparent hover:bg-[#4c1d95]/10 hover:border-[#f472b6] hover:text-[#f472b6] rounded-xl"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Your Own Secret Question
        </Button>
      </div>
    </motion.div>
  );
}