import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectVerifyResetCodeStatus, selectVerifyResetCodeError } from "../Api/Features/Auth/authSelectors";
import { verifyResetCodeThunk } from "../Api/Features/Auth/authThunk";
import { resetVerifyResetCodeStatus } from "../Api/Features/Auth/AuthSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VerifyResetCode = () => {
  const [resetCode, setResetCode] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const verifyResetCodeStatus = useSelector(selectVerifyResetCodeStatus);
  const verifyResetCodeError = useSelector(selectVerifyResetCodeError);

  const handleVerifyCode = (e) => {
    e.preventDefault();
    dispatch(verifyResetCodeThunk(resetCode));
  };

  useEffect(() => {
    if (verifyResetCodeStatus === "succeeded") {
      toast.success("Code verified successfully!");
      dispatch(resetVerifyResetCodeStatus());
      navigate("/changepassword"); // تحويل المستخدم لصفحة إعادة تعيين كلمة المرور
    } else if (verifyResetCodeStatus === "failed") {
      toast.error(verifyResetCodeError || "Failed to verify code");
      dispatch(resetVerifyResetCodeStatus());
    }
  }, [verifyResetCodeStatus, verifyResetCodeError, dispatch, navigate]);

  return (
    <div>
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
        <form className="update-Password-form" onSubmit={handleVerifyCode}>
          <div className="update-Password-title">
            <i className="fa-solid fa-lock"></i>
            <br />
            <span>Verify Reset Code</span>
          </div>

          <input
            type="text"
            placeholder="Your Reset Code"
            name="resetCode"
            className="input"
            value={resetCode}
            onChange={(e) => setResetCode(e.target.value)}
            required
          />

          <button type="submit" className="update-Password-button-confirm">
            {verifyResetCodeStatus === "loading" ? "Verifying..." : "Confirm →"}
          </button>
        </form>
      </Container>
    </div>
  );
};

export default VerifyResetCode;
