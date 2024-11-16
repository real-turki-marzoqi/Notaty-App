import React, { useState, useEffect } from "react";
import { Col, Container, Row, Modal, Form, Button, Alert } from "react-bootstrap";
import NavBar from "../Components/utils/NavBar";
import SettingImage from "../Images/Settings-bro.png";
import { getUserProfileThunk, updateUserProfileThunk } from '../Api/Features/User/userThunk';
import { selectUserData, selectGetUserDataStatus, selectGetUserDataError, selectupdateUserDataStatus, selectUpdateUserDataError } from '../Api/Features/User/userSelectors';
import { useSelector, useDispatch } from "react-redux";
import Loader from '../Components/utils/Loader';
import { resetUpdateUserProfileStatus } from "../Api/Features/User/userSlice";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserProfile = () => {
  const [localUserData, setLocalUserData] = useState({ userName: "", email: "" });
  const [showEditModal, setShowEditModal] = useState(false);
  
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);
  const userGetDataStatus = useSelector(selectGetUserDataStatus);
  const userGetDataError = useSelector(selectGetUserDataError);
  const userUpdateDataStatus = useSelector(selectupdateUserDataStatus);
  const userUpdateDataError = useSelector(selectUpdateUserDataError);

  useEffect(() => {
    if (userGetDataStatus === 'idle') {
      dispatch(getUserProfileThunk());
    }
  }, [userGetDataStatus, dispatch]);

  useEffect(() => {
    if (userGetDataStatus === 'succeeded' && userData) {
      const { username, email } = userData.data;
      setLocalUserData({
        userName: username || "No Username Available",
        email: email || "No Email Available"
      });
    }
  }, [userGetDataStatus, userData]);

  useEffect(() => {
    if (userUpdateDataStatus === "succeeded") {
      toast.success("User data updated successfully!");
      dispatch(resetUpdateUserProfileStatus());
      setShowEditModal(false);
    } else if (userUpdateDataStatus === "failed") {
      toast.error(userUpdateDataError || "Failed to update user data.");
      dispatch(resetUpdateUserProfileStatus());
    }
  }, [userUpdateDataStatus, userUpdateDataError, dispatch]);

  const handleEdit = () => setShowEditModal(true);
  const handleClose = () => {
    setShowEditModal(false);
    dispatch(resetUpdateUserProfileStatus());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSaveChanges = () => {
    const updatedData = {
      username: localUserData.userName, 
      email: localUserData.email
    };

    dispatch(updateUserProfileThunk(updatedData));
  };
  
  if(userGetDataError){

    return <Alert>Failed to get User Data :{userGetDataError}</Alert>
  }

  return (
    <div>
      <NavBar />
      {userGetDataStatus === "loading" ? (
        <Loader />
      ) : (
        <Container
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ minHeight: "80vh" }}
        >
          <Row className="justify-content-center">
            <Col xs={12} md={8} lg={6}>
              <div
                className="profile-card p-2"
                style={{
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                  borderRadius: "8px",
                  marginTop: "3vh",
                }}
              >
                <div className="content text-center">
                  <button className="UserProfile-edit-btn" onClick={handleEdit}>
                    <span className="UserProfile-transition"></span>
                    <span className="UserProfile-gradient"></span>
                    <span className="UserProfile-label">Edit</span>
                  </button>
                  <p className="para">{localUserData.userName}</p>
                  <p className="para">{localUserData.email}</p>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-end w-100 mt-3">
            <Col xs={6} md={4} lg={3} className="d-flex justify-content-start">
              <img
                src={SettingImage}
                style={{ width: "100%", height: "auto" }}
                alt="Settings"
              />
            </Col>
          </Row>
        </Container>
      )}

      {/* Edit Profile Modal */}
      <Modal  className="Update-model" show={showEditModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formUserName">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="userName"
                value={localUserData.userName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formEmail" className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={localUserData.email}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
          {userUpdateDataStatus === "failed" && (
            <p className="text-danger mt-2">{userUpdateDataError}</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveChanges} disabled={userUpdateDataStatus === "loading"}>
            {userUpdateDataStatus === "loading" ? "Saving..." : "Save Changes"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserProfile;
