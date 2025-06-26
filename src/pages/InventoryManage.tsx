
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Plus, Edit3, Trash2, Package, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navigation from '@/components/Navigation';

const InventoryManage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const inventoryItems = [
    { id: 1, name: 'Fresh Tomatoes', category: 'Fresh Vegetables', stock: 850, unit: 'kg', status: 'in-stock', lastUpdated: '2 hours ago' },
    { id: 2, name: 'iPhone 15', category: 'Electronics', stock: 45, unit: 'units', status: 'low-stock', lastUpdated: '1 hour ago' },
    { id: 3, name: 'Lipstick Set', category: 'Beauty Products', stock: 230, unit: 'units', status: 'in-stock', lastUpdated: '30 mins ago' },
    { id: 4, name: 'Paracetamol', category: 'Medicines', stock: 12, unit: 'boxes', status: 'critical', lastUpdated: '15 mins ago' },
    { id: 5, name: 'Organic Carrots', category: 'Fresh Vegetables', stock: 120, unit: 'kg', status: 'in-stock', lastUpdated: '1 hour ago' },
    { id: 6, name: 'Samsung TV', category: 'Electronics', stock: 8, unit: 'units', status: 'low-stock', lastUpdated: '3 hours ago' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock': return 'text-green-600 bg-green-50 border-green-200';
      case 'low-stock': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const filteredItems = inventoryItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'all' || item.category === selectedCategory)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Link to="/smart-inventory" className="mr-4">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Inventory
            </Button>
          </Link>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Manage Inventory
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search inventory items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="all">All Categories</option>
            <option value="Fresh Vegetables">Fresh Vegetables</option>
            <option value="Electronics">Electronics</option>
            <option value="Beauty Products">Beauty Products</option>
            <option value="Medicines">Medicines</option>
          </select>
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
            <Plus className="w-4 h-4 mr-2" />
            Add New Item
          </Button>
        </div>

        <Card className="bg-white/80 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Inventory Items ({filteredItems.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">Item Name</th>
                    <th className="text-left p-4">Category</th>
                    <th className="text-left p-4">Stock</th>
                    <th className="text-left p-4">Status</th>
                    <th className="text-left p-4">Last Updated</th>
                    <th className="text-left p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium">{item.name}</td>
                      <td className="p-4 text-gray-600">{item.category}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{item.stock}</span>
                          <span className="text-sm text-gray-500">{item.unit}</span>
                          {item.status === 'critical' && (
                            <AlertTriangle className="w-4 h-4 text-red-500" />
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
                          {item.status.replace('-', ' ')}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-gray-500">{item.lastUpdated}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline">
                            <Edit3 className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-500 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InventoryManage;
