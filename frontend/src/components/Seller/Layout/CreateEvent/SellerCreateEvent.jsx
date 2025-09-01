import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { categoriesData } from "../../../../static/data.jsx";
import { AiOutlinePlusCircle } from "react-icons/ai";
import {
  createEvent,
  resetEventSuccess,
} from "../../../../redux/actions/event.js";
function SellerCreateEvent() {
  const { seller } = useSelector((state) => state.seller);
  const { loading, error, success } = useSelector((state) => state.event);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toastId = useRef(null);

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState("");
  const [stock, setStock] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleImages = (e) => {
    e.preventDefault();
    let files = Array.from(e.target.files);
    setImages((pre) => [...pre, ...files]);
    e.target.value = null;
  };

  const handleStartDateChange = (e) => {
    const selected = e.target.value;
    setStartDate(selected);

    const minEnd = new Date(
      new Date(selected).getTime() + 3 * 24 * 60 * 60 * 1000
    );
    if (endDate && new Date(endDate) < new Date(selected)) {
      setEndDate("");
    }
  };

  const handleEndDateChange = (e) => {
    const selected = e.target.value;
    if (startDate && new Date(selected) < new Date(startDate)) {
      toast.error("End date cannot be before start date");
      return;
    }
    setEndDate(selected);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !name ||
      !description ||
      !category ||
      !tags ||
      !originalPrice ||
      !discountedPrice ||
      !stock ||
      images.length === 0
    ) {
      return toast.error("Please fill all fields and add images");
    }

    const EventData = new FormData();
    EventData.append("name", name);
    EventData.append("description", description);
    EventData.append("category", category);
    EventData.append("tags", tags);
    EventData.append("originalPrice", originalPrice);
    EventData.append("discountedPrice", discountedPrice);
    EventData.append("stock", stock);
    EventData.append("sellerId", seller._id);
    EventData.append("startDate", startDate);
    EventData.append("endDate", endDate);
    images.forEach((file) => {
      EventData.append("file", file);
    });

    toastId.current = toast.loading("Creating Event...");
    dispatch(createEvent(EventData));
    setHasSubmitted(true);
  };

  useEffect(() => {
    if (success && hasSubmitted) {
      toast.update(toastId.current, {
        render: "Event created successfully",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      setTimeout(() => {
        dispatch(resetEventSuccess());
        window.location.reload();
        navigate("/seller/dashboard/events");
      }, 100);
    }

    if (error && hasSubmitted) {
      toast.update(toastId.current, {
        render: error,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  }, [success, error, hasSubmitted, navigate, dispatch]);

  return (
    <div className="w-full flex justify-center px-4 py-8">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Create Event
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">
              Event Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Event name"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Event Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={description}
              cols={30}
              rows={5}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter Event description"
              className="w-full border border-gray-300 rounded-md px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Event Category <span className="text-red-500">*</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose a Category</option>
              {categoriesData &&
                categoriesData.map((category) => (
                  <option key={category.title} value={category.title}>
                    {category.title}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Tags <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Enter Event tags"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Original Price <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                placeholder="e.g., 100"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Discounted Price <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={discountedPrice}
                onChange={(e) => setDiscountedPrice(e.target.value)}
                placeholder="e.g., 80"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Event Stock <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="Enter stock quantity"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Start Date */}
          <input
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            min={new Date().toISOString().slice(0, 10)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
            min={startDate}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Images <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center space-x-4">
              <label className="cursor-pointer">
                <div className="flex items-center justify-center w-16 h-16 border-2 border-dashed border-gray-300 rounded-md hover:border-blue-500">
                  <AiOutlinePlusCircle size={24} className="text-gray-500" />
                </div>
                <input
                  type="file"
                  id="images"
                  onChange={handleImages}
                  multiple
                  name="images"
                  className="hidden"
                />
              </label>

              {images.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Event ${index}`}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setImages(images.filter((_, i) => i !== index))
                        }
                        className="absolute -top-2 -right-2 cursor-pointer hover:border-blue-500 hover:border-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white font-medium py-2 rounded-md  hover:bg-blue-700 transition ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 cursor-pointer"
              }`}
            >
              {loading ? "Creating..." : "Create Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SellerCreateEvent;
