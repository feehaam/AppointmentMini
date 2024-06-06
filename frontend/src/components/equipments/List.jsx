import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  CardHeader,
  CardBody,
  Card,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import { Link } from "react-router-dom";
import AxiosInstance from "scripts/axioInstance";

const EquipmentList = () => {
  const [equipments, setEquipments] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    setCurrentPage(0);
  }, []);

  useEffect(() => {
    const url = `http://localhost:7400/equipments/list/${currentPage}/${itemsPerPage}`;
    AxiosInstance.get(url)
      .then((result) => {
        setEquipments(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentPage]);

  const rbcss = {
    boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
    padding: "5px",
    alignItems: "center",
    marginLeft: "10px",
    marginRight: "20px",
    borderRadius: "5px",
    cursor: "pointer",
    color: "white",
  };

  return (
    <Container>
      <Row>
        <Col>
          <Card
            style={{
              color: "white",
              backgroundColor: "#111144",
              borderRadius: "20px",
            }}
          >
            <CardHeader
              style={{
                backgroundColor: "#111144",
                borderRadius: "20px",
              }}
            >
              <h2 style={{ color: "white" }}>Equipments List</h2>
            </CardHeader>
            <CardBody>
              <div
                style={{
                  width: "100%",
                  textAlign: "center",
                  marginBottom: "15px",
                }}
              ></div>
              {equipments !== null && equipments.length !== 0 ? (
                <Table striped responsive>
                  <thead style={{ color: "white" }}>
                    <tr>
                      <th style={{ width: "20%" }}>Equipment ID</th>
                      <th style={{ width: "20%" }}>Name</th>
                      <th style={{ width: "20%" }}>Costing</th>
                      <th style={{ width: "40%" }}>Availability</th>
                    </tr>
                  </thead>
                  <tbody style={{ color: "white" }}>
                    {equipments.map((equipment) => {
                      return (
                        <tr key={equipment.id}>
                          <td
                            style={{
                              maxWidth: "150px",
                              wordWrap: "break-word",
                            }}
                          >
                            <i className="fa-solid fa-capsules"></i>{" "}
                            <Link
                              to={"/common/equipments/" + equipment.id}
                              style={{ color: "white", fontWeight: "bold" }}
                            >
                              {equipment.id}
                            </Link>
                          </td>
                          <td
                            style={{
                              maxWidth: "150px",
                              wordWrap: "break-word",
                            }}
                          >
                            {equipment.name}
                          </td>
                          <td
                            style={{
                              maxWidth: "150px",
                              wordWrap: "break-word",
                            }}
                          >
                            {equipment.costing}
                          </td>
                          <td
                            style={{
                              maxWidth: "300px",
                              wordWrap: "break-word",
                            }}
                          >
                            {equipment.availability}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              ) : (
                ""
              )}
              <Pagination>
                <PaginationItem disabled={currentPage === 1}>
                  <PaginationLink
                    previous
                    onClick={() => setCurrentPage(currentPage - 1)}
                  />
                </PaginationItem>

                <PaginationItem
                  disabled={
                    currentPage === Math.ceil(equipments.length / itemsPerPage)
                  }
                >
                  <PaginationLink
                    next
                    onClick={() => setCurrentPage(currentPage + 1)}
                  />
                </PaginationItem>
              </Pagination>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EquipmentList;
