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

const Completed = () => {
  const [apps, setApps] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [appsPerPage] = useState(10);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    AxiosInstance.get(
      `http://localhost:7400/appointments/complete/patient/${userId}`
    )
      .then((response) => {
        setApps(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.log("No completed appointments.");
        console.log(error);
      });
  }, []);

  // Get current appointments
  const indexOfLastApp = currentPage * appsPerPage;
  const indexOfFirstApp = indexOfLastApp - appsPerPage;
  const currentApps = apps.slice(indexOfFirstApp, indexOfLastApp);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
              {apps.length === 0 && "There Are No "}Completed Appointments
            </h2>
          </Col>
        </Row>

        <Row className="mb-4 m-1 justify-content-center">
          {currentApps.map((app, index) => (
            <Col key={index} xs="12" md="3" lg="4" xl="3" className="mb-2">
              <Card className="card-stats bg-secondary">
                <CardBody>
                  <Row>
                    <Col className="text-muted">{app.appointmentId}</Col>
                  </Row>
                  <Row>
                    <div className="col">
                      <CardTitle
                        tag="h5"
                        className="text-uppercase text-black mb-0"
                      >
                        {app.type === "Telemedicine" ? (
                          <i class="fa-solid fa-phone"></i>
                        ) : (
                          <i class="fa-solid fa-person"></i>
                        )}{" "}
                        {app.type}
                      </CardTitle>
                      {app.time}
                    </div>
                    <Col className="col-auto">
                      <div className="icon icon-shape bg-white text-green rounded-circle shadow">
                        <i class="fa-solid fa-check"></i>
                      </div>
                    </Col>
                  </Row>
                  <p className="mt-3 mb-0 text-muted text-sm">
                    <Row>
                      <Col>
                        <span className="text-success mr-2">
                          <i className="fa fa-user" />{" "}
                          <Link
                            to={`/health/patients/${app.userId}`}
                            className="text-success"
                          >
                            Patient profile
                          </Link>
                        </span>{" "}
                      </Col>
                    </Row>
                  </p>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
        <Row className="justify-content-center">
          <Col>
            <ul className="pagination m-4">
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

export default Completed;
