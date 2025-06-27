
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Package, MapPin, ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import AuthModal from './AuthModal';
import LocationSelector from './LocationSelector';

interface CustomerNavigationProps {
  onSwitchInterface: () => void;
}

const CustomerNavigation = ({ onSwitchInterface }: CustomerNavigationProps) => {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [user, setUser] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getTotalItems } = useCart();

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

  const totalItems = getTotalItems();

  return (
    <>
      <nav className="bg-white/90 backdrop-blur-lg border-b border-blue-100/50 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-2 rounded-xl shadow-lg">
                <Package className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                ZipZap Customer
              </span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-6">
              <Link 
                to="/live-tracking" 
                className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                <MapPin className="h-4 w-4" />
                <span>Track Order</span>
              </Link>
              <Link 
                to="/cart" 
                className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors font-medium relative"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>Cart</span>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
              <LocationSelector />
            </div>

            <div className="flex items-center space-x-3">
              {/* Mobile Cart Button */}
              <Link to="/cart" className="md:hidden relative">
                <Button variant="ghost" size="sm">
                  <ShoppingCart className="h-5 w-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </Link>

              <Button 
                variant="ghost" 
                onClick={onSwitchInterface}
                className="hover:bg-blue-50 hover:text-blue-600 transition-all text-sm"
              >
                Switch to Store
              </Button>
              
              {user ? (
                <>
                  <span className="text-gray-600 hidden sm:inline">Welcome, {user.name}</span>
                  <Button 
                    variant="ghost" 
                    onClick={handleLogout}
                    className="hover:bg-blue-50 hover:text-blue-600 transition-all"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="ghost" 
                    onClick={() => handleAuthClick('login')}
                    className="hover:bg-blue-50 hover:text-blue-600 transition-all"
                  >
                    Login
                  </Button>
                  <Button 
                    onClick={() => handleAuthClick('signup')}
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg hover:shadow-xl transition-all"
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

export default CustomerNavigation;
