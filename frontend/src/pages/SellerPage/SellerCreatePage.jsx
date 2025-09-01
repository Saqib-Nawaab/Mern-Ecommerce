import React from 'react'
import SellerCreate from '../../components/Seller/SellerAuth/SellerCreate.jsx';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function SellerCreatePage() {

  const { isSellerAuthenticated, seller } = useSelector((state) => state.seller);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSellerAuthenticated) {
      navigate(`/seller/${seller._id}`, { replace: true });
    }
  }, [isSellerAuthenticated]);


  return (
    <div>
        <SellerCreate/>
    </div>
  )
}

export default SellerCreatePage