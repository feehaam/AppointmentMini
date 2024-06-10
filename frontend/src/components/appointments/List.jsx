import AxiosInstance from "scripts/axioInstance";
import React, { useState, useEffect } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
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
import dayjs from "dayjs";

const List = () => {
  const [apps, setApps] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [appsPerPage] = useState(10);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    AxiosInstance.get(`http://localhost:8080/appointments`)
      .then((response) => {
        const data = response.data;
        setApps(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Get current appointments
  const indexOfLastApp = currentPage * appsPerPage;
  const indexOfFirstApp = indexOfLastApp - appsPerPage;
  const currentApps = apps.slice(indexOfFirstApp, indexOfLastApp);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);

  const [selectedDateTime, setSelectedDateTime] = useState({});

  const handleDateTimeChange = (appointmentId, newDateTime) => {
    setSelectedDateTime((prev) => ({
      ...prev,
      [appointmentId]: newDateTime,
    }));
  };

  const handleApproveAppointment = async (appointmentId) => {
    const dateTime = selectedDateTime[appointmentId];
    if (!dateTime) {
      alert("Please select a date and time");
      return;
    }
    const formattedDateTime = dayjs(dateTime).format("YYYY-MM-DD HH:mm");
    try {
      const response = await AxiosInstance.put(
        `http://localhost:8080/appointments/approve/${appointmentId}`,
        formattedDateTime,
        {
          headers: {
            "Content-Type": "text/plain",
          },
        }
      );
      console.log(response.data);
      window.location.href = "/health/appointments";
    } catch (error) {
      console.error(error);
      window.location.href = "/health/appointments";
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  function extractDoctorId(appointmentId) {
    const parts = appointmentId.split("-");
    const doctorId = parts[0];
    return doctorId;
  }

  function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);

    // Define options for formatting the date
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };

    const formatter = new Intl.DateTimeFormat(navigator.language, options);
    const formattedDateTime = formatter.format(date);

    return formattedDateTime;
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
              {apps.length === 0 && "There Are No "} Appointments
            </h2>
          </Col>
        </Row>

        <Row className="mb-4 m-1 justify-content-center">
          {currentApps.map((app, index) => (
            <Col key={index} xs="12" md="3" lg="4" xl="3" className="mb-2">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col className="text-muted">
                      Appointment ID - {app.appointmentId}
                    </Col>
                  </Row>
                  <Row>
                    <div className="col">
                      <CardTitle
                        tag="h5"
                        className="text-uppercase text-red mb-0"
                      >
                        {app.type === 1 ? (
                          <i class="fa-solid fa-phone"> O n l i n e</i>
                        ) : (
                          <i class="fa-solid fa-person"> I n - p e r s o n</i>
                        )}{" "}
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
                  <Row>
                    <Col>
                      {app.status == 0 ? (
                        <div>
                          {" "}
                          <b>Status -</b>{" "}
                          <span className="text-warning">PENDING</span>
                        </div>
                      ) : (
                        <div>
                          {" "}
                          <b>Status -</b>{" "}
                          <span className="text-success">SCHEDULED</span>
                        </div>
                      )}{" "}
                    </Col>
                  </Row>
                  <p className="mt-3 mb-0 text-muted text-sm">
                    <Row>
                      <Col style={{ whiteSpace: "nowrap" }}>
                        <span className="text-dark mr-2 mb-2">
                          <i className="fa fa-user" />{" "}
                          <Link
                            to={`/health/patients/${extractDoctorId(
                              app.patientId
                            )}`}
                            className="text-info"
                          >
                            Patient profile
                          </Link>
                        </span>
                      </Col>
                      <Col style={{ whiteSpace: "nowrap" }}>
                        <span className="text-dark mr-2 mb-2">
                          <i className="fa fa-user" />{" "}
                          <Link
                            to={`/health/doctors/${extractDoctorId(
                              app.doctorId
                            )}`}
                            className="text-info"
                          >
                            Doctor profile
                          </Link>
                        </span>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <span className="text-dark mr-2 mb-2">
                          <i className="fa fa-clock" /> <b>TIME: </b>{" "}
                          {app.status == 0
                            ? "--:--:--"
                            : formatDateTime(app.dateTime)}
                        </span>
                      </Col>
                    </Row>
                    {userId.startsWith("D") && app.status == 0 && (
                      <>
                        <Row>
                          <Col>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DateTimePicker
                                label="Select Time"
                                value={
                                  selectedDateTime[app.appointmentId] || null
                                }
                                onChange={(newDateTime) =>
                                  handleDateTimeChange(
                                    app.appointmentId,
                                    newDateTime
                                  )
                                }
                              />
                            </LocalizationProvider>
                          </Col>
                        </Row>
                      </>
                    )}
                    {userId.startsWith("D") && app.status == 0 && (
                      <div style={{ textAlign: "center" }}>
                        <Button
                          className={
                            selectedDateTime[app.appointmentId]
                              ? "btn btn-success mt-2"
                              : "btn btn-light mt-2"
                          }
                          disabled={!selectedDateTime[app.appointmentId]}
                          onClick={() =>
                            handleApproveAppointment(app.appointmentId)
                          }
                        >
                          Approve
                        </Button>
                      </div>
                    )}

                    {app.status == 1 && (
                      <div style={{ textAlign: "center" }}>
                        <Link
                          to={`/health/appointment-room/${app.appointmentId}`}
                          className="btn btn-outline-dark"
                        >
                          Appointment room
                        </Link>
                      </div>
                    )}
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

export default List;
