import React from "react";
import Header from "../../components/Layout/Header/Header.jsx";
import Footer from "../../components/Layout/Footer/Footer.jsx";
import styles from "../../styles/Styles.js";
import { AiOutlineArrowRight, AiOutlinePlus } from "react-icons/ai";
import Faq from "../../components/Faq/Faq.jsx";
function FaqPage() {
  return (
    <div>
      <Header activeHeading={5} />

      <div className={`${styles.section} my-8`}>
        <h2 className="text-center text-3xl font-bold mb-4 text-gray-700">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-gray-500 mb-8 max-w-xl mx-auto">
          Have questions? We’ve got answers to the most common queries about our
          online shopping experience.
        </p>
        <div className="max-w-2xl mx-auto">
          <Faq />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default FaqPage;
