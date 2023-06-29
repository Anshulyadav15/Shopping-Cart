import { createContext, useReducer, useContext } from "react";
import productsData from "../products.json";
import { cartReducer, productReducer } from "./Reducer";

const Cart = createContext();

const Context = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    products: productsData,
    cart: [],
  });

  const [productstate, productDispatch] = useReducer(productReducer, {
    searchQuery: "",
    category: "All",
    rating: 0,
  });

  const contextvalue = {
    state,
    dispatch,
    productstate,
    productDispatch,
  };

  return <Cart.Provider value={contextvalue}>{children}</Cart.Provider>;
};

export default Context;
export const CartState = () => {
  return useContext(Cart);
};
