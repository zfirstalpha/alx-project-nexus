import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

import { Product } from "@/interfaces";

// Define the props for the ProductGrid component
interface ProductGridProps {
  products: Product[];
  itemsPerPage?: number;
}

export default function ProductGrid({
  products: initialProducts,
  itemsPerPage = 12,
}: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortOrder, setSortOrder] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string>("All");

  const brands: string[] = [
    "All",
    "Rolex",
    "Patek Philipe",
    "Audemars Piguet",
    "Richard Mille",
    "Omega",
    "IWC",
    "Cartier",
    "Tudor",
  ];

  // Update products when initialProducts changes
  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  // Calculate pagination values
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  // Handle sorting by price
  const handleSort = (order: string) => {
    setSortOrder(order);
    const sortedProducts = [...products].sort((a, b) => {
      if (order === "highToLow") {
        return b.price - a.price;
      } else if (order === "lowToHigh") {
        return a.price - b.price;
      }
      return 0;
    });
    setProducts(sortedProducts);
    setCurrentPage(1);
  };

  // Handle filtering by brand
  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand);
    if (brand === "All") {
      setProducts(initialProducts);
    } else {
      const filteredProducts = initialProducts.filter(
        (product) => product.brand === brand
      );
      setProducts(filteredProducts);
    }
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto px-[1px] py-8">
      <div className="mb-4 flex justify-between items-center">
        <div>
          <label htmlFor="brand" className="mr-2 text-gray-700">
            Brand:
          </label>
          <select
            id="brand"
            value={selectedBrand}
            onChange={(e) => handleBrandChange(e.target.value)}
            className="border-none w-[70%] rounded-md bg-slate-50 p-1 text-gray-700 focus:outline-none"
          >
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="sort" className="mr-2 text-gray-700">
            Sort:
          </label>
          <select
            id="sort"
            value={sortOrder || ""}
            onChange={(e) => handleSort(e.target.value)}
            className="border-none w-[80%] rounded-md bg-slate-50 p-1 text-gray-700 focus:outline-none"
          >
            <option value="">Select</option>
            <option value="highToLow">Price: High to Low</option>
            <option value="lowToHigh">Price: Low to High</option>
          </select>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === index + 1
                  ? "bg-slate-600 text-white focus:outline-none focus:border-none"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none focus:border-none"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
