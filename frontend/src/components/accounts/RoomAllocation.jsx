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
import UpdateRoom from "./UpdateRoom";

const RoomAllocation = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [warning, setWarning] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!isAdmin()) {
      navigate("/");
      return;
    }
    AxiosInstance.get(
      `http://localhost:7200/rooms/list/${currentPage}/${pageSize}`
    )
      .then((response) => {
        console.log(response.data);
        setDoctors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching doctors:", error);
      });
  }, [currentPage, pageSize]);

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
                <div
                  className="bg-warning ml-7 mr-7 m-2 text-white"
                  style={{ textAlign: "center" }}
                >
                  {warning}
                </div>
                <div
                  className="bg-success ml-7 mr-7 m-2 text-white"
                  style={{ textAlign: "center" }}
                >
                  {success}
                </div>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Doctor ID</th>
                      <th scope="col">Doctor Name</th>
                      <th scope="col">Room/Placement</th>
                      <th scope="col">Update</th>
                    </tr>
                  </thead>
                  <tbody>
                    {doctors.map((doctor) => (
                      <tr key={doctor.userId}>
                        <td>
                          <Media className="align-items-center">
                            <Link
                              to={`/health/doctors/${doctor.doctorId}`}
                              className="rounded-circle mr-3"
                            >
                              <i className="ni ni-single-02"></i>
                              <span className="mb-0 text-sm">
                                {" "}
                                {doctor.doctorId}
                              </span>
                            </Link>
                          </Media>
                        </td>
                        <td>{doctor.doctorName}</td>
                        <UpdateRoom
                          room={doctor.room}
                          doctorId={doctor.doctorId}
                          setWarning={setWarning}
                          setSuccess={setSuccess}
                        />
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

export default RoomAllocation;
