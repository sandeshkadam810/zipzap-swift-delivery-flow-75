
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Truck, MapPin, Clock, Package, Phone, CheckCircle, Navigation } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import DeliveryNavigation from '@/components/DeliveryNavigation';


interface DeliveryOrder {
  id: string;
  customer_address: string;
  customer_location: { lat: number; lng: number };
  items: any[];
  total_amount: number;
  status: string;
  created_at: string;
  estimated_delivery_time: string;
  store: {
    id: string;
    name: string;
    address: string;
    phone: string;
    location: { lat: number; lng: number };
  };
}

const DeliveryDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [deliveryExecutive, setDeliveryExecutive] = useState<any>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);

        // Get delivery executive profile
        const { data: execData } = await supabase
          .from('delivery_executives')
          .select('*')
          .eq('user_id', data.user.id)
          .single();

        if (execData) {
          setDeliveryExecutive(execData);
        }
      }
    };
    getUser();
  }, []);


  // Fetch assigned orders
  const { data: orders = [], refetch } = useQuery({
    queryKey: ['delivery-orders', deliveryExecutive?.id],
    queryFn: async () => {
      if (!deliveryExecutive?.id) return [];

      const { data, error } = await supabase
        .from('orders')
        .select(`
        *,
        store: stores (
          id,
          name,
          address,
          phone,
          location
        )
      `)
        .eq('delivery_exec_id', deliveryExecutive.id)
        .order('created_at', { ascending: true });

      if (error) {
        console.error("Error fetching orders:", error);
        throw error;
      }

      return data.map(order => ({
        ...order,
        customer_location: parseLocation(order.customer_location),
      })) as DeliveryOrder[]; // Assuming store is no longer required in the type
    },
    enabled: !!deliveryExecutive?.id,
    refetchInterval: 30000,
  });

  // Helper function to parse location
  const parseLocation = (location: unknown): { lat: number; lng: number } => {
    if (typeof location === 'object' && location !== null && 'lat' in location && 'lng' in location) {
      return location as { lat: number; lng: number };
    }
    return { lat: 0, lng: 0 };
  };

  // Mark order as delivered
const deliverOrderMutation = useMutation({
  mutationFn: async (orderId: string) => {
    // 1. Mark order as delivered
    const { error: orderError } = await supabase
      .from('orders')
      .update({ 
        status: 'delivered',
        actual_delivery_time: new Date().toISOString()
      })
      .eq('id', orderId);

    if (orderError) throw orderError;

    // 2. Fetch the delivery_exec_id for the order
    const { data: orderData, error: fetchError } = await supabase
      .from('orders')
      .select('delivery_exec_id')
      .eq('id', orderId)
      .single();

    if (fetchError) throw fetchError;

    const execId = orderData.delivery_exec_id;

    if (!execId) throw new Error('No delivery executive assigned to this order');

    // 3. Update delivery_executive.is_available to true
    const { error: execError } = await supabase
      .from('delivery_executives')
      .update({ is_available: true })
      .eq('id', execId);

    if (execError) throw execError;
  },

  onSuccess: () => {
    toast({
      title: "Order Delivered!",
      description: "Order marked as delivered and executive marked as available.",
    });
    refetch();
  },

  onError: (error: any) => {
    toast({
      title: "Error",
      description: error.message || "Failed to mark order as delivered.",
      variant: "destructive",
    });
  },
});

  // Pick up order
  const [loadingOrderId, setLoadingOrderId] = useState<string | null>(null);

  const pickupOrderMutation = useMutation({
    mutationFn: async (orderId: string) => {
      setLoadingOrderId(orderId);
      const { error } = await supabase
        .from('orders')
        .update({ status: 'picked' })
        .eq('id', orderId);

      if (error) throw error;
    },
    onSuccess: () => {
      setLoadingOrderId(null);
      toast({ title: "Order Picked Up!", description: "Order has been picked up." });
      refetch();
    },
    onError: (error: any) => {
      setLoadingOrderId(null);
      toast({
        title: "Error",
        description: error.message || "Failed to update order.",
        variant: "destructive",
      });
    },

  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-orange-100 text-orange-800';
      case 'picked': return 'bg-blue-100 text-blue-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'picked': return <Truck className="h-4 w-4" />;
      case 'delivered': return <CheckCircle className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };


  return (
    <div className="min-h-screen bg-gray-50">
      <DeliveryNavigation onSwitchInterface={() => { }} />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mt-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Delivery Dashboard</h1>

          <p className="text-gray-600">Manage your assigned deliveries and track your progress</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending Pickups</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {orders.filter(o => o.status === 'ready').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Truck className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">In Transit</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {orders.filter(o => o.status === 'picked').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Assigned Orders</h2>

          {orders.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Truck className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No Orders Assigned</h3>
                <p className="text-gray-500">New delivery orders will appear here when assigned to you.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {orders.map((order) => (
                <Card key={order.id} className="border-2 hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold">#{order.id.slice(-8)}</span>
                        <Badge className={getStatusColor(order.status)}>
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(order.status)}
                            <span>{order.status.toUpperCase()}</span>
                          </div>
                        </Badge>
                      </div>
                      <p className="text-lg font-bold text-green-600">₹{order.total_amount}</p>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Store Information */}
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 mb-2">Pickup Location</h4>
                      <div className="space-y-2">
                        <p className="font-medium">{order.store.name}</p>
                        <p className="text-sm text-gray-600 flex items-start">
                          <MapPin className="h-4 w-4 mr-1 mt-0.5 text-blue-600 flex-shrink-0" />
                          {order.store.address}
                        </p>
                        {order.store.phone && (
                          <p className="text-sm text-gray-600 flex items-center">
                            <Phone className="h-4 w-4 mr-1 text-blue-600" />
                            {order.store.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Customer Information */}
                    <div className="bg-green-50 rounded-lg p-4">
                      <h4 className="font-semibold text-green-900 mb-2">Delivery Location</h4>
                      <p className="text-sm text-gray-600 flex items-start">
                        <MapPin className="h-4 w-4 mr-1 mt-0.5 text-green-600 flex-shrink-0" />
                        {order.customer_address}
                      </p>
                    </div>

                    {/* Order Details */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Items</span>
                        {(() => {
                          try {
                            const parsed = typeof order.items === 'string'
                              ? JSON.parse(order.items)
                              : order.items;
                            return `${parsed?.length || 0} items •`;
                          } catch (err) {
                            console.error('Error parsing order.items:', order.items);
                            return '0 items •';
                          }
                        })()}
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Order Time</span>
                        <span className="font-semibold">
                          {new Date(order.created_at).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                      {order.estimated_delivery_time && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">ETA</span>
                          <span className="font-semibold text-orange-600">
                            {new Date(order.estimated_delivery_time).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2 pt-4">
                      {order.status === 'ready' && (
                        <Button
                          onClick={() => pickupOrderMutation.mutate(order.id)}
                          disabled={loadingOrderId === order.id}
                          className="flex-1 bg-blue-600 hover:bg-blue-700"
                        >
                          <Package className="h-4 w-4 mr-1" />
                          {loadingOrderId === order.id ? 'Updating...' : 'Mark as Picked Up'}
                        </Button>

                      )}

                      {order.status === 'picked' && (
                        <Button
                          onClick={() => deliverOrderMutation.mutate(order.id)}
                          disabled={deliverOrderMutation.isPending}
                          className="flex-1 bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Mark as Delivered
                        </Button>
                      )}

                      <Button variant="outline" className="flex-1">
                        <Navigation className="h-4 w-4 mr-1" />
                        Navigate
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeliveryDashboard;