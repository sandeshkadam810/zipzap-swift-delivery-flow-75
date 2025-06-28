

import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Package, MapPin, ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import AuthModal from './AuthModal';
import LocationSelector from './LocationSelector';
import { useNavigate } from "react-router-dom";
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from "react";



interface CustomerNavigationProps {
  onSwitchInterface: () => void;
}

const CustomerNavigation = ({ onSwitchInterface }: CustomerNavigationProps) => {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { getTotalItems } = useCart();

  const handleAuthClick = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setShowAuth(true);
  };

  const handleAuthSuccess = (userData: any) => {
    setUser(userData);
    setShowAuth(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };
  const totalItems = getTotalItems();



  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
      }
    };
    getUser();

    // Optional: subscribe to auth changes to auto-update user state
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);


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
                onClick={() => navigate('/customer-home')}
                className="hover:bg-purple-50 hover:text-purple-600 transition-all text-sm"
              >
                Home
              </Button>

              {user ? (
                <>
                  <span className="text-gray-600 hidden sm:inline">Welcome, {user.name}</span>
                  <Button
                    variant="ghost"
                    onClick={async () => {
                      await handleLogout();
                      navigate('/', { replace: true });
                    }}
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
