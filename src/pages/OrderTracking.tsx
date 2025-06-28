
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase'; // adjust path as needed
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, User, Phone, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StoreNavigation from '@/components/StoreNavigation';


const OrderTracking = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState('ZZ001');
  const [deliveryExecutives, setDeliveryExecutives] = useState<any[]>([]);


  const [isStore, setIsStore] = useState(false);

  interface Order {
    id: string;
    customer_id: string;
    store_id: string;
    delivery_exec_id: string;
    items: any[];
    total_amount: number;
    status: string;
    customer_address: string;
    customer_location: { lat: number; lng: number };
    estimated_delivery_time: string;
  }


  const navigate = useNavigate();

  useEffect(() => {


    const fetchExecutives = async () => {
      const { data, error } = await supabase
        .from('delivery_executives')
        .select('id, name, phone, is_available, efficiency');

      if (error) {
        console.error('Error fetching delivery executives:', error.message);
        return;
      }

      setDeliveryExecutives(data || []);
    };

    fetchExecutives();



    const fetchOrdersForStore = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();


      // Check if user is a store
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('user_type')
        .eq('id', user.id)
        .single();

      if (!user || profileError || !profile || profile.user_type !== 'store') {
        setIsStore(false);
      } else {
        setIsStore(true);
      }

      // Get store ID from stores table using user.id
      const { data: storeData, error: storeError } = await supabase
        .from('stores')
        .select('id')
        .eq('user_id', user.id)
        .single();

      console.log("Store ID:", storeData?.id);


      const storeId = storeData.id;

      // Now fetch orders for this store ID
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('id, customer_id, store_id, delivery_exec_id, items, total_amount, status, customer_address, customer_location, estimated_delivery_time')
        .eq('store_id', storeId)
        .order('created_at', { ascending: false });
      console.log("Orders found:", ordersData?.length);
      console.log("Orders data:", ordersData);

      if (ordersError) {
        console.error("Error fetching orders:", ordersError.message);
        return;
      }



      setOrders(ordersData); // ✅ This actually updates the UI
    };

    fetchOrdersForStore();
  }, [navigate]);


  const assignRider = async (orderId: string, executiveId: string) => {
    const rider = deliveryExecutives.find(exec => exec.id === executiveId);
    if (!rider) return;
    console.log('Assign button clicked for order:', orderId, 'executive:', executiveId);

    // 1. Update the order to assign delivery executive
    const { error: orderError } = await supabase
      .from('orders')
      .update({
        delivery_exec_id: executiveId,
        status: 'ready',
      })
      .eq('id', orderId);

    // 2. Update the executive's availability
    const { error: execError } = await supabase
      .from('delivery_executives')
      .update({ is_available: false })
      .eq('id', executiveId);

    if (orderError || execError) {
      console.error('Assignment failed:', {
        orderError: orderError?.message,
        execError: execError?.message,
      });
      return;
    }

    // 3. Update frontend state (local only)
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId
          ? {
            ...order,
            status: 'assigned',
            delivery_exec_id: executiveId,
            assignedRider: rider.name,
          }
          : order
      )
    );

    setDeliveryExecutives(prev =>
      prev.map(exec =>
        exec.id === executiveId
          ? { ...exec, is_available: false }
          : exec
      )
    );
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


  
  const currentOrder = orders.find(o => o.id === selectedOrder);

  console.log('Delivery Executives:', deliveryExecutives);


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <StoreNavigation onSwitchInterface={function (): void {
        throw new Error('Function not implemented.');
      }} />

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
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${selectedOrder === order.id ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300'
                      }`}
                    onClick={() => setSelectedOrder(order.id)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold">#{order.id}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{order.customer_id}</p>
                    <p className="text-xs text-gray-500">
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
                      ₹{String(order.total_amount)}

                    </p>



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
                        <p className="font-semibold">{currentOrder.customer_id}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Items</p>
                        {(() => {
                          let parsedItems;

                          try {
                            parsedItems = typeof currentOrder.items === 'string'
                              ? JSON.parse(currentOrder.items)
                              : currentOrder.items;
                          } catch (e) {
                            console.error('Failed to parse items:', currentOrder.items);
                            parsedItems = [];
                          }

                          if (!Array.isArray(parsedItems) || parsedItems.length === 0) {
                            return <p className="text-gray-500">No items found.</p>;
                          }

                          return (
                            <ul className="space-y-2 mt-2">
                              {parsedItems.map((item: any, index: number) => (
                                <li key={index} className="text-sm text-gray-700">
                                  🛒 {item.name} — ₹{item.price} × {item.quantity}
                                </li>
                              ))}
                            </ul>
                          );
                        })()}
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Estimated Time</p>
                        <p className="font-semibold">
                          {new Date(currentOrder.estimated_delivery_time).toLocaleString('en-IN', {
                            dateStyle: 'medium',
                            timeStyle: 'short',
                            hour12: true,
                          })}
                        </p>

                      </div>
                      <div>
                        <div>
                          <p className="text-sm text-gray-600">Total Amount</p>
                          <p className="font-semibold">₹{currentOrder.total_amount}</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Delivery Address</p>
                      <p className="font-semibold flex items-center">
                        <MapPin className="w-4 h-4 mr-1 text-purple-600" />
                        {currentOrder.customer_address}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Assigned Store</p>
                      <p className="font-semibold">{currentOrder.store_id}</p>
                    </div>
                    {currentOrder.delivery_exec_id && (
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Assigned Rider</p>
                        <p className="font-semibold">{currentOrder.delivery_exec_id}</p>
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
                      {deliveryExecutives
                        .filter(exec => exec.is_available)
                        .map((executive) => (
                          <div key={executive.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                                {executive.name.charAt(0)}
                              </div>
                              <div>
                                <h3 className="font-semibold">{executive.name}</h3>
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
