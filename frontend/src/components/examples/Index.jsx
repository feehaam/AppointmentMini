import {
  Button,
  Col,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
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
      <Purpose />
      <div
        style={{
          width: "100%",
          textAlign: "center",
          padding: "20px 0",
        }}
      >
        <div style={{ backgroundColor: "green", display: "inline-block" }}>
          <InputGroup className="input-group-alternative">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i style={{ color: "#777" }} className="fas fa-search" />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              style={{ backgroundClip: "gray", width: "700px" }}
              placeholder="Need help? Search anything here!"
              type="text"
              value={searchQuery}
              onChange={handleSearchInputChange}
              onKeyPress={handleSearchKeyPress}
            />
          </InputGroup>
        </div>
      </div>

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
                  Our team of highly skilled doctors, specializing in various
                  fields, is dedicated to providing exceptional care. With
                  expertise in specific medical domains, we ensure personalized
                  and effective treatments for our patients.
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <Col>
                <Link to={"/health/appointment"}>
                  <Button className="m-2">See all doctors</Button>
                </Link>
              </Col>
            </Col>
          </Row>
        </Col>
        <Col>
          <img src={require("../../assets/img/home/docs1.png")} alt="Doctors" />
        </Col>
      </Row>

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
                  Explore our advanced telemedicine services that bring
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
                    See all telemedicine schedules
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
                  Discover a community-driven approach to health and well-being.
                  Engage with fellow members, share experiences, and access
                  valuable resources. Our healthcare community is a space where
                  individuals come together to support one another, fostering a
                  sense of connection and empowerment on the journey to optimal
                  health.
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <Col>
                <Link to={"/health/community"}>
                  <Button className="m-2">Explore the community!</Button>
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
                  Unlock Your Understanding On Medicines: Medicine Encyclopedia
                </h1>
                <p
                  style={{ color: "white", textShadow: "2px 2px 4px #888888" }}
                >
                  Dive into a comprehensive Medicine Encyclopedia offering
                  in-depth information on various medical topics. Stay informed
                  about conditions, treatments, and healthcare advancements.
                  Empower yourself with knowledge to make informed decisions
                  about your health. Your go-to resource for medical insights.
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <Col>
                <Link to={"/common/medicines"}>
                  <Button className="m-2">Brose medicines index</Button>
                </Link>
              </Col>
            </Col>
          </Row>
        </Col>
        <Col>
          <img src={require("../../assets/img/home/med1.png")} alt="Doctors" />
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
                  Transparent Healthcare: Diagnoses Details and Costing
                </h1>
                <p
                  style={{ color: "white", textShadow: "2px 2px 4px #888888" }}
                >
                  Gain transparency into your healthcare journey. Understand the
                  details of diagnoses, treatment plans, and associated costs.
                  Our commitment to openness ensures that you are well-informed
                  every step of the way. Discover clarity and confidence in your
                  healthcare decisions.
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <Col>
                <Link to={"/common/equipments"}>
                  <Button className="m-2">
                    See equipments and cost details
                  </Button>
                </Link>
              </Col>
            </Col>
          </Row>
        </Col>
        <Col>
          <img src={require("../../assets/img/home/equ1.png")} alt="Doctors" />
        </Col>
      </Row>
    </>
  );
};

export default Index;
