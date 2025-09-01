import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { loadSeller } from "../../redux/actions/seller.js";

const SellerProtectedRoute = ({ children }) => {
  const { isSellerAuthenticated, seller } = useSelector(
    (state) => state.seller
  );
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (!isSellerAuthenticated && !seller) {
      dispatch(loadSeller());
    }
  }, [dispatch, isSellerAuthenticated, seller]);

  if (!isSellerAuthenticated) {
    return <Navigate to="/seller-login" state={{ from: location }} replace />;
  }

  return children;
};

export { SellerProtectedRoute };
