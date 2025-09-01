import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CiMail } from "react-icons/ci";
import ProductReviews from "./ProductReviews.jsx";
import { useSelector } from "react-redux";
const ProductDetailsInfo = ({ data }) => {
  const [activeTab, setActiveTab] = useState(1);
  const { product } = useSelector((state) => state.product);
  const totalReviews = data?.review?.length || 0;
  const totalProducts = product?.message?.length || 0;
  const totalRating =
    data?.review?.reduce((acc, item) => acc + item.rating, 0) || 0;
  const averageRating = totalReviews > 0 ? totalRating / totalReviews : 0;

  return (
    <div className="bg-gray-50  p-6 rounded-xl ">
      <div className="flex  border-gray-200  mb-6 justify-center items-center">
        {["Product Details", "Product Reviews", "Seller Information"].map(
          (tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index + 1)}
              className={`relative px-4 py-2 cursor-pointer text-sm sm:text-base font-medium transition 
              ${
                activeTab === index + 1
                  ? "text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
              {activeTab === index + 1 && (
                <span className="absolute left-0 right-0 -bottom-[2px] h-[2px] bg-blue-600 rounded-full"></span>
              )}
            </button>
          )
        )}
      </div>
      {activeTab === 1 && (
        <div className="space-y-4 mt-3 text-gray-600 text-sm leading-relaxed">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit doloremque consequuntur quod, voluptates modi dolore.
            Officiis fuga, optio voluptas aut nihil, voluptatibus odio quam ab
            vel perspiciatis, soluta neque dicta.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum quam
            ducimus enim cum ratione beatae est nihil maiores necessitatibus
            deleniti! Temporibus magni delectus ducimus? Molestias, in! Eius
            modi iure ea.
          </p>
          <p>
            Id, nulla iusto distinctio perspiciatis eaque sed dignissimos sunt
            nihil cum deserunt harum expedita voluptatibus, dicta quos ipsam
            impedit temporibus nobis tempore officia porro dolore magni. Eos eum
            impedit voluptatum.
          </p>
          <p>
            Quidem, esse qui corrupti quibusdam voluptates quaerat eligendi
            impedit accusamus. Quibusdam maiores reiciendis expedita quas sint
            sequi explicabo est ab ut unde ratione sunt, provident dolores iste
            laborum, quisquam eveniet.
          </p>
          <p>
            Quidem, esse qui corrupti quibusdam voluptates quaerat eligendi
            impedit accusamus. Quibusdam maiores reiciendis expedita quas sint
            sequi explicabo est ab ut unde ratione sunt, provident dolores iste
            laborum, quisquam eveniet.
          </p>
        </div>
      )}

      {activeTab === 2 && (
        <div className="p-4 text-center text-gray-500 text-sm">
          <ProductReviews data={data} />
        </div>
      )}

      {activeTab === 3 && (
        <div className="mt-4">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-1">
              <div className="flex items-start gap-4">
                <img
                  src={data?.seller?.avatar?.url}
                  alt="seller Avatar"
                  className="w-16 h-16 rounded-full border-2 border-white shadow-sm object-cover"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {data?.seller?.name || "No seller Name"}
                    </h3>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                      Verified
                    </span>
                  </div>
                  <div className="flex items-center mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="text-yellow-400">
                        {star <= (averageRating || 0) ? "★" : "☆"}
                      </span>
                    ))}
                    <span className="text-gray-500 text-sm ml-2">
                      ({averageRating.toFixed(1) || 0})
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm mt-3 leading-relaxed">
                {data?.seller?.description ||
                  "This seller does not have a description yet."}
              </p>
            </div>

            <div className="sm:w-64 flex-shrink-0">
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">Joined</span>
                    <span className="text-gray-800 font-medium text-sm">
                      {data?.seller?.joined_date
                        ? new Date(
                            data?.seller?.joined_date
                          ).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : "Jan 1, 2025"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">
                      Total Products
                    </span>
                    <span className="text-gray-800 font-medium text-sm">
                      {totalProducts}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">Total Reviews</span>
                    <span className="text-gray-800 font-medium text-sm">
                      {totalReviews}
                    </span>
                  </div>
                </div>

                <Link
                  to={`/`}
                  className="mt-4 w-full inline-flex justify-center items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  View Shop
                </Link>
              </div>
            </div>
          </div>

          <button className="mt-6 w-[15%] min-w-[140px] mx-auto block text-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors">
            Become Seller
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsInfo;
