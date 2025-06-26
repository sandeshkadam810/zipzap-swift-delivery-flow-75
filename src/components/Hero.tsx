
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, Package, Truck } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative overflow-hidden py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Lightning
                </span>
                <br />
                <span className="text-gray-900">Fast Delivery</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-lg">
                Get your essentials delivered in minutes, not hours. ZipZap revolutionizes instant delivery with our network of dark stores.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-4 h-auto"
              >
                Order Now
                <ArrowDown className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-purple-200 hover:bg-purple-50 text-lg px-8 py-4 h-auto"
              >
                Store Dashboard
              </Button>
            </div>

            <div className="flex items-center space-x-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">10min</div>
                <div className="text-sm text-gray-500">Average Delivery</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">24/7</div>
                <div className="text-sm text-gray-500">Service Available</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600">1000+</div>
                <div className="text-sm text-gray-500">Products</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10 bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl p-6 text-white">
                  <Package className="h-8 w-8 mb-4" />
                  <h3 className="font-semibold mb-2">Smart Inventory</h3>
                  <p className="text-sm opacity-90">AI-powered stock management</p>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl p-6 text-white">
                  <Truck className="h-8 w-8 mb-4" />
                  <h3 className="font-semibold mb-2">Fast Delivery</h3>
                  <p className="text-sm opacity-90">10-minute guarantee</p>
                </div>
                <div className="bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl p-6 text-white col-span-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold mb-2">Live Tracking</h3>
                      <p className="text-sm opacity-90">Real-time order updates</p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                      <div className="h-6 w-6 rounded-full bg-green-400 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-10 -right-10 h-40 w-40 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 h-32 w-32 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full opacity-20 blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
