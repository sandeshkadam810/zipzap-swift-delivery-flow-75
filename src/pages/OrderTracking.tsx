
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase'; // adjust path as needed
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, User, Phone, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StoreNavigation from '@/components/StoreNavigation';

const OrderTracking = () => {
  const [selectedOrder, setSelectedOrder] = useState('ZZ001');
  const [deliveryExecutives, setDeliveryExecutives] = useState([
    { id: 1, name: 'Rahul Kumar', phone: '+91 9876543210', status: 'available', location: 'Sector 15', efficiency: 94, distance: '1.2 km' },
    { id: 2, name: 'Priya Sharma', phone: '+91 9876543211', status: 'delivering', location: 'Sector 18', efficiency: 98, distance: '2.1 km' },
    { id: 3, name: 'Amit Singh', phone: '+91 9876543212', status: 'available', location: 'Sector 12', efficiency: 89, distance: '0.8 km' },
  ]);

  const [isLoading, setIsLoading] = useState(true);
    const [isStore, setIsStore] = useState(false);
    
  
      const navigate = useNavigate();
  
    useEffect(() => {
      const checkRole = async () => {
        const {
          data: { user },
          error: userError
        } = await supabase.auth.getUser();
  
        if (userError || !user) {
          navigate('/login'); // not logged in
          return;
        }
  
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('user_type')
          .eq('id', user.id)
          .single();
  
        if (profileError || !profile) {
          navigate('/unauthorized'); // optional: show unauthorized message
          return;
        }
  
        if (profile.user_type === 'store') {
          setIsStore(true);
        } else {
          navigate('/unauthorized'); // not a store user
        }
  
        setIsLoading(false);
      };
  
      checkRole();
    }, [navigate]);
  


  const [orders, setOrders] = useState([
    {
      id: 'ZZ001',
      customer: 'John Doe',
      items: 8,
      address: '123 Main Street, Sector 15, New Delhi',
      phone: '+91 9876543213',
      status: 'preparing',
      assignedStore: 'Store A - Sector 15',
      estimatedTime: '8-12 mins',
      distance: '1.5 km',
      coordinates: { lat: 28.5355, lng: 77.3910 }
    },
    {
      id: 'ZZ002',
      customer: 'Sarah Wilson',
      items: 5,
      address: '456 Park Avenue, Sector 18, New Delhi',
      phone: '+91 9876543214',
      status: 'assigned',
      assignedStore: 'Store B - Sector 18',
      assignedRider: 'Priya Sharma',
      estimatedTime: '10-15 mins',
      distance: '2.3 km',
      coordinates: { lat: 28.5485, lng: 77.3915 }
    }
  ]);

  const assignRider = (orderId: string, riderId: number) => {
    const rider = deliveryExecutives.find(r => r.id === riderId);
    if (rider) {
      setOrders(prev => prev.map(order => 
        order.id === orderId 
          ? { ...order, status: 'assigned', assignedRider: rider.name }
          : order
      ));
      setDeliveryExecutives(prev => prev.map(exec =>
        exec.id === riderId
          ? { ...exec, status: 'assigned' }
          : exec
      ));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'preparing': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'assigned': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'picked': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'delivered': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };


      if (isLoading) {
      return <div className="p-6 text-center">Loading dashboard...</div>;
    }
  
    if (!isStore) {
      return <div className="p-6 text-red-500">Unauthorized access</div>;
    }
    
  const currentOrder = orders.find(o => o.id === selectedOrder);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <StoreNavigation onSwitchInterface={function (): void {
        throw new Error('Function not implemented.');
      } } />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Link to="/store-dashboard" className="mr-4">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Order Tracking & Assignment
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Selection */}
          <div className="lg:col-span-1">
            <Card className="bg-white/80 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle>Active Orders</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedOrder === order.id ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300'
                    }`}
                    onClick={() => setSelectedOrder(order.id)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold">#{order.id}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{order.customer}</p>
                    <p className="text-xs text-gray-500">{order.items} items • {order.distance}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Order Details & Tracking */}
          <div className="lg:col-span-2 space-y-6">
            {currentOrder && (
              <>
                <Card className="bg-white/80 backdrop-blur-sm border-white/20">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Order #{currentOrder.id} Details</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(currentOrder.status)}`}>
                        {currentOrder.status}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Customer</p>
                        <p className="font-semibold">{currentOrder.customer}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Items</p>
                        <p className="font-semibold">{currentOrder.items} items</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Estimated Time</p>
                        <p className="font-semibold">{currentOrder.estimatedTime}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Distance</p>
                        <p className="font-semibold">{currentOrder.distance}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Delivery Address</p>
                      <p className="font-semibold flex items-center">
                        <MapPin className="w-4 h-4 mr-1 text-purple-600" />
                        {currentOrder.address}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Assigned Store</p>
                      <p className="font-semibold">{currentOrder.assignedStore}</p>
                    </div>
                    {currentOrder.assignedRider && (
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Assigned Rider</p>
                        <p className="font-semibold">{currentOrder.assignedRider}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Available Delivery Executives */}
                <Card className="bg-white/80 backdrop-blur-sm border-white/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Available Delivery Executives
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {deliveryExecutives.filter(exec => exec.status === 'available').map((executive) => (
                        <div key={executive.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                              {executive.name.charAt(0)}
                            </div>
                            <div>
                              <h3 className="font-semibold">{executive.name}</h3>
                              <p className="text-sm text-gray-600 flex items-center">
                                <MapPin className="w-3 h-3 mr-1" />
                                {executive.location} • {executive.distance} away
                              </p>
                              <p className="text-sm text-gray-600 flex items-center">
                                <Phone className="w-3 h-3 mr-1" />
                                {executive.phone}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center mb-2">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                              <span className="text-sm font-medium">{executive.efficiency}% efficiency</span>
                            </div>
                            <Button
                              size="sm"
                              className="bg-gradient-to-r from-purple-600 to-blue-600"
                              onClick={() => assignRider(currentOrder.id, executive.id)}
                              disabled={currentOrder.status === 'assigned'}
                            >
                              {currentOrder.status === 'assigned' ? 'Assigned' : 'Assign Order'}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
