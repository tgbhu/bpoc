import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Camera, User } from 'lucide-react';

interface ProfileSetupScreenProps {
  onContinue: (nickname: string, language: string, profilePicture?: string) => void;
}

export function ProfileSetupScreen({ onContinue }: ProfileSetupScreenProps) {
  const [nickname, setNickname] = useState('');
  const [language, setLanguage] = useState('');
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onContinue(nickname, language, profilePicture || undefined);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePicture(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
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
        <h1 className="text-3xl font-bold text-[#f8fafc] mb-3">Complete Your Profile</h1>
        <p className="text-[#cbd5e1] text-lg">Let's personalize your Birdie69 experience</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-center">
        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4">
            <Avatar className="w-24 h-24 border-4 border-[#f472b6]/20">
              {profilePicture ? (
                <img src={profilePicture} alt="Profile" className="w-full h-full object-cover rounded-full" />
              ) : (
                <AvatarFallback className="bg-[#2a1f3d] text-[#f472b6] text-2xl">
                  <User className="w-10 h-10" />
                </AvatarFallback>
              )}
            </Avatar>
            <motion.label
              htmlFor="profilePicture"
              className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-[#f472b6] to-[#ef4444] rounded-full flex items-center justify-center cursor-pointer shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Camera className="w-4 h-4 text-white" />
              <input
                id="profilePicture"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </motion.label>
          </div>
          <p className="text-[#94a3b8] text-sm text-center">
            Add a profile picture (optional)
          </p>
        </div>

        <div className="space-y-6 mb-8">
          <div className="space-y-2">
            <Label htmlFor="nickname" className="text-[#cbd5e1] font-medium">
              Nickname
            </Label>
            <Input
              id="nickname"
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="h-14 bg-[#1a0f2e] border-[#4c1d95]/30 text-[#f8fafc] placeholder-[#94a3b8] rounded-xl focus:border-[#f472b6] focus:ring-[#f472b6]"
              placeholder="How should your partner see you?"
              required
            />
            <p className="text-[#94a3b8] text-sm">
              This is how you'll appear to your partner
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="language" className="text-[#cbd5e1] font-medium">
              Preferred Language
            </Label>
            <Select value={language} onValueChange={setLanguage} required>
              <SelectTrigger className="h-14 bg-[#1a0f2e] border-[#4c1d95]/30 text-[#f8fafc] rounded-xl focus:border-[#f472b6] focus:ring-[#f472b6]">
                <SelectValue placeholder="Choose your language" />
              </SelectTrigger>
              <SelectContent className="bg-[#2a1f3d] border-[#4c1d95]/30 text-[#f8fafc]">
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
                <SelectItem value="it">Italiano</SelectItem>
                <SelectItem value="pt">Português</SelectItem>
                <SelectItem value="ru">Русский</SelectItem>
                <SelectItem value="ja">日本語</SelectItem>
                <SelectItem value="ko">한국어</SelectItem>
                <SelectItem value="zh">中文</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button 
          type="submit"
          className="w-full h-14 bg-gradient-to-r from-[#f472b6] to-[#ef4444] hover:from-[#ec4899] hover:to-[#dc2626] text-white font-semibold rounded-xl shadow-lg"
          disabled={!nickname || !language}
        >
          Continue
        </Button>
      </form>

      <motion.p 
        className="text-center text-[#94a3b8] text-sm mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        You can always change these settings later in your profile
      </motion.p>
    </motion.div>
  );
}