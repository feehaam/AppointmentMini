import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Media,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import AxiosInstance from "scripts/axioInstance";
import { isLogged } from "scripts/accountInfo";

const LoggedNavbar = (props) => {
  const navigate = useNavigate();
  const [notification, setNotification] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  if (!isLogged) {
    navigate("/");
  }
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    photoURL: null,
  });

  useEffect(() => {
    const fetchUserData = () => {
      let url;
      const userId = localStorage.getItem("userId");
      if (userId === null) return;
      if (userId[0] === "P")
        url = "http://localhost:7100/patients/minimal-info/" + userId;
      else if (userId[0] === "D")
        url = "http://localhost:7200/doctors/minimal-info/" + userId;
      else url = "http://localhost:5100/access/minimal-info/" + userId;

      AxiosInstance.get(url)
        .then((response) => {
          setUserData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    };

    // Fetch user data initially
    fetchUserData();

    // Set up interval to fetch notifications every 3 seconds
    const intervalId = setInterval(() => {
      
    }, 3000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run only once when the component mounts

  const renderUserPhoto = () => {
    if (userData.photoURL) {
      return (
        <span className="avatar avatar-sm rounded-circle">
          <img alt="User" src={userData.photoURL} />
        </span>
      );
    } else {
      return (
        <span className="avatar avatar-sm rounded-circle">
          <FontAwesomeIcon icon={faUserCircle} />
        </span>
      );
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter") {
      navigate(`/common/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Link
            className="h1 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            to="/"
          >
            EA Healthcare - your health, our concern
          </Link>
        </Container>
      </Navbar>
    </>
  );
};

export default LoggedNavbar;
