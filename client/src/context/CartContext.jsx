import React, { useReducer } from "react";
import { createContext, useContext, useState } from "react";

export const CartDataContext = createContext();

const CartContext = (props) => {
  const initialState = [];

  const reducer = (state, action) => {
    switch (action.type) {
      case "Add_Cart":
        return [...state, action.payload];
      case "Remove_cart":
        return state.filter((item) => {
          // outer return: gives the reducer's result back
          return item._id !== action.payload; // inner return: gives .filter() a true/false per item
        });
      default:
        return state;
    }
  };

  const [cart, dispatch] = useReducer(reducer, initialState);

  return (
    <CartDataContext.Provider value={{ cart, dispatch }}>
      {props.children}
    </CartDataContext.Provider>
  );
};

export const useCart = () => useContext(CartDataContext);
export default CartContext;
