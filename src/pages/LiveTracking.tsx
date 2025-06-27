import React, { useState, useEffect } from 'react';
import CustomerNavigation from '@/components/CustomerNavigation';
import GoogleMap from '@/components/GoogleMap';
import { MapPin, Clock, Truck, CheckCircle, Navigation as NavigationIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';

const LiveTracking = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error('Failed to get user:', userError);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('customer_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching orders:', error);
      } else {
        setOrders(data);
      }

      setLoading(false);
    };

    fetchOrders();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'picked': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'delivered': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'preparing': return <Clock className="h-4 w-4" />;
      case 'picked': return <Truck className="h-4 w-4" />;
      case 'delivered': return <CheckCircle className="h-4 w-4" />;
      default: return <MapPin className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <CustomerNavigation onSwitchInterface={function (): void {
        throw new Error('Function not implemented.');
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Live Order Tracking
            </span>
          </h1>
          <p className="text-xl text-gray-600">
            Real-time GPS tracking for all deliveries
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="bg-white/80 backdrop-blur-sm border-white/20 h-96">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <NavigationIcon className="h-5 w-5" />
                  Live Map View
                </CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <GoogleMap />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card className="bg-white/80 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle>Active Deliveries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className={`p-4 rounded-lg border ${getStatusColor(order.status)}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">#{order.id}</span>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(order.status)}
                          <span className="text-sm font-medium capitalize">{order.status}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">Rider: {order.rider}</p>
                      <p className="text-sm text-gray-600 mb-2">Total Amount: {order.total_amount} </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Estimated: {new Date(order.estimated_delivery_time).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true,
                        })}
                        </span>
                        <Button size="sm" variant="outline">
                          Track
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle>Delivery Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Average Delivery Time</span>
                    <span className="font-semibold">8.5 mins</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Orders Today</span>
                    <span className="font-semibold">234</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Success Rate</span>
                    <span className="font-semibold text-green-600">98.5%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveTracking;
