import { Country, State } from "country-state-city";
import { IoIosArrowDown } from "react-icons/io";

const ShippingInfo = ({
  user,
  country,
  setCountry,
  city,
  setCity,
  userInfo,
  setUserInfo,
  address1,
  setAddress1,
  address2,
  setAddress2,
  zipCode,
  setZipCode,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900">
          Shipping Information
        </h3>
        <p className="text-gray-500 mt-1">Enter your shipping details</p>
      </div>

      <form className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              disabled
              value={user?.name}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-gray-50 text-blue-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              disabled
              value={user?.email}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5  bg-gray-50 text-blue-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="text"
              value={user?.phoneNumber}
              disabled
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Zip Code
            </label>
            <input
              type="text"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter zip code"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Country
            </label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">Select Country</option>
              {Country.getAllCountries().map((c) => (
                <option key={c.isoCode} value={c.isoCode}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              disabled={!country}
            >
              <option value="">Select City</option>
              {State.getStatesOfCountry(country).map((s) => (
                <option key={s.isoCode} value={s.isoCode}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address Line 1
            </label>
            <input
              type="text"
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Street address, P.O. box"
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
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Apartment, suite, unit, building, floor"
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={() => setUserInfo(!userInfo)}
            className="text-indigo-600 cursor-pointer hover:text-indigo-800 font-medium flex items-center transition-colors"
          >
            {userInfo ? "Hide saved addresses" : "Choose from saved addresses"}
            <IoIosArrowDown
              className={`ml-2 ${userInfo ? "transform rotate-180" : ""}`}
            />
          </button>

          {userInfo && (
            <div className="mt-3 space-y-2">
              {user?.addresses?.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="savedAddress"
                    id={`address-${index}`}
                    className="mt-1"
                    onClick={() => {
                      setAddress1(item.address1);
                      setAddress2(item.address2);
                      setZipCode(item.zipCode);
                      setCountry(item.country);
                      setCity(item.city);
                    }}
                  />
                  <label htmlFor={`address-${index}`} className="ml-3 block">
                    <span className="block font-medium text-gray-900">
                      {item.addressType}
                    </span>
                    <span className="block text-sm text-gray-500">
                      {item.address1}, {item.address2}, {item.city},{" "}
                      {item.country}, {item.zipCode}
                    </span>
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default ShippingInfo;
