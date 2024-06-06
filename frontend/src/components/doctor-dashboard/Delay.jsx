import AxiosInstance from "scripts/axioInstance";
import React, { useState, useEffect } from "react";
import { Card, CardBody, Row, Col, CardTitle, Button, Container, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Input } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";

const Delay = () => {

  const [delay, setDelay] = useState(0);
  const [newVal, setNewVal] = useState();
  const userId = localStorage.getItem("userId");
  
  function parseDelay(){
    AxiosInstance.get(`http://localhost:7400/delays/get/${userId}`)
      .then((response) => {
        console.log(response.data);
        setDelay(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const updateDelay = () => {
    AxiosInstance.post(`http://localhost:7400/delays/update/${newVal}`)
      .then((response) => {
        // window.scrollTo({ top: 0, behavior: 'smooth' });
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  

  useEffect(() => {
    parseDelay();
  }, []);


  return (
    <>
      <Container>
        <Row className="mt-4 mb-4 justify-content-center">
          <Col style={{ backgroundColor: "#111155", borderRadius: "14px", margin: "10px" }}>
            <h2 className="m-4 text-white">Delay management</h2>
          </Col>
        </Row>

        <Row className="mb-4 m-1 justify-content-center">
          <Col className="h2">Your current delay is {delay} minutes.</Col>
          <Col>
          <div className="text-danger m-3">
          WARNING: Note that frequent delay update can result in appointment schedules break down and overlaps, also once you update delay 
          all upcoming appointment patients will be notified, frequent changes may confuse them. So try avoiding delay sheduling without emergency.
          </div>
          <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i
                        style={{ color: "#777" }}
                        className="ni ni-lock-circle-open"
                      />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    style={{ color: "#777" }}
                    placeholder={'Update delay'}
                    autoComplete="new-password"
                    value={newVal}
                    onChange={(e) => setNewVal(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        updateDelay();
                      }
                    }}
                  />
                </InputGroup>
              </FormGroup>
          </Col>
        </Row>
    </Container>

    </>
  );
};

export default Delay;
