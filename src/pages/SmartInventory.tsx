
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StoreNavigation from '@/components/StoreNavigation';
import { Package, Clock, TrendingUp, Users, Bell, CheckCircle, AlertTriangle, BarChart3, Target, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const SmartInventory = () => {
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString());

  const handleRefresh = () => {
    setLastUpdated(new Date().toLocaleTimeString());
  };

  const inventoryStats = [
    { title: 'Total Items', value: '1,137', change: '+2.5% from last week', icon: Package, color: 'purple', path: '/inventory-total' },
    { title: 'Low Stock', value: '23', change: 'Needs attention', icon: AlertTriangle, color: 'yellow', path: '/inventory-low-stock' },
    { title: 'Auto Reorder', value: '89%', change: 'AI optimization active', icon: CheckCircle, color: 'green', path: '/inventory-auto-reorder' },
    { title: 'Turnover Rate', value: '4.2x', change: 'Per month', icon: TrendingUp, color: 'blue', path: '/inventory-turnover' }
  ];

  const categoryStats = [
    { name: 'Fresh Vegetables', stock: 850, status: 'in-stock', change: '+12%', color: 'green' },
    { name: 'Electronics', stock: 45, status: 'low-stock', change: '-5%', color: 'yellow' },
    { name: 'Beauty Products', stock: 230, status: 'in-stock', change: '+8%', color: 'green' },
    { name: 'Medicines', stock: 12, status: 'critical', change: '-15%', color: 'red' },
    { name: 'Home & Garden', stock: 156, status: 'in-stock', change: '+3%', color: 'green' },
    { name: 'Pet Supplies', stock: 78, status: 'in-stock', change: '+18%', color: 'green' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock': return 'text-green-600 bg-green-50 border-green-200';
      case 'low-stock': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatColor = (color: string) => {
    switch (color) {
      case 'purple': return 'text-purple-600';
      case 'yellow': return 'text-yellow-600';
      case 'green': return 'text-green-600';
      case 'blue': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <StoreNavigation onSwitchInterface={function (): void {
        throw new Error('Function not implemented.');
      } } />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Smart Inventory Management
              </span>
            </h1>
            <p className="text-xl text-gray-600">
              AI-powered inventory optimization and real-time tracking
            </p>
          </div>
          <div className="text-right">
            <Button onClick={handleRefresh} className="mb-2 bg-gradient-to-r from-purple-600 to-blue-600">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <p className="text-sm text-gray-500">Last updated: {lastUpdated}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {inventoryStats.map((stat, index) => (
            <Link key={index} to={stat.path}>
              <Card className="bg-white/80 backdrop-blur-sm border-white/20 hover:shadow-xl transition-all duration-300 cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <stat.icon className={`h-4 w-4 ${getStatColor(stat.color)}`} />
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${getStatColor(stat.color)}`}>{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.change}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-white/80 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Inventory Status by Category
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categoryStats.map((category, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center space-x-4">
                      <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
                      <div>
                        <h3 className="font-semibold">{category.name}</h3>
                        <p className="text-sm text-gray-600">Stock: {category.stock} units</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(category.status)}`}>
                        {category.status.replace('-', ' ')}
                      </span>
                      <span className={`text-sm font-medium ${category.color === 'green' ? 'text-green-600' : category.color === 'red' ? 'text-red-600' : 'text-yellow-600'}`}>
                        {category.change}
                      </span>
                      <Link to="/inventory-manage">
                        <Button size="sm" className="bg-gradient-to-r from-purple-600 to-blue-600">
                          Manage
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-purple-600" />
                  AI Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Restock Alert</h4>
                  <p className="text-sm text-blue-600">Consider restocking Electronics category. Demand increased by 15% this week.</p>
                </div>
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Optimization Opportunity</h4>
                  <p className="text-sm text-green-600">Fresh Vegetables showing high turnover. Consider increasing stock by 20%.</p>
                </div>
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2">Seasonal Adjustment</h4>
                  <p className="text-sm text-yellow-600">Pet Supplies demand typically increases by 25% next month. Prepare inventory accordingly.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-red-600" />
                  Critical Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-red-50 border border-red-200 rounded">
                    <p className="font-medium text-red-800">Critical Stock Level</p>
                    <p className="text-red-600">Medicines category has only 12 units left</p>
                  </div>
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                    <p className="font-medium text-yellow-800">Delivery Delay</p>
                    <p className="text-yellow-600">Expected supplier delivery delayed by 2 days</p>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                    <p className="font-medium text-blue-800">System Update</p>
                    <p className="text-blue-600">Inventory system will be updated tonight at 2 AM</p>
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

export default SmartInventory;
