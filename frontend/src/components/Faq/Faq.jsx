import React, { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

function FaqItem({ question, answer, isActive, onClick }) {
  return (
    <div className="bg-white border border-gray-200 rounded-md mb-2 ">
      <button
        className="w-full cursor-pointer flex justify-between items-center p-4 text-left hover:bg-gray-50 transition-colors"
        onClick={onClick}
      >
        <span className="text-base font-medium text-gray-700">{question}</span>
        {isActive ? (
          <AiOutlineMinus size={20} className="text-gray-500 transition-transform duration-300" />
        ) : (
          <AiOutlinePlus size={20} className="text-gray-500 transition-transform duration-300" />
        )}
      </button>
      {isActive && (
        <div className="px-4 pb-4 text-sm text-gray-600 cursor-pointer">{answer}</div>
      )}
    </div>
  );
}

function Faq() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleTab = (index) =>
    setActiveIndex(activeIndex === index ? null : index);

  const faqData = [
    {
      question: "What is your return policy?",
      answer:
        "Our return policy allows for returns within 30 days of purchase. Items must be unused and in original packaging.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary based on the destination.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once your order has shipped, you will receive a tracking number via email. You can use it to check the delivery status on our website.",
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "We accept all major credit cards, PayPal, Stripe, and cash on delivery for select locations.",
    },
    {
      question: "Is my personal and payment information secure?",
      answer:
        "Yes, we use SSL encryption and trusted payment gateways to ensure your personal and payment information remains safe and secure.",
    },
    {
      question: "How can I contact customer support?",
      answer:
        "You can reach our customer support team via email at support@example.com.",
    },
    {
      question: "Do you offer gift cards?",
      answer:
        "Yes, we offer gift cards in various denominations. They can be purchased directly from our website.",
    },
    {
      question: "Can I use multiple discount codes?",
      answer: "No, only one discount code can be applied per order.",
    },
  ];

  return (
    <div className="max-w-2xl mx-auto p-4">
      {faqData.map((item, index) => (
        <FaqItem
          key={index}
          question={item.question}
          answer={item.answer}
          isActive={activeIndex === index}
          onClick={() => toggleTab(index)}
        />
      ))}
    </div>
  );
}

export default Faq;
