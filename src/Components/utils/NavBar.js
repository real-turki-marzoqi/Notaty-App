/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import logo from "../../Images/NotatyLogo.png";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Link,useNavigate } from "react-router-dom";
import { logout} from '../../Api/Features/Auth/AuthSlice'
import { useDispatch } from "react-redux";

const NavBar = () => {
  const [username, setUsername] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
  
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogOut = ()=>{

    dispatch(logout())
    navigate("/login");
    
  }

  return (
    <div className="navBar ">
      <Container>
        <Row>
          <Col className="logoCol">
            <Link to={"/home"}>
              <img style={{ height: "80px" }} src={logo} />
            </Link> 
          </Col>

          <Col className="navBarCols">
            <h6>{username}</h6> 

            <DropdownButton
              className="logo-drop-down"
              variant=""
              id="dropdown-basic-button"
              title={<i className="fa-solid fa-gears logo-setting-icon"></i>}
            >
              <Link to={'/profile'}>
                <Dropdown.Item as="span">Profile</Dropdown.Item>
              </Link>
             
              <Link to={'/updatepassword'}>
                <Dropdown.Item as="span">Update Password</Dropdown.Item>
              </Link>
              
                <Dropdown.Item onClick={handleLogOut} as="span">Logout <i class="fa-solid fa-right-from-bracket"></i></Dropdown.Item>
           
            </DropdownButton>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NavBar;
