import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import SellerLogin from '../../components/Seller/SellerAuth/SellerLogin.jsx';

function SellerLoginPage() {
  const { isSellerAuthenticated } = useSelector((state) => state.seller);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/seller/:id";

  useEffect(() => {
    if (isSellerAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isSellerAuthenticated, navigate, from]);

  return (
    <div>
      <SellerLogin />
    </div>
  );
}

export default SellerLoginPage;
