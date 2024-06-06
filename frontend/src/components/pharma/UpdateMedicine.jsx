import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
  CardFooter,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { medicineData } from "assets/data/medicine/editMedData";
import AxiosInstance from "scripts/axioInstance";
import PhotoUpload from "scripts/PhotoUpload";

const UpdateMedicine = () => {
  const { medId } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({});

  const [medicineId, setMedicineId] = useState("");
  const [commercialName, setCommercialName] = useState("");
  const [medicineName, setMedicineName] = useState("");
  const [classification, setClassification] = useState("");
  const [description, setDescription] = useState("");
  const [dosageForm, setDosageForm] = useState("");
  const [strengthVolume, setStrengthVolume] = useState("");
  const [strengthWeight, setStrengthWeight] = useState("");
  const [warnings, setWarnings] = useState("");
  const [adverseEffects, setAdverseEffects] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [nationalDrugCode, setNationalDrugCode] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [photo, setPhoto] = useState("");
  const [existingPhoto, setExistingPhoto] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [alertMessage, setAlertMessage] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // Fetch and set the medicine data based on medId (in this case, we're using the provided medicineData)
    const fetchData = async () => {
      const url = `http://localhost:7300/medicines/${medId}`;
      AxiosInstance.get(url)
        .then((result) => {
          console.log(result);
          setData(result.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchData();
  }, [medId]);

  useEffect(() => {
    setMedicineId(medId);
    setCommercialName(data.commercialName);
    setMedicineName(data.medicineName);
    setClassification(data.classification);
    setDescription(data.description);
    setDosageForm(data.dosageForm);
    setStrengthVolume(data.strengthVolume);
    setStrengthWeight(data.strengthWeight);
    setWarnings(data.warnings);
    setAdverseEffects(data.adverseEffects);
    setManufacturer(data.manufacturer);
    setNationalDrugCode(data.nationalDrugCode);
    setExpirationDate(data.expirationDate);
    setExistingPhoto(data.photo);
  }, [data]);

  const validate = () => {
    if (
      !commercialName ||
      !medicineName ||
      !classification ||
      !description ||
      !dosageForm ||
      !strengthVolume ||
      !strengthWeight ||
      !warnings ||
      !adverseEffects ||
      !manufacturer ||
      !nationalDrugCode ||
      !expirationDate
    ) {
      setAlertMessage("Please fill in all fields.");
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return false;
    }

    setAlertMessage(null);
    return true;
  };

  const toggleDeleteModal = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  function handleDeleteMedicine() {
    const url = `http://localhost:7300/medicines/${medId}`;
    AxiosInstance.delete(url)
      .then((result) => {
        console.log(result);
        setSuccess(result.data);
        navigate("/common/medicines");
      })
      .catch((error) => {
        console.log(error);
        setAlertMessage(
          "Failed to delete medicine, try again after some times."
        );
      });
  }

  const handleupdateMedicine = () => {
    setAlertMessage("");
    setSuccess("");
    if (validate()) {
      const medicineData = {
        commercialName,
        medicineName,
        classification,
        description,
        dosageForm,
        strengthVolume,
        strengthWeight,
        warnings,
        adverseEffects,
        manufacturer,
        nationalDrugCode,
        expirationDate,
        photo: !photo ? null : photo,
      };
      const url = `http://localhost:7300/medicines/${medId}`;
      AxiosInstance.put(url, medicineData)
        .then((result) => {
          console.log(result);
          setSuccess(result.data);
        })
        .catch((error) => {
          console.log(error);
          setAlertMessage(
            "Failed to update medicine, try again after some times."
          );
        });
    }
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
              {medId === null ||
                medId === undefined ||
                (medId === ":medId" && (
                  <div style={{ width: "100%", textAlign: "center" }}>
                    <div className="alert alert-danger">
                      <b>No medicine selected!</b> Please select a medicine
                      first that you want to update from the medicine list.{" "}
                    </div>
                  </div>
                ))}
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">
                      <b>UPDATE A MEDICINE DATA</b>
                    </h3>

                    <Link to={"/health/medicines"}>
                      <b>Go back to medicines list</b>
                    </Link>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  {alertMessage && (
                    <div className="alert alert-danger" role="alert">
                      {alertMessage}
                    </div>
                  )}
                  {success && (
                    <div className="alert alert-success">{success}</div>
                  )}
                  <h6 className="heading-small text-muted mb-4">
                    Medicine Info
                  </h6>
                  {alertMessage && (
                    <div className="alert alert-danger" role="alert">
                      {alertMessage}
                    </div>
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
                          value={medicineId}
                        />
                      </InputGroup>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm={4} for="commercialName">
                      Commercial name:
                    </Label>
                    <Col sm={8}>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-medkit" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          style={{ color: "#555" }}
                          type="text"
                          id="commercialName"
                          value={commercialName}
                          onChange={(e) => setCommercialName(e.target.value)}
                        />
                      </InputGroup>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm={4} for="medicineName">
                      Medicine name:
                    </Label>
                    <Col sm={8}>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-prescription-bottle" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          style={{ color: "#555" }}
                          type="text"
                          id="medicineName"
                          value={medicineName}
                          onChange={(e) => setMedicineName(e.target.value)}
                        />
                      </InputGroup>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm={4} for="classification">
                      Classification:
                    </Label>
                    <Col sm={8}>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-tags" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          style={{ color: "#555" }}
                          type="text"
                          id="classification"
                          value={classification}
                          onChange={(e) => setClassification(e.target.value)}
                        />
                      </InputGroup>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm={4} for="description">
                      Description:
                    </Label>
                    <Col sm={8}>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-info" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          style={{ color: "#555" }}
                          type="textarea"
                          id="description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </InputGroup>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm={4}>Dosage Form:</Label>
                    <Col sm={8}>
                      <div className="d-flex justify-content-between align-items-center">
                        <CustomInput
                          type="radio"
                          id="tablet"
                          label="Tablet"
                          checked={dosageForm === "Tablet"}
                          onChange={() => setDosageForm("Tablet")}
                        />
                        <CustomInput
                          type="radio"
                          id="capsule"
                          label="Capsule"
                          checked={dosageForm === "Capsule"}
                          onChange={() => setDosageForm("Capsule")}
                        />
                        <CustomInput
                          type="radio"
                          id="syrup"
                          label="Syrup"
                          checked={dosageForm === "Syrup"}
                          onChange={() => setDosageForm("Syrup")}
                        />
                      </div>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm={4} for="strengthVolume">
                      Strength in volume:
                    </Label>
                    <Col sm={8}>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-flask" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          style={{ color: "#555" }}
                          type="text"
                          id="strengthVolume"
                          value={strengthVolume}
                          onChange={(e) => setStrengthVolume(e.target.value)}
                        />
                      </InputGroup>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm={4} for="strengthWeight">
                      Strength in weight:
                    </Label>
                    <Col sm={8}>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-balance-scale" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          style={{ color: "#555" }}
                          type="text"
                          id="strengthWeight"
                          value={strengthWeight}
                          onChange={(e) => setStrengthWeight(e.target.value)}
                        />
                      </InputGroup>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm={4} for="warnings">
                      Warnings:
                    </Label>
                    <Col sm={8}>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-exclamation-triangle" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          style={{ color: "#555" }}
                          type="textarea"
                          id="warnings"
                          value={warnings}
                          onChange={(e) => setWarnings(e.target.value)}
                        />
                      </InputGroup>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm={4} for="adverseEffects">
                      Adverse effects:
                    </Label>
                    <Col sm={8}>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-thumbs-down" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          style={{ color: "#555" }}
                          type="textarea"
                          id="adverseEffects"
                          value={adverseEffects}
                          onChange={(e) => setAdverseEffects(e.target.value)}
                        />
                      </InputGroup>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm={4} for="manufacturer">
                      Manufacturer:
                    </Label>
                    <Col sm={8}>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-industry" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          style={{ color: "#555" }}
                          type="text"
                          id="manufacturer"
                          value={manufacturer}
                          onChange={(e) => setManufacturer(e.target.value)}
                        />
                      </InputGroup>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm={4} for="nationalDrugCode">
                      National drug code:
                    </Label>
                    <Col sm={8}>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-barcode" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          style={{ color: "#555" }}
                          type="text"
                          id="nationalDrugCode"
                          value={nationalDrugCode}
                          onChange={(e) => setNationalDrugCode(e.target.value)}
                        />
                      </InputGroup>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm={4} for="expirationDate">
                      Expiration date:
                    </Label>
                    <Col sm={8}>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-calendar" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          style={{ color: "#555" }}
                          type="date"
                          id="expirationDate"
                          value={expirationDate}
                          onChange={(e) => setExpirationDate(e.target.value)}
                        />
                      </InputGroup>
                    </Col>
                  </FormGroup>
                  <FormGroup row className="justify-content-center">
                    <PhotoUpload url={photo} setUrl={setPhoto} />
                  </FormGroup>
                </Form>
                <CardFooter
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  <Button color="primary" onClick={handleupdateMedicine}>
                    Update Medicine
                  </Button>
                  <Button
                    color="danger"
                    onClick={() => {
                      setIsDeleteModalOpen(!isDeleteModalOpen);
                    }}
                  >
                    Delete Medicine
                  </Button>
                </CardFooter>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <Modal isOpen={isDeleteModalOpen} toggle={toggleDeleteModal}>
        <div
          style={{
            padding: "10px",
            fontWeight: "bold",
            borderBottom: "2px solid #eee",
          }}
        >
          <i className="fa fa-trash"></i> Delete Medicine
        </div>
        <div
          style={{
            padding: "10px",
          }}
        >
          Are you sure you want to delete the medicine{" "}
          <b>
            ({medicineId}) {commercialName}?
          </b>{" "}
          This is an irreversable action.
        </div>
        <ModalFooter>
          <Button color="danger" onClick={handleDeleteMedicine}>
            Confirm Delete
          </Button>
          <Button color="secondary" onClick={toggleDeleteModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default UpdateMedicine;
