import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, getStripeApiKey } from "./redux/actions/user";
import { loadSeller } from "./redux/actions/seller.js";
import Loading from "./components/Loading/Loading.jsx";

import UserRoutes from "./Routes/UserRoutes/UserRoutes.jsx";
import SellerRoutes from "./Routes/SellerRoutes/SellerRoutes.jsx";
import AdminRoutes from "./Routes/AdminRoutes/AdminRoutes.jsx";

const App = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);
  const { isLoading } = useSelector((state) => state.seller);
  useEffect(() => {
    if (
      !location.pathname.startsWith("/activate") &&
      !location.pathname.startsWith("/seller/activation-seller")
    ) {
      dispatch(loadUser());
      dispatch(getStripeApiKey());
      dispatch(loadSeller());
    }
  }, [dispatch]);

  if (loading || isLoading) return <Loading />;

  return (
    <BrowserRouter>
      <Routes>
        {UserRoutes}
        {SellerRoutes}
        {AdminRoutes}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
