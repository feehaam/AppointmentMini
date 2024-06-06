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
      AxiosInstance.get("http://localhost:7600/notifications/unseen-count")
        .then((response) => {
          setNotification(response.data);
        })
        .catch((error) => {
          console.error("Error fetching notifications:", error);
        });
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
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            to="/"
          >
            EA Healthcare - your health, our concern
          </Link>
          <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
            <FormGroup className="mb-0">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fas fa-search" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Search"
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  onKeyPress={handleSearchKeyPress}
                />
              </InputGroup>
            </FormGroup>
          </Form>
          <div
            style={{ position: "relative", display: "inline-block" }}
            onClick={() => {
              navigate("/health/notifications");
            }}
          >
            <i
              className="fa-solid fa-bell text-xl"
              style={{ color: "#ffbe4d", cursor: "pointer" }}
            ></i>
            {notification > 0 && (
              <div
                style={{
                  position: "absolute",
                  bottom: "0.5rem",
                  right: "0.5rem",
                  backgroundColor: "red",
                  color: "white",
                  borderRadius: "50%",
                  padding: "0.1rem 0.3rem",
                  fontSize: "0.7rem",
                  cursor: "pointer",
                }}
              >
                {notification}
              </div>
            )}
          </div>
          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  {renderUserPhoto()}
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">
                      {userData.firstName} {userData.lastName}
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem to="/health/settings" tag={Link}>
                  <i class="fa fa-cog" aria-hidden="true"></i>
                  <Link to={"/health/settings"}>
                    <span>Settings</span>
                  </Link>
                </DropdownItem>
                <DropdownItem to="/health/logout" tag={Link}>
                  <i class="fa fa-sign-out" aria-hidden="true"></i>
                  <Link to={"/health/logout"}>
                    <span>Lougout</span>
                  </Link>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default LoggedNavbar;
