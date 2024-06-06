import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  CardHeader,
  CardBody,
  Card,
  Form,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Button,
  Modal,
  CustomInput,
} from "reactstrap";
import allergiesList from "assets/data/enums/allergies";
import { Link } from "react-router-dom";
import AxiosInstance from "scripts/axioInstance";
import PhotoUpload from "scripts/PhotoUpload";

const EditPatientProfile = () => {
  const patientId = localStorage.getItem("userId");

  const textColor = {
    color: "#555",
  };

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [allergies, setAllergies] = useState("");
  const [allergiesEnum, setAllergiesEnum] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [residence, setResidence] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState(null);
  const [isallergiesModalOpen, setIsallergiesModalOpen] = useState(false);
  const [specCount, setSpecCount] = useState(0);
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [bloodGroup, setBloodGroup] = useState();
  const [bloodSugar, setBloodSugar] = useState();
  const [asthma, setAsthma] = useState();
  const [drinking, setDringking] = useState();
  const [smoking, setSmoking] = useState();
  const [bloodPressure, setBloodPressure] = useState();
  const [occupation, setOccupation] = useState();

  useEffect(() => {
    AxiosInstance.get(`http://localhost:7100/patients/${patientId}/bio`)
      .then((response) => {
        const data = response.data;
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setGender(data.gender.toLowerCase());
        setPhoneNumber(data.phone);
        setResidence(data.address);
        setBloodGroup(data.bloodGroup);
        setPhoto(data.profilePhoto);

        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching doctors:", error);
        setAlertMessage("Failed to parse existing profile bio. ");
      });
    setAllergiesEnum(allergiesList);
  }, []);

  useEffect(() => {
    AxiosInstance.get(`http://localhost:7100/patients/${patientId}/health`)
      .then((response) => {
        const data = response.data;
        setWeight(data.weight);
        setAge(data.age);
        setBloodPressure(data.bloodPressure);
        setHeight(data.height);
        setOccupation(data.occupation);
        setSmoking(data.smoking === "Yes");
        setDringking(data.drinking === "Yes");
        setAsthma(data.asthma === "Yes");

        let aler = "";
        for (let i = 0; i < data.allergies.length; i++) {
          aler = aler + data.allergies[i];
          if (i < data.allergies.length - 1) {
            aler = aler + ", ";
          }
        }
        setAllergies(aler);

        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching doctors:", error);
        setAlertMessage("Failed to parse existing profile health data. ");
      });
    setAllergiesEnum(allergiesList);
  }, []);

  const handleallergiesSelect = (spec) => {
    let curList = allergies;
    if (!curList.includes(spec)) {
      if (specCount > 0) curList = curList + ", ";
      curList = curList + spec;
      setAllergies(curList);
      setSpecCount(specCount + 1);
    }
  };

  const handleallergiesUnselect = (spec) => {
    console.log(allergies);
    let curList = allergies;
    if (curList === undefined) return;
    if (curList.includes(spec + ", ")) {
      curList = curList.replace(spec + ", ", "");
      setAllergies(curList);
    } else if (curList.includes(", " + spec)) {
      curList = curList.replace(", " + spec, "");
      setAllergies(curList);
    } else {
      curList = curList.replace(spec, "");
      setAllergies(curList);
    }
  };

  function handleUpdateProfile() {
    setSuccess("");
    setAlertMessage("");
    const updatedProfile = {
      firstName,
      lastName,
      gender,
      profilePhoto: photo,
      allergies: allergies,
      age,
      height,
      weight,
      bloodGroup,
      bloodSugar,
      bloodPressure,
      occupation,
      phoneNo: phoneNumber,
      residence,
      smoking,
      drinking,
      asthma,
    };
    AxiosInstance.put(
      `http://localhost:7100/patients/update-profile`,
      updatedProfile
    )
      .then((response) => {
        setSuccess("Profile updated successfully.");
      })
      .catch((error) => {
        setAlertMessage("Failed to udpate profile");
        console.error("Error updating profile:", error);
      });
  }

  return (
    <>
      <>
        <div
          className="header pb-7 pt-5 pt-lg-8 d-flex align-items-center"
          style={{
            backgroundImage:
              "url(" + require("../../assets/img/cover/health5.jpg") + ")",
            backgroundSize: "cover",
            backgroundPosition: "center top",
            width: "100%",
          }}
        >
          <span className="mask bg-gradient-default opacity-6" />
        </div>
      </>
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1 center" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">
                      <b>EDIT YOUR PROFILE INFO</b>
                    </h3>
                    <Link to={`/health/patients/${patientId}`}>
                      <b>Go back to profile</b>
                    </Link>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button color="primary" onClick={handleUpdateProfile}>
                      Save changes
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Personal info
                  </h6>
                  {alertMessage && (
                    <div className="alert alert-danger" role="alert">
                      {alertMessage}
                    </div>
                  )}
                  {success && (
                    <div className="alert alert-success" role="alert">
                      {success}
                    </div>
                  )}
                  <FormGroup>
                    <PhotoUpload url={photo} setUrl={setPhoto} />
                  </FormGroup>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i
                                className="ni ni-circle-08"
                                style={textColor}
                              />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="First name"
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            style={textColor}
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i
                                className="ni ni-circle-08"
                                style={textColor}
                              />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Last name"
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            style={textColor}
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i
                                className="ni ni-single-02"
                                style={textColor}
                              />
                            </InputGroupText>
                          </InputGroupAddon>
                          <CustomInput
                            type="select"
                            id="gender"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            style={textColor}
                          >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </CustomInput>
                        </InputGroup>
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText style={textColor}>
                              <i
                                className="ni ni-calendar-grid-58"
                                style={textColor}
                              />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Age"
                            type="number"
                            autoComplete="new-email"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            style={textColor}
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText style={textColor}>
                              <i className="fa fa-male" style={textColor} />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Height (CM)"
                            type="number"
                            autoComplete="new-email"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            style={textColor}
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText style={textColor}>
                              <i className="fa fa-arrows-v" style={textColor} />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Weight (KG)"
                            type="number"
                            autoComplete="new-email"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            style={textColor}
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  </Row>
                  <h6 className="heading-small text-muted mb-4">
                    Health & Activity
                  </h6>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i
                                className="fa-solid fa-microscope"
                                style={textColor}
                              />
                            </InputGroupText>
                          </InputGroupAddon>
                          <CustomInput
                            type="select"
                            id="bloodGroup"
                            value={bloodGroup}
                            onChange={(e) => setBloodGroup(e.target.value)}
                            style={textColor}
                          >
                            <option value="">Select Blood Group</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                          </CustomInput>
                        </InputGroup>
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i
                                className="ni ni-chart-bar-32"
                                style={textColor}
                              />
                            </InputGroupText>
                          </InputGroupAddon>
                          <CustomInput
                            type="select"
                            id="bloodSugar"
                            value={bloodSugar}
                            onChange={(e) => setBloodSugar(e.target.value)}
                            style={textColor}
                          >
                            <option value="">Select Blood Sugar Level</option>
                            <option value="Very Low">Very Low</option>
                            <option value="Low">Low</option>
                            <option value="Moderate">Moderate</option>
                            <option value="High">High</option>
                            <option value="Very High">Very High</option>
                          </CustomInput>
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i
                                className="ni ni-chart-bar-32"
                                style={textColor}
                              />
                            </InputGroupText>
                          </InputGroupAddon>
                          <CustomInput
                            type="select"
                            id="bloodPressure"
                            value={bloodPressure}
                            onChange={(e) => setBloodPressure(e.target.value)}
                            style={textColor}
                          >
                            <option value="">
                              Select Blood Pressure Level
                            </option>
                            <option value="Very Low">Very Low</option>
                            <option value="Low">Low</option>
                            <option value="Moderate">Moderate</option>
                            <option value="High">High</option>
                            <option value="Very High">Very High</option>
                          </CustomInput>
                        </InputGroup>
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i
                                className="ni ni-briefcase-24"
                                style={textColor}
                              />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="text"
                            id="occupation"
                            placeholder="Occupation"
                            value={occupation}
                            onChange={(e) => setOccupation(e.target.value)}
                            style={textColor}
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  </Row>

                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-badge" style={textColor} />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="allergies"
                        type="text"
                        value={allergies}
                        onClick={() => setIsallergiesModalOpen(true)}
                        style={{
                          ...textColor,
                          margin: "5px",
                          padding: "5px 10px",
                          border: "none",
                          cursor: "pointer",
                        }}
                      />
                    </InputGroup>
                  </FormGroup>
                  <Row>
                    <Col md="4">
                      <FormGroup>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="fa fa-smoking" style={textColor} />
                            </InputGroupText>
                          </InputGroupAddon>
                          <CustomInput
                            type="checkbox"
                            id="smoking"
                            label="Smoking"
                            checked={smoking}
                            onChange={() => setSmoking(!smoking)}
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="fa fa-beer" style={textColor} />
                            </InputGroupText>
                          </InputGroupAddon>
                          <CustomInput
                            type="checkbox"
                            id="drinking"
                            label="Drinking"
                            checked={drinking}
                            onChange={() => setDringking(!drinking)}
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="fa fa-lungs" style={textColor} />
                            </InputGroupText>
                          </InputGroupAddon>
                          <CustomInput
                            type="checkbox"
                            id="asthma"
                            label="Asthma"
                            checked={asthma}
                            onChange={() => setAsthma(!asthma)}
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  </Row>
                  <h6 className="heading-small text-muted mb-4">
                    Contact Info
                  </h6>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i
                                className="ni ni-mobile-button"
                                style={textColor}
                              />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Phone Number"
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            style={textColor}
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i
                                className="ni ni-square-pin"
                                style={textColor}
                              />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Residence"
                            type="text"
                            value={residence}
                            onChange={(e) => setResidence(e.target.value)}
                            style={textColor}
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>

                <div className="pl-lg-4"></div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <Modal
        isOpen={isallergiesModalOpen}
        onRequestClose={() => setIsallergiesModalOpen(false)}
        contentLabel="allergies Modal"
        style={{
          content: {
            maxWidth: "750px",
            margin: "0 auto",
            borderRadius: "20px",
            boxShadow: "2px 2px 8px gray",
          },
        }}
      >
        <h3 className="m-3 p-2">Select allergies (At most 3)</h3>
        <div style={{ textAlign: "center" }}>
          <>
            {allergiesEnum.map((spec, index) =>
              allergies && allergies.includes(spec) ? (
                <Button
                  key={index}
                  type="button"
                  color="info"
                  className="m-1"
                  onClick={() => handleallergiesUnselect(spec)}
                >
                  {spec}
                </Button>
              ) : (
                <Button
                  key={index}
                  type="button"
                  color="primary"
                  className="m-1"
                  outline
                  onClick={() => handleallergiesSelect(spec)}
                >
                  {spec}
                </Button>
              )
            )}
          </>
        </div>

        <div style={{ textAlign: "center", margin: "10px" }}>
          <Button
            color="warning"
            onClick={() => setIsallergiesModalOpen(false)}
          >
            Save & close
          </Button>
        </div>
      </Modal>
      )
    </>
  );
};

export default EditPatientProfile;
