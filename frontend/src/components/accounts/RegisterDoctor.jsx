import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Label,
  CustomInput,
} from "reactstrap";
import specializationList from "assets/data/enums/specializations";
import AxiosInstance from "scripts/axioInstance";
import PhotoUpload from "scripts/PhotoUpload";

const textColor = {
  color: "#555",
};

const RegisterDoctor = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState(""); // Retype password state
  const [showPassword, setShowPassword] = useState(false); // Show password state
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date()); // Initialize with a default date
  const [photo, setPhoto] = useState("");
  const [nid, setNid] = useState("");
  const [residence, setResidence] = useState("");
  const [bio, setBio] = useState("");
  const [qualifications, setQualifications] = useState([
    { name: "", institution: "", year: "" },
  ]);
  const [certifications, setCertifications] = useState([]);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [experience, setExperience] = useState(null);
  const [license, setLicense] = useState(null);
  const [isSpecializationModalOpen, setIsSpecializationModalOpen] =
    useState(false);

  const [specialistList, setSpecialistList] = useState("");
  const [specCount, setSpecCount] = useState(0);
  const [warning, setWarning] = useState("");
  const [success, setSuccess] = useState("");

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

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    console.log(selectedDate);
    setDateOfBirth(selectedDate);
  };

  const validate = () => {
    // Check if first name and last name are at least 2 characters long
    if (firstName.length < 2 || lastName.length < 2) {
      setAlertMessage(
        "First name and last name must be at least 2 characters long."
      );
      return false;
    }

    // Check if email is a valid email address
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      setAlertMessage("Please enter a valid email address.");
      return false;
    }

    // Check if password is at least 6 characters long
    if (password.length < 6) {
      setAlertMessage("Password must be at least 6 characters long.");
      return false;
    }

    // Check if passwords match
    if (password !== retypePassword) {
      setAlertMessage("Passwords doesn't match.");
      return false;
    }

    // Check if the date of birth is at least 18 years ago
    const birthDate = new Date(dateOfBirth);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - birthDate.getFullYear();
    if (
      currentDate.getMonth() < birthDate.getMonth() ||
      (currentDate.getMonth() === birthDate.getMonth() &&
        currentDate.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    if (age < 18) {
      setAlertMessage("You must be at least 18 years old.");
      return false;
    }

    if (!phoneNumber || phoneNumber.length < 6) {
      setAlertMessage(
        "Invalid phone number, please provide your phone number."
      );
      return false;
    }

    if (!gender || gender === "") {
      setAlertMessage("Please select your gender.");
      return false;
    }

    if (!specialistList || specialistList.length < 4) {
      setAlertMessage("Please specify your specialization correctly.");
      return false;
    }

    if (!nid || nid.length < 8) {
      setAlertMessage(
        "Invalid NID, please enter your National ID number correctly."
      );
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

    if (experience > age - 16) {
      setAlertMessage(
        `Provide correct experience data, too young to have ${experience} years of experience in ${age} years age.`
      );
      return false;
    }

    if (!license || license.length < 4) {
      setAlertMessage(`Please provide valid license.`);
      return false;
    }

    setAlertMessage("");
    return true;
  };

  const handleRegister = () => {
    setWarning("");
    setSuccess("");
    window.scrollTo(0, 0);
    const doctorData = {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      gender,
      specialization: specialistList,
      dateOfBirth,
      nid,
      residence,
      bio,
      qualifications,
      certifications,
      photo,
      experience,
      license,
    };
    if (!validate()) {
      return;
    }
    const url = "http://localhost:7200/doctors/register";
    AxiosInstance.post(url, doctorData)
      .then((response) => {
        console.log(response);
        setSuccess(
          response.data +
            ". Go to login page to verify and sign into your account."
        );
      })
      .catch((error) => {
        console.log(error);
        // setWarning(error.response.data.message);
      });
  };

  return (
    <>
      <Col lg="8" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <h3 style={{ textTransform: "uppercase" }}>
                Register as a new doctor
              </h3>
            </div>
            {alertMessage && (
              <div className="alert alert-danger" role="alert">
                {alertMessage}
              </div>
            )}
            <Form role="form">
              <p>Account info</p>
              {warning && <div className="alert alert-danger">{warning}</div>}
              {success && <div className="alert alert-success">{success}</div>}
              <Row>
                <Col md="6">
                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-circle-08" style={textColor} />
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
                          <i className="ni ni-circle-08" style={textColor} />
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
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" style={textColor} />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    className="text text"
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={textColor}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" style={textColor} />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type={showPassword ? "text" : "password"} // Toggle input type based on showPassword state
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={textColor}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" style={textColor} />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Retype Password"
                    type={showPassword ? "text" : "password"} // Toggle input type based on showPassword state
                    autoComplete="new-password"
                    value={retypePassword}
                    onChange={(e) => setRetypePassword(e.target.value)}
                    style={textColor}
                  />
                </InputGroup>
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id="customCheckRegister"
                  type="checkbox"
                  onChange={() => setShowPassword(!showPassword)}
                />
                <label
                  className="custom-control-label"
                  htmlFor="customCheckRegister"
                >
                  <span className="text-muted">Show password</span>
                </label>
              </div>
              <br></br>
              <p>Personal details</p>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-mobile-button" style={textColor} />
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
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-single-02" style={textColor} />
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
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-calendar-grid-58" style={textColor} />
                    </InputGroupText>
                  </InputGroupAddon>

                  <Input
                    type="date"
                    onChange={handleDateChange}
                    placeholderText="Date of Birth"
                  ></Input>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <PhotoUpload url={photo} setUrl={setPhoto} />
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-badge" style={textColor} />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="NID"
                    type="number"
                    value={nid}
                    onChange={(e) => setNid(e.target.value)}
                    style={textColor}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-square-pin" style={textColor} />
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
              <br></br>
              <p>Fileds and expertises</p>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-briefcase-24" style={textColor} />
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
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-check-bold" style={textColor} />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Medical License Number"
                    type="text"
                    value={license}
                    onChange={(e) => setLicense(e.target.value)}
                    style={textColor}
                  />
                </InputGroup>
              </FormGroup>
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
                      backgroundColor: specialization ? "#3498db" : "#f9f9f9",
                      color: specialization ? "white" : "#555",
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
                          <i className="ni ni-hat-3" style={textColor} />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Degree"
                        type="text"
                        value={qualification.name}
                        onChange={(e) => {
                          const updatedQualifications = [...qualifications];
                          updatedQualifications[index].name = e.target.value;
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
                              <i className="ni ni-building" style={textColor} />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Institution"
                            type="text"
                            value={qualification.institution}
                            onChange={(e) => {
                              const updatedQualifications = [...qualifications];
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
                              const updatedQualifications = [...qualifications];
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
                      <i className="ni ni-fat-add" /> Add more qualification
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
                        <i className="ni ni-fat-remove" /> Remove qualification
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
                          <i className="ni ni-badge" style={textColor} />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Title"
                        type="text"
                        value={certification.name}
                        onChange={(e) => {
                          const updatedCertifications = [...certifications];
                          updatedCertifications[index].name = e.target.value;
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
                              <i className="ni ni-building" style={textColor} />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Issuing Organization"
                            type="text"
                            value={certification.issuingOrganization}
                            onChange={(e) => {
                              const updatedCertifications = [...certifications];
                              updatedCertifications[index].issuingOrganization =
                                e.target.value;
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
                              const updatedCertifications = [...certifications];
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
                        <i className="ni ni-fat-remove" /> Remove Certification
                      </Button>
                    )}
                  </Col>
                </Row>
              </div>
              <br></br>
              <Row className="my-4">
                <Col xs="12">
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id="customCheckAgree"
                      type="checkbox"
                      onChange={() => setAgreeTerms(!agreeTerms)}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheckAgree"
                    >
                      <span className="text-muted">
                        I agree with the{" "}
                        <Link to="/terms">Terms & conditions</Link>
                      </span>
                    </label>
                  </div>
                </Col>
              </Row>
              <div className="text-center">
                <Button
                  className="mb-3"
                  color="primary"
                  type="button"
                  onClick={handleRegister}
                  disabled={!agreeTerms}
                >
                  Create account
                </Button>
              </div>
            </Form>
            <small>
              Already have an account?{" "}
              <Link to="/public/login">
                <b>Sign in now</b>
              </Link>
            </small>
          </CardBody>
        </Card>
      </Col>
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
        <h3>Select Specializations (At most 3)</h3>
        <hr></hr>
        <div style={{ textAlign: "center" }}>
          {specializationList.map((spec, index) =>
            specialistList.includes(spec) ? (
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
  );
};

export default RegisterDoctor;
