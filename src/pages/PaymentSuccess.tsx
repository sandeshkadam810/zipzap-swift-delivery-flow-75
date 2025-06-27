import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Home, Package, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CustomerNavigation from '@/components/CustomerNavigation';

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { order , totalQuantity } = location.state || {};

  useEffect(() => {
    if (!order) {
      console.log('Location state:', location.state);

      navigate('/');
    }
  }, [order, navigate]);

  if (!order) return <div className="p-6">Loading order details...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <CustomerNavigation onSwitchInterface={() => navigate('/')} />

      <div className="max-w-2xl mx-auto p-4 pt-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-green-600 mb-2">Payment Successful!</h1>
          <p className="text-gray-600">Your order has been placed successfully.</p>
        </div>

        <Card className="bg-white/80 backdrop-blur-sm border-white/20 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="w-5 h-5 mr-2" />
              Order Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Order ID</p>
                <p className="font-semibold">{order.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Amount</p>
                <p className="font-semibold">₹{order.total_amount}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Items</p>
                <p className="font-semibold">{totalQuantity}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Delivery Time</p>
                <p className="font-semibold flex items-center">
                  <Clock className="w-4 h-4 mr-1 text-green-600" />
                  {order.estimated_delivery_time
                    ? new Date(order.estimated_delivery_time).toLocaleTimeString()
                    : 'Not Available'}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t">
              <p className="text-sm text-gray-600 mb-1">Delivery Address</p>
              <p className="font-semibold">{order.customer_address}</p>
            </div>
          </CardContent>
        </Card>

        <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-6 mb-6">
          <h3 className="font-bold text-lg mb-2">🚀 Your order is being prepared!</h3>
          <p className="text-gray-700 mb-4">
            Our team is carefully packing your items. Your order will be delivered soon.
          </p>
          <div className="flex items-center space-x-2 text-sm text-purple-700">
            <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"></div>
            <span>Live tracking available</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            onClick={() => navigate('/live-tracking', { state: { orderId: order.id } })}
          >
            Track Order
          </Button>
          <Button variant="outline" className="w-full" onClick={() => navigate('/')}>
            <Home className="w-4 h-4 mr-2" />
            Continue Shopping
          </Button>
        </div>

        <div className="text-center mt-8 p-4 bg-yellow-50 rounded-lg">
          <p className="text-sm text-yellow-800">
            💡 <strong>Pro Tip:</strong> Save this order ID for future reference and customer support.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
