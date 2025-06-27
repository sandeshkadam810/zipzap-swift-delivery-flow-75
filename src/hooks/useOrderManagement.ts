
import { useMutation } from '@tanstack/react-query';
import { orderManagementService } from '@/services/orderManagementService';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface PlaceOrderData {
  customerLocation: { lat: number; lng: number };
  customerAddress: string;
  items: any[];
  totalAmount: number;
  customerId: string;
}

export const useOrderManagement = () => {
  const { toast } = useToast();

  const placeOrderMutation = useMutation({
    mutationFn: async (orderData: PlaceOrderData) => {
      console.log('Placing order with data:', orderData);
      
      // Create order in database
      const { data: order, error } = await supabase
        .from('orders')
        .insert({
          customer_id: orderData.customerId,
          customer_location: orderData.customerLocation,
          customer_address: orderData.customerAddress,
          items: orderData.items,
          total_amount: orderData.totalAmount,
          status: 'pending'
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating order:', error);
        throw error;
      }

      console.log('Order created:', order);

      // Automatically assign to nearest store
      const assigned = await orderManagementService.assignOrderToStore(
        order.id, 
        orderData.customerLocation
      );

      if (!assigned) {
        // Update order status to indicate no store available
        await supabase
          .from('orders')
          .update({ status: 'cancelled' })
          .eq('id', order.id);
        
        throw new Error('No store available in your area (within 7km radius). Please try again later.');
      }

      console.log('Order assigned to store successfully');
      return order;
    },
    onSuccess: (order) => {
      toast({
        title: "Order Placed Successfully!",
        description: `Order #${order.id.slice(-8)} has been assigned to the nearest store.`,
      });
      console.log('Order placement successful:', order);
    },
    onError: (error: any) => {
      console.error('Order placement failed:', error);
      toast({
        title: "Order Failed",
        description: error.message || "Failed to place order. Please try again.",
        variant: "destructive",
      });
    },
  });

  return {
    placeOrder: placeOrderMutation.mutate,
    isPlacingOrder: placeOrderMutation.isPending,
    orderError: placeOrderMutation.error,
  };
};

export default useOrderManagement;
