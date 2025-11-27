"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router"; // Import useRouter
import { useCart } from "@/contexts/CartContext";
import toast from "react-hot-toast";
import ProductDetailsSinglePage from "@/components/product/ProductDetailsSinglePage";

import { Product } from "@/interfaces";

// Define the shape of a review
interface Review {
  id: number;
  rating: number;
  comment: string;
  user: string;
}

// Mock data
const mockProducts: { [key: string]: Product } = {
  1: {
    _id: "1",
    name: "Submariner Date",
    brand: "Rolex",
    price: 8999.99,
    images: ["/images/watch1.png", "/images/watch2.png"],
    description: "Luxury diving watch",
    material: "Stainless steel",
    condition: "New",
    bracelet: "Alligator Leather with Gold Deployant",
    movement: "Automatic Caliber 240",
    thickness: "8.3mm",
    glass: "Sapphire Crystal (Anti-Reflective)",
    quantity: 1,
    luminova: "Yes (Blue Chromalight)",
    casematerial: "18K Rose Gold",
    crown: "Screw-Down with PP Seal",
    bandsize: "20mm",
    lugs: "21mm Integrated",
    water: "120m/400ft",
  },
  2: {
    _id: "2",
    name: "Nautilus 5711",
    brand: "Patek Philippe",
    price: 125000.0,
    images: ["/images/watch3.png"],
    description: "Iconic luxury watch",
    material: "White gold",
    condition: "Pre-owned",
    bracelet: "Alligator Leather with Gold Deployant",
    movement: "Automatic Caliber 240",
    thickness: "8.3mm",
    glass: "Sapphire Crystal (Anti-Reflective)",
    quantity: 1,
    luminova: "Yes (Blue Chromalight)",
    casematerial: "18K Rose Gold",
    crown: "Screw-Down with PP Seal",
    bandsize: "20mm",
    lugs: "21mm Integrated",
    water: "120m/400ft",
  },
};

const mockReviews: Review[] = [
  {
    id: 1,
    rating: 5,
    comment: "Excellent product!",
    user: "John Doe",
  },
];

export default function ProductPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isInWishlist, setIsInWishlist] = useState<boolean>(false);
  const { addToCart } = useCart();

  // Use the router to access dynamic route parameters
  const router = useRouter();
  const { productId } = router.query; // Access productId from query

  useEffect(() => {
    // Ensure productId is available before fetching data
    if (!productId) return;

    // Simulate API call delay
    const timer = setTimeout(() => {
      const foundProduct = mockProducts[productId as string];
      if (foundProduct) {
        setProduct(foundProduct);
        checkWishlistStatus(foundProduct._id);
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [productId]); // Add productId to dependency array

  const checkWishlistStatus = (productId: string) => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setIsInWishlist(wishlist.includes(productId));
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      toast.success("Added item to cart");
    }
  };

  const toggleWishlist = () => {
    if (!product) return;

    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const newWishlist = wishlist.includes(product._id)
      ? wishlist.filter((id: string) => id !== product._id)
      : [...wishlist, product._id];

    localStorage.setItem("wishlist", JSON.stringify(newWishlist));
    setIsInWishlist(!isInWishlist);
    toast.success(isInWishlist ? "Removed from wishlist" : "Added to wishlist");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-400"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-500 bg-red-100 rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
      </div>
    );
  }

  return (
    <ProductDetailsSinglePage
      product={product}
      averageRating={4.5} // Mock average rating
      allReviews={mockReviews}
      isInWishlist={isInWishlist}
      handleAddToCart={handleAddToCart}
      toggleWishlist={toggleWishlist}
    />
  );
}
