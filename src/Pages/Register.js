import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUserInfo,
  selectAuthStatus,
  selectAuthError,
} from "../Api/Features/Auth/authSelectors";
import { signupThunk } from "../Api/Features/Auth/authThunk";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/utils/Loader";

const Register = () => {
  const userInfo = useSelector(selectUserInfo);
  const status = useSelector(selectAuthStatus);
  const error = useSelector(selectAuthError);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [localUserInfo, setLocalUserInfo] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalUserInfo({
      ...localUserInfo,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signupThunk(localUserInfo));
  };

  useEffect(() => {
    if (status === "succeeded" && userInfo) {
      toast.success("Registration successful!");
      navigate("/login");
    }

    if (status === "failed" && error) {
      error.forEach((err) => {
        toast.error(`${err.msg}`);
      });
    }
  }, [status, userInfo, error]);

  return (
    <Container fluid style={{ padding: 0 }}>
      <ToastContainer />

      <Row style={{ width: "100vw", height: "100vh", margin: 0 }}>
        <Col
          xl={7}
          lg={7}
          md={7}
          sm={12}
          xs={12}
          style={{
            backgroundColor: "#EEEEEE",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
          }}
        >
          <Container
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100%" }}
          >
            <form
              className="form text-center"
              style={{ width: "100%", maxWidth: "400px" }}
              onSubmit={handleSubmit}
            >
              <p className="title">Register</p>
              <p className="message">
                Signup now and get full access to Notaty App.
              </p>

              <label>
                <input
                  className="input"
                  type="text"
                  name="username"
                  placeholder=""
                  required
                  value={localUserInfo.username}
                  onChange={handleChange}
                />
                <span>Username</span>
              </label>

              <label>
                <input
                  className="input"
                  type="email"
                  name="email"
                  placeholder=""
                  required
                  value={localUserInfo.email}
                  onChange={handleChange}
                />
                <span>Email</span>
              </label>

              <label>
                <input
                  className="input"
                  type="password"
                  name="password"
                  placeholder=""
                  required
                  value={localUserInfo.password}
                  onChange={handleChange}
                />
                <span>Password</span>
              </label>

              <label>
                <input
                  className="input"
                  type="password"
                  name="passwordConfirm"
                  placeholder=""
                  required
                  value={localUserInfo.passwordConfirm}
                  onChange={handleChange}
                />
                <span>Confirm Password</span>
              </label>

              <button
                className="submit"
                type="submit"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Registering..." : "Let's Go"}
              </button>

              <p className="signin">
                Already have an account? <a href="login">Login</a>
              </p>
              {status === "loading" ? <Loader /> : ""}
            </form>
          </Container>
        </Col>

        <Col
          xl={5}
          lg={5}
          md={5}
          sm={12}
          xs={12}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
          }}
          className="welcom-login"
        ></Col>
      </Row>
    </Container>
  );
};

export default Register;
