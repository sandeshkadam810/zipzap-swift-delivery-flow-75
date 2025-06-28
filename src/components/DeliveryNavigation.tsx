import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Truck, Clock, MapPin } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import AuthModal from './AuthModal';

interface DeliveryNavigationProps {
  onSwitchInterface: () => void;
}

const DeliveryNavigation = ({ onSwitchInterface }: DeliveryNavigationProps) => {
  const [user, setUser] = useState<any>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) setUser(data.user);
    };
    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate('/');
  };

  const handleAuthClick = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setShowAuth(true);
  };

  const handleAuthSuccess = (userData: any) => {
    setUser(userData);
    setShowAuth(false);
  };

  return (
    <>
      <nav className="bg-white/90 backdrop-blur-lg border-b border-green-100/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo + Brand */}
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-2 rounded-xl shadow-lg">
                <Truck className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                ZipZap Delivery
              </span>
            </div>

            {/* Navigation Options */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-1 text-gray-600 hover:text-green-600 transition-colors font-medium cursor-pointer">
                <MapPin className="h-4 w-4" />
                <span>My Orders</span>
              </div>
              <div className="flex items-center space-x-1 text-gray-600 hover:text-green-600 transition-colors font-medium cursor-pointer">
                <Clock className="h-4 w-4" />
                <span>Schedule</span>
              </div>
            </div>

            {/* Right Side Buttons */}
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                onClick={onSwitchInterface}
                className="hover:bg-green-50 hover:text-green-600 text-sm"
              >
                Switch Interface
              </Button>

              {user ? (
                <>
                  <span className="text-gray-600 hidden sm:inline text-sm">
                    Welcome, {user.email}
                  </span>
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="hover:bg-green-50 hover:text-green-600 text-sm"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    onClick={() => handleAuthClick('login')}
                    className="hover:bg-green-50 hover:text-green-600 text-sm"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => handleAuthClick('signup')}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all"
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

export default DeliveryNavigation;
