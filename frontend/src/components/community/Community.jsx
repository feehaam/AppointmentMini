import { Col, Container, Row } from "reactstrap";
import Post from "./Post";
import Status from "./Status";
import FAQ from "./FAQ";
import Articles from "./Articles";
import FirstAid from "./FirstAid";

const Community = () => {
  return (
    <>
      <>
        <div
          className="header pb-5 pt-5 pt-lg-8 d-flex align-items-center"
          style={{
            height: "100px",
            backgroundImage:
              "url(" + require("../../assets/img/cover/community1.png") + ")",
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
        >
          <span className="mask bg-gradient-default opacity-6" />
          <Container className="d-flex align-items-center" fluid>
            <Row>
              <h1 className="display-2 opacity-7" style={{ color: "white" }}>
                Community
              </h1>
            </Row>
          </Container>
        </div>
      </>
      <Container className="mt-4" fluid>
        <Row>
          <Col className="order-xl-1" xl="6">
            <Post />
            <h2 className="m-3">Community Feeds</h2>
            <Status />
            <h2 className="m-3">Frequently Asked Questions</h2>
            <FAQ />
          </Col>

          <Col className="order-xl-1" xl="6">
            <h2 className="m-3">
              Articles Written by Healthcare Professionals{" "}
            </h2>
            <Articles />
            <h2 className="m-3">First AIDs</h2>
            <FirstAid />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Community;
