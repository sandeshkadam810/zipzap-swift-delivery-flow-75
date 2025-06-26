
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Package } from 'lucide-react';
import AuthModal from './AuthModal';
import LocationSelector from './LocationSelector';

const Navigation = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const handleAuthClick = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setShowAuth(true);
  };

  return (
    <>
      <nav className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
                <Package className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                ZipZap
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <LocationSelector />
            </div>

            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                onClick={() => handleAuthClick('login')}
                className="hover:bg-purple-50"
              >
                Login
              </Button>
              <Button 
                onClick={() => handleAuthClick('signup')}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <AuthModal 
        isOpen={showAuth} 
        onClose={() => setShowAuth(false)} 
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </>
  );
};

export default Navigation;
