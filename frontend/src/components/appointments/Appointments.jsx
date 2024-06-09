import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import AxiosInstance from "scripts/axioInstance";
import List from "./List";
import { isPatient } from "scripts/accountInfo";
import { log } from "react-modal/lib/helpers/ariaAppHider";

const Appointments = () => {
  const navigate = useNavigate();
  if (!isPatient()) navigate("/");

  const [selectedDate, setSelectedDate] = useState("");
  const doctorId = localStorage.getItem("userId");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [scheduleData, setScheduleData] = useState({
    date: "",
    morning: 0,
    morningCapacity: 10,
    afterNoon: 0,
    afterNoonCapacity: 10,
    evening: 0,
    eveningCapacity: 10,
  });

  return (
    <>
      <div
        className="header pb-0 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "50px",
          backgroundImage:
            "url(" + require("../../assets/img/cover/health5.jpg") + ")",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        <span className="mask bg-gradient-default opacity-6" />
      </div>
      <Container className="mt--5" fluid>
        <Row
          className="mb-4 m-1"
          style={{
            backgroundColor: "#eee",
            border: "2px solid #ccc",
            borderRadius: "15px",
          }}
        >
          <List />
        </Row>
      </Container>
    </>
  );
};

export default Appointments;
