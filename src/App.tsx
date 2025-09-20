import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Toaster } from './components/ui/sonner';

// Screen Components
import { SplashScreen } from './components/SplashScreen';
import { WelcomeScreen } from './components/WelcomeScreen';
import { LoginScreen } from './components/LoginScreen';
import { RegisterScreen } from './components/RegisterScreen';
import { ProfileSetupScreen } from './components/ProfileSetupScreen';
import { PartnerPairingScreen } from './components/PartnerPairingScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { AddQuestionScreen } from './components/AddQuestionScreen';
import { AnswerRevealScreen } from './components/AnswerRevealScreen';
import { ArchiveScreen } from './components/ArchiveScreen';
import { SettingsScreen } from './components/SettingsScreen';

type Screen = 
  | 'splash'
  | 'welcome' 
  | 'login'
  | 'register'
  | 'profile-setup'
  | 'partner-pairing'
  | 'dashboard'
  | 'add-question'
  | 'answer-reveal'
  | 'archive'
  | 'settings';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [user, setUser] = useState<{
    email?: string;
    nickname?: string;
    language?: string;
    profilePicture?: string;
    partnerId?: string;
  } | null>(null);

  // Force dark mode
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const handleLogin = (email: string, password: string) => {
    // Mock login
    setUser({ email });
    setCurrentScreen('dashboard'); // Skip to dashboard for demo
  };

  const handleRegister = (email: string, password: string, confirmPassword: string) => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    setUser({ email });
    setCurrentScreen('profile-setup');
  };

  const handleSocialLogin = (provider: string) => {
    // Mock social login
    setUser({ email: `user@${provider}.com` });
    setCurrentScreen('dashboard'); // Skip to dashboard for demo
  };

  const handleProfileSetup = (nickname: string, language: string, profilePicture?: string) => {
    setUser(prev => ({ ...prev, nickname, language, profilePicture }));
    setCurrentScreen('partner-pairing');
  };

  const handlePartnerPaired = () => {
    setUser(prev => ({ ...prev, partnerId: 'partner123' }));
    setCurrentScreen('dashboard');
  };

  const handleAddQuestion = (question: string) => {
    // Mock saving question
    console.log('Added question:', question);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentScreen('welcome');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onComplete={() => setCurrentScreen('welcome')} />;
      
      case 'welcome':
        return (
          <WelcomeScreen 
            onLogin={() => setCurrentScreen('login')}
            onRegister={() => setCurrentScreen('register')}
          />
        );
      
      case 'login':
        return (
          <LoginScreen 
            onBack={() => setCurrentScreen('welcome')}
            onLogin={handleLogin}
            onSocialLogin={handleSocialLogin}
          />
        );
      
      case 'register':
        return (
          <RegisterScreen 
            onBack={() => setCurrentScreen('welcome')}
            onRegister={handleRegister}
            onSocialLogin={handleSocialLogin}
          />
        );
      
      case 'profile-setup':
        return (
          <ProfileSetupScreen 
            onContinue={handleProfileSetup}
          />
        );
      
      case 'partner-pairing':
        return (
          <PartnerPairingScreen 
            onPaired={handlePartnerPaired}
          />
        );
      
      case 'dashboard':
        return (
          <DashboardScreen 
            onAddQuestion={() => setCurrentScreen('add-question')}
            onViewArchive={() => setCurrentScreen('archive')}
            onSettings={() => setCurrentScreen('settings')}
            onAnswerReveal={() => setCurrentScreen('answer-reveal')}
          />
        );
      
      case 'add-question':
        return (
          <AddQuestionScreen 
            onBack={() => setCurrentScreen('dashboard')}
            onSave={handleAddQuestion}
          />
        );
      
      case 'answer-reveal':
        return (
          <AnswerRevealScreen 
            onBack={() => setCurrentScreen('dashboard')}
          />
        );
      
      case 'archive':
        return (
          <ArchiveScreen 
            onBack={() => setCurrentScreen('dashboard')}
            onViewAnswer={(questionId) => {
              console.log('View answer for question:', questionId);
              setCurrentScreen('answer-reveal');
            }}
          />
        );
      
      case 'settings':
        return (
          <SettingsScreen 
            onBack={() => setCurrentScreen('dashboard')}
            onEditProfile={() => console.log('Edit profile')}
            onDisconnectPartner={() => {
              setUser(prev => ({ ...prev, partnerId: undefined }));
              setCurrentScreen('partner-pairing');
            }}
            onDeleteAccount={() => {
              setUser(null);
              setCurrentScreen('welcome');
            }}
            onLogout={handleLogout}
          />
        );
      
      default:
        return <div>Screen not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0a1a] text-white overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="h-screen"
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>
      <Toaster 
        position="top-center"
        theme="dark"
        toastOptions={{
          style: {
            background: '#2a1f3d',
            border: '1px solid rgba(244, 114, 182, 0.3)',
            color: '#f8fafc',
          },
        }}
      />
    </div>
  );
}