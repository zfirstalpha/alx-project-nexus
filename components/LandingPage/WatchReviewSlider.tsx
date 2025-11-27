import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import trustpilot from "@/public/images/reviews/trustpilotsvg.svg";
import customerImage1 from "@/public/images/reviews/customer1.jpg";
import customerImage2 from "@/public/images/reviews/customer2.jpg";
import customerImage3 from "@/public/images/reviews/customer3.jpg";
import watch1 from "@/public/images/reviews/watch3.jpg";
import watch2 from "@/public/images/reviews/watch4.jpg";
import watch3 from "@/public/images/reviews/watch12.jpg";

// Define a type for the review object
interface Review {
  id: number;
  rating: number;
  text: string;
  author: string;
  date: string;
  customerImage: StaticImageData; // Assuming these are imported as StaticImageData
  watchImage: StaticImageData; // Assuming these are imported as StaticImageData
}

// Define the reviews array with the Review type
const reviews: Review[] = [
  {
    id: 1,
    rating: 5,
    text: "The gold-tone Omega Speedmaster arrived in pristine condition, and it is stunning in person. The craftsmanship is superb; it feels solid and looks incredibly sharp with the black dial. This is more than just a watch; it's a powerful statement piece that truly elevates my professional attire. A fantastic investment!",
    author: "Yishak alemayehu",
    date: "Mar 20, 2024",
    customerImage: customerImage1,
    watchImage: watch1,
  },
  {
    id: 2,
    rating: 4,
    text: "These sneakers are the definition of 'effortlessly cool.' The cream color and the subtle gold stitching make them stand out without being over-the-top. They are incredibly comfortable for all-day wear and they pair perfectly with jeans, shorts, and even casual dresses. Style and comfort, 10/10",
    author: "helina abebe",
    date: "Sep 11, 2025",
    customerImage: customerImage2,
    watchImage: watch2,
  },
  {
    id: 3,
    rating: 5,
    text: "We absolutely love our 'MR. & MRS.' shirts! The material is so soft and the vibrant yellow color is exactly as pictured. We wore them for our anniversary photoshoot and they were a huge hit. They're a perfect, playful way to show off our bond. Highly recommend for any fun-loving couple!",
    author: "yeabsira and tihetna",
    date: "Nov 3, 2025",
    customerImage: customerImage3,
    watchImage: watch3,
  },
];

const WatchReviewSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(0);

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  return (
    <div className="mx-auto sm:h-[48rem] h-[30rem] px-4 sm:px-12 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-lg overflow-hidden">
      <hr className="border-gray-300" />
      <div className="sm:px-12 flex sm:pb-12 justify-center items-center">
        <Image
          quality={100}
          width={50}
          height={30}
          src={trustpilot}
          alt="Trustpilot"
          className="h-20 sm:h-[10rem] w-auto"
        />
      </div>
      <div className="relative flex justify-center pt-14 sm:pt-0 items-center h-[300px] sm:h-[500px]">
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:-left-6 bg-white p-2 sm:p-3 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 z-20"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
        </button>
        <div className="flex items-center overflow-hidden w-full">
          {[-1, 0, 1].map((offset) => {
            const reviewIndex =
              (currentIndex + offset + reviews.length) % reviews.length;
            const review = reviews[reviewIndex];
            return (
              <motion.div
                key={reviewIndex}
                initial={{
                  scale: offset === 0 ? 1 : 0.8,
                  opacity: 1,
                }}
                animate={{
                  scale: offset === 0 ? 1 : 0.8,
                  opacity: 1,
                }}
                transition={{ duration: 0.3 }}
                className={`flex-shrink-0 w-full sm:w-1/3 ${
                  offset === 0 ? "z-10" : "z-0"
                }`}
              >
                <div className="bg-white p-4 rounded-xl mb-12 shadow-xl flex flex-col h-[26rem] sm:h-[27rem]">
                  <div className="flex items-center mb-2">
                    <p className="pr-1">Stars:</p>
                    {[...Array(review.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-xl">
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed flex-grow overflow-hidden">
                    "{review.text}"
                  </p>

                  <div className="flex justify-center mb-4">
                    <Image
                      src={review.watchImage}
                      alt="Purchased Watch"
                      width={150}
                      height={100}
                      className="object-contain"
                    />
                  </div>
                  <div className="flex items-center">
                    <Image
                      src={review.customerImage}
                      alt={review.author}
                      width={48}
                      height={48}
                      className="rounded-lg mr-3"
                    />
                    <div>
                      <p className="font-bold text-base">{review.author}</p>
                      <p className="text-xs text-gray-500">{review.date}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        <button
          onClick={nextSlide}
          className="absolute right-2 sm:-right-6 bg-white p-2 sm:p-3 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 z-20"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
        </button>
      </div>
      <div className="flex justify-center mt-2 pt-10 sm:pt-0">
        {reviews.map((_, index) => (
          <div
            key={index}
            className={`h-3 w-3 rounded-full mx-1 transition-all duration-300 cursor-pointer ${
              index === currentIndex
                ? "bg-green-500 scale-125"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default WatchReviewSlider;
