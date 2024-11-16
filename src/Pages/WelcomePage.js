/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import note from "../Images/Notes-bro (3).png";
import { Link } from "react-router-dom";

const WelcomePage = () => {
  return (
    <Container fluid style={{ padding: 0 }}>
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
          <Container className="text-center">
            <div className="glitch-wrapper">
              <div className="glitch" data-glitch="Notaty">
                Notaty
              </div>
            </div>
            <img
              className="responsive-image"
              src={note}
              alt="Note Illustration"
            />
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
        >
          <div className="welcome-btn-sub">
            <Link to={"/login"}>
              <div
                className="btn-glitch-fill"
                style={{
                  backgroundColor: "#feffff",
                  color: "#4b3775",
                  marginBottom: "20px",
                }}
              >
                <span class="text">// Login</span>
                <span class="text-decoration"> _</span>
                <span class="decoration">⇒</span>
              </div>
            </Link>

            <Link to={"/register"}>
              <div
                className="btn-glitch-fill"
                style={{
                  backgroundColor: "#feffff",
                  color: "#4b3775",
                  marginBottom: "20px",
                }}
              >
                <span class="text">// Register</span>
                <span class="text-decoration"> _</span>
                <span class="decoration">⇒</span>
              </div>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default WelcomePage;
