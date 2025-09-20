import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from 'lucide-react';

interface LoginScreenProps {
  onBack: () => void;
  onLogin: (email: string, password: string) => void;
  onSocialLogin: (provider: string) => void;
}

export function LoginScreen({ onBack, onLogin, onSocialLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

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
        <h1 className="text-2xl font-bold text-[#f8fafc] ml-4">Welcome Back</h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-center">
        <div className="space-y-6 mb-8">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-[#cbd5e1] font-medium">
              Email Address
            </Label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#94a3b8]" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-12 h-14 bg-[#1a0f2e] border-[#4c1d95]/30 text-[#f8fafc] placeholder-[#94a3b8] rounded-xl focus:border-[#f472b6] focus:ring-[#f472b6]"
                placeholder="your@example.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-[#cbd5e1] font-medium">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#94a3b8]" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-12 pr-12 h-14 bg-[#1a0f2e] border-[#4c1d95]/30 text-[#f8fafc] placeholder-[#94a3b8] rounded-xl focus:border-[#f472b6] focus:ring-[#f472b6]"
                placeholder="Enter your password"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-[#94a3b8] hover:text-[#f472b6]"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        <Button 
          type="submit"
          className="w-full h-14 bg-gradient-to-r from-[#f472b6] to-[#ef4444] hover:from-[#ec4899] hover:to-[#dc2626] text-white font-semibold rounded-xl shadow-lg mb-6"
        >
          Sign In
        </Button>

        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-[#4c1d95]/30"></div>
          <span className="px-4 text-[#94a3b8] text-sm">or continue with</span>
          <div className="flex-1 border-t border-[#4c1d95]/30"></div>
        </div>

        <div className="space-y-3">
          <Button 
            type="button"
            variant="outline"
            onClick={() => onSocialLogin('google')}
            className="w-full h-12 border-[#4c1d95]/30 text-[#cbd5e1] bg-[#1a0f2e] hover:bg-[#2a1f3d] rounded-xl"
          >
            Continue with Google
          </Button>
          <Button 
            type="button"
            variant="outline"
            onClick={() => onSocialLogin('facebook')}
            className="w-full h-12 border-[#4c1d95]/30 text-[#cbd5e1] bg-[#1a0f2e] hover:bg-[#2a1f3d] rounded-xl"
          >
            Continue with Facebook
          </Button>
          <Button 
            type="button"
            variant="outline"
            onClick={() => onSocialLogin('instagram')}
            className="w-full h-12 border-[#4c1d95]/30 text-[#cbd5e1] bg-[#1a0f2e] hover:bg-[#2a1f3d] rounded-xl"
          >
            Continue with Instagram
          </Button>
        </div>
      </form>

      <motion.p 
        className="text-center text-[#94a3b8] text-sm mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Forgot your password?{' '}
        <span className="text-[#f472b6] font-medium cursor-pointer hover:underline">
          Reset it here
        </span>
      </motion.p>
    </motion.div>
  );
}