import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { forgotPasswordThunk } from "../Api/Features/Auth/authThunk";
import { selectForgotPasswordStatus, selectForgotPasswordError } from "../Api/Features/Auth/authSelectors";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const forgotPasswordStatus = useSelector(selectForgotPasswordStatus);
  const forgotPasswordError = useSelector(selectForgotPasswordError);

  const handleForgotPassword = (e) => {
    e.preventDefault();
    dispatch(forgotPasswordThunk({ email }));
  };

  useEffect(() => {
    if (forgotPasswordStatus === "succeeded") {
      toast.success("Code sent successfully! Please check your email.");
      setTimeout(() => {
        navigate("/resetCode");
      }, 3000); // الانتظار لمدة 3 ثوانٍ قبل التوجيه
    } else if (forgotPasswordStatus === "failed") {
      toast.error(forgotPasswordError || "Failed to send the code. Please try again.");
    }
  }, [forgotPasswordStatus, forgotPasswordError, navigate]);

  return (
    <div>
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
        <form className="update-Password-form" onSubmit={handleForgotPassword}>
          <div className="update-Password-title">
            <i className="fa-solid fa-lock"></i><br />
            <span>Forgot Password</span>
          </div>
          <input
            type="email"
            placeholder="Enter Your Email"
            name="email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="update-Password-button-confirm">Send Code →</button>
        </form>
      </Container>
    </div>
  );
};

export default ForgotPassword;
