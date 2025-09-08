import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "../../redux/actions/user.js";

const AdminProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      await dispatch(loadUser());
      setLoading(false);
    };

    if (!isAuthenticated && !user) {
      checkAuth();
    } else {
      setLoading(false);
    }
  }, [dispatch, isAuthenticated, user]);

  if (loading) return null;

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }


  return children;
};

export { AdminProtectedRoute };
