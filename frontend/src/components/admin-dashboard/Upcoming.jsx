import AxiosInstance from "scripts/axioInstance";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Row,
  Col,
  CardTitle,
  Button,
  Container,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import RoomInfo from "./RoomInfo";

const Upcoming = () => {
  const [apps, setApps] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [appsPerPage] = useState(10);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    AxiosInstance.get(`http://localhost:7400/appointments/upcoming/public`)
      .then((response) => {
        console.log(response);
        setApps(response.data);
      })
      .catch((error) => {
        console.log("No upcoming appointments.");
        console.log(error);
      });
  }, []);

  // Get current appointments
  const indexOfLastApp = currentPage * appsPerPage;
  const indexOfFirstApp = indexOfLastApp - appsPerPage;
  const currentApps = apps.slice(indexOfFirstApp, indexOfLastApp);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  function extractDoctorId(appointmentId) {
    const parts = appointmentId.split("-");
    const doctorId = parts[0];
    return doctorId;
  }

  return (
    <>
      <Container>
        <Row className="mt-4 mb-4 justify-content-center">
          <Col
            style={{
              backgroundColor: "#111155",
              borderRadius: "14px",
              margin: "10px",
            }}
          >
            <h2 className="m-4 text-white">
              {apps.length === 0 && "There Are No "}Upcoming Appointments
            </h2>
          </Col>
        </Row>

        <Row className="mb-4 m-1 justify-content-center">
          {currentApps.map((app, index) => (
            <Col key={index} xs="12" md="3" lg="4" xl="3" className="mb-2">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col className="text-muted">{app.appointmentId}</Col>
                  </Row>
                  <Row>
                    <div className="col">
                      <CardTitle
                        tag="h5"
                        className="text-uppercase text-red mb-0"
                      >
                        {app.type === "Telemedicine" ? (
                          <i class="fa-solid fa-phone"></i>
                        ) : (
                          <i class="fa-solid fa-person"></i>
                        )}{" "}
                        {app.type}
                      </CardTitle>
                      <span className="h3 font-weight-bold mb-0">
                        {app.time}
                      </span>
                    </div>
                    <Col className="col-auto">
                      <div className="icon icon-shape bg-primary text-white rounded-circle shadow">
                        <i className="fas fa-clock" />
                      </div>
                    </Col>
                  </Row>
                  <p className="mt-3 mb-0 text-muted text-sm">
                    <Row>
                      <Col>
                        <span className="text-success mr-2 mb-2">
                          <i className="fa fa-user" />{" "}
                          <Link
                            to={`/health/doctors/${extractDoctorId(
                              app.appointmentId
                            )}`}
                            className="text-success"
                          >
                            Doctor profile
                          </Link>
                        </span>{" "}
                      </Col>
                      <Col style={{ whiteSpace: "nowrap" }}>
                        {app.type === "Telemedicine" ? (
                          <Button
                            onClick={() => {
                              navigate("/tele/call/" + app.appointmentId);
                            }}
                          >
                            <i class="fa-solid fa-phone"></i> Join call
                          </Button>
                        ) : (
                          <>
                            <i className="fa fa-building"></i>{" "}
                            <RoomInfo
                              doctorId={extractDoctorId(app.appointmentId)}
                            />
                          </>
                        )}
                      </Col>
                    </Row>
                  </p>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
        <Row className="justify-content-center m-3">
          <Col>
            <ul className="pagination">
              {Array.from({ length: Math.ceil(apps.length / appsPerPage) }).map(
                (_, index) => (
                  <li
                    key={index}
                    className={`page-item ${
                      currentPage === index + 1 ? "active" : ""
                    }`}
                  >
                    <Button
                      onClick={() => paginate(index + 1)}
                      className="page-link"
                    >
                      {index + 1}
                    </Button>
                  </li>
                )
              )}
            </ul>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Upcoming;
