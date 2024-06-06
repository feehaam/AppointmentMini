import React, { useEffect, useState } from "react";
import { Card, CardBody, Row, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStethoscope,
  faCalendar,
  faComment,
  faPills,
  faDiagnoses,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";

import AxiosInstance from "scripts/axioInstance";

export const PatientProfileTreatment = ({ patientId }) => {
  const [treatmentData, setTreatmentData] = useState(null);
  useEffect(() => {
    AxiosInstance.get(`http://localhost:7800/treatments/patient/${patientId}`)
      .then((response) => {
        console.log(response);
        setTreatmentData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching doctors:", error);
      });
  }, []);

  const renderTreatmentCard = (treatment, index) => (
    <Card className="mb-2" key={index}>
      <CardBody>
        <Row className="mb--4">
          <Col lg="12">
            <h4 style={{ textTransform: "uppercase" }}>
              <FontAwesomeIcon icon={faStethoscope} /> {treatment.condition}
            </h4>
          </Col>
        </Row>
        <hr></hr>
        <Row>
          <Col lg="6">
            <p>
              <FontAwesomeIcon icon={faCalendar} /> Issue Date:{" "}
              <b>{treatment.issueDate}</b>
            </p>
          </Col>
          <Col lg="6">
            <p>
              <FontAwesomeIcon icon={faChartLine} /> Progression:{" "}
              <b>{treatment.progression}</b>
            </p>
          </Col>
        </Row>

        <Row>
          <Col lg="12">
            <p>
              <FontAwesomeIcon icon={faPills} /> Medicines:{" "}
              <b>
                {treatment.medicines.split(",").map((medicine, index) => {
                  return (
                    <>
                      <b
                        style={{
                          padding: "5px",
                          margin: "2px",
                          borderRadius: "5px",
                          backgroundColor: "#eee",
                          fontWeight: "normal",
                          color: "#0384fc",
                        }}
                      >
                        {medicine}
                      </b>{" "}
                    </>
                  );
                })}
              </b>
            </p>
          </Col>
        </Row>
        <Row>
          <Col lg="12">
            <p>
              <FontAwesomeIcon icon={faDiagnoses} /> Diagnoses:{" "}
              <b>
                {treatment.diagnoses.split(",").map((diag, index) => {
                  return (
                    <>
                      <b
                        style={{
                          padding: "5px",
                          margin: "2px",
                          borderRadius: "5px",
                          backgroundColor: "#eee",
                          fontWeight: "normal",
                          color: "#a30083",
                        }}
                      >
                        {diag}
                      </b>{" "}
                    </>
                  );
                })}
              </b>
            </p>
          </Col>
        </Row>
        <Row>
          <Col lg="12">
            <p>
              <FontAwesomeIcon icon={faComment} /> Doctor Comment:{" "}
              <b>{treatment.doctorComment}</b>
            </p>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );

  return (
    <>
      {treatmentData && (
        <Card className="bg-secondary shadow mt-2">
          <CardBody>
            <div className="pl-lg-4">
              <h6 className="heading-small text-muted mb-4">Treatment Info</h6>
            </div>
            {treatmentData && (
              <div>
                {treatmentData.map((treatment, index) =>
                  renderTreatmentCard(treatment, index)
                )}
              </div>
            )}
          </CardBody>
        </Card>
      )}
    </>
  );
};
