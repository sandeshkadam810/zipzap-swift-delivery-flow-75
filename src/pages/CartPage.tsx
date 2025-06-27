
import React from 'react';
import { useCart } from '@/contexts/CartContext';
import Cart from '@/components/Cart';
import Navigation from '@/components/Navigation';

const CartPage = () => {
  const { cartItems, updateQuantity, removeItem } = useCart();

  return (
    <div>
      <Navigation />
      <Cart 
        cartItems={cartItems}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
      />
    </div>
  );
};

export default CartPage;
