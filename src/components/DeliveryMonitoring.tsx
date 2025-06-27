
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Phone, User, Truck, Navigation } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface DeliveryMonitoringProps {
  storeId: string;
}

interface ActiveDelivery {
  id: string;
  customer_address: string;
  customer_location: { lat: number; lng: number };
  status: string;
  estimated_delivery_time: string;
  created_at: string;
  delivery_executive: {
    id: string;
    name: string;
    phone: string;
    current_location: { lat: number; lng: number };
  };
  items: any[];
  total_amount: number;
}

const DeliveryMonitoring = ({ storeId }: DeliveryMonitoringProps) => {
  const [realtimeDeliveries, setRealtimeDeliveries] = useState<ActiveDelivery[]>([]);

  // Fetch active deliveries
  const { data: deliveries = [], refetch } = useQuery({
    queryKey: ['active-deliveries', storeId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          delivery_executives (
            id,
            name,
            phone,
            current_location
          )
        `)
        .eq('store_id', storeId)
        .in('status', ['assigned_to_rider', 'picked', 'en_route'])
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as ActiveDelivery[];
    },
    refetchInterval: 10000, // Refresh every 10 seconds
  });

  // Real-time updates
  useEffect(() => {
    const channel = supabase
      .channel(`deliveries-${storeId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'orders',
          filter: `store_id=eq.${storeId}`
        },
        () => {
          refetch();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [storeId, refetch]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'assigned_to_rider': return 'bg-blue-100 text-blue-800';
      case 'picked': return 'bg-yellow-100 text-yellow-800';
      case 'en_route': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'assigned_to_rider': return <User className="h-4 w-4" />;
      case 'picked': return <Truck className="h-4 w-4" />;
      case 'en_route': return <Navigation className="h-4 w-4" />;
      default: return <MapPin className="h-4 w-4" />;
    }
  };

  const calculateETA = (estimatedTime: string) => {
    const eta = new Date(estimatedTime);
    const now = new Date();
    const diffMinutes = Math.max(0, Math.round((eta.getTime() - now.getTime()) / (1000 * 60)));
    
    if (diffMinutes === 0) return 'Due now';
    if (diffMinutes < 60) return `${diffMinutes} min`;
    return `${Math.round(diffMinutes / 60)}h ${diffMinutes % 60}m`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Truck className="h-6 w-6" />
              <span>Live Delivery Monitoring</span>
            </div>
            <Badge variant="secondary" className="bg-white/20 text-white">
              {deliveries.length} active
            </Badge>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Delivery Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {deliveries.length === 0 ? (
          <Card className="lg:col-span-2 text-center py-12">
            <CardContent>
              <Truck className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No Active Deliveries</h3>
              <p className="text-gray-500">Active deliveries will appear here for real-time monitoring.</p>
            </CardContent>
          </Card>
        ) : (
          deliveries.map((delivery) => (
            <Card key={delivery.id} className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold">#{delivery.id.slice(-8)}</span>
                    <Badge className={getStatusColor(delivery.status)}>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(delivery.status)}
                        <span>{delivery.status.replace('_', ' ').toUpperCase()}</span>
                      </div>
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">ETA</p>
                    <p className="font-semibold text-green-600">
                      {calculateETA(delivery.estimated_delivery_time)}
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Delivery Executive Info */}
                <div className="bg-blue-50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {delivery.delivery_executive.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold">{delivery.delivery_executive.name}</p>
                        <p className="text-sm text-gray-600 flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          {delivery.delivery_executive.phone}
                        </p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Phone className="h-4 w-4 mr-1" />
                      Call
                    </Button>
                  </div>
                </div>

                {/* Order Details */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Order Value</span>
                    <span className="font-semibold">₹{delivery.total_amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Items</span>
                    <span className="font-semibold">{delivery.items.length} items</span>
                  </div>
                </div>

                {/* Customer Address */}
                <div>
                  <p className="text-sm text-gray-600 mb-1">Delivery Address</p>
                  <p className="font-medium flex items-start">
                    <MapPin className="h-4 w-4 mr-1 mt-0.5 text-purple-600 flex-shrink-0" />
                    <span className="text-sm">{delivery.customer_address}</span>
                  </p>
                </div>

                {/* Timeline */}
                <div className="border-t pt-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">
                      Order placed {new Date(delivery.created_at).toLocaleTimeString()}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    Track
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Phone className="h-4 w-4 mr-1" />
                    Customer
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default DeliveryMonitoring;
