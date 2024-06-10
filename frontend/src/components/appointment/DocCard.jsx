import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardImg, CardTitle, Col } from "reactstrap";
import AxiosInstance from "scripts/axioInstance";

const DocCard = ({ doctor, index, setSelectedDoctor, setWarning }) => {
  const [tCount, setTCount] = useState(0);
  const [aCount, setACount] = useState(0);
  useEffect(() => {
    AxiosInstance.get(
      `http://localhost:7400/appointments/total/${doctor.userId}`
    )
      .then((response) => {
        setTCount(response.data);
      })
      .catch((error) => {
        console.log("No completed appointments.");
        console.log(error);
      });
    AxiosInstance.get(`http://localhost:7400/schedule/dates/${doctor.userId}`)
      .then((response) => {
        setACount(response.data.length);
      })
      .catch((error) => {
        console.log("No completed appointments.");
        console.log(error);
      });
  }, []);

  const requestAppointment = (type, docId) => {
    const url = `http://localhost:8080/appointments/request/${docId}/${type}`;
    console.log(url);
    AxiosInstance.post(url)
      .then((response) => {
        window.location.href = "/health/patient";
        console.log(requestAppointment);
      })
      .catch((error) => {
        setWarning("Failed to request an appointment! " + error.message);
        console.log(error);
      });
  };

  return (
    <>
      <Col key={index} xs={12} sm={6} md={6} lg={3}>
        <Card
          className="mt-2"
          style={{
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          {doctor.photoURL ? (
            <CardImg
              top
              height="270px"
              src={doctor.photoURL}
              alt={`${doctor.firstName} ${doctor.lastName}`}
            />
          ) : (
            <CardImg
              height="270px"
              top
              src={
                doctor.gender.toLowerCase() === "male"
                  ? require("./docmaleavatar.png")
                  : require("./docfemaleavatar.png")
              }
              alt={`${doctor.firstName} ${doctor.lastName}`}
            />
          )}
          <CardBody>
            <b>
              <Link to={"/health/doctors/" + doctor.userId}>
                <CardTitle className="mb--1">{`Dr. ${doctor.firstName} ${doctor.lastName}`}</CardTitle>
              </Link>
            </b>
            <div className="m-2">
              <p className="">Specialized at {doctor.specializations}. </p>
              <p className="mb--1">{`Experience: ${doctor.experience} years`}</p>
              <Button
                onClick={() => requestAppointment(1, doctor.userId)}
                className="mt-4 bg-green text-white"
              >
                Request online appointment
              </Button>
              <Button
                onClick={() => requestAppointment(2, doctor.userId)}
                className="mt-4 bg-blue text-white"
              >
                Request in-person appointment
              </Button>
            </div>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default DocCard;
