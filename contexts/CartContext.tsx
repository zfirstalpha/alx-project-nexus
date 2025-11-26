import { Product } from "@/interfaces";
import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
  Dispatch,
} from "react";
import toast from "react-hot-toast";

// Define the shape of the cart state
type CartState = Product[];

// Define the shape of the cart actions
type CartAction =
  | { type: "INITIALIZE"; payload: CartState }
  | { type: "ADD_ITEM"; payload: Product }
  | { type: "REMOVE_ITEM"; payload: string }
  | {
      type: "UPDATE_QUANTITY";
      payload: { productId: string; newQuantity: number };
    }
  | { type: "CLEAR_CART" };

// Define the shape of the context value
interface CartContextValue {
  cart: CartState;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  updateQuantity: (productId: string, newQuantity: number) => void;
}

// Create the context with an initial value of `undefined`
const CartContext = createContext<CartContextValue | undefined>(undefined);

// Cart reducer function
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "INITIALIZE":
      return action.payload || [];
    case "ADD_ITEM":
      const existingItem = state.find(
        (item) => item._id === action.payload._id
      );
      if (existingItem) {
        return state.map((item) =>
          item._id === action.payload._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];
    case "REMOVE_ITEM":
      return state.filter((item) => item._id !== action.payload);
    case "UPDATE_QUANTITY":
      return state.map((item) =>
        item._id === action.payload.productId
          ? { ...item, quantity: action.payload.newQuantity }
          : item
      );
    case "CLEAR_CART":
      return [];
    default:
      return state;
  }
};

// Cart provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  // Initialize cart from localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    dispatch({ type: "INITIALIZE", payload: savedCart });
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add item to cart
  const addToCart = (product: Product) => {
    dispatch({ type: "ADD_ITEM", payload: product });
    toast.success(`${product.name} added to cart!`);
  };

  // Remove item from cart
  const removeFromCart = (productId: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: productId });
    toast.success("Item removed from cart!");
  };

  // Update item quantity in cart
  const updateQuantity = (productId: string, newQuantity: number) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { productId, newQuantity },
    });
  };

  // Clear the cart
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
    toast.success("Cart cleared!");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = (): CartContextValue => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
