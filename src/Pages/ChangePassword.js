import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectResetPasswordStatus, selectResetPasswordError } from "../Api/Features/Auth/authSelectors";
import { resetPasswordThunk } from "../Api/Features/Auth/authThunk";
import { resetResetPasswordStatus } from "../Api/Features/Auth/AuthSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const ChangePassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const resetPasswordStatus = useSelector(selectResetPasswordStatus);
  const resetPasswordError = useSelector(selectResetPasswordError);

  const handleResetPassword = (e) => {
    e.preventDefault();
    dispatch(resetPasswordThunk({ email, newPassword }));
  };

  useEffect(() => {
    if (resetPasswordStatus === "succeeded") {
      toast.success("Password reset successfully");
      dispatch(resetResetPasswordStatus());
      navigate("/"); // تحويل المستخدم إلى صفحة تسجيل الدخول
    } else if (resetPasswordStatus === "failed") {
      toast.error(resetPasswordError || "Failed to reset password");
      dispatch(resetResetPasswordStatus());
    }
  }, [resetPasswordStatus, resetPasswordError, dispatch, navigate]);

  return (
    <div>
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <form className="update-Password-form" onSubmit={handleResetPassword}>
          <div className="update-Password-title">
            <i className="fa-solid fa-lock"></i><br />
            <span>Reset Your Password</span>
          </div>

          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            required
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="input"
            required
          />

          <button type="submit" className="update-Password-button-confirm">
            {resetPasswordStatus === "loading" ? "Updating..." : "Update→"}
          </button>
        </form>
      </Container>
    </div>
  );
};

export default ChangePassword;
