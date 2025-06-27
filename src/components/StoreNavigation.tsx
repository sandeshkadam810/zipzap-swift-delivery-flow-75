import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase"; // adjust if your path differs
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Package, BarChart3, MapPin, Store, Settings, Users } from 'lucide-react';
import AuthModal from './AuthModal';

interface StoreNavigationProps {
  onSwitchInterface: () => void;
}

const StoreNavigation = ({ onSwitchInterface }: StoreNavigationProps) => {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const navigate = useNavigate();

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
      <nav className="bg-white/90 backdrop-blur-lg border-b border-purple-100/50 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/store-dashboard" className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-xl shadow-lg">
                <Store className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                ZipZap Store
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-6">
              <Link
                to="/store-dashboard"
                className="flex items-center space-x-1 text-gray-600 hover:text-purple-600 transition-colors font-medium"
              >
                <BarChart3 className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
              <Link
                to="/smart-inventory"
                className="flex items-center space-x-1 text-gray-600 hover:text-purple-600 transition-colors font-medium"
              >
                <Package className="h-4 w-4" />
                <span>Inventory</span>
              </Link>
              <Link
                to="/order-tracking"
                className="flex items-center space-x-1 text-gray-600 hover:text-purple-600 transition-colors font-medium"
              >
                <MapPin className="h-4 w-4" />
                <span>Orders</span>
              </Link>
            </div>

            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                onClick={() => navigate('/store-dashboard')}
                className="hover:bg-purple-50 hover:text-purple-600 transition-all text-sm"
              >
                Home
              </Button>

              {user ? (
                <>
                  <span className="text-gray-600">Welcome, {user.name}</span>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      handleLogout();
                      navigate('/');
                    }}
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
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all"
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

export default StoreNavigation;
