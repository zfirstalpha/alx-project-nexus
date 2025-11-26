import Image from "next/image";
import Link from "next/link";
import { Heart, Plus } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { useCart } from "@/contexts/CartContext";
import toast from "react-hot-toast";
import { Product } from "@/interfaces";

// Define the shape of a product

// Define the props for the ProductCard component
interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlistItems(storedWishlist);
  }, []);

  // Check if the product is in the wishlist
  const isInWishlist = useMemo(() => {
    return wishlistItems.includes(product._id);
  }, [wishlistItems, product._id]);

  // Handle adding the product to the cart
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  // Handle toggling the product in the wishlist
  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    let newWishlist: string[];

    if (isInWishlist) {
      newWishlist = wishlistItems.filter((id) => id !== product._id);
      toast.success("Removed from wishlist!");
    } else {
      newWishlist = [...wishlistItems, product._id];
      toast.success("Added to wishlist!");
    }

    localStorage.setItem("wishlist", JSON.stringify(newWishlist));
    setWishlistItems(newWishlist);
  };

  return (
    <div
      className="flex flex-col bg-white rounded-lg shadow-sm overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product._id}`}>
        <div className="relative sm:h-[22rem] h-[26rem] w-full">
          <Image
            src={product.images[0] || "/placeholder.jpg"}
            alt={product.name}
            fill
            style={{ objectFit: "cover" }}
            priority={true}
          />
          {isHovered && (
            <div className="absolute inset-0 top-[75%] flex justify-between items-center px-4">
              <button
                onClick={toggleWishlist}
                className="p-2 bg-white rounded-full hover:bg-red-100 transition-colors duration-200"
              >
                <Heart
                  className={`h-6 w-6 ${
                    isInWishlist ? "text-red-500 fill-current" : "text-red-500"
                  }`}
                />
              </button>
              <button
                onClick={handleAddToCart}
                className="p-2 bg-white rounded-full hover:bg-blue-100 transition-colors duration-200"
              >
                <Plus className="h-6 w-6 text-blue-500" />
              </button>
            </div>
          )}
        </div>
        <div className="p-4">
          <h2 className="text-sm font-medium text-gray-800 truncate">
            {product.name}
          </h2>
          <p className="text-xs text-slate-400 mt-1">{product.brand}</p>
          <div className="flex justify-between items-center mt-2">
            <p className="text-sm font-semibold text-gray-900">
              MAD {product.price.toFixed(2)}
            </p>
            {product.originalPrice && (
              <p className="text-xs text-gray-500 line-through">
                MAD {product.originalPrice.toFixed(2)}
              </p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
