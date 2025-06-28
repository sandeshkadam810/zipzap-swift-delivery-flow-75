import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserTypeSelector from '@/components/UserTypeSelector';

const Navigation = () => {
  const [userType, setUserType] = useState<'customer' | 'store' | 'delivery' | null>(null);
  const navigate = useNavigate();

  const handleSelectUserType = (type: 'customer' | 'store' | 'delivery') => {
    setUserType(type);
  };

  useEffect(() => {
    if (userType === 'customer') navigate('/customer-home');
    else if (userType === 'store') navigate('/store-dashboard');
    else if (userType === 'delivery') navigate('/delivery-dashboard');
  }, [userType, navigate]);

  return <UserTypeSelector onSelectUserType={handleSelectUserType} />;
};

export default Navigation;
