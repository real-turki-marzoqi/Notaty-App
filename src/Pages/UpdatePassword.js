import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import NavBar from "../Components/utils/NavBar";
import changePasswordImage from "../Images/Reset password-rafiki.png";
import { useDispatch, useSelector } from "react-redux";
import { updateUserPasswordThunk } from "../Api/Features/User/userThunk";
import {
  selectUpdateUserPasswordStatus,
  selectUpdateUserPasswordError,
} from "../Api/Features/User/userSelectors";
import { resetUpdateUserPasswordStatus } from "../Api/Features/User/userSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logout } from "../Api/Features/Auth/AuthSlice";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const updatePasswordStatus = useSelector(selectUpdateUserPasswordStatus);
  const updatePasswordError = useSelector(selectUpdateUserPasswordError);

  const handleUpdatePassword = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (newPassword.length < 6 || confirmPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    dispatch(
      updateUserPasswordThunk({
        currentPassword,
        newPassword,
        passwordConfirm: confirmPassword,
      })
    );
  };

  useEffect(() => {
    if (updatePasswordStatus === "succeeded") {
      toast.success("Password updated successfully");

      setTimeout(() => {
        dispatch(logout());
        navigate("/login");
      }, 3000);

      dispatch(resetUpdateUserPasswordStatus());
    } else if (updatePasswordStatus === "failed") {
      if (updatePasswordError && updatePasswordError.errors) {
        updatePasswordError.errors.forEach((err) => {
          toast.error(err.msg);
        });
      } else {
        toast.error("Inccorect Current Password ");
      }
      dispatch(resetUpdateUserPasswordStatus());
    }
  }, [updatePasswordStatus, updatePasswordError, dispatch, navigate]);

  return (
    <div>
      <NavBar />
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <form className="update-Password-form" onSubmit={handleUpdatePassword}>
          <div className="update-Password-title">
            <i className="fa-solid fa-lock"></i>
            <br />
            <span>Change Password</span>
          </div>

          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
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
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input"
            required
          />

          <button type="submit" className="update-Password-button-confirm">
            {updatePasswordStatus === "loading" ? "Updating..." : "Update→"}
          </button>
        </form>
        <Row>
          <img
            style={{ maxWidth: "300px" }}
            src={changePasswordImage}
            alt="Change Password"
          />
        </Row>
      </Container>
    </div>
  );
};

export default UpdatePassword;
