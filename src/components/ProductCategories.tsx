
import React from 'react';
import { Link } from 'react-router-dom';

const ProductCategories = () => {
  const categories = [
    { name: "Groceries", image: "🛒", color: "from-green-400 to-green-600", items: "500+ items", slug: "groceries" },
    { name: "Pharmacy", image: "💊", color: "from-red-400 to-red-600", items: "200+ items", slug: "pharmacy" },
    { name: "Electronics", image: "📱", color: "from-blue-400 to-blue-600", items: "150+ items", slug: "electronics" },
    { name: "Beauty", image: "💄", color: "from-pink-400 to-pink-600", items: "300+ items", slug: "beauty" },
    { name: "Home & Garden", image: "🏡", color: "from-yellow-400 to-yellow-600", items: "250+ items", slug: "home-garden" },
    { name: "Pet Supplies", image: "🐕", color: "from-purple-400 to-purple-600", items: "100+ items", slug: "pet-supplies" }
  ];

  return (
    <section className="py-20 px-4 bg-white/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Shop by Category
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need, delivered in minutes
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category, index) => (
            <Link 
              key={index}
              to={`/category/${category.slug}`}
              className="group cursor-pointer"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-purple-200 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl text-center">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${category.color} flex items-center justify-center mx-auto mb-4 text-2xl`}>
                  {category.image}
                </div>
                
                <h3 className="font-semibold text-gray-900 mb-2">
                  {category.name}
                </h3>
                
                <p className="text-sm text-gray-500">
                  {category.items}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
