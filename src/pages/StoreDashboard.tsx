
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import StoreOrderManagement from '@/components/StoreOrderManagement';
import DeliveryMonitoring from '@/components/DeliveryMonitoring';
import { Package, Clock, TrendingUp, Users, Bell, CheckCircle, AlertTriangle, RefreshCw, MapPin, Phone, Truck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const StoreDashboard = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [lastRefresh, setLastRefresh] = useState(new Date().toLocaleTimeString());
  
  // This would normally come from auth context
  const storeId = 'store-123'; // Mock store ID

  const handleRefresh = () => {
    setLastRefresh(new Date().toLocaleTimeString());
    window.location.reload();
  };

  // Mock stats - in real app, these would come from API
  const stats = {
    pendingOrders: 4,
    completedToday: 187,
    activeRiders: 5,
    efficiency: 94
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Store Operations Center
              </span>
            </h1>
            <p className="text-xl text-gray-600">
              Real-time order management and delivery monitoring
            </p>
          </div>
          <div className="text-right">
            <Button onClick={handleRefresh} className="mb-2 bg-gradient-to-r from-purple-600 to-blue-600">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <p className="text-sm text-gray-500">Last updated: {lastRefresh}</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
              <Clock className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.pendingOrders}</div>
              <p className="text-xs text-muted-foreground">Avg wait: 3.2 mins</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.completedToday}</div>
              <p className="text-xs text-muted-foreground">+15% from yesterday</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Riders</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.activeRiders}</div>
              <p className="text-xs text-muted-foreground">2 on break</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Efficiency</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{stats.efficiency}%</div>
              <p className="text-xs text-muted-foreground">Above target</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/80">
            <TabsTrigger value="orders" className="flex items-center space-x-2">
              <Package className="h-4 w-4" />
              <span>Order Queue</span>
            </TabsTrigger>
            <TabsTrigger value="deliveries" className="flex items-center space-x-2">
              <Truck className="h-4 w-4" />
              <span>Live Deliveries</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>Analytics</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-6">
            <StoreOrderManagement storeId={storeId} />
          </TabsContent>

          <TabsContent value="deliveries" className="space-y-6">
            <DeliveryMonitoring storeId={storeId} />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle>Analytics Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <TrendingUp className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">Analytics Coming Soon</h3>
                  <p className="text-gray-500">Detailed performance metrics and insights will be available here.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Actions Sidebar */}
        <div className="fixed bottom-6 right-6 space-y-3">
          <Button 
            size="lg"
            className="bg-red-500 hover:bg-red-600 shadow-lg rounded-full w-14 h-14 p-0"
            title="Emergency Alert"
          >
            <Bell className="h-6 w-6" />
          </Button>
          
          <Button 
            size="lg"
            className="bg-blue-500 hover:bg-blue-600 shadow-lg rounded-full w-14 h-14 p-0"
            title="Call Manager"
          >
            <Phone className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StoreDashboard;
