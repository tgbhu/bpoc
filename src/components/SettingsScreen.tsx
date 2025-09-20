import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Switch } from './ui/switch';
import { Avatar, AvatarFallback } from './ui/avatar';
import { 
  ArrowLeft, 
  User, 
  Bell, 
  UserX, 
  Trash2, 
  LogOut, 
  Edit,
  Shield,
  Heart,
  Settings as SettingsIcon
} from 'lucide-react';

interface SettingsScreenProps {
  onBack: () => void;
  onEditProfile: () => void;
  onDisconnectPartner: () => void;
  onDeleteAccount: () => void;
  onLogout: () => void;
}

export function SettingsScreen({ 
  onBack, 
  onEditProfile, 
  onDisconnectPartner, 
  onDeleteAccount, 
  onLogout 
}: SettingsScreenProps) {
  const [notifications, setNotifications] = useState(true);
  const [dailyReminders, setDailyReminders] = useState(true);
  const [partnerActivity, setPartnerActivity] = useState(true);

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
          <h1 className="text-2xl font-bold text-[#f8fafc]">Settings</h1>
          <p className="text-[#cbd5e1] text-sm">Manage your Birdie69 experience</p>
        </div>
      </div>

      <div className="flex-1 space-y-6">
        {/* Profile Section */}
        <Card className="bg-[#2a1f3d] border-[#4c1d95]/30">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <Avatar className="w-16 h-16 border-2 border-[#f472b6]/20">
                <AvatarFallback className="bg-[#f472b6] text-[#0f0a1a] text-xl font-bold">
                  <User className="w-8 h-8" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-[#f8fafc]">You</h3>
                <p className="text-[#cbd5e1]">your@example.com</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Heart className="w-4 h-4 text-[#f472b6] fill-[#f472b6]" />
                  <p className="text-[#94a3b8] text-sm">Connected with Alex</p>
                </div>
              </div>
            </div>
            <Button 
              onClick={onEditProfile}
              variant="outline"
              className="w-full border-[#4c1d95]/30 text-[#cbd5e1] bg-transparent hover:bg-[#4c1d95]/10 hover:border-[#f472b6]/30"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="bg-[#2a1f3d] border-[#4c1d95]/30">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Bell className="w-6 h-6 text-[#fbbf24]" />
              <h3 className="text-lg font-semibold text-[#f8fafc]">Notifications</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#f8fafc] font-medium">Push Notifications</p>
                  <p className="text-[#94a3b8] text-sm">Receive app notifications</p>
                </div>
                <Switch 
                  checked={notifications} 
                  onCheckedChange={setNotifications}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#f8fafc] font-medium">Daily Reminders</p>
                  <p className="text-[#94a3b8] text-sm">Remind me about new questions</p>
                </div>
                <Switch 
                  checked={dailyReminders} 
                  onCheckedChange={setDailyReminders}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#f8fafc] font-medium">Partner Activity</p>
                  <p className="text-[#94a3b8] text-sm">When your partner answers</p>
                </div>
                <Switch 
                  checked={partnerActivity} 
                  onCheckedChange={setPartnerActivity}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card className="bg-[#2a1f3d] border-[#4c1d95]/30">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="w-6 h-6 text-[#10b981]" />
              <h3 className="text-lg font-semibold text-[#f8fafc]">Privacy & Security</h3>
            </div>
            
            <div className="space-y-3">
              <Button 
                variant="ghost"
                className="w-full justify-start text-[#cbd5e1] hover:text-[#f8fafc] hover:bg-[#4c1d95]/10"
              >
                Change Password
              </Button>
              <Button 
                variant="ghost"
                className="w-full justify-start text-[#cbd5e1] hover:text-[#f8fafc] hover:bg-[#4c1d95]/10"
              >
                Privacy Policy
              </Button>
              <Button 
                variant="ghost"
                className="w-full justify-start text-[#cbd5e1] hover:text-[#f8fafc] hover:bg-[#4c1d95]/10"
              >
                Terms of Service
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card className="bg-[#2a1f3d] border-[#4c1d95]/30">
          <CardContent className="p-6">
            <div className="space-y-3">
              <Button 
                onClick={onDisconnectPartner}
                variant="ghost"
                className="w-full justify-start text-[#fbbf24] hover:text-[#f59e0b] hover:bg-[#fbbf24]/10"
              >
                <UserX className="w-5 h-5 mr-3" />
                Disconnect Partner
              </Button>
              
              <Button 
                onClick={onLogout}
                variant="ghost"
                className="w-full justify-start text-[#cbd5e1] hover:text-[#f8fafc] hover:bg-[#4c1d95]/10"
              >
                <LogOut className="w-5 h-5 mr-3" />
                Log Out
              </Button>
              
              <Button 
                onClick={onDeleteAccount}
                variant="ghost"
                className="w-full justify-start text-[#ef4444] hover:text-[#dc2626] hover:bg-[#ef4444]/10"
              >
                <Trash2 className="w-5 h-5 mr-3" />
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* App Info */}
        <motion.div 
          className="text-center pt-6 border-t border-[#4c1d95]/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Heart className="w-5 h-5 text-[#f472b6] fill-[#f472b6]" />
            <span className="text-[#f472b6] font-bold">Birdie69</span>
          </div>
          <p className="text-[#94a3b8] text-sm">Version 1.0.0</p>
          <p className="text-[#94a3b8] text-xs mt-1">
            Made with love for couples everywhere 💕
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}