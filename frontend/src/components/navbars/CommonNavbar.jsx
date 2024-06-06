import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";
import { isAdmin } from "scripts/accountInfo";
import { isPatient } from "scripts/accountInfo";
import { isLogged } from "scripts/accountInfo";

const CommonNavbar = () => {
  const location = useLocation();
  const currentUrl = location.pathname;
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <>
      <Navbar className="navbar-top navbar-horizontal navbar-dark" expand="md">
        <Container className="px-4">
          <NavbarBrand to="/" tag={Link}>
            <img alt="..." src={require("../../assets/img/brand/logo2.png")} />
          </NavbarBrand>
          <button className="navbar-toggler" id="navbar-collapse-main">
            <span className="navbar-toggler-icon" />
          </button>
          <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
            <div className="navbar-collapse-header d-md-none">
              <Row>
                <Col className="collapse-brand" xs="6">
                  <Link to="/">
                    <img
                      alt="..."
                      src={require("../../assets/img/brand/logo2.png")}
                    />
                  </Link>
                </Col>
                <Col className="collapse-close" xs="6">
                  <button className="navbar-toggler" id="navbar-collapse-main">
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            <Nav className="ml-auto" navbar>
              {!currentUrl.includes("index") ? (
                <NavItem>
                  <NavLink
                    className="nav-link-icon"
                    to="/"
                    tag={Link}
                    onClick={handleGoBack}
                  >
                    <i className="ni ni-bold-left" />
                    <span className="nav-link-inner--text">
                      Back to previous page
                    </span>
                  </NavLink>
                </NavItem>
              ) : (
                <>
                  {isLogged() ? (
                    <>
                      <NavItem>
                        <NavLink
                          className="nav-link-icon"
                          to={
                            isPatient()
                              ? "/health/patient"
                              : isAdmin()
                              ? "/health/admin"
                              : "/health/doctor"
                          }
                          tag={Link}
                        >
                          <i className="fa fa-home" />
                          <span className="nav-link-inner--text">Home</span>
                        </NavLink>
                      </NavItem>
                    </>
                  ) : (
                    <>
                      <NavItem>
                        <NavLink
                          className="nav-link-icon"
                          to="/public/register-patient"
                          tag={Link}
                        >
                          <i className="ni ni-circle-08" />
                          <span className="nav-link-inner--text">Register</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className="nav-link-icon"
                          to="/public/login"
                          tag={Link}
                        >
                          <i className="ni ni-key-25" />
                          <span className="nav-link-inner--text">Login</span>
                        </NavLink>
                      </NavItem>

                      <NavItem>
                        <NavLink
                          className="nav-link-icon"
                          to="/common/search"
                          tag={Link}
                        >
                          <i className="ni ni-single-02" />
                          <span className="nav-link-inner--text">
                            Help desk
                          </span>
                        </NavLink>
                      </NavItem>
                    </>
                  )}
                </>
              )}
            </Nav>
          </UncontrolledCollapse>
        </Container>
      </Navbar>
    </>
  );
};

export default CommonNavbar;
