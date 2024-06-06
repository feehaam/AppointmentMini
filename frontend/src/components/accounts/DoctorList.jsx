import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Table,
  Button,
  Media,
} from "reactstrap";
import { isAdmin } from "scripts/accountInfo";
import AxiosInstance from "scripts/axioInstance";

const DoctorsList = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    if (!isAdmin()) {
      navigate("/");
      return;
    }
    AxiosInstance.get(
      `http://localhost:5100/access/doctors?page=${currentPage}&size=${pageSize}`
    )
      .then((response) => {
        console.log(response.data);
        setDoctors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching doctors:", error);
      });
  }, [currentPage, pageSize]);

  const handleToggleDeactivation = (userId, status) => {
    AxiosInstance.put(
      `http://localhost:5100/status/toggle-deactivation/${userId}/${status}`
    )
      .then((response) => {
        console.log(response);
        setDoctors((prevDoctors) =>
          prevDoctors.map((doctor) =>
            doctor.userId === userId
              ? { ...doctor, deactivation: !status }
              : doctor
          )
        );
      })
      .catch((error) => {
        console.error("Error toggling deactivation status:", error);
      });
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Doctors List</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">User ID</th>
                      <th scope="col">Email</th>
                      <th scope="col">Register Date</th>
                      <th scope="col">Activation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {doctors.map((doctor) => (
                      <tr key={doctor.userId}>
                        <td>
                          <Media className="align-items-center">
                            <Link
                              to={`/health/doctors/${doctor.userId}`}
                              className="rounded-circle mr-3"
                            >
                              <i className="ni ni-single-02"></i>{" "}
                              <span className="mb-0 text-sm">
                                {doctor.userId}
                              </span>
                            </Link>
                          </Media>
                        </td>
                        <td>{doctor.email}</td>
                        <td>{doctor.registerDate}</td>
                        <td>
                          <Button
                            color={doctor.deactivation ? "success" : "danger"}
                            onClick={() =>
                              handleToggleDeactivation(
                                doctor.userId,
                                doctor.deactivation
                              )
                            }
                          >
                            {doctor.deactivation ? "Permit" : "Deactivate"}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <div className="pagination-buttons">
                  <hr></hr>
                  <Button
                    onClick={() =>
                      setCurrentPage((prevPage) => Math.max(prevPage - 1, 0))
                    }
                    disabled={currentPage === 0}
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
                    disabled={doctors.length < pageSize}
                  >
                    Next
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default DoctorsList;
