import { Card, CardHeader, CardBody, Row, Col, CardTitle } from "reactstrap";
import { useEffect, useState } from "react";
import patientDataAchievements from "assets/data/patientprofile/patientAchievements";

export const PatientProfilePhoto = ({
  firstName,
  lastName,
  photo,
  patientId,
}) => {
  return (
    <>
      <div>
        <Card className="card-profile shadow">
          <Row className="justify-content-center">
            <Col className="order-lg-2" lg="6">
              <div className="card-profile-image">
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  <img
                    className="rounded-circle"
                    style={{
                      height: "200px",
                      width: "200px",
                      backgroundImage: `url(${photo})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                </a>
              </div>
            </Col>
          </Row>
          <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4"></CardHeader>
          <CardBody className="pt-0 pt-md-4">
            <Row>
              <div className="col">
                <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                  <div>
                    <h2>{`${firstName} ${lastName}`}</h2>
                    <h2>{patientId}</h2>
                  </div>
                </div>
              </div>
            </Row>
          </CardBody>
        </Card>
      </div>
    </>
  );
};
