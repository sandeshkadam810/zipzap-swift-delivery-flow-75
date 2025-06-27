
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Package, BarChart3, MapPin, Store } from 'lucide-react';
import AuthModal from './AuthModal';
import LocationSelector from './LocationSelector';

const Navigation = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [user, setUser] = useState<any>(null);

  const handleAuthClick = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setShowAuth(true);
  };

  const handleAuthSuccess = (userData: any) => {
    setUser(userData);
    setShowAuth(false);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <>
      <nav className="bg-white/90 backdrop-blur-lg border-b border-purple-100/50 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-xl shadow-lg">
                <Package className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                ZipZap
              </span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-6">
              <Link 
                to="/smart-inventory" 
                className="flex items-center space-x-1 text-gray-600 hover:text-purple-600 transition-colors font-medium"
              >
                <BarChart3 className="h-4 w-4" />
                <span>Smart Inventory</span>
              </Link>
              <Link 
                to="/live-tracking" 
                className="flex items-center space-x-1 text-gray-600 hover:text-purple-600 transition-colors font-medium"
              >
                <MapPin className="h-4 w-4" />
                <span>Live Tracking</span>
              </Link>
              <Link 
                to="/store-dashboard" 
                className="flex items-center space-x-1 text-gray-600 hover:text-purple-600 transition-colors font-medium"
              >
                <Store className="h-4 w-4" />
                <span>Store Dashboard</span>
              </Link>
              <LocationSelector />
            </div>

            <div className="flex items-center space-x-3">
              {user ? (
                <>
                  <span className="text-gray-600">Welcome, {user.name}</span>
                  <Button 
                    variant="ghost" 
                    onClick={handleLogout}
                    className="hover:bg-purple-50 hover:text-purple-600 transition-all"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="ghost" 
                    onClick={() => handleAuthClick('login')}
                    className="hover:bg-purple-50 hover:text-purple-600 transition-all"
                  >
                    Login
                  </Button>
                  <Button 
                    onClick={() => handleAuthClick('signup')}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all"
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <AuthModal 
        isOpen={showAuth} 
        onClose={() => setShowAuth(false)} 
        mode={authMode}
        onModeChange={setAuthMode}
        onAuthSuccess={handleAuthSuccess}
      />
    </>
  );
};

export default Navigation;
