import React, { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineLoading } from "react-icons/ai";
import { createReview } from "../../../redux/actions/product.js";
import { useSelector,useDispatch } from "react-redux";
import { toast } from "react-toastify";

function OrderReview({ product, setOpen, open }) {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useSelector((state) => state.user);

  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    if (!comment.trim()) {
      toast.error("Please enter your review");
      return;
    }

    setIsSubmitting(true);
    dispatch(
      createReview({
        userId: user._id,
        productId: product._id,
        rating,
        comment: comment.trim(),
      })
    )
      .then(() => {
        toast.success("Review submitted successfully!");
        setOpen(false);
        setRating(0);
        setComment("");
      })
      .catch((error) => {
        toast.error(error.message || "Failed to submit review");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-[#0000004b] flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md relative">
        <div className="flex justify-between items-center p-5 ">
          <h3 className="text-lg font-semibold text-gray-800">
            Write a Review
          </h3>
          <button
            onClick={() => !isSubmitting && setOpen(false)}
            className={`text-gray-400 hover:text-gray-500 transition-colors ${
              isSubmitting ? "cursor-not-allowed" : ""
            }`}
            disabled={isSubmitting}
          >
            <RxCross1 size={20} />
          </button>
        </div>

        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center space-x-4">
            <img
              src={product.images[0]?.url || "/default-product.png"}
              alt={product.name}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div>
              <h4 className="font-medium text-gray-800">{product.name}</h4>
              <p className="text-sm text-gray-500">{product.category}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-5">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Rating <span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => handleStarClick(star)}
                  className="focus:outline-none"
                  disabled={isSubmitting}
                >
                  {star <= rating ? (
                    <AiFillStar className="w-8 h-8 text-yellow-400" />
                  ) : (
                    <AiOutlineStar className="w-8 h-8 text-gray-300" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="comment"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Your Review <span className="text-red-500">*</span>
            </label>
            <textarea
              id="comment"
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg transition-colors duration-200 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 focus:outline-none"
              placeholder="Share your experience with this product..."
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || rating === 0 || !comment.trim()}
              className={`px-4 py-2 rounded-lg text-white ${
                rating === 0 || !comment.trim() || isSubmitting
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } transition-colors flex items-center justify-center min-w-[120px]`}
            >
              {isSubmitting ? (
                <>
                  <AiOutlineLoading className="animate-spin mr-2" size={18} />
                  Submitting...
                </>
              ) : (
                "Submit Review"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OrderReview;
