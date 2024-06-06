import React, { useEffect, useState } from "react";

import { useLocation, Route, Routes, Navigate } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import PublicNavbar from "components/navbars/PublicNavbar";
import PublicFooter from "components/footers/PublicFooter";

import routes from "routes.js";

const Public = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  // Add a state variable to store the window height
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    // Update the window height when the window is resized
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    // Add an event listener for window resize
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    document.body.classList.add("bg-default");
    return () => {
      document.body.classList.remove("bg-default");
    };
  }, []);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/public") {
        return (
          <Route path={prop.path} element={prop.component} key={key} exact />
        );
      } else {
        return null;
      }
    });
  };

  return (
    <>
      <div className="main-content" ref={mainContent}>
        <PublicNavbar />
        <div className="header bg-gradient-info py-7 py-lg-8">
          <div className="separator separator-bottom separator-skew zindex-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="fill-default"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div>
        </div>
        {/* Use CSS to set minHeight as a percentage of window height */}
        <Container
          className="mt--8 pb-5"
          style={{ minHeight: `${windowHeight * 0.8}px` }}
        >
          <Row className="justify-content-center">
            <Routes>
              {getRoutes(routes)}
              <Route
                path="*"
                element={<Navigate to="/public/login" replace />}
              />
            </Routes>
          </Row>
        </Container>
      </div>
      <PublicFooter />
    </>
  );
};

export default Public;
