import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle, Col, Row } from "reactstrap";
import "./first-aid-items.css";

const FirstAidItems = ({ st }) => {
  const [status, setStatus] = useState(st);

  // Array of Bootstrap color classes
  const bgClasses = [
    "bg-primary",
    "bg-success",
    "bg-danger",
    "bg-warning",
    "bg-info",
  ];

  if (status !== null) {
    // Randomly select a background color class
    const randomBgClass =
      bgClasses[Math.floor(Math.random() * bgClasses.length)];

    return (
      <Card className={`card-stats mb-4 mb-xl-0`}>
        <CardBody>
          <Link to={"/health/posts/" + status.postId}>
            <Row>
              <Col className="col-auto">
                <div
                  className={`icon icon-shape text-white rounded-circle shadow ${randomBgClass}`}
                >
                  <i className="fas fa-first-aid"></i>
                </div>
              </Col>
              <div className="col">
                <span className="h2 font-weight-bold mb-0">{status.title}</span>
              </div>
            </Row>
          </Link>
        </CardBody>
      </Card>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default FirstAidItems;
