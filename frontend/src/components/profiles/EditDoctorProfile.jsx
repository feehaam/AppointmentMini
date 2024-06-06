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
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Button,
  Modal,
} from "reactstrap";
import specializationList from "assets/data/enums/specializations";
import editDoctorProfileData from "assets/data/doctorprofile/editDoctorProfile";
import { isDoctor } from "scripts/accountInfo";
import AxiosInstance from "scripts/axioInstance";
import PhotoUpload from "scripts/PhotoUpload";

const EditDoctorProfile = () => {
  const navigate = useNavigate();
  if (!isDoctor()) navigate("/");
  const doctorId = localStorage.getItem("userId");
  console.log(doctorId);

  const textColor = {
    color: "#555",
  };

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [photo, setPhoto] = useState("");
  const [residence, setResidence] = useState("");
  const [bio, setBio] = useState("");
  const [experience, setExperience] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [qualifications, setQualifications] = useState([
    { name: "", institution: "", year: "" },
  ]);
  const [certifications, setCertifications] = useState([]);
  const [isSpecializationModalOpen, setIsSpecializationModalOpen] =
    useState(false);

  const [specialistList, setSpecialistList] = useState("");
  const [specCount, setSpecCount] = useState(0);

  const [existing, setExisting] = useState();
  const [spectList, setSpectList] = useState([]);
  const [success, setSuccess] = useState("");
  const [warning, setWarning] = useState("");

  useEffect(() => {
    if (doctorId === null) {
      return navigate("/");
    }
    AxiosInstance.get(`http://localhost:7200/doctors/existing-edit-data`)
      .then((response) => {
        console.log(response);
        setExisting(response.data);
      })
      .catch((error) => {
        console.error("Error fetching doctors:", error);
      });
  }, [doctorId]);

  useEffect(() => {
    setSpectList(specializationList);
  }, []);

  useEffect(() => {
    if (existing) {
      if (existing.firstName !== null) {
        setFirstName(existing.firstName);
      }
      if (existing.lastName !== null) {
        setLastName(existing.lastName);
      }
      if (existing.phoneNumber !== null) {
        setPhoneNumber(existing.phoneNumber);
      }
      if (existing.specialization !== null) {
        setSpecialization(existing.specialization);
      }
      if (existing.photo !== null) {
        setPhoto(existing.photo);
      }
      if (existing.residence !== null) {
        setResidence(existing.residence);
      }
      if (existing.bio !== null) {
        setBio(existing.bio);
      }
      if (existing.qualifications !== null) {
        setQualifications([...existing.qualifications]);
      }
      if (existing.certifications !== null) {
        setCertifications([...existing.certifications]);
      }
      if (existing.experience !== null) {
        setExperience(existing.experience);
      }
      if (existing.specialistList !== null) {
        setSpecialistList(existing.specializations);
        const count = existing.specializations
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s.length > 0).length;
        setSpecCount(count);
        console.log(count);
      }
    }
  }, [existing]);

  const handleAddQualification = () => {
    setQualifications([
      ...qualifications,
      { name: "", institution: "", year: "" },
    ]);
  };

  const handleSpecializationSelect = (spec) => {
    console.log(specialistList);
    console.log(specCount);
    if (specCount >= 3) return;
    let curList = specialistList;
    if (!curList.includes(spec)) {
      if (specCount > 0) curList = curList + ", ";
      curList = curList + spec;
      setSpecialistList(curList);
      setSpecCount(specCount + 1);
    }
  };

  const handleSpecializationUnselect = (spec) => {
    console.log(specialistList);
    console.log(specCount);
    if (specCount <= 0) return;
    let curList = specialistList;
    if (curList === undefined) return;
    if (curList.includes(spec + ", ")) {
      curList = curList.replace(spec + ", ", "");
      setSpecialistList(curList);
      setSpecCount(specCount - 1);
    } else if (curList.includes(", " + spec)) {
      curList = curList.replace(", " + spec, "");
      setSpecialistList(curList);
      setSpecCount(specCount - 1);
    } else {
      curList = curList.replace(spec, "");
      setSpecialistList(curList);
      setSpecCount(specCount - 1);
    }
    if (specCount === 0) {
      setSpecialistList("");
      setSpecCount(0);
    }
  };

  const handleARemoveQualification = () => {
    if (qualifications.length > 0) {
      const updatedQualifications = qualifications.slice(
        0,
        qualifications.length - 1
      );
      setQualifications(updatedQualifications);
    }
  };

  const handleAddCertification = () => {
    setCertifications([
      ...certifications,
      { name: "", issuingOrganization: "", year: "" },
    ]);
  };

  const handleARemoveCertification = () => {
    if (certifications.length > 0) {
      const updatedCertifications = certifications.slice(
        0,
        certifications.length - 1
      );
      setCertifications(updatedCertifications);
    }
  };

  const validate = () => {
    if (firstName.length < 2 || lastName.length < 2) {
      setAlertMessage(
        "First name and last name must be at least 2 characters long."
      );
      return false;
    }

    if (!specialistList || specialistList.length < 4) {
      setAlertMessage("Please specify your specialization correctly.");
      return false;
    }

    if (!residence || residence.length < 10) {
      setAlertMessage("Please provide your detailed residence information.");
      return false;
    }

    if (!photo) {
      setAlertMessage(
        "Select one profile photo of yours, it must contain clear face."
      );
      return false;
    }

    if (!bio || bio.length < 10) {
      setAlertMessage("Please write a bio describing yourself.");
      return false;
    }

    // Validate each qualification
    for (let i = 0; i < qualifications.length; i++) {
      const qualification = qualifications[i];

      if (qualification.name.length < 3) {
        setAlertMessage(
          `Title for qualification ${i + 1} must be at least 3 letters long.`
        );
        return false;
      }

      if (qualification.institution.length < 3) {
        setAlertMessage(
          `Institution for qualification ${
            i + 1
          } must be at least 3 letters long.`
        );
        return false;
      }

      if (!qualification.year) {
        setAlertMessage(`Please provide a year for qualification ${i + 1}.`);
        return false;
      }
    }

    // Validate each certification
    for (let i = 0; i < certifications.length; i++) {
      const certification = certifications[i];

      if (certification.name.length < 3) {
        setAlertMessage(
          `Title for certification ${i + 1} must be at least 3 letters long.`
        );
        return false;
      }

      if (certification.issuingOrganization.length < 3) {
        setAlertMessage(
          `Issuing organization for certification ${
            i + 1
          } must be at least 3 letters long.`
        );
        return false;
      }

      if (!certification.year) {
        setAlertMessage(`Please provide a year for certification ${i + 1}.`);
        return false;
      }
    }

    if (!experience || experience < 0) {
      setAlertMessage(`Please provide valid years of experience.`);
      return false;
    }

    setAlertMessage("");
    return true;
  };

  function handleUpdateProfile() {
    setWarning("");
    setSuccess("");
    let updatedProfileData = {
      firstName,
      lastName,
      phoneNumber,
      specialization: specialistList,
      residence,
      experience,
      photo: photo ? photo : null,
      bio,
      qualifications: qualifications.filter((qualification) => {
        return (
          qualification.name !== "" &&
          qualification.institution !== "" &&
          qualification.year !== ""
        );
      }),
      certifications: certifications.filter((certification) => {
        return (
          certification.name !== "" &&
          certification.issuingOrganization !== "" &&
          certification.year !== ""
        );
      }),
    };
    console.log(updatedProfileData);
    AxiosInstance.put(
      `http://localhost:7200/doctors/edit-profile`,
      updatedProfileData
    )
      .then((response) => {
        console.log(response);
        setSuccess(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      {existing && (
        <>
          <>
          <div
          className="header pb-7 pt-5 pt-lg-8 d-flex align-items-center"
          style={{
            backgroundImage:
              "url(" + require("../../assets/img/cover/health5.jpg") + ")",
            backgroundSize: "cover",
            backgroundPosition: "center top",
            width: "100%"
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
                        <Link to={"/health/doctors/" + doctorId}>
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
                      {warning && (
                        <div className="alert alert-danger">{warning}</div>
                      )}
                      {success && (
                        <div className="alert alert-success">{success}</div>
                      )}

                      {alertMessage && (
                        <div className="alert alert-danger" role="alert">
                          {alertMessage}
                        </div>
                      )}
                      <h6 className="heading-small text-muted mb-4">
                        Profile photo
                      </h6>
                      <Row className="justify-content-center">
                        <FormGroup>
                          <PhotoUpload url={photo} setUrl={setPhoto} />
                        </FormGroup>
                      </Row>
                      <h6 className="heading-small text-muted mb-4">
                        Personal info
                      </h6>
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

                      <Row>
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
                                placeholder="Experience (years)"
                                type="number"
                                value={experience}
                                onChange={(e) => setExperience(e.target.value)}
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
                                  <i className="ni ni-align-left-2" />
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input
                                type="textarea"
                                placeholder="Write your bio within 300 letters."
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                maxLength={300}
                                style={{
                                  minHeight: "100px",
                                  ...textColor,
                                }}
                              />
                            </InputGroup>
                          </FormGroup>
                        </Col>
                      </Row>

                      <h6 className="heading-small text-muted mb-4">
                        Qualifications and Certifications
                      </h6>
                      <FormGroup>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-badge" style={textColor} />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Specialization"
                            type="text"
                            value={specialistList}
                            onClick={() => setIsSpecializationModalOpen(true)}
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
                      <div>
                        <h5 style={textColor}>Qualifications</h5>
                        {qualifications.map((qualification, index) => (
                          <div key={index}>
                            <InputGroup className="input-group-alternative mb-1">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i
                                    className="ni ni-hat-3"
                                    style={textColor}
                                  />
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input
                                placeholder="Degree"
                                type="text"
                                value={qualification.name}
                                onChange={(e) => {
                                  const updatedQualifications = [
                                    ...qualifications,
                                  ];
                                  updatedQualifications[index].name =
                                    e.target.value;
                                  setQualifications(updatedQualifications);
                                }}
                                style={textColor}
                              />
                            </InputGroup>
                            <Row>
                              <Col md="8">
                                <InputGroup className="input-group-alternative mb-1">
                                  <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                      <i
                                        className="ni ni-building"
                                        style={textColor}
                                      />
                                    </InputGroupText>
                                  </InputGroupAddon>
                                  <Input
                                    placeholder="Institution"
                                    type="text"
                                    value={qualification.institution}
                                    onChange={(e) => {
                                      const updatedQualifications = [
                                        ...qualifications,
                                      ];
                                      updatedQualifications[index].institution =
                                        e.target.value;
                                      setQualifications(updatedQualifications);
                                    }}
                                    style={textColor}
                                  />
                                </InputGroup>
                              </Col>
                              <Col md="4">
                                <InputGroup className="input-group-alternative">
                                  <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                      <i
                                        className="ni ni-calendar-grid-58"
                                        style={textColor}
                                      />
                                    </InputGroupText>
                                  </InputGroupAddon>
                                  <Input
                                    placeholder="Year"
                                    type="number"
                                    value={qualification.year}
                                    onChange={(e) => {
                                      const updatedQualifications = [
                                        ...qualifications,
                                      ];
                                      updatedQualifications[index].year =
                                        e.target.value;
                                      setQualifications(updatedQualifications);
                                    }}
                                    style={textColor}
                                  />
                                </InputGroup>
                              </Col>
                            </Row>
                            <br></br>
                          </div>
                        ))}
                        <Row>
                          <Col>
                            <Button
                              color="primary"
                              type="button"
                              onClick={handleAddQualification}
                              outline
                            >
                              <i className="ni ni-fat-add" /> Add more
                              qualification
                            </Button>
                          </Col>
                          <Col>
                            {qualifications.length > 1 && (
                              <Button
                                color="warning"
                                type="button"
                                onClick={handleARemoveQualification}
                                outline
                              >
                                <i className="ni ni-fat-remove" /> Remove
                                qualification
                              </Button>
                            )}
                          </Col>
                        </Row>

                        <br></br>
                        <br></br>
                      </div>
                      <div>
                        <h5 style={textColor}>Certifications</h5>
                        {certifications.map((certification, index) => (
                          <div key={index}>
                            <InputGroup className="input-group-alternative mb-1">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i
                                    className="ni ni-badge"
                                    style={textColor}
                                  />
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input
                                placeholder="Title"
                                type="text"
                                value={certification.name}
                                onChange={(e) => {
                                  const updatedCertifications = [
                                    ...certifications,
                                  ];
                                  updatedCertifications[index].name =
                                    e.target.value;
                                  setCertifications(updatedCertifications);
                                }}
                                style={textColor}
                              />
                            </InputGroup>
                            <Row>
                              <Col md="8">
                                <InputGroup className="input-group-alternative mb-1">
                                  <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                      <i
                                        className="ni ni-building"
                                        style={textColor}
                                      />
                                    </InputGroupText>
                                  </InputGroupAddon>
                                  <Input
                                    placeholder="Issuing Organization"
                                    type="text"
                                    value={certification.issuingOrganization}
                                    onChange={(e) => {
                                      const updatedCertifications = [
                                        ...certifications,
                                      ];
                                      updatedCertifications[
                                        index
                                      ].issuingOrganization = e.target.value;
                                      setCertifications(updatedCertifications);
                                    }}
                                    style={textColor}
                                  />
                                </InputGroup>
                              </Col>
                              <Col md="4">
                                <InputGroup className="input-group-alternative">
                                  <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                      <i
                                        className="ni ni-calendar-grid-58"
                                        style={textColor}
                                      />
                                    </InputGroupText>
                                  </InputGroupAddon>
                                  <Input
                                    placeholder="Year" // Change from "expirationDate"
                                    type="number"
                                    value={certification.year}
                                    onChange={(e) => {
                                      const updatedCertifications = [
                                        ...certifications,
                                      ];
                                      updatedCertifications[index].year =
                                        e.target.value;
                                      setCertifications(updatedCertifications);
                                    }}
                                    style={textColor}
                                  />
                                </InputGroup>
                              </Col>
                            </Row>
                            <br></br>
                          </div>
                        ))}
                        <Row>
                          <Col>
                            <Button
                              color="primary"
                              type="button"
                              onClick={handleAddCertification}
                              outline
                            >
                              <i className="ni ni-fat-add" /> Add{" "}
                              {certifications.length === 0 ? "your " : "more "}{" "}
                              Certification
                            </Button>
                          </Col>
                          <Col>
                            {certifications.length > 0 && (
                              <Button
                                color="warning"
                                type="button"
                                onClick={handleARemoveCertification}
                                outline
                              >
                                <i className="ni ni-fat-remove" /> Remove
                                Certification
                              </Button>
                            )}
                          </Col>
                        </Row>
                      </div>
                    </Form>

                    <div className="pl-lg-4"></div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
          <Modal
            isOpen={isSpecializationModalOpen}
            onRequestClose={() => setIsSpecializationModalOpen(false)}
            contentLabel="Specialization Modal"
            style={{
              content: {
                maxWidth: "750px",
                margin: "0 auto",
                borderRadius: "20px",
                boxShadow: "2px 2px 8px gray",
              },
            }}
          >
            <h3 className="m-3 p-2">Select Specializations (At most 3)</h3>
            <div style={{ textAlign: "center" }}>
              <>
                {spectList.map((spec, index) =>
                  specialistList && specialistList.includes(spec) ? (
                    <Button
                      key={index}
                      type="button"
                      color="info"
                      className="m-1"
                      onClick={() => handleSpecializationUnselect(spec)}
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
                      onClick={() => handleSpecializationSelect(spec)}
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
                onClick={() => setIsSpecializationModalOpen(false)}
              >
                Save & close
              </Button>
            </div>
          </Modal>
        </>
      )}
    </>
  );
};

export default EditDoctorProfile;
