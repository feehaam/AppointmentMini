import doctorAvailability from "assets/data/doctorprofile/doctorAvailability";
import React, { useEffect, useState } from "react";
import { Button, Row, Col } from "reactstrap";

const DoctorProfileAvailability = ({ doctorId }) => {
  const [onsite, setOnsite] = useState(false);
  const [cut, setCut] = useState(true);
  const [availability, setAvailability] = useState();

  useEffect(() => {
    console.log("Getting doctor availability data.");
    setAvailability(doctorAvailability);
  }, [availability]);

  const tableData = (data) => {
    if (cut)
      return data.map(
        (item, index) =>
          index < 3 && (
            <small style={{ textAlign: "center" }}>
              {item.date}
              <Row key={index}>
                <Col>
                  <ul>
                    {item.timeslots.map((timeslot, i) => (
                      <li key={i}>
                        {timeslot.fromTime} - {timeslot.toTime}
                      </li>
                    ))}
                  </ul>
                </Col>
              </Row>
            </small>
          )
      );
    else
      return data.map((item, index) => (
        <small style={{ textAlign: "center" }}>
          {item.date}
          <Row key={index}>
            <Col>
              <ul>
                {item.timeslots.map((timeslot, i) => (
                  <li key={i}>
                    {timeslot.fromTime} - {timeslot.toTime}
                  </li>
                ))}
              </ul>
            </Col>
          </Row>
        </small>
      ));
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <h4>Availability</h4>
      <div className="d-flex justify-content-center align-items-center h-100">
        <div className="text-center">
          <Button
            color={onsite ? "primary" : "outline-primary"}
            className="m-2"
            onClick={() => setOnsite(true)}
          >
            On-site
          </Button>
          <Button
            color={onsite ? "outline-primary" : "primary"}
            className="m-2"
            onClick={() => setOnsite(false)}
          >
            Telemedicine
          </Button>
        </div>
      </div>
      {availability && (
        <>
          {onsite ? (
            <>
              {availability.onsite.length > 0 ? (
                <div>
                  {tableData(availability.onsite)}
                  <div
                    style={{
                      textAlign: "center",
                      margin: "10px",
                      boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                      padding: "5px",
                      cursor: "pointer",
                    }}
                    onClick={() => setCut(!cut)}
                  >
                    {cut ? "Show all" : "Show less"}
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    margin: "5px",
                    padding: "10px",
                    border: "1px solid #eee",
                    borderRadius: "5px",
                  }}
                >
                  Not available onsite
                </div>
              )}
            </>
          ) : (
            <>
              <>
                {availability.telemedicine.length > 0 ? (
                  <div>
                    {tableData(availability.telemedicine)}
                    <div
                      style={{
                        textAlign: "center",
                        margin: "10px",
                        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                        padding: "5px",
                        cursor: "pointer",
                      }}
                      onClick={() => setCut(!cut)}
                    >
                      {cut ? "Show all" : "Show less"}
                    </div>
                  </div>
                ) : (
                  <div
                    style={{
                      margin: "5px",
                      padding: "10px",
                      border: "1px solid #eee",
                      borderRadius: "5px",
                    }}
                  >
                    Not available for telemedicine
                  </div>
                )}
              </>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default DoctorProfileAvailability;
