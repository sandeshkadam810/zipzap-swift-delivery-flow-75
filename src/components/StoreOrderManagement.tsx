
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Package, AlertTriangle, CheckCircle, Bell, MapPin, User } from 'lucide-react';
import { orderManagementService } from '@/services/orderManagementService';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface StoreOrderManagementProps {
  storeId: string;
}

const StoreOrderManagement = ({ storeId }: StoreOrderManagementProps) => {
  const [notification, setNotification] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Fetch prioritized orders
  const { data: orders = [], isLoading, refetch } = useQuery({
    queryKey: ['store-orders', storeId],
    queryFn: () => orderManagementService.getStoreOrdersPrioritized(storeId),
    refetchInterval: 5000, // Refresh every 5 seconds
  });

  // Mark order as ready mutation
  const markReadyMutation = useMutation({
    mutationFn: (orderId: string) => orderManagementService.markOrderReady(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['store-orders', storeId] });
      toast({
        title: "Order Ready!",
        description: "Order marked as ready and assigned to delivery executive.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to mark order as ready.",
        variant: "destructive",
      });
    },
  });

  // Listen for new orders
  useEffect(() => {
    const channel = supabase
      .channel(`store-orders-${storeId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'orders',
          filter: `store_id=eq.${storeId}`
        },
        (payload) => {
          setNotification(`🔔 NEW ORDER #${payload.new.id?.slice(-8)}`);
          refetch();
          
          // Clear notification after 5 seconds
          setTimeout(() => setNotification(null), 5000);
          
          // Play notification sound (if browser allows)
          if ('Audio' in window) {
            const audio = new Audio('/notification.mp3');
            audio.play().catch(() => console.log('Could not play notification sound'));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [storeId, refetch]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'assigned_to_store': return 'bg-yellow-100 text-yellow-800';
      case 'preparing': return 'bg-blue-100 text-blue-800';
      case 'ready': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityLevel = (amount: number, createdAt: string) => {
    const orderAge = (Date.now() - new Date(createdAt).getTime()) / (1000 * 60); // minutes
    
    if (amount > 1000 || orderAge > 15) return 'HIGH';
    if (amount > 500 || orderAge > 10) return 'MEDIUM';
    return 'LOW';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH': return 'bg-red-100 text-red-800 border-red-300';
      case 'MEDIUM': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'LOW': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Notification Alert */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg animate-bounce">
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span className="font-semibold">{notification}</span>
          </div>
        </div>
      )}

      {/* Order Queue Header */}
      <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Package className="h-6 w-6" />
              <span>Order Preparation Queue</span>
            </div>
            <Badge variant="secondary" className="bg-white/20 text-white">
              {orders.length} orders
            </Badge>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No Pending Orders</h3>
              <p className="text-gray-500">All caught up! New orders will appear here automatically.</p>
            </CardContent>
          </Card>
        ) : (
          orders.map((order, index) => {
            const priority = getPriorityLevel(order.total_amount, order.created_at);
            const orderAge = Math.round((Date.now() - new Date(order.created_at).getTime()) / (1000 * 60));
            
            return (
              <Card key={order.id} className={`border-l-4 ${
                index === 0 ? 'border-l-red-500 bg-red-50/50' : 
                index === 1 ? 'border-l-orange-500 bg-orange-50/50' : 
                'border-l-gray-300'
              }`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-lg">#{order.id.slice(-8)}</span>
                        {index === 0 && (
                          <Badge variant="destructive" className="animate-pulse">
                            NEXT
                          </Badge>
                        )}
                      </div>
                      <Badge className={getPriorityColor(priority)}>
                        {priority}
                      </Badge>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{orderAge} min ago</span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Order Details */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Customer Address</p>
                      <p className="font-medium flex items-center">
                        <MapPin className="h-4 w-4 mr-1 text-purple-600" />
                        {order.customer_address}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Order Value</p>
                      <p className="font-bold text-lg text-green-600">₹{order.total_amount}</p>
                    </div>
                  </div>

                  {/* Items List */}
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Items ({order.items.length})</p>
                    <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                      {order.items.map((item: any, idx: number) => (
                        <div key={idx} className="flex justify-between items-center">
                          <span className="font-medium">{item.name}</span>
                          <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3 pt-4">
                    {order.status === 'assigned_to_store' && (
                      <Button 
                        className="flex-1 bg-blue-600 hover:bg-blue-700"
                        onClick={() => {
                          // Mark as preparing
                          supabase
                            .from('orders')
                            .update({ status: 'preparing' })
                            .eq('id', order.id)
                            .then(() => refetch());
                        }}
                      >
                        <Package className="h-4 w-4 mr-2" />
                        Start Preparing
                      </Button>
                    )}
                    
                    {order.status === 'preparing' && (
                      <Button 
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        onClick={() => markReadyMutation.mutate(order.id)}
                        disabled={markReadyMutation.isPending}
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        {markReadyMutation.isPending ? 'Processing...' : 'Mark Ready'}
                      </Button>
                    )}
                    
                    <Button variant="outline" size="sm">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Issue
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};

export default StoreOrderManagement;
