import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import gallery1 from "@/public/images/gallery/gallery1.jpg";
import gallery2 from "@/public/images/gallery/gallery2.jpg";
import gallery3 from "@/public/images/gallery/gallery3.jpg";
import gallery4 from "@/public/images/gallery/gallery4.jpg";
import gallery5 from "@/public/images/gallery/gallery5.jpg";
import gallery6 from "@/public/images/gallery/gallery6.jpg";
import gallery7 from "@/public/images/gallery/gallery7.jpg";
import gallery8 from "@/public/images/gallery/gallery8.jpg";
import gallery9 from "@/public/images/gallery/gallery9.jpg";
import gallery10 from "@/public/images/gallery/gallery10.jpg";
import gallery11 from "@/public/images/gallery/gallery11.jpg";
import gallery13 from "@/public/images/gallery/gallery13.jpg";
import gallery14 from "@/public/images/gallery/gallery14.jpg";

const GallerySlider: React.FC = () => {
  const images: StaticImageData[] = [
    gallery1,
    gallery2,
    gallery3,
    gallery4,
    gallery5,
    gallery6,
    gallery7,
    gallery8,
    gallery9,
    gallery10,
    gallery11,
    gallery13,
    gallery14,
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(2);
  const [direction, setDirection] = useState<number>(0);
  const visibleOffset = 2; // Number of images to show on each side of the center

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const getVisibleImages = (): StaticImageData[] => {
    return Array.from({ length: visibleOffset * 2 + 1 }, (_, i) => {
      const offset = i - visibleOffset;
      const index = (currentIndex + offset + images.length) % images.length;
      return images[index];
    });
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        prevSlide();
      } else if (event.key === "ArrowRight") {
        nextSlide();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto sm:py-24 py-14 px-4 overflow-hidden">
      <div className="flex items-center justify-center space-x-4">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          {getVisibleImages().map((image, index) => (
            <motion.div
              key={`${image.src}-${currentIndex}-${index}`}
              className={`relative transition-all duration-300 ease-in-out ${
                index === 2
                  ? "sm:w-[45rem] sm:h-[30rem] w-[25rem] h-[15rem]"
                  : "sm:w-[30rem] sm:h-[20rem] w-[20rem] h-[12rem]"
              } ${
                index === 0 || index === 4
                  ? "opacity-50 sm:block hidden"
                  : "opacity-100"
              }`}
              custom={direction}
              variants={index === 1 || index === 3 ? variants : {}}
              initial={index === 1 || index === 3 ? "enter" : false}
              animate={index === 1 || index === 3 ? "center" : false}
              exit={index === 1 || index === 3 ? "exit" : undefined}
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
            >
              <Image
                height={500}
                width={500}
                src={image}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
              {index !== 2 && (
                <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg" />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-3 rounded-full shadow-md hover:bg-opacity-75 transition-all duration-200"
      >
        <ChevronLeft className="w-6 h-6 text-gray-800" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-3 rounded-full shadow-md hover:bg-opacity-75 transition-all duration-200"
      >
        <ChevronRight className="w-6 h-6 text-gray-800" />
      </button>
    </div>
  );
};

export default GallerySlider;
