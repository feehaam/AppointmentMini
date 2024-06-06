import React from "react";
import { useLocation, Route, Routes, Navigate } from "react-router-dom";
import { Container } from "reactstrap";
import PublicFooter from "../components/navbars/LoggedNavbar";
import LoggedFooter from "../components/footers/LoggedFooter";
import Sidebar from "components/sidebar/Sidebar";
import routes from "routes.js";

const Logged = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/health") {
        return (
          <Route path={prop.path} element={prop.component} key={key} exact />
        );
      } else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props?.location?.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  return (
    <>
      <Sidebar
        {...props}
        routes={routes}
        logo={{
          innerLink: "/common/index",
          imgSrc: require("../assets/img/brand/logo3.png"),
          imgAlt: "...",
        }}
      />
      <div className="main-content" ref={mainContent}>
        <PublicFooter
          {...props}
          brandText={getBrandText(props?.location?.pathname)}
        />
        <Routes>
          {getRoutes(routes)}
          <Route path="*" element={<Navigate to="/health/index" replace />} />
        </Routes>
        <Container fluid>
          <LoggedFooter />
        </Container>
      </div>
    </>
  );
};

export default Logged;
