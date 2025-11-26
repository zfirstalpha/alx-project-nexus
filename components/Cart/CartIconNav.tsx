"use client";

import React, { useEffect, useState } from "react";
import { useCart } from "@/contexts/CartContext";
import Cart from "./Cart";
import { Product } from "@/interfaces";

// Define the type for a cart item
interface CartItem extends Product {}

const CartIconNav: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [itemCount, setItemCount] = useState<number>(0);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const { cart } = useCart();

  useEffect(() => {
    setIsLoading(false);
    // Calculate total items by summing quantities
    const count = cart.reduce(
      (total: number, item: CartItem) => total + item.quantity,
      0
    );
    setItemCount(count);
  }, [cart]); // Update count when cart changes

  if (isLoading) {
    return null;
  }

  return (
    <div
      onClick={() => setCartOpen(!cartOpen)}
      onMouseEnter={() => setCartOpen(true)}
      onMouseLeave={() => setCartOpen(false)}
    >
      <nav className="bg-inherit z-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between h-14">
            <div className="flex items-center">
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-700 hover:text-gray-900 cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="absolute right-20 bg-slate-100">
        {cartOpen && <Cart />}
      </div>
    </div>
  );
};

export default CartIconNav;
