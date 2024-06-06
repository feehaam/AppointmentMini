import { useEffect, useState } from "react";
import AxiosInstance from "scripts/axioInstance";

const { Row, Col } = require("reactstrap");

const Patients = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  useEffect(() => {
    AxiosInstance.get(`http://localhost:7500/posts/feedbacks-latest`)
      .then((response) => {
        setFeedbacks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <Row className="align-items-center">
      <Col>
        <img
          src={require("../../assets/img/home/patient2.png")}
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
                We care most about the patients happiness.
              </h1>
              <p style={{ color: "white", textShadow: "2px 2px 4px #888888" }}>
                Our team of highly skilled doctors, specializing in various
                fields, is dedicated to providing exceptional care. With
                expertise in specific medical domains, we ensure personalized
                and effective treatments for our patients.
              </p>
              <p
                style={{
                  color: "white",
                  border: "1px solid #555",
                  padding: "5px",
                  borderRadius: "10px",
                }}
              >
                <h3 className="text-white">Patient's latest feedbacks</h3>
                <br></br>
                {feedbacks.map((fb, index) => {
                  return (
                    <p
                      style={{
                        fontFamily: "cursive",
                        borderRadius: "5px",
                        padding: "5px",
                      }}
                      className="bg-white text-dark"
                    >
                      <i className="fa fa-user"></i> "{fb.content}"
                    </p>
                  );
                })}
              </p>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
export default Patients;
