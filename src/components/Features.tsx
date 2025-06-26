
import React from 'react';
import { Package, Truck, MapPin } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Package,
      title: "Smart Dark Stores",
      description: "Strategically located micro-warehouses every 7km for ultra-fast fulfillment",
      gradient: "from-purple-500 to-blue-500"
    },
    {
      icon: Truck,
      title: "Intelligent Routing",
      description: "AI-powered delivery optimization for minimum time and maximum efficiency",
      gradient: "from-blue-500 to-indigo-500"
    },
    {
      icon: MapPin,
      title: "Real-time Tracking",
      description: "Live GPS tracking with accurate ETAs and instant notifications",
      gradient: "from-indigo-500 to-purple-500"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Why Choose ZipZap?
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the future of instant delivery with our cutting-edge technology and logistics network
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group relative">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-purple-200 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl">
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${feature.gradient} mb-6`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
              
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
