
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';

const Category = () => {
  const { categoryName } = useParams();
  const [cart, setCart] = useState<{[key: string]: number}>({});

  // Mock product data - in real app this would come from API
  const categoryProducts = {
    groceries: [
      { id: 1, name: "Fresh Bananas", price: 99, image: "🍌", rating: 4.5, discount: 10 },
      { id: 2, name: "Milk 1L", price: 65, image: "🥛", rating: 4.8, discount: 5 },
      { id: 3, name: "Bread Loaf", price: 35, image: "🍞", rating: 4.2, discount: 0 },
      { id: 4, name: "Fresh Apples", price: 120, image: "🍎", rating: 4.6, discount: 15 },
      { id: 5, name: "Rice 5kg", price: 450, image: "🍚", rating: 4.7, discount: 8 },
      { id: 6, name: "Eggs 12pc", price: 85, image: "🥚", rating: 4.4, discount: 0 }
    ],
    pharmacy: [
      { id: 7, name: "Paracetamol", price: 25, image: "💊", rating: 4.3, discount: 0 },
      { id: 8, name: "Vitamin C", price: 150, image: "💊", rating: 4.6, discount: 10 },
      { id: 9, name: "Hand Sanitizer", price: 45, image: "🧴", rating: 4.5, discount: 5 }
    ],
    electronics: [
      { id: 10, name: "Phone Charger", price: 299, image: "🔌", rating: 4.2, discount: 15 },
      { id: 11, name: "Earphones", price: 599, image: "🎧", rating: 4.4, discount: 20 },
      { id: 12, name: "Power Bank", price: 899, image: "🔋", rating: 4.7, discount: 12 }
    ],
    beauty: [
      { id: 13, name: "Face Cream", price: 250, image: "💄", rating: 4.5, discount: 18 },
      { id: 14, name: "Shampoo", price: 180, image: "🧴", rating: 4.3, discount: 10 },
      { id: 15, name: "Lipstick", price: 320, image: "💋", rating: 4.6, discount: 25 }
    ]
  };

  const products = categoryProducts[categoryName?.toLowerCase() as keyof typeof categoryProducts] || [];

  const addToCart = (productId: number) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => ({
      ...prev,
      [productId]: Math.max((prev[productId] || 0) - 1, 0)
    }));
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, count) => sum + count, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Link to="/" className="mr-4">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-3xl font-bold capitalize bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            {categoryName}
          </h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:shadow-xl transition-all duration-300">
              <div className="text-center mb-3">
                <div className="text-4xl mb-2">{product.image}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                <div className="flex items-center justify-center mb-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-lg font-bold text-purple-600">₹{product.price}</span>
                  {product.discount > 0 && (
                    <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                      {product.discount}% OFF
                    </span>
                  )}
                </div>
              </div>

              {cart[product.id] ? (
                <div className="flex items-center justify-center space-x-3">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => removeFromCart(product.id)}
                    className="w-8 h-8 p-0"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="font-semibold">{cart[product.id]}</span>
                  <Button
                    size="sm"
                    onClick={() => addToCart(product.id)}
                    className="w-8 h-8 p-0 bg-gradient-to-r from-purple-600 to-blue-600"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => addToCart(product.id)}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  size="sm"
                >
                  Add to Cart
                </Button>
              )}
            </div>
          ))}
        </div>

        {getTotalItems() > 0 && (
          <div className="fixed bottom-6 right-6">
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-full px-6 py-3 shadow-lg">
              <ShoppingCart className="w-5 h-5 mr-2" />
              {getTotalItems()} items
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
