import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { Country, State } from "country-state-city";
import { LuMapPin } from "../../../assets/icons/index.js";
import { GrValidate } from "react-icons/gr";
import { MdCheckCircle } from "react-icons/md";
import { HiCheckBadge } from "react-icons/hi2";
import {
  addNewUserAddress,
  deleteUserAddress,
} from "../../../redux/actions/user.js";

function ContentAddress() {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [addressType, setAddressType] = useState("");
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [activeAddressId, setActiveAddressId] = useState(() => {
    const defaultAddr = user?.addresses?.find(
      (addr) => addr.addressType === "Default"
    );
    return defaultAddr?._id || user?.addresses?.[0]?._id || null;
  });

  const addressTypeData = [
    { name: "Default" },
    { name: "Home" },
    { name: "Office" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!addressType || !country || !city || !address1 || !zipCode) {
      toast.error("Please fill all the required fields!");
      return;
    }

    if (
      addressType === "Default" &&
      user.addresses.some((addr) => addr.addressType === "Default")
    ) {
      toast.error("A default address already exists.");
      return;
    }

    const addressData = {
      country,
      city,
      address1,
      address2,
      zipCode,
      addressType,
    };

    dispatch(addNewUserAddress(addressData));
    toast.success("Address added successfully!");
    setOpen(false);
    setCountry("");
    setCity("");
    setAddress1("");
    setAddress2("");
    setZipCode("");
    setAddressType("");
  };

  const handleDelete = async (item) => {
    try {
      await dispatch(deleteUserAddress(item._id));
      toast.success("Address deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete address");
    }
  };

  return (
    <div className="w-full px-5 py-8">
      {open && (
        <div className="fixed inset-0 bg-[#0000004b] flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold">Add New Address</h2>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 cursor-pointer hover:text-gray-700"
              >
                <RxCross1 size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select your country</option>
                  {Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={!country}
                >
                  <option value="">Select your city</option>
                  {country &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address Line 1
                </label>
                <input
                  type="text"
                  required
                  value={address1}
                  onChange={(e) => setAddress1(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address Line 2
                </label>
                <input
                  type="text"
                  value={address2}
                  onChange={(e) => setAddress2(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Zip/Postal Code
                </label>
                <input
                  type="text"
                  required
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address Type
                </label>
                <select
                  value={addressType}
                  onChange={(e) => setAddressType(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select address type</option>
                  {addressTypeData.map((item) => (
                    <option key={item.name} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-800">My Addresses</h1>
          <button
            onClick={() => setOpen(true)}
            className="mt-4 md:mt-0 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition duration-200"
          >
            Add New Address
          </button>
        </div>

        {user && user.addresses.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {user.addresses.map((item, index) => (
              <div
                key={index}
                className={`border rounded-lg p-6 hover:shadow-md transition duration-200 ${
                  item.addressType === "Default"
                    ? "border-2 border-blue-500"
                    : "border-gray-200"
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      item.addressType === "Default"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {item.addressType}
                  </span>
                  <div className="flex space-x-2">
                    <button className=" text-blue-400  hover:text-blue-600 cursor-pointer">
                      {item._id === activeAddressId && <GrValidate />}
                    </button>
                    <button
                      onClick={() => handleDelete(item)}
                      className="text-gray-500 hover:text-red-600 cursor-pointer"
                    >
                      <AiOutlineDelete size={18} />
                    </button>
                  </div>
                </div>

                <div className="space-y-2 text-gray-700">
                  <p className="font-medium">{item.address1}</p>
                  {item.address2 && <p>{item.address2}</p>}
                  <p>
                    {item.city}, {item.country}
                  </p>
                  <p>Postal Code: {item.zipCode}</p>
                  {item.phoneNumber && (
                    <p className="pt-2">
                      <span className="font-medium">Phone:</span>{" "}
                      {item.phoneNumber}
                    </p>
                  )}
                </div>

                {item.addressType === "Default" && (
                  <div className="mt-4">
                    <span className="text-sm font-medium text-blue-600">
                      Default shipping address
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <div className="max-w-md mx-auto">
              <LuMapPin className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                No saved addresses
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                You haven't saved any addresses yet. Add one to get started.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContentAddress;
