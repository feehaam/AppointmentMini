import {
  Button,
  Col,
  Row,
} from "reactstrap";
import Purpose from "./Purpose";
import Patients from "./Patients";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Index = (props) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
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

      

      <Patients />

      <Row className="align-items-center">
        <Col>
          <Row>
            <Col>
              <div>
                <h1
                  style={{
                    color: "white",
                    textShadow: "2px 2px 4px #888888",
                    borderBottom: "1px solid gray",
                  }}
                >
                  Experience Convenient Healthcare with Telemedicine
                </h1>
                <p
                  style={{ color: "white", textShadow: "2px 2px 4px #888888" }}
                >
                  Explore our advanced in-person and telemedicine services that bring
                  healthcare to your fingertips. Connect with our skilled
                  medical professionals from the comfort of your home, ensuring
                  timely and accessible medical consultations. Embrace the
                  future of healthcare with our secure and user-friendly
                  telemedicine platform
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <Col>
                <Link to={"/health/appointment"}>
                  <Button className="m-2">
                    Book an appointment
                  </Button>
                </Link>
              </Col>
            </Col>
          </Row>
        </Col>
        <Col>
          <img src={require("../../assets/img/home/tele2.png")} alt="Doctors" />
        </Col>
      </Row>
      <Row className="align-items-center">
        <Col>
          <img
            src={require("../../assets/img/home/commu1.png")}
            alt="Doctors"
          />
        </Col>
        <Col>
          <Row>
            <Col>
              <div>
                <h1
                  style={{
                    color: "white",
                    textShadow: "2px 2px 4px #888888",
                    borderBottom: "1px solid gray",
                  }}
                >
                  Join Our Supportive Healthcare Community
                </h1>
                <p
                  style={{ color: "white", textShadow: "2px 2px 4px #888888" }}
                >
                  Our healthcare community is a space where people from all over 
                  the places takes benefits from smart treatment and health 
                  advising, fostering a
                  sense of connection and empowerment on the journey to optimal
                  health.
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <Col>
                <Link to={"/public/register-patient"}>
                  <Button className="m-2">Create an account</Button>
                </Link>
              </Col>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="align-items-center">
        <Col>
          <Row>
            <Col>
              <div>
                <h1
                  style={{
                    color: "white",
                    textShadow: "2px 2px 4px #888888",
                    borderBottom: "1px solid gray",
                  }}
                >
                  Get treatment from our highly skilled doctors
                </h1>
                <p
                  style={{ color: "white", textShadow: "2px 2px 4px #888888" }}
                >
                  Are you a doctor? Willing to join our skilled community of the physicians? Join and start treating people in person and through telemedicine media!
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <Col>
                <Link to={"/public/register-doctor"}>
                  <Button className="m-2">Join as a doctor</Button>
                </Link>
              </Col>
            </Col>
          </Row>
        </Col>
        <Col>
          <img src={require("../../assets/img/home/docs1.png")} alt="Doctors" />
        </Col>
      </Row>
    </>
  );
};

export default Index;
