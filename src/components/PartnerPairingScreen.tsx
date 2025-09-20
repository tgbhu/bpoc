import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent } from './ui/card';
import { Copy, Heart, Share, Users } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface PartnerPairingScreenProps {
  onPaired: () => void;
}

export function PartnerPairingScreen({ onPaired }: PartnerPairingScreenProps) {
  const [partnerCode, setPartnerCode] = useState('');
  const [myCode] = useState('B69XYZ'); // Mock code

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (partnerCode.length === 6) {
      // Simulate successful pairing
      toast("Successfully connected with your partner! 💕");
      setTimeout(onPaired, 1500);
    }
  };

  const handleShareCode = () => {
    const shareText = `Join me on Birdie69! Use my code: ${myCode}\n\nDiscover each other through intimate daily questions ❤️\n\nhttps://birdie69.app/join/${myCode}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Join me on Birdie69',
        text: shareText,
      });
    } else {
      navigator.clipboard.writeText(shareText);
      toast("Invitation copied to clipboard! 📋");
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(myCode);
    toast("Code copied! ✨");
  };

  return (
    <motion.div 
      className="flex flex-col min-h-screen bg-gradient-to-b from-[#0f0a1a] via-[#1a0f2e] to-[#2a1f3d] px-8 py-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="text-center mb-12">
        <motion.div
          className="flex justify-center mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          <div className="relative">
            <Users className="w-16 h-16 text-[#f472b6]" />
            <Heart className="absolute -top-2 -right-2 w-6 h-6 text-[#fbbf24] fill-[#fbbf24]" />
          </div>
        </motion.div>
        <h1 className="text-3xl font-bold text-[#f8fafc] mb-3">Connect with Your Partner</h1>
        <p className="text-[#cbd5e1] text-lg">Share your code or enter theirs to begin your journey</p>
      </div>

      <div className="flex-1 flex flex-col justify-center space-y-8">
        {/* My Code Card */}
        <Card className="bg-[#2a1f3d] border-[#4c1d95]/30">
          <CardContent className="p-6">
            <div className="text-center">
              <Label className="text-[#cbd5e1] font-medium mb-4 block">
                Your Invitation Code
              </Label>
              <div className="flex items-center justify-center space-x-2 mb-6">
                <div className="bg-gradient-to-r from-[#f472b6] to-[#fbbf24] text-[#0f0a1a] px-6 py-3 rounded-xl font-bold text-2xl tracking-widest">
                  {myCode}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopyCode}
                  className="p-2 text-[#cbd5e1] hover:text-[#f472b6] hover:bg-[#f472b6]/10 rounded-full"
                >
                  <Copy className="w-5 h-5" />
                </Button>
              </div>
              <Button 
                onClick={handleShareCode}
                className="w-full h-12 bg-gradient-to-r from-[#f472b6] to-[#ef4444] hover:from-[#ec4899] hover:to-[#dc2626] text-white font-semibold rounded-xl"
              >
                <Share className="w-5 h-5 mr-2" />
                Share Your Code
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Divider */}
        <div className="flex items-center">
          <div className="flex-1 border-t border-[#4c1d95]/30"></div>
          <span className="px-4 text-[#94a3b8] text-sm">or</span>
          <div className="flex-1 border-t border-[#4c1d95]/30"></div>
        </div>

        {/* Join Partner Card */}
        <Card className="bg-[#2a1f3d] border-[#4c1d95]/30">
          <CardContent className="p-6">
            <form onSubmit={handleJoin}>
              <Label htmlFor="partnerCode" className="text-[#cbd5e1] font-medium mb-4 block">
                Enter Partner's Code
              </Label>
              <Input
                id="partnerCode"
                type="text"
                value={partnerCode}
                onChange={(e) => setPartnerCode(e.target.value.toUpperCase())}
                className="h-14 bg-[#1a0f2e] border-[#4c1d95]/30 text-[#f8fafc] placeholder-[#94a3b8] rounded-xl focus:border-[#f472b6] focus:ring-[#f472b6] text-center text-xl tracking-widest font-bold mb-6"
                placeholder="B69ABC"
                maxLength={6}
                required
              />
              <Button 
                type="submit"
                className="w-full h-12 bg-[#4c1d95] hover:bg-[#6d28d9] text-white font-semibold rounded-xl"
                disabled={partnerCode.length !== 6}
              >
                Connect
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <motion.div 
        className="text-center text-[#94a3b8] text-sm space-y-2 mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <p>Your connection is private and secure</p>
        <p>Only you and your partner can see your conversations</p>
      </motion.div>
    </motion.div>
  );
}