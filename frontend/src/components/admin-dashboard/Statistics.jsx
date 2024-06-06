import BarView from "components/graphical/BarView";
import PieView from "components/graphical/PieView";
import { randomColorArray } from "components/graphical/RandomColor";
import PatientHealthData from "./PatientHealthData";

const { useState, useEffect } = require("react");
const { Container, Card, CardBody, Row, Col, Button } = require("reactstrap");
const { default: AxiosInstance } = require("scripts/axioInstance");

const Statistics = () => {
  const [totalDoc, setTotalDoc] = useState(0);
  const [totalPat, setTotalPat] = useState(0);
  const [totalApp, setTotalApp] = useState(0);

  const [stats, setStats] = useState();

  useEffect(() => {
    AxiosInstance.get(`http://localhost:7200/doctors/total-count`)
      .then((response) => {
        setTotalDoc(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    AxiosInstance.get(`http://localhost:7400/appointments/total-count`)
      .then((response) => {
        setTotalApp(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    AxiosInstance.get(`http://localhost:7100/patients/total-count`)
      .then((response) => {
        setTotalPat(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    AxiosInstance.get(`http://localhost:7400/appointments/stats`)
      .then((response) => {
        setStats(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Container>
        <Row>
          <Col>
            <div
              className="bg-info text-white"
              style={{
                margin: "5px",
                padding: "15px",
                fontSize: "40px",
                fontWeight: "bold",
                borderRadius: "20px",
                maxWidth: "300px",
                textAlign: "center",
              }}
            >{`Total patients: ${totalPat}`}</div>
          </Col>
          <Col>
            <div
              className="bg-primary text-white"
              style={{
                margin: "5px",
                padding: "15px",
                fontSize: "40px",
                fontWeight: "bold",
                borderRadius: "20px",
                maxWidth: "300px",
                textAlign: "center",
              }}
            >{`Total doctors: ${totalDoc}`}</div>
          </Col>
          <Col>
            <div
              className="bg-info text-white"
              style={{
                margin: "5px",
                padding: "15px",
                fontSize: "40px",
                fontWeight: "bold",
                borderRadius: "20px",
                maxWidth: "300px",
                textAlign: "center",
              }}
            >{`Appointments total: ${totalApp}`}</div>
          </Col>
        </Row>
        {stats && (
          <>
            <Row
              lassName="justify-content-center"
              style={{ textAlign: "center" }}
            >
              <Col>
                <BarView
                  title={"APPOINTMENT DAILY STATS"}
                  data={stats.dailyStats}
                  colors={randomColorArray(stats.dailyStats.length, "dark")}
                  description={"Number of appointments each day"}
                />
              </Col>
            </Row>
            <hr></hr>
            <Row
              className="justify-content-center"
              style={{ textAlign: "center" }}
            >
              <Col style={{ textAlign: "center" }}>
                <PieView
                  title={"APPOINTMENT SHIFT STATS"}
                  data={stats.shifts}
                  colors={randomColorArray(stats.shifts.length, "dark")}
                  size={10}
                  description={"Total appointments count per shift"}
                />
              </Col>
              <Col style={{ textAlign: "center" }}>
                <PieView
                  title={"APPOINTMENT TYPE STATS"}
                  data={stats.type}
                  colors={randomColorArray(stats.type.length, "dark")}
                  size={10}
                  description={"Total appointments count by type"}
                />
              </Col>
            </Row>
            <hr></hr>
            <hr></hr>
            <div style={{ textAlign: "center" }}>
              <PatientHealthData />
            </div>
          </>
        )}
      </Container>
    </>
  );
};

export default Statistics;
