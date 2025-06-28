
import React, { useState } from 'react';
import UserTypeSelector from './UserTypeSelector';
import CustomerNavigation from './CustomerNavigation';
import StoreNavigation from './StoreNavigation';
import DeliveryNavigation from './DeliveryNavigation';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import ProductCategories from '@/components/ProductCategories';
import HowItWorks from '@/components/HowItWorks';
import StoreDashboard from '@/pages/StoreDashboard';
import DeliveryDashboard from '@/pages/DeliveryDashboard';

const Navigation = () => {
  const [userType, setUserType] = useState<'customer' | 'store' | 'delivery' | null>(null);

  const handleSelectUserType = (type: 'customer' | 'store' | 'delivery') => {
    setUserType(type);
  };

  const handleSwitchInterface = () => {
    setUserType(null);
  };

  if (!userType) {
    return <UserTypeSelector onSelectUserType={handleSelectUserType} />;
  }

  if (userType === 'customer') {
    return (
      <>
        <CustomerNavigation onSwitchInterface={handleSwitchInterface} />
        <main className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
          <Hero />
          <Features />
          <ProductCategories />
          <HowItWorks />
        </main>
      </>
    );
  }

  if (userType === 'store') {
    return (
      <>
        <main className="min-h-screen bg-gray-50">
          <StoreDashboard />
        </main>
      </>
    );
  }

  if (userType === 'delivery') {
    return (
      <>
        <DeliveryNavigation onSwitchInterface={handleSwitchInterface} />
        <main className="min-h-screen bg-gray-50">
          <DeliveryDashboard />
        </main>
      </>
    );
  }

  return null;
};

export default Navigation;
