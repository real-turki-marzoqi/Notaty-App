import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { selectUserInfo, selectAuthStatus, selectAuthError } from "../Api/Features/Auth/authSelectors";
import { loginThunk } from "../Api/Features/Auth/authThunk";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from "react-router-dom";
import Loader from "../Components/utils/Loader";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const status = useSelector(selectAuthStatus);
  const error = useSelector(selectAuthError);
  const userInfo = useSelector(selectUserInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [localUserInfo, setLocalUserInfo] = useState({
    email: "",
    password: "",
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
    dispatch(loginThunk(localUserInfo));
  };

  useEffect(() => {
    if (status === "succeeded" ) {
      toast.success("Login successful!");
      navigate("/home");
    }
    if (status === "failed" && error) {
      error.forEach((err) => {
        toast.error(`${err.msg}`);
      });
    }
  }, [status, userInfo, error, navigate]);

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
            {status === "loading" ? (
              <Loader />
            ) : (
              <form
                className="form text-center"
                style={{ width: "100%", maxWidth: "400px" }}
                onSubmit={handleSubmit}
              >
                <p className="title">Login</p>
                <p className="message">Let's Do Something Perfect.</p>

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

                <button type="submit" className="submit">
                  Let's Go
                </button>
                <p className="signin">
                  Don't have an account? <a href="/register">Register</a>
                </p>
                <p className="signin">
                  <a style={{ color: "red" }} href="/forgotpassword">
                    Forgot My Password
                  </a>
                </p>
              </form>
            )}
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

export default Login;
