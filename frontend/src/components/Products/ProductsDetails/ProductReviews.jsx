import React from "react";
import { useSelector } from "react-redux";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";

function ProductReviews({ data }) {
  const { user } = useSelector((state) => state.user);
  const reviews = data?.review || data?.review || [];

  const renderStars = (rating) => (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) =>
        i < rating ? (
          <AiFillStar key={i} className="text-yellow-400 w-5 h-5" />
        ) : (
          <AiOutlineStar key={i} className="text-gray-300 w-5 h-5" />
        )
      )}
      <span className="ml-2 text-sm font-medium text-gray-600">{rating}.0</span>
    </div>
  );

  return (
    <div className="mt-12 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        {reviews.length > 0 && (
          <span className="text-[18px] font-medium text-gray-500">
            {reviews.length} review{reviews.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {reviews.length === 0 ? (
        <div className="bg-gray-50 p-8 rounded-xl text-center border border-gray-100 shadow-sm">
          <div className="mx-auto w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
            <AiOutlineStar className="text-gray-400 text-2xl" />
          </div>
          <h4 className="text-lg font-medium text-gray-700 mb-2">No reviews yet</h4>
          <p className="text-gray-500 max-w-md mx-auto">
            This product doesn't have any reviews yet. Be the first to share your experience!
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {reviews.slice().reverse().map((review) => {
            const reviewerId = review.userId?._id || review.userId;
            const isCurrentUser = user && user._id === reviewerId;            
            const reviewer = review.userId?.name ? 
              review.userId : 
              (review.reviewer || (isCurrentUser ? user : null));

            return (
              <div
                key={review._id}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    {reviewer?.avatar?.url ? (
                      <img
                        src={reviewer.avatar.url}
                        alt={reviewer.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"
                      />
                    ) : (
                      <FaUserCircle className="text-gray-400 text-4xl" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <h4 className="font-semibold text-gray-800 truncate">
                        {reviewer?.name || "Anonymous User"}
                      </h4>
                      <div className="flex items-center gap-3">
                        {isCurrentUser && (
                          <span className="text-xs font-medium bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full">
                            Your review
                          </span>
                        )}
                        <span className="text-xs text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="mt-1">{renderStars(review.rating)}</div>
                    <p className="mt-3 text-gray-700 leading-relaxed">{review.comment}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ProductReviews;