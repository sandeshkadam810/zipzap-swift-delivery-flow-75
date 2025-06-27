
import { supabase } from '@/integrations/supabase/client';

interface Location {
  lat: number;
  lng: number;
}

interface Store {
  id: string;
  name: string;
  location: Location;
  is_active: boolean;
  phone: string;
  address: string;
}

interface DeliveryExecutive {
  id: string;
  name: string;
  phone: string;
  store_id: string;
  current_location: Location;
  is_available: boolean;
}

interface Order {
  id: string;
  customer_location: Location;
  customer_address: string;
  items: any[];
  total_amount: number;
  status: 'pending' | 'assigned_to_store' | 'preparing' | 'ready' | 'assigned_to_rider' | 'picked' | 'delivered';
  store_id?: string;
  delivery_exec_id?: string;
  estimated_delivery_time?: string;
}

export class OrderManagementService {
  // Calculate distance between two points using Haversine formula
  private calculateDistance(point1: Location, point2: Location): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (point2.lat - point1.lat) * Math.PI / 180;
    const dLon = (point2.lng - point1.lng) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(point1.lat * Math.PI / 180) * Math.cos(point2.lat * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  // Find nearest store within 7km radius
  async findNearestStore(customerLocation: Location): Promise<Store | null> {
    try {
      const { data: stores, error } = await supabase
        .from('stores')
        .select('*')
        .eq('is_active', true);

      if (error) throw error;

      let nearestStore: Store | null = null;
      let minDistance = Infinity;

      for (const store of stores) {
        const distance = this.calculateDistance(customerLocation, store.location);
        if (distance <= 7 && distance < minDistance) {
          minDistance = distance;
          nearestStore = store;
        }
      }

      return nearestStore;
    } catch (error) {
      console.error('Error finding nearest store:', error);
      return null;
    }
  }

  // Assign order to nearest store
  async assignOrderToStore(orderId: string, customerLocation: Location): Promise<boolean> {
    try {
      const nearestStore = await this.findNearestStore(customerLocation);
      
      if (!nearestStore) {
        throw new Error('No store found within 7km radius');
      }

      const { error } = await supabase
        .from('orders')
        .update({ 
          store_id: nearestStore.id, 
          status: 'assigned_to_store',
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId);

      if (error) throw error;

      // Create order tracking entry
      await supabase
        .from('order_tracking')
        .insert({
          order_id: orderId,
          status: 'assigned_to_store',
          notes: `Order assigned to ${nearestStore.name}`,
          location: nearestStore.location
        });

      // Notify store (you can implement push notifications here)
      await this.notifyStore(nearestStore.id, orderId);

      return true;
    } catch (error) {
      console.error('Error assigning order to store:', error);
      return false;
    }
  }

  // Find nearest available delivery executive
  async findNearestDeliveryExecutive(storeId: string, customerLocation: Location): Promise<DeliveryExecutive | null> {
    try {
      const { data: executives, error } = await supabase
        .from('delivery_executives')
        .select('*')
        .eq('store_id', storeId)
        .eq('is_available', true);

      if (error) throw error;

      let nearestExec: DeliveryExecutive | null = null;
      let minDistance = Infinity;

      for (const exec of executives) {
        const distance = this.calculateDistance(exec.current_location, customerLocation);
        if (distance < minDistance) {
          minDistance = distance;
          nearestExec = exec;
        }
      }

      return nearestExec;
    } catch (error) {
      console.error('Error finding nearest delivery executive:', error);
      return null;
    }
  }

  // Assign order to delivery executive
  async assignOrderToDeliveryExecutive(orderId: string, storeId: string, customerLocation: Location): Promise<boolean> {
    try {
      const nearestExec = await this.findNearestDeliveryExecutive(storeId, customerLocation);
      
      if (!nearestExec) {
        console.log('No available delivery executive found');
        return false;
      }

      // Calculate estimated delivery time
      const storeToCustomerDistance = this.calculateDistance(nearestExec.current_location, customerLocation);
      const estimatedTime = Math.round((storeToCustomerDistance * 3) + 10); // 3 min per km + 10 min prep time

      const { error } = await supabase
        .from('orders')
        .update({ 
          delivery_exec_id: nearestExec.id,
          status: 'assigned_to_rider',
          estimated_delivery_time: new Date(Date.now() + estimatedTime * 60000).toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId);

      if (error) throw error;

      // Mark delivery executive as unavailable
      await supabase
        .from('delivery_executives')
        .update({ is_available: false })
        .eq('id', nearestExec.id);

      // Create tracking entry
      await supabase
        .from('order_tracking')
        .insert({
          order_id: orderId,
          status: 'assigned_to_rider',
          notes: `Assigned to ${nearestExec.name}. ETA: ${estimatedTime} minutes`,
          location: nearestExec.current_location
        });

      return true;
    } catch (error) {
      console.error('Error assigning order to delivery executive:', error);
      return false;
    }
  }

  // Notify store about new order
  private async notifyStore(storeId: string, orderId: string): Promise<void> {
    // In a real implementation, you would send push notifications
    // For now, we'll just log it
    console.log(`🔔 URGENT: New order ${orderId} assigned to store ${storeId}`);
    
    // You could integrate with services like:
    // - Firebase Cloud Messaging
    // - WebSocket notifications
    // - Email notifications
    // - SMS alerts
  }

  // Get store's pending orders sorted by priority
  async getStoreOrdersPrioritized(storeId: string): Promise<Order[]> {
    try {
      const { data: orders, error } = await supabase
        .from('orders')
        .select('*')
        .eq('store_id', storeId)
        .in('status', ['assigned_to_store', 'preparing'])
        .order('created_at', { ascending: true });

      if (error) throw error;

      // Sort by priority: high-value orders first, then by time
      return orders.sort((a, b) => {
        if (a.total_amount !== b.total_amount) {
          return b.total_amount - a.total_amount; // Higher amount first
        }
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime(); // Older first
      });
    } catch (error) {
      console.error('Error getting prioritized orders:', error);
      return [];
    }
  }

  // Process order (when store marks it as ready)
  async markOrderReady(orderId: string): Promise<boolean> {
    try {
      const { data: order, error: fetchError } = await supabase
        .from('orders')
        .select('*, stores(*)')
        .eq('id', orderId)
        .single();

      if (fetchError) throw fetchError;

      // Update order status
      const { error: updateError } = await supabase
        .from('orders')
        .update({ 
          status: 'ready',
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId);

      if (updateError) throw updateError;

      // Auto-assign to delivery executive
      await this.assignOrderToDeliveryExecutive(orderId, order.store_id, order.customer_location);

      // Create tracking entry
      await supabase
        .from('order_tracking')
        .insert({
          order_id: orderId,
          status: 'ready',
          notes: 'Order prepared and ready for pickup'
        });

      return true;
    } catch (error) {
      console.error('Error marking order ready:', error);
      return false;
    }
  }
}

export const orderManagementService = new OrderManagementService();
