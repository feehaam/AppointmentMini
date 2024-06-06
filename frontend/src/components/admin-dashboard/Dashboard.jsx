import { Button, Container, Row } from "reactstrap";
import PublicAppointmemts from "./PublicAppointments";
import { useState } from "react";
import RoomAllocation from "components/accounts/RoomAllocation";
import DoctorsList from "components/accounts/DoctorList";
import PatientsList from "components/accounts/PatientsList";
import Statistics from "./Statistics";

const AdminDashboard = () => {
  const [comp, setComp] = useState(1);
  return (
    <>
      <div
        className="header pb-5 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          height: "100px",
          backgroundImage:
            "url(" + require("../../assets/img/cover/adminbg.jpg") + ")",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        <span className="mask bg-gradient-default opacity-6" />
        <Container className="d-flex align-items-center" fluid>
          <Row>
            <h1 className="display-2 opacity-7" style={{ color: "white" }}>
              ADMIN DASHBOARD
            </h1>
          </Row>
        </Container>
      </div>
      <Container>
        <div style={{ margin: "auto", padding: "15px", textAlign: "center" }}>
          <Button
            onClick={() => {
              setComp(1);
            }}
            color={comp === 1 ? "dark" : "white"}
          >
            Public appointments
          </Button>
          <Button
            onClick={() => {
              setComp(2);
            }}
            color={comp === 2 ? "dark" : "white"}
          >
            Room allocation
          </Button>
          <Button
            onClick={() => {
              setComp(3);
            }}
            color={comp === 3 ? "dark" : "white"}
          >
            Manage doctors
          </Button>
          <Button
            onClick={() => {
              setComp(4);
            }}
            color={comp === 4 ? "dark" : "white"}
          >
            Manage patients
          </Button>
          <Button
            onClick={() => {
              setComp(5);
            }}
            color={comp === 5 ? "dark" : "white"}
          >
            Statistics
          </Button>
        </div>
      </Container>
      <Container>{comp === 1 && <PublicAppointmemts />}</Container>
      <Container>{comp === 2 && <RoomAllocation />}</Container>
      <Container>{comp === 3 && <DoctorsList />}</Container>
      <Container>{comp === 4 && <PatientsList />}</Container>
      <Container>{comp === 5 && <Statistics />}</Container>
    </>
  );
};

export default AdminDashboard;
