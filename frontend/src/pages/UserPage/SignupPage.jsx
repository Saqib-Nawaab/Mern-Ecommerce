import React from "react";
import Signup from "../../components/Signup/Signup.jsx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function SignupPage() {

  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);


  return (
    <div>
      <Signup />
    </div>
  );
}

export default SignupPage;
