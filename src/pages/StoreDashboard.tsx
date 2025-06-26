
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Package, Clock, TrendingUp, Users, Bell, CheckCircle, AlertTriangle, RefreshCw, MapPin, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const StoreDashboard = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [lastRefresh, setLastRefresh] = useState(new Date().toLocaleTimeString());

  const handleRefresh = () => {
    setLastRefresh(new Date().toLocaleTimeString());
  };

  const pendingOrders = [
    { id: 'ZZ001', items: 8, priority: 'high', time: '2 mins ago', customer: 'John D.', address: 'Sector 15' },
    { id: 'ZZ002', items: 5, priority: 'medium', time: '5 mins ago', customer: 'Sarah W.', address: 'Sector 18' },
    { id: 'ZZ003', items: 12, priority: 'high', time: '8 mins ago', customer: 'Mike J.', address: 'Sector 12' },
    { id: 'ZZ004', items: 3, priority: 'low', time: '12 mins ago', customer: 'Lisa K.', address: 'Sector 22' },
  ];

  const activeRiders = [
    { id: 1, name: 'Rahul Kumar', phone: '+91 9876543210', status: 'delivering', efficiency: 94, orders: 3, location: 'Sector 15' },
    { id: 2, name: 'Priya Sharma', phone: '+91 9876543211', status: 'available', efficiency: 98, orders: 5, location: 'Sector 18' },
    { id: 3, name: 'Amit Singh', phone: '+91 9876543212', status: 'on-break', efficiency: 89, orders: 2, location: 'Sector 12' },
    { id: 4, name: 'Neha Patel', phone: '+91 9876543213', status: 'delivering', efficiency: 96, orders: 4, location: 'Sector 20' },
    { id: 5, name: 'Ravi Gupta', phone: '+91 9876543214', status: 'available', efficiency: 91, orders: 3, location: 'Sector 25' },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getRiderStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'text-green-600 bg-green-50 border-green-200';
      case 'delivering': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'on-break': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Store Dashboard
              </span>
            </h1>
            <p className="text-xl text-gray-600">
              Manage orders and monitor store performance
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

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
              <Clock className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{pendingOrders.length}</div>
              <p className="text-xs text-muted-foreground">Avg wait: 3.2 mins</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">187</div>
              <p className="text-xs text-muted-foreground">+15% from yesterday</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Riders</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{activeRiders.filter(r => r.status === 'available' || r.status === 'delivering').length}</div>
              <p className="text-xs text-muted-foreground">{activeRiders.filter(r => r.status === 'on-break').length} on break</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Efficiency</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">94%</div>
              <p className="text-xs text-muted-foreground">Above target</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="bg-white/80 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Urgent Orders Queue
                  </div>
                  <Link to="/order-tracking">
                    <Button size="sm" className="bg-gradient-to-r from-purple-600 to-blue-600">
                      View All Orders
                    </Button>
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                      <div className="flex items-center space-x-4">
                        <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse"></div>
                        <div>
                          <h3 className="font-semibold">Order #{order.id}</h3>
                          <p className="text-sm text-gray-600">{order.items} items • {order.customer}</p>
                          <p className="text-xs text-gray-500 flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {order.address} • {order.time}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(order.priority)}`}>
                          {order.priority} priority
                        </span>
                        <Button size="sm" className="bg-gradient-to-r from-green-500 to-green-600">
                          Prepare
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Active Riders Section */}
            <Card className="bg-white/80 backdrop-blur-sm border-white/20 mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Active Riders ({activeRiders.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeRiders.map((rider) => (
                    <div key={rider.id} className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {rider.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-semibold">{rider.name}</h3>
                          <p className="text-sm text-gray-600 flex items-center">
                            <Phone className="w-3 h-3 mr-1" />
                            {rider.phone}
                          </p>
                          <p className="text-sm text-gray-600 flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {rider.location}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRiderStatusColor(rider.status)}`}>
                          {rider.status.replace('-', ' ')}
                        </span>
                        <p className="text-sm text-gray-600 mt-1">{rider.efficiency}% efficiency</p>
                        <p className="text-xs text-gray-500">{rider.orders} orders today</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600" size="lg">
                  Mark All Ready
                </Button>
                <Button variant="outline" className="w-full" size="lg">
                  Call Rider
                </Button>
                <Link to="/smart-inventory" className="block">
                  <Button variant="outline" className="w-full" size="lg">
                    View Inventory
                  </Button>
                </Link>
                <Button variant="outline" className="w-full" size="lg">
                  Generate Report
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                    <p className="font-medium text-yellow-800">Low Stock Alert</p>
                    <p className="text-yellow-600">Bread running low (12 left)</p>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                    <p className="font-medium text-blue-800">Peak Hours</p>
                    <p className="text-blue-600">Expected rush in 30 mins</p>
                  </div>
                  <div className="p-3 bg-red-50 border border-red-200 rounded">
                    <p className="font-medium text-red-800">Urgent Order</p>
                    <p className="text-red-600">Order #ZZ001 waiting for 5+ minutes</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreDashboard;
