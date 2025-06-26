
import React from 'react';
import { MapPin, Package, Truck, ArrowDown } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: MapPin,
      title: "Choose Location",
      description: "Select your delivery address and browse local inventory",
      color: "from-purple-500 to-blue-500"
    },
    {
      icon: Package,
      title: "Place Order",
      description: "Add items to cart and confirm your order in seconds",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: Truck,
      title: "Lightning Delivery",
      description: "Track your order live as it arrives within 10 minutes",
      color: "from-indigo-500 to-purple-500"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              How ZipZap Works
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            Three simple steps to instant gratification
          </p>
        </div>

        <div className="relative">
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center">
                  <div className={`inline-flex p-6 rounded-2xl bg-gradient-to-r ${step.color} mb-6`}>
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <div className="mb-4">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-sm mb-4">
                      {index + 1}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowDown className="h-6 w-6 text-purple-400 rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
