import React from "react";
import ProductImageGallery from "./ProductImageGallery";
import GuaranteeSection from "./GuaranteeSection";
import ReviewSection from "./ReviewSection";
import FAQSection from "./FAQSection";
import ProdDetailsList from "./ProdDetailsList";
import ProdDetailsPrice from "./ProdDetailsPrice";
import { Product } from "@/interfaces";

interface ProductDetailsSinglePageProps {
  product: Product;
  averageRating: number;
  allReviews: any[];
  isInWishlist: boolean;
  handleAddToCart: () => void; // Remove Product parameter here
  toggleWishlist: (productId: string) => void;
}

const ProductDetailsSinglePage: React.FC<ProductDetailsSinglePageProps> = ({
  product,
  averageRating,
  allReviews,
  isInWishlist,
  handleAddToCart,
  toggleWishlist,
}) => {
  return (
    <div className="container mx-auto sm:px-[15rem] py-12 max-w-full">
      <div className="flex flex-col md:flex-row gap-12 bg-white rounded-t-xl shadow-lg overflow-hidden">
        <ProductImageGallery product={product} />
        <ProdDetailsPrice
          product={product}
          averageRating={averageRating}
          allReviews={allReviews}
          isInWishlist={isInWishlist}
          handleAddToCart={handleAddToCart} // Now matches expected type
          toggleWishlist={() => toggleWishlist(product._id)}
        />
      </div>

      <ProdDetailsList product={product} />
      <GuaranteeSection />
      <ReviewSection productId={product._id.toString()} />
      <FAQSection />
    </div>
  );
};

export default ProductDetailsSinglePage;
