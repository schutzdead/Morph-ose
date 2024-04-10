import { createContext, useEffect, useReducer, useState } from 'react';
import { cartReducer, initializer } from './cartReducer';

export const CartContext = createContext();
export const OpenCartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, [], initializer);

  useEffect(() => {
    localStorage.setItem("localCart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{cart,dispatch}}>
      {children}
    </CartContext.Provider>
  );
};

export const OpenCartProvider = ({ children }) => {
  const [bag, setBag] = useState(false)
  return (
    <OpenCartContext.Provider value={{bag, setBag}}>
      {children}
    </OpenCartContext.Provider>
  );
};