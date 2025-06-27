
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Smartphone, Building, Truck, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import CustomerNavigation from '@/components/CustomerNavigation';

const Payment = () => {
  const [selectedPayment, setSelectedPayment] = useState('');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [upiId, setUpiId] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const paymentMethods = [
    { id: 'cod', name: 'Cash on Delivery', icon: Truck, description: 'Pay when your order arrives' },
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, description: 'Visa, Mastercard, Rupay' },
    { id: 'upi', name: 'UPI', icon: Smartphone, description: 'Google Pay, PhonePe, Paytm' },
    { id: 'netbanking', name: 'Net Banking', icon: Building, description: 'All major banks supported' }
  ];

  const handlePayment = () => {
    if (!selectedPayment) {
      toast({
        title: "Select Payment Method",
        description: "Please choose a payment method to continue.",
        variant: "destructive",
      });
      return;
    }

    if (selectedPayment === 'card' && (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv)) {
      toast({
        title: "Complete Card Details",
        description: "Please fill in all card details.",
        variant: "destructive",
      });
      return;
    }

    if (selectedPayment === 'upi' && !upiId) {
      toast({
        title: "Enter UPI ID",
        description: "Please enter your UPI ID.",
        variant: "destructive",
      });
      return;
    }

    // Simulate payment processing
    toast({
      title: "Processing Payment",
      description: "Please wait while we process your payment...",
    });

    setTimeout(() => {
      navigate('/payment-success');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <CustomerNavigation onSwitchInterface={function (): void {
        throw new Error('Function not implemented.');
      } } />
      
      <div className="max-w-4xl mx-auto p-4 pt-8">
        <div className="flex items-center mb-6">
          <Link to="/cart" className="mr-4">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Cart
            </Button>
          </Link>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Payment Options
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Payment Methods */}
          <div className="space-y-4">
            <Card className="bg-white/80 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle>Choose Payment Method</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedPayment === method.id
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                    onClick={() => setSelectedPayment(method.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <method.icon className={`w-6 h-6 ${
                        selectedPayment === method.id ? 'text-purple-600' : 'text-gray-600'
                      }`} />
                      <div>
                        <h3 className="font-semibold">{method.name}</h3>
                        <p className="text-sm text-gray-600">{method.description}</p>
                      </div>
                      {selectedPayment === method.id && (
                        <CheckCircle className="w-5 h-5 text-purple-600 ml-auto" />
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Payment Details */}
            {selectedPayment === 'card' && (
              <Card className="bg-white/80 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>Card Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    placeholder="Card Number"
                    value={cardDetails.number}
                    onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                    maxLength={16}
                  />
                  <Input
                    placeholder="Cardholder Name"
                    value={cardDetails.name}
                    onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="MM/YY"
                      value={cardDetails.expiry}
                      onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                      maxLength={5}
                    />
                    <Input
                      placeholder="CVV"
                      value={cardDetails.cvv}
                      onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                      maxLength={3}
                      type="password"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {selectedPayment === 'upi' && (
              <Card className="bg-white/80 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>UPI Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    placeholder="Enter your UPI ID (e.g., name@paytm)"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                  />
                </CardContent>
              </Card>
            )}

            {selectedPayment === 'netbanking' && (
              <Card className="bg-white/80 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>Select Your Bank</CardTitle>
                </CardHeader>
                <CardContent>
                  <select className="w-full p-3 border rounded-lg">
                    <option value="">Choose your bank</option>
                    <option value="sbi">State Bank of India</option>
                    <option value="hdfc">HDFC Bank</option>
                    <option value="icici">ICICI Bank</option>
                    <option value="axis">Axis Bank</option>
                    <option value="kotak">Kotak Mahindra Bank</option>
                  </select>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div>
            <Card className="bg-white/80 backdrop-blur-sm border-white/20 sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹1,299</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Discount (SAVE10)</span>
                  <span>-₹130</span>
                </div>
                <hr />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total Amount</span>
                  <span>₹1,169</span>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg text-sm">
                  <p className="font-semibold mb-2">Delivery Address:</p>
                  <p>123 Main Street, Sector 15</p>
                  <p>New Delhi, 110001</p>
                </div>

                <Button 
                  onClick={handlePayment}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  {selectedPayment === 'cod' ? 'Place Order' : `Pay ₹1,169`}
                </Button>

                <p className="text-xs text-gray-600 text-center">
                  By placing this order, you agree to our Terms & Conditions
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
