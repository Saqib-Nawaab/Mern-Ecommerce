import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  FiDollarSign,
  FiCreditCard,
  FiArrowLeft,
  FiCalendar,
  FiCheckCircle,
  FiSmartphone,
  FiLock,
} from "react-icons/fi";
import { FaUniversity } from "react-icons/fa"; 
import { BsGraphUp, BsInfoCircle } from "react-icons/bs";
import { SiStripe, SiPayoneer, SiPaypal } from "react-icons/si"; 
import { Link } from "react-router-dom";
import { getSellerAllOrders } from "../../../../redux/actions/order.js";
import Loading from "../../../Loading/Loading.jsx";

function SellerWithdrawMoney() {
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state.seller);
  const { order } = useSelector((state) => state.order);
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("bank");
  const [isProcessing, setIsProcessing] = useState(false);
  const [withdrawalHistory, setWithdrawalHistory] = useState([]);
  const [showMethodDetails, setShowMethodDetails] = useState({});

  useEffect(() => {
    dispatch(getSellerAllOrders(seller._id));

    setWithdrawalHistory([
      {
        id: 1,
        date: "2023-10-15",
        amount: 250.0,
        method: "Bank Transfer",
        status: "Completed",
        transactionId: "TRX-78945612",
      },
      {
        id: 2,
        date: "2023-09-28",
        amount: 180.5,
        method: "PayPal",
        status: "Completed",
        transactionId: "TRX-32165498",
      },
      {
        id: 3,
        date: "2023-09-10",
        amount: 320.75,
        method: "Stripe",
        status: "Completed",
        transactionId: "TRX-15975346",
      },
    ]);
  }, [dispatch, seller._id]);

  useEffect(() => {
    if (order?.data) {
      const orderData = order.data.filter(
        (item) => item?.status?.toLowerCase() === "delivered"
      );
      setDeliveredOrders(orderData);
    }
  }, [order]);

  const totalEarnings = deliveredOrders.reduce(
    (acc, item) => acc + (item?.totalPrice || 0),
    0
  );
  const serviceCharge = (totalEarnings * 0.1).toFixed(2);
  const accountBalance = (totalEarnings - serviceCharge).toFixed(2);

  const handleWithdraw = () => {
    if (!withdrawAmount || withdrawAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (parseFloat(withdrawAmount) > parseFloat(accountBalance)) {
      toast.error("Insufficient balance");
      return;
    }

    setIsProcessing(true);

    // Simulate API call
    setTimeout(() => {
      toast.success("Withdrawal request submitted successfully!");
      setWithdrawAmount("");
      setIsProcessing(false);

      // Add to history
      setWithdrawalHistory((prev) => [
        {
          id: prev.length + 1,
          date: new Date().toISOString().split("T")[0],
          amount: parseFloat(withdrawAmount),
          method: paymentMethods.find((m) => m.id === selectedMethod)?.name,
          status: "Processing",
          transactionId: `TRX-${Math.floor(
            10000000 + Math.random() * 90000000
          )}`,
        },
        ...prev,
      ]);
    }, 2000);
  };

  const toggleMethodDetails = (methodId) => {
    setShowMethodDetails((prev) => ({
      ...prev,
      [methodId]: !prev[methodId],
    }));
  };

  const paymentMethods = [
    {
      id: "bank",
      name: "Bank Transfer",
      icon: <FaUniversity size={20} />, // Corrected: Uses the imported FaUniversity
      processingTime: "2-3 business days",
      minAmount: 10,
      fee: "1% (min $2)",
      details: [
        { label: "Account Name", value: seller?.name || "Your Name" },
        { label: "Account Number", value: "**** **** **** 1234" },
        { label: "Bank Name", value: "Example Bank" },
        { label: "Routing Number", value: "*****1234" },
      ],
    },
    {
      id: "paypal",
      name: "PayPal",
      icon: <SiPaypal size={20} />, // Corrected: Uses the imported SiPaypal
      processingTime: "Instant",
      minAmount: 5,
      fee: "2.9% + $0.30",
      details: [
        { label: "PayPal Email", value: seller?.email || "your@email.com" },
      ],
    },
    {
      id: "stripe",
      name: "Stripe",
      icon: <SiStripe size={20} />,
      processingTime: "1-2 business days",
      minAmount: 2,
      fee: "2.9% + $0.30",
      details: [
        {
          label: "Stripe Account",
          value: `acct_${seller?.name?.replace(/\s/g, "_")}`,
        },
      ],
    },
    {
      id: "payoneer",
      name: "Payoneer",
      icon: <SiPayoneer size={20} />,
      processingTime: "1 business day",
      minAmount: 20,
      fee: "1%",
      details: [
        {
          label: "Payoneer ID",
          value: seller?._id ? `P${seller._id.slice(-8)}` : "P12345678",
        },
      ],
    },
    {
      id: "mobile",
      name: "Mobile Money",
      icon: <FiSmartphone size={20} />,
      processingTime: "Instant",
      minAmount: 5,
      fee: "1.5%",
      details: [
        { label: "Provider", value: "MTN Mobile Money" },
        { label: "Phone Number", value: "+123 ***** 567" },
      ],
    },
  ];

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center">
          <h1 className="text-2xl  text-gray-800">Withdraw Funds</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Balance & Stats */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Available Balance
                </h3>
                <div className="p-2 bg-blue-50 rounded-lg">
                  <FiDollarSign className="text-blue-500" size={20} />
                </div>
              </div>
              <p className="text-3xl font-bold text-green-600 mb-2">
                ${accountBalance}
              </p>
              <p className="text-sm text-gray-500">After 10% service fee</p>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Total Earnings:</span>
                  <span className="text-sm font-medium">
                    ${totalEarnings.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Service Fee (10%):
                  </span>
                  <span className="text-sm font-medium text-red-500">
                    -${serviceCharge}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Withdrawal Stats
              </h3>

              <div className="flex items-center mb-4">
                <div className="p-2 bg-green-50 rounded-lg mr-3">
                  <BsGraphUp className="text-green-500" size={18} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Delivered Orders</p>
                  <p className="font-semibold">{deliveredOrders.length}</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="p-2 bg-purple-50 rounded-lg mr-3">
                  <FiDollarSign className="text-purple-500" size={18} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Withdrawals</p>
                  <p className="font-semibold">
                    $
                    {withdrawalHistory
                      .reduce((sum, item) => sum + item.amount, 0)
                      .toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Column - Withdrawal Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 h-full">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">
                Withdraw Funds
              </h3>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount to Withdraw
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="pl-7 block w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                    min="0"
                    max={accountBalance}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Available: ${accountBalance}
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Method
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="relative">
                      <div
                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                          selectedMethod === method.id
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setSelectedMethod(method.id)}
                      >
                        <div className="flex items-center">
                          <div
                            className={`mr-2 ${
                              selectedMethod === method.id
                                ? "text-blue-500"
                                : "text-gray-500"
                            }`}
                          >
                            {method.icon}
                          </div>
                          <span className="text-sm font-medium">
                            {method.name}
                          </span>
                        </div>

                        <button
                          type="button"
                          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleMethodDetails(method.id);
                          }}
                        >
                          <BsInfoCircle size={16} />
                        </button>
                      </div>

                      {showMethodDetails[method.id] && (
                        <div className="mt-2 p-3 bg-gray-50 rounded-lg text-xs">
                          <div className="font-medium mb-1">
                            {method.name} Details:
                          </div>
                          {method.details.map((detail, idx) => (
                            <div key={idx} className="flex justify-between">
                              <span className="text-gray-600">
                                {detail.label}:
                              </span>
                              <span className="font-medium">
                                {detail.value}
                              </span>
                            </div>
                          ))}
                          <div className="mt-2 pt-2 border-t border-gray-200">
                            <div className="flex justify-between">
                              <span>Processing Time:</span>
                              <span>{method.processingTime}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Fee:</span>
                              <span>{method.fee}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Minimum:</span>
                              <span>${method.minAmount}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6 p-4 bg-blue-50 rounded-lg flex items-start">
                <BsInfoCircle className="text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-blue-700 font-medium">
                    {
                      paymentMethods.find((m) => m.id === selectedMethod)
                        ?.processingTime
                    }{" "}
                    processing
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    Fee:{" "}
                    {
                      paymentMethods.find((m) => m.id === selectedMethod)?.fee
                    }
                  </p>
                </div>
              </div>

              <div className="flex items-center mb-6 text-sm text-gray-500">
                <FiLock className="mr-2" />
                <span>All transactions are secure and encrypted</span>
              </div>

              <button
                onClick={handleWithdraw}
                disabled={
                  isProcessing ||
                  !withdrawAmount ||
                  parseFloat(withdrawAmount) > parseFloat(accountBalance) ||
                  parseFloat(withdrawAmount) <
                    paymentMethods.find((m) => m.id === selectedMethod)
                      ?.minAmount
                }
                className={`w-full py-3 px-4 rounded-md text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  isProcessing ||
                  !withdrawAmount ||
                  parseFloat(withdrawAmount) > parseFloat(accountBalance) ||
                  parseFloat(withdrawAmount) <
                    paymentMethods.find((m) => m.id === selectedMethod)
                      ?.minAmount
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isProcessing
                  ? "Processing..."
                  : `Withdraw via ${
                      paymentMethods.find((m) => m.id === selectedMethod)?.name
                    }`}
              </button>
            </div>
          </div>
        </div>

        {/* Withdrawal History */}
        <div className="mt-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              Recent Withdrawals
            </h3>

            {withdrawalHistory.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 text-sm font-medium text-gray-500">
                        Date
                      </th>
                      <th className="text-left py-3 text-sm font-medium text-gray-500">
                        Method
                      </th>
                      <th className="text-left py-3 text-sm font-medium text-gray-500">
                        Transaction ID
                      </th>
                      <th className="text-right py-3 text-sm font-medium text-gray-500">
                        Amount
                      </th>
                      <th className="text-right py-3 text-sm font-medium text-gray-500">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {withdrawalHistory.map((withdrawal) => (
                      <tr
                        key={withdrawal.id}
                        className="border-b border-gray-100"
                      >
                        <td className="py-4 text-sm text-gray-600">
                          {formatDate(withdrawal.date)}
                        </td>
                        <td className="py-4 text-sm text-gray-600">
                          {withdrawal.method}
                        </td>
                        <td className="py-4 text-sm text-gray-600">
                          {withdrawal.transactionId}
                        </td>
                        <td className="py-4 text-sm font-medium text-right">
                          ${withdrawal.amount.toFixed(2)}
                        </td>
                        <td className="py-4 text-right">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              withdrawal.status === "Completed"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {withdrawal.status === "Completed" && (
                              <FiCheckCircle className="mr-1" size={12} />
                            )}
                            {withdrawal.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8">
                <FiDollarSign className="mx-auto text-gray-300" size={48} />
                <p className="text-gray-500 mt-2">
                  No withdrawal history yet
                </p>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-gray-100">
              <Link
                to="/seller/dashboard/withdraw-history"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View full history →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerWithdrawMoney;