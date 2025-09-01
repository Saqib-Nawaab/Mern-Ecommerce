import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../../server.js";
const SellerActivation = () => {
  const { activation_token } = useParams();
  const [status, setStatus] = useState("loading");
  const isCalled = useRef(false);

  const activationEmail = async () => {
    setStatus("loading");
    try {
      const res = await axios.post(`${server}/seller/activation-seller`, {
        activation_token,
      });

      if (res.data.success) {
        toast.success(res.data.message || "Account activated successfully!");
        setStatus("success");
      } else if (res.data.message?.includes("already")) {
        setStatus("already");
      } else {
        setStatus("error");
      }
    } catch (err) {
      const message = err.response?.data?.message;
      if (message?.includes("already")) {
        setStatus("already");
      } else if (message?.includes("expired") || message?.includes("invalid")) {
        setStatus("expired");
      } else {
        setStatus("error");
      }
    }
  };

  useEffect(() => {
    if (activation_token && !isCalled.current) {
      isCalled.current = true;
      activationEmail();
    }
  }, [activation_token]);

  const getMessage = () => {
    switch (status) {
      case "loading":
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                border: "4px solid #f3f3f3",
                borderTop: "4px solid #2563eb",
                borderRadius: "50%",
                width: "20px",
                height: "20px",
                animation: "spin 1s linear infinite",
              }}
            />
            <p style={{ fontSize: "16px", color: "#555", fontWeight: "500" }}>
              Verifying your account. Please wait...
            </p>
          </div>
        );
      case "success":
        return (
          <p style={{ color: "#16a34a", fontSize: "16px", fontWeight: "500" }}>
            Your seller account has been activated successfully!
          </p>
        );
      case "already":
        return (
          <p style={{ color: "#2563eb", fontSize: "16px", fontWeight: "500" }}>
            ℹ️ This seller account is already activated. Please log in.
          </p>
        );
      case "expired":
        return (
          <p style={{ color: "#dc2626", fontSize: "16px", fontWeight: "500" }}>
            Activation link expired. Please register again.
          </p>
        );
      case "error":
      default:
        return (
          <p style={{ color: "#dc2626", fontSize: "16px", fontWeight: "500" }}>
            Activation failed. Please try again.
          </p>
        );
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f6f8",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>

      <div
        style={{
          backgroundColor: "#fff",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          maxWidth: "500px",
          width: "100%",
        }}
      >
        <h1
          style={{
            color: "#2563eb",
            marginBottom: "20px",
            fontSize: "28px",
          }}
        >
          Account Activation
        </h1>
        {getMessage()}
      </div>
    </div>
  );
};

export default SellerActivation;
