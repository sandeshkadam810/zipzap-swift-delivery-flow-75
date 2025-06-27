
import React, { useState } from 'react';
import UserTypeSelector from './UserTypeSelector';
import CustomerNavigation from './CustomerNavigation';
import StoreNavigation from './StoreNavigation';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import ProductCategories from '@/components/ProductCategories';
import HowItWorks from '@/components/HowItWorks';
import StoreDashboard from '@/pages/StoreDashboard';

const Navigation = () => {
  const [userType, setUserType] = useState<'customer' | 'store' | null>(null);

  const handleSelectUserType = (type: 'customer' | 'store') => {
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

    return (
    <>
      
      <main className="min-h-screen bg-gray-50">
        <StoreDashboard />
      </main>
    </>
  );
};

export default Navigation;
