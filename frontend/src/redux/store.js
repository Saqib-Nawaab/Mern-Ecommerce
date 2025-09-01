import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user.js";
import { sellerReducer } from "./reducers/seller.js";
import { productReducer } from "./reducers/product.js";
import { eventReducer } from "./reducers/event.js";
import { couponReducer } from "./reducers/coupon.js";
import { cartReducer } from "./reducers/cart.js";
import { wishlistReducer } from "./reducers/heart.js";
import { orderReducer } from "./reducers/order.js";
import profileReducer from "./reducers/profile.js";

const store = configureStore({
  reducer: {
    user: userReducer,
    seller: sellerReducer,
    product: productReducer,
    event: eventReducer,
    coupon: couponReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    order: orderReducer,
    profile: profileReducer,
  },
});

export default store;
