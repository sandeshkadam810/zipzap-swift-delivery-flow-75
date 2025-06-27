
import React from 'react';
import { useCart } from '@/contexts/CartContext';
import Cart from '@/components/Cart';
import CustomerNavigation from '@/components/CustomerNavigation';

const CartPage = () => {
  const { cartItems, updateQuantity, removeItem } = useCart();

  return (
    <div>
      <CustomerNavigation onSwitchInterface={function (): void {
        throw new Error('Function not implemented.');
      } } />
      <Cart 
        cartItems={cartItems}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
      />
    </div>
  );
};

export default CartPage;
