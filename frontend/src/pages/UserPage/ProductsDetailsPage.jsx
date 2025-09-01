import React, { useEffect, useState } from "react";
import Header from "../../components/Layout/Header/Header.jsx";
import Footer from "../../components/Layout/Footer/Footer.jsx";
import ProductsDetails from "../../components/Products/ProductsDetails/ProducstDetails.jsx";
import RelateProducts from "../../components/Products/RelateProducts/RelateProducts.jsx";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsUser } from "../../redux/actions/product.js";
import { getAllEvents } from "../../redux/actions/event.js";
import Loading from "../../components/Loading/Loading.jsx";

function ProductsDetailsPage() {
  const { name } = useParams();
  const [data, setData] = useState(null);
  const productName = name.replace(/-/g, " ");
  const [searchParams] = useSearchParams();
  const eventData = searchParams.get("isEvent");

  const { product } = useSelector((state) => state.product);
  const { event, isLoading } = useSelector((state) => state.event);
  const dispatch = useDispatch();

  useEffect(() => {
    if (eventData) {
      dispatch(getAllEvents());
    } else {
      dispatch(getAllProductsUser());
    }
  }, [dispatch, eventData]);

  const allProductsData = Array.isArray(product?.message)
    ? [...product.message]
    : [];

  useEffect(() => {
    if (eventData) {
      if (event?.message?.length) {
        const found = event.message.find(
          (eventItem) =>
            eventItem.name.toLowerCase().trim() ===
            productName.toLowerCase().trim()
        );
        setData(found || null);
      }
    } else {
      if (allProductsData.length) {
        const found = allProductsData.find(
          (product) =>
            product.name.toLowerCase().trim() ===
            productName.toLowerCase().trim()
        );
        setData(found || null);
      }
    }
  }, [productName, event?.message, allProductsData, eventData]);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <Header />
          <ProductsDetails data={data} />
          {!eventData && data && <RelateProducts data={data} />}
          {eventData && data && <RelateProducts data={data} />}
        </div>
      )}
    </div>
  );
}

export default ProductsDetailsPage;
