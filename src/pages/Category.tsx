
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, ShoppingCart, Star, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import CustomerNavigation from '@/components/CustomerNavigation';
import { getCategoryProducts, Product } from '@/data/products';
import { useCart } from '@/contexts/CartContext';

const Category = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [filterInStock, setFilterInStock] = useState(false);
  
  // Use the global cart context
  const { cartItems, addToCart, updateQuantity, getTotalItems } = useCart();

  useEffect(() => {
    if (categoryName) {
      const categoryProducts = getCategoryProducts(categoryName.toLowerCase());
      setProducts(categoryProducts);
    }
  }, [categoryName]);

  const filteredAndSortedProducts = products
    .filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!filterInStock || product.inStock)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'discount':
          return b.discount - a.discount;
        default:
          return a.name.localeCompare(b.name);
      }
    });

  // Get quantity for a specific product from global cart
  const getProductQuantity = (productId: number) => {
    const cartItem = cartItems.find(item => item.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  const handleRemoveFromCart = (productId: number) => {
    const currentQuantity = getProductQuantity(productId);
    if (currentQuantity > 0) {
      updateQuantity(productId, currentQuantity - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <CustomerNavigation onSwitchInterface={function (): void {
        throw new Error('Function not implemented.');
      } } />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Link to="/" className="mr-4">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-3xl font-bold capitalize bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            {categoryName?.replace('-', ' & ')} ({filteredAndSortedProducts.length} items)
          </h1>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="name">Sort by Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rating</option>
            <option value="discount">Best Discount</option>
          </select>
          <Button
            variant={filterInStock ? "default" : "outline"}
            onClick={() => setFilterInStock(!filterInStock)}
          >
            <Filter className="w-4 h-4 mr-2" />
            In Stock Only
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredAndSortedProducts.map((product) => {
            const quantity = getProductQuantity(product.id);
            
            return (
              <div key={product.id} className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:shadow-xl transition-all duration-300">
                <div className="text-center mb-3">
                  <div className="text-4xl mb-2">{product.image}</div>
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">{product.name}</h3>
                  <p className="text-xs text-gray-500 mb-1">{product.brand} • {product.unit}</p>
                  <div className="flex items-center justify-center mb-2">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-xs text-gray-600 ml-1">{product.rating}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <span className="text-lg font-bold text-purple-600">₹{product.price}</span>
                    {product.discount > 0 && (
                      <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                        {product.discount}% OFF
                      </span>
                    )}
                  </div>
                  {!product.inStock && (
                    <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                      Out of Stock
                    </span>
                  )}
                </div>

                {product.inStock && (
                  quantity > 0 ? (
                    <div className="flex items-center justify-center space-x-3">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleRemoveFromCart(product.id)}
                        className="w-8 h-8 p-0"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="font-semibold">{quantity}</span>
                      <Button
                        size="sm"
                        onClick={() => handleAddToCart(product)}
                        className="w-8 h-8 p-0 bg-gradient-to-r from-purple-600 to-blue-600"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      size="sm"
                    >
                      Add to Cart
                    </Button>
                  )
                )}
              </div>
            );
          })}
        </div>

        {filteredAndSortedProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
          </div>
        )}

        {getTotalItems() > 0 && (
          <div className="fixed bottom-6 right-6">
            <Link to="/cart">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-full px-6 py-3 shadow-lg">
                <ShoppingCart className="w-5 h-5 mr-2" />
                {getTotalItems()} items • View Cart
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
