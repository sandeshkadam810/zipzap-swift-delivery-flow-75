
import React, { useState } from 'react';
import UserTypeSelector from './UserTypeSelector';
import CustomerNavigation from './CustomerNavigation';
import StoreNavigation from './StoreNavigation';

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
    return <CustomerNavigation onSwitchInterface={handleSwitchInterface} />;
  }

  return <StoreNavigation onSwitchInterface={handleSwitchInterface} />;
};

export default Navigation;
