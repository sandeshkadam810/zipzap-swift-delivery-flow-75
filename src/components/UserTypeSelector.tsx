
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Store, Truck } from 'lucide-react';

interface UserTypeSelectorProps {
  onSelectUserType: (userType: 'customer' | 'store' | 'delivery') => void;
}

const UserTypeSelector = ({ onSelectUserType }: UserTypeSelectorProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Welcome to ZipZap
            </span>
          </h1>
          <p className="text-xl text-gray-600">
            Choose your interface to get started
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm border-white/20 hover:shadow-xl transition-all cursor-pointer transform hover:scale-105">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-4">
                <User className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Customer Interface
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-6">
                Browse products, place orders, and track your deliveries
              </p>
              <ul className="text-sm text-gray-500 mb-6 space-y-2">
                <li>• Browse product categories</li>
                <li>• Place quick orders</li>
                <li>• Track live deliveries</li>
                <li>• Manage your cart</li>
              </ul>
              <Button 
                onClick={() => onSelectUserType('customer')}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
              >
                Continue as Customer
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-white/20 hover:shadow-xl transition-all cursor-pointer transform hover:scale-105">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
                <Store className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Store Interface
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-6">
                Manage your store, inventory, and deliveries
              </p>
              <ul className="text-sm text-gray-500 mb-6 space-y-2">
                <li>• Store dashboard & analytics</li>
                <li>• Inventory management</li>
                <li>• Order tracking & fulfillment</li>
                <li>• Delivery executive management</li>
              </ul>
              <Button 
                onClick={() => onSelectUserType('store')}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                Continue as Store
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-white/20 hover:shadow-xl transition-all cursor-pointer transform hover:scale-105">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-4">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Delivery Executive
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-6">
                Manage deliveries and track your assigned orders
              </p>
              <ul className="text-sm text-gray-500 mb-6 space-y-2">
                <li>• View assigned orders</li>
                <li>• Navigate to pickup locations</li>
                <li>• Update delivery status</li>
                <li>• Manage availability</li>
              </ul>
              <Button 
                onClick={() => onSelectUserType('delivery')}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                Continue as Delivery Executive
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserTypeSelector;
