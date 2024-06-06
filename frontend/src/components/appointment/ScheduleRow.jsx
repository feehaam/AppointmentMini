import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "scripts/axioInstance";

const { Row, Col, Button } = require("reactstrap");

const ScheduleRow = ({
  setSuccess,
  setAlertMessage,
  shift,
  type,
  capacity,
  booked,
  delay,
  date,
  docId,
}) => {
  const [redirectCountdown, setRedirectCountdown] = useState(3);
  const navigate = useNavigate();
  const apply = () => {
    setSuccess("");
    setAlertMessage("");
    const request = {
      doctorId: docId,
      date: date,
      shift: shift,
    };

    AxiosInstance.post(`http://localhost:7400/appointments`, request)
      .then((response) => {
        setSuccess("Appointment created successfully!");
        startRedirectCountdown();
      })
      .catch((error) => {
        setAlertMessage(error.response.data.message);
        console.log(error);
      });
  };

  const startRedirectCountdown = () => {
    const countdownInterval = setInterval(() => {
      setRedirectCountdown((prevCount) => prevCount - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(countdownInterval);
      navigate("/health/patient");
    }, 3000);
  };

  useEffect(() => {
    return () => clearInterval(startRedirectCountdown);
  }, []);

  return (
    <Row
      style={{
        border: "1px solid #eee",
        padding: "5px",
        margin: "1px",
        textAlign: "center",
      }}
    >
      <Col style={{ borderRight: "1px solid #eee" }}>
        {shift === 1 && "Morning"}
        {shift === 2 && "Afternoon"}
        {shift === 3 && "Evening"}
      </Col>
      <Col style={{ borderRight: "1px solid #eee" }}>
        {type === 1 && "In-person"}
        {type === 2 && "Telemedicine"}
        {type === 0 && "Not available"}
      </Col>
      <Col style={{ borderRight: "1px solid #eee" }}>
        Capacity: <b className="text-success">{capacity}</b>
      </Col>
      <Col style={{ borderRight: "1px solid #eee" }}>
        Booked: <b className="text-warning">{booked}</b>
      </Col>
      <Col style={{ borderRight: "1px solid #eee" }}>
        Delay: <b className="text-primary">{delay}</b> minutes
      </Col>
      <Col>
        <Button
          color={capacity - booked > 0 ? "success" : "warning"}
          disabled={capacity - booked <= 0}
          onClick={apply}
        >
          Apply
        </Button>
      </Col>
    </Row>
  );
};

export default ScheduleRow;
