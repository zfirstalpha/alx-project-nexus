import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import Watch1 from "@/public/images/watch1.jpg";
import Watch2 from "@/public/images/watch2.jpg";
import Watch3 from "@/public/images/watch3.jpg";
import Watch4 from "@/public/images/watch4.jpg";
import Watch5 from "@/public/images/watch5.jpg";
import Watch6 from "@/public/images/watch6.jpg";
import Watch7 from "@/public/images/watch7.jpg";
import Watch8 from "@/public/images/watch8.jpg";
import Watch9 from "@/public/images/watch9.jpg";
import Watch10 from "@/public/images/watch10.jpg";
import Watch11 from "@/public/images/watch11.jpg";
import Watch12 from "@/public/images/watch12.jpg";
import Link from "next/link";

interface Watch {
  id: number;
  name: string;
  price: number;
  rating: number;
  image: StaticImageData; // StaticImageData is the type for images imported from `next/image`
  link: string;
}

const BestSellingWatches: React.FC = () => {
  const [watches, setWatches] = useState<Watch[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    // In a real application, you'd fetch this data from your API
    const fetchedWatches: Watch[] = [
      {
        id: 1,
        name: "White Air",
        price: 2900,
        rating: 4.8,
        image: Watch3,
        link: "/products/brand/rolex",
      },
      {
        id: 2,
        name: "Seiko Speedmaster Chronograph",
        price: 299,
        rating: 4.7,
        image: Watch2,
        link: "/products/brand/patekphilipe",
      },
      {
        id: 3,
        name: "red couple T shirt",
        price: 1999,
        rating: 4.9,
        image: Watch12,
        link: "/products/brand/audemarspiguet",
      },
      {
        id: 4,
        name: "girt skirt black",
        price: 1450,
        rating: 4.6,
        image: Watch4,
        link: "/products/brand/richardmille",
      },
      {
        id: 5,
        name: "Janhoy Etege Tshirt",
        price: 1999,
        rating: 5.0,
        image: Watch5,
        link: "/products/brand/omega",
      },
      {
        id: 6,
        name: "Black Shoe",
        price: 4999,
        rating: 4.5,
        image: Watch6,
        link: "/products/brand/iwc",
      },
      {
        id: 7,
        name: "White Nike Shoe",
        price: 3900,
        rating: 4.3,
        image: Watch7,
        link: "/products/brand/cartier",
      },
      {
        id: 8,
        name: "Black Nike Shoe",
        price: 4200,
        rating: 4.8,
        image: Watch8,
        link: "/products/brand/tudor",
      },
      {
        id: 9,
        name: "GIrl skirt blue",
        price: 900,
        rating: 4.7,
        image: Watch9,
        link: "/products/brand/rolex",
      },
      {
        id: 10,
        name: "Shebelaw Konjit ",
        price: 1900,
        rating: 4.7,
        image: Watch10,
        link: "/products/brand/rolex",
      },
      {
        id: 11,
        name: "She is mine",
        price: 2200,
        rating: 4.7,
        image: Watch11,
        link: "/products/brand/rolex",
      },
      {
        id: 12,
        name: "Rolex watch",
        price: 2900,
        rating: 4.7,
        image: Watch1,
        link: "/products/brand/rolex",
      },
    ].filter((watch) => watch && watch.image); // Ensure all watches have valid images
    setWatches(fetchedWatches);
  }, []);

  const nextWatch = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % watches.length);
  };

  const prevWatch = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + watches.length) % watches.length
    );
  };

  const getWatchIndex = (offset: number): number => {
    const index = (currentIndex + offset) % watches.length;
    return index;
  };

  if (watches.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <section className="py-8 md:py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-12">
          Best-selling products
        </h2>
        <div className="relative">
          <button
            onClick={prevWatch}
            className="absolute left-4 p-1 top-1/2 transform -translate-y-1/2 z-20 bg-white/50 rounded-full shadow-lg"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
          </button>
          <div className="flex items-center sm:h-[27rem] h-[35rem] justify-center overflow-hidden">
            {Array.from({ length: 5 }).map((_, offset) => {
              const watch = watches[getWatchIndex(offset)];
              if (!watch) return null; // Skip rendering if watch is undefined
              return (
                <div
                  key={watch.id}
                  className={`transition-all duration-300 flex-shrink-0 w-full md:w-1/3 lg:w-1/5 px-2 ${
                    offset === 2 ? "scale-105 z-10" : "scale-95 opacity-75"
                  }`}
                >
                  <Link
                    href={watch.link}
                    className="bg-white rounded-lg shadow-lg overflow-hidden"
                  >
                    <Image
                      width={500}
                      height={500}
                      src={watch.image}
                      alt={watch.name}
                      className="w-full sm:h-48 md:h-56 lg:h-64 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg md:text-xl font-semibold mb-2 truncate">
                        {watch.name}
                      </h3>
                      <div className="flex justify-between items-center">
                        <span className="font-bold">From {watch.price} ETB</span>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 fill-current" />
                          <span className="ml-1 text-sm md:text-base">
                            {watch.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
          <button
            onClick={nextWatch}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/50 rounded-full p-1 shadow-lg"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default BestSellingWatches;
