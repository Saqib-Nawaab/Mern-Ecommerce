import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllOrders } from "../../../redux/actions/order.js";
import { useEffect } from "react";
import { BsFillBagFill, BsArrowLeft } from "react-icons/bs";
import Loading from "../../Loading/Loading.jsx";
import { FiTruck, FiPackage, FiMapPin, FiCheckCircle } from "react-icons/fi";
import { FaCheck } from "react-icons/fa";
import { setActivate } from "../../../redux/reducers/profile.js";
function UserTrakOrderDetails() {
  const { order, isLoading } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (user?._id) {
      dispatch(getAllOrders(user._id));
    }
  }, [dispatch, user?._id]);

  const data = order?.data?.find((item) => item._id === id) || null;

  if (isLoading) return <Loading />;

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="p-8 bg-white rounded-xl shadow-sm text-center max-w-md w-full">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Order Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The order you're looking for doesn't exist or may have been removed.
          </p>
          <Link
            onClick={() => dispatch(setActivate(5))}
            to="/profile"
            className="inline-flex items-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
          >
            <BsArrowLeft className="mr-2" /> Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  const steps = [
    { name: "Processing", icon: <FiPackage /> },
    { name: "Shipped", icon: <FiTruck /> },
    { name: "On the way", icon: <FiMapPin /> },
    { name: "Delivered", icon: <FiCheckCircle /> },
  ];

  const currentStepIndex = steps.findIndex(
    (s) => s.name.toLowerCase() === data.status?.toLowerCase()
  );

  const totalAmount =
    data.cart?.reduce(
      (sum, item) =>
        sum + item.quantity * (item.discountedPrice || item.originalPrice || 0),
      0
    ) || 0;

  return (
    <div className="bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg mr-4">
              <BsFillBagFill className="text-blue-600 text-xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-700">
                Order Details
              </h1>
              <p className="text-sm text-gray-500">Order ID: {data._id}</p>
            </div>
          </div>
          <Link
            onClick={() => dispatch(setActivate(5))}
            to="/profile"
            className="flex items-center px-4 py-2.5 bg-white border border-gray-200 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
          >
            <BsArrowLeft className="mr-2" /> Back to Orders
          </Link>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-6">
            Order Tracking
          </h2>
          <div className="relative">
            <div className="absolute top-4 left-[18px] right-[18px] h-1.5 bg-gray-200 rounded-full">
              <div
                className="absolute top-0 left-0 h-full bg-blue-500 rounded-full transition-all duration-500"
                style={{
                  width:
                    currentStepIndex >= 0
                      ? `calc(${
                          (currentStepIndex / (steps.length - 1)) * 100
                        }% )`
                      : "0%",
                }}
              ></div>
            </div>
            <div className="flex justify-between relative z-10">
              {steps.map((step, index) => {
                const isCompleted = index <= currentStepIndex;
                const isActive = index === currentStepIndex;
                return (
                  <div key={step.name} className="flex flex-col items-center">
                    <div
                      className={`w-9 h-9 flex items-center justify-center rounded-full mb-2 ${
                        isCompleted
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-400"
                      } ${
                        isActive ? "ring-4 ring-blue-200 ring-opacity-70" : ""
                      } 
              transition-all duration-300`}
                    >
                      {isCompleted ? (
                        <FiCheckCircle className="text-sm" />
                      ) : (
                        step.icon
                      )}
                    </div>
                    <span
                      className={`text-xs font-medium text-center ${
                        isCompleted ? "text-blue-600" : "text-gray-500"
                      } ${isActive ? "font-semibold text-blue-800" : ""} 
              transition-colors duration-300`}
                    >
                      {step.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-medium text-gray-700 mb-4">Order Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <p>
                  <span className="text-gray-500">Order Date:</span>{" "}
                  {new Date(data.createdAt).toLocaleDateString()}
                </p>
                <p>
                  <span className="text-gray-500">Payment:</span>{" "}
                  {data.paymentInfo?.type || "Not specified"}
                </p>
                <p>
                  <span className="text-gray-500">Status:</span> {data.status}
                </p>
                <p>
                  <span className="text-gray-500">Total:</span>{" "}
                  <span className="font-semibold text-green-600">
                    ${totalAmount.toFixed(2)}
                  </span>
                </p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100">
                <h3 className="font-medium text-gray-700">
                  Products ({data.cart?.length || 0})
                </h3>
              </div>
              <div className="divide-y divide-gray-100">
                {data.cart?.map((item) => (
                  <div key={item._id} className="p-5 flex gap-4">
                    <img
                      src={item.images?.[0]?.url || "/default-product.png"}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                      onError={(e) => (e.target.src = "/default-product.png")}
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-700">{item.name}</h4>
                      <p className="text-sm text-gray-500">{item.category}</p>
                      <div className="text-sm text-gray-600">
                        {item.quantity} × $
                        {(
                          item.discountedPrice ||
                          item.originalPrice ||
                          0
                        ).toFixed(2)}
                      </div>
                      <p className="text-sm font-semibold text-green-600">
                        Subtotal: $
                        {(
                          item.quantity *
                          (item.discountedPrice || item.originalPrice || 0)
                        ).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-medium text-gray-700 mb-4">
                Shipping Information
              </h3>
              <p className="text-sm text-gray-600">
                {data.shippingAddress?.address1}, {data.shippingAddress?.city},{" "}
                {data.shippingAddress?.state} {data.shippingAddress?.zipCode},{" "}
                {data.shippingAddress?.country}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserTrakOrderDetails;
