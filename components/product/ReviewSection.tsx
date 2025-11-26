import React, { useState, useEffect, useCallback } from "react";
import { Star, StarHalf, Pencil, BadgeCheck, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Types for the review data and user
interface User {
  _id: string;
  name: string;
  profileImage: string;
}

interface Review {
  _id: string;
  rating: number;
  comment: string;
  user: User;
  createdAt: string;
}

interface ReviewSectionProps {
  productId: string;
}

const mockReviews: Review[] = [
  {
    _id: "1",
    rating: 5,
    comment: "Excellent product!",
    user: {
      _id: "user1",
      name: "John Doe",
      profileImage: "/user-placeholder.jpg",
    },
    createdAt: new Date().toISOString(),
  },
];

const ReviewSection: React.FC<ReviewSectionProps> = ({ productId }) => {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [allReviews, setAllReviews] = useState<Review[]>(mockReviews);
  const [userReview, setUserReview] = useState<{
    rating: number;
    comment: string;
  }>({ rating: 0, comment: "" });
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [canReview, setCanReview] = useState(true);

  const renderStars = (rating: number) => {
    const stars: React.ReactNode[] = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
        );
      } else if (i - 0.5 <= rating) {
        stars.push(
          <StarHalf
            key={i}
            className="w-5 h-5 text-yellow-400 fill-yellow-400"
          />
        );
      } else {
        stars.push(<Star key={i} className="w-5 h-5 text-gray-300" />);
      }
    }
    return stars;
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReview: Review = {
      _id: Date.now().toString(),
      rating: userReview.rating,
      comment: userReview.comment,
      user: {
        _id: "currentUser",
        name: "Guest User",
        profileImage: "/user-placeholder.jpg",
      },
      createdAt: new Date().toISOString(),
    };

    setReviews((prev) => [newReview, ...prev]);
    setAllReviews((prev) => [newReview, ...prev]);
    setUserReview({ rating: 0, comment: "" });
    toast.success("Review submitted!");
  };

  const handleUpdateReview = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedReviews = reviews.map((review) =>
      review._id === editingReview?._id ? { ...review, ...userReview } : review
    );

    setReviews(updatedReviews);
    setAllReviews(updatedReviews);
    setUserReview({ rating: 0, comment: "" });
    setEditingReview(null);
    toast.success("Review updated!");
  };

  const handleEditReview = (review: Review) => {
    setEditingReview(review);
    setUserReview({ rating: review.rating, comment: review.comment });
  };

  return (
    <div className="mt-12 bg-gradient-to-b from-gray-50 to-white rounded-xl shadow-lg p-4 md:p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Customer Reviews
      </h2>
      <p className="pl-2 pb-2 text-sm">Total Reviews: ({allReviews.length})</p>

      <AnimatePresence>
        {(canReview || editingReview) && (
          <motion.form
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            onSubmit={editingReview ? handleUpdateReview : handleReviewSubmit}
            className="mb-8 bg-white p-4 md:p-6 rounded-xl shadow-md"
          >
            <h3 className="text-lg font-semibold mb-4 text-gray-700">
              {editingReview ? "Edit Your Review" : "Write a Review"}
            </h3>
            <div className="mb-4 md:mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-600">
                Rating
              </label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`cursor-pointer w-6 h-6 md:w-8 md:h-8 transition-all duration-200 ${
                      star <= userReview.rating
                        ? "text-yellow-400 fill-yellow-400 transform scale-110"
                        : "text-gray-300 hover:text-yellow-300"
                    }`}
                    onClick={() =>
                      setUserReview({ ...userReview, rating: star })
                    }
                  />
                ))}
              </div>
            </div>
            <div className="mb-4 md:mb-6">
              <label
                htmlFor="comment"
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                Your Review
              </label>
              <Textarea
                id="comment"
                value={userReview.comment}
                onChange={(e) =>
                  setUserReview({ ...userReview, comment: e.target.value })
                }
                required
                className="w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                rows={4}
                placeholder="Share your thoughts about the product..."
              />
            </div>
            <div className="flex space-x-3">
              <Button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
              >
                {editingReview ? "Update Review" : "Submit Review"}
              </Button>
              {editingReview && (
                <Button
                  type="button"
                  onClick={() => setEditingReview(null)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
                >
                  Cancel
                </Button>
              )}
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="space-y-4 md:space-y-6">
        {reviews.map((review) => (
          <motion.div
            key={review._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-4 md:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Image
                  src={review.user.profileImage}
                  alt={review.user.name}
                  width={48}
                  height={48}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full mr-3 md:mr-4 object-cover border-2 border-gray-200"
                  unoptimized
                />
                <div>
                  <p className="font-semibold text-gray-800">
                    {review.user.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <div className="flex">{renderStars(review.rating)}</div>
            </div>
            <p className="text-gray-700 mb-4">{review.comment}</p>
            <div className="flex items-center justify-between">
              <div className="flex space-x-4">
                <Button
                  variant="ghost"
                  className="text-emerald-500 hover:text-emerald-700"
                >
                  <BadgeCheck className="w-5 h-5 md:w-6 md:h-6 mr-1" />
                  <span className="text-sm">Verified Purchase</span>
                </Button>
              </div>
              <Button
                variant="ghost"
                onClick={() => handleEditReview(review)}
                className="text-blue-500 hover:text-blue-600"
              >
                <Pencil className="w-4 h-4 md:w-5 md:h-5 mr-1" />
                Edit Review
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {reviews.length < allReviews.length && (
        <div className="mt-8 text-center">
          <Button
            onClick={() => setReviews(allReviews)}
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
          >
            Show All Reviews
            <ChevronDown className="ml-2 w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReviewSection;
