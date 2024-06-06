import React, { useEffect, useState } from "react";
import { FaTags } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  CardHeader,
  CardBody,
  Card,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Button,
  CustomInput,
  Label,
} from "reactstrap";
import PhotoUpload from "scripts/PhotoUpload";
import AxiosInstance from "scripts/axioInstance";

const EquipmentUpdate = () => {
  const { equId } = useParams();

  const [name, setName] = useState("");
  const [usage, setUsage] = useState("");
  const [details, setDetails] = useState("");
  const [warning, setWarning] = useState("");
  const [cost, setCost] = useState("");
  const [availability, setAvailability] = useState("");
  const [photo, setPhoto] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const url = `http://localhost:7400/equipments/${equId}`;
    AxiosInstance.get(url)
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
        setAlertMessage("Failed to load the equipment, please try again.");
      });
  }, []);

  const setData = (data) => {
    setName(data.name);
    setUsage(data.useCases);
    setDetails(data.details);
    setWarning(data.warning);
    setAvailability(data.availability);
    setPhoto(data.photoURL);
    setCost(data.costing);
  };

  const handleUpdate = () => {
    setSuccess("");
    setAlertMessage("");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    const equData = {
      name: name,
      useCases: usage,
      details: details,
      warning: warning,
      costing: cost,
      availability: availability,
      photoURL: photo,
    };

    const url = `http://localhost:7400/equipments/${equId}`;
    AxiosInstance.put(url, equData)
      .then((result) => {
        console.log(result);
        setSuccess("Equipment updated successfully.");
      })
      .catch((error) => {
        setAlertMessage("Failed to update the equipment, please try again.");
      });
  };

  return (
    <>
      <div
        className="header pb-7 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          backgroundImage:
            "url(" + require("../../assets/img/cover/health1.jpg") + ")",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          width: "100%",
        }}
      >
        <span className="mask bg-gradient-default opacity-6" />
      </div>
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1 center" xl="8">
            <Card className="bg-secondary shadow">
              {equId === null ||
                equId === undefined ||
                (equId === ":medId" && (
                  <div style={{ width: "100%", textAlign: "center" }}>
                    <div className="alert alert-danger">
                      <b>No equipment selected!</b> Please select an equipment
                      first that you want to update from the equipments list.{" "}
                    </div>
                  </div>
                ))}
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">
                      <b>UPDATE AN EQUIPMENT</b>
                    </h3>
                    <Link to={"/common/equipments"}>
                      <b>Go back to equipments list</b>
                    </Link>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Equipment Info
                  </h6>
                  {alertMessage && (
                    <div className="alert alert-danger" role="alert">
                      {alertMessage}
                    </div>
                  )}
                  {success && (
                    <div className="alert alert-success">{success}</div>
                  )}
                  <FormGroup row>
                    <Label sm={4} for="commercialName">
                      Medicine ID:
                    </Label>
                    <Col sm={8}>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-medkit" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          disabled="true"
                          id="medicineId"
                          value={equId}
                        />
                      </InputGroup>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm={4} for="commercialName">
                      Name:
                    </Label>
                    <Col sm={8}>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i class="fa-solid fa-stethoscope"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          id="commercialName"
                          value={name}
                          placeholder="Name of the equipment"
                          onChange={(e) => setName(e.target.value)}
                        />
                      </InputGroup>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm={4} for="description">
                      Usage:
                    </Label>
                    <Col sm={8}>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <FaTags />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Write some cases where it is used"
                          type="textarea"
                          id="description"
                          value={usage}
                          onChange={(e) => setUsage(e.target.value)}
                        />
                      </InputGroup>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm={4} for="description">
                      Details:
                    </Label>
                    <Col sm={8}>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i class="fa-solid fa-receipt"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="textarea"
                          id="description"
                          value={details}
                          placeholder="Provide detailed description of the equipment"
                          onChange={(e) => setDetails(e.target.value)}
                        />
                      </InputGroup>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm={4} for="description">
                      Warning:
                    </Label>
                    <Col sm={8}>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-exclamation-triangle" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Mention some warnings (if any)"
                          type="textarea"
                          id="description"
                          value={warning}
                          onChange={(e) => setWarning(e.target.value)}
                        />
                      </InputGroup>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Label sm={4} for="strengthVolume">
                      Costings:
                    </Label>
                    <Col sm={8}>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i class="fa-solid fa-dollar-sign"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Enter cost details"
                          type="text"
                          id="strengthVolume"
                          value={cost}
                          onChange={(e) => setCost(e.target.value)}
                        />
                      </InputGroup>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm={4} for="strengthWeight">
                      Availability:
                    </Label>
                    <Col sm={8}>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i class="fa-solid fa-clock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Write availability info"
                          type="text"
                          id="strengthWeight"
                          value={availability}
                          onChange={(e) => setAvailability(e.target.value)}
                        />
                      </InputGroup>
                    </Col>
                  </FormGroup>

                  <FormGroup>
                    <PhotoUpload url={photo} setUrl={setPhoto} />
                  </FormGroup>

                  <Button color="primary" onClick={handleUpdate}>
                    Save changes
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default EquipmentUpdate;
