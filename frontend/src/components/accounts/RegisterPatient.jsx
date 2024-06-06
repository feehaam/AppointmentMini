import React, { useState } from "react";
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
  CustomInput,
} from "reactstrap";
import { Link } from "react-router-dom";
import AxiosInstance from "scripts/axioInstance";

const inputStyle = {
  color: "#555",
};

const RegisterPatient = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [gender, setGender] = useState("");
  const [age, setAge] = useState(null);
  const [warning, setWarning] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = () => {
    setWarning("");
    setSuccess("");
    const validationResult = validateData();
    if (!validationResult.isValid) {
      setWarning(validationResult.error);
      return;
    }
    const url = "http://localhost:7100/patients/register";

    const requestBody = {
      firstName,
      lastName,
      email,
      gender,
      password,
      age: parseInt(age),
    };

    AxiosInstance.post(url, requestBody)
      .then((response) => {
        setSuccess(
          response.data +
            ". Go to login page to verify and sign into your account."
        );
        setFirstName("");
        setLastName("");
        setEmail("");
        setGender("");
        setPassword("");
        setConfirmPassword("");
        setAge("");
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  const validateData = () => {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !gender ||
      !age
    ) {
      return { isValid: false, error: "Please fill in all fields." };
    }
    if (password !== confirmPassword) {
      return { isValid: false, error: "Passwords do not match." };
    }

    return { isValid: true, error: "" };
  };

  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <h3 style={{ textTransform: "uppercase" }}>
                Register as a new patient
              </h3>
            </div>
            <Form role="form">
              {warning && <div className="alert alert-danger">{warning}</div>}
              {success && <div className="alert alert-success">{success}</div>}
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText style={inputStyle}>
                      <i className="ni ni-circle-08" style={inputStyle} />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="First name"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    style={inputStyle}
                  />
                </InputGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText style={inputStyle}>
                      <i className="ni ni-circle-08" style={inputStyle} />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Last name"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    style={inputStyle}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText style={inputStyle}>
                      <i className="ni ni-email-83" style={inputStyle} />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={inputStyle}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-single-02" style={inputStyle} />
                    </InputGroupText>
                  </InputGroupAddon>
                  <CustomInput
                    type="select"
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    style={inputStyle}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </CustomInput>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText style={inputStyle}>
                      <i
                        className="ni ni-calendar-grid-58"
                        style={inputStyle}
                      />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Age"
                    type="number"
                    autoComplete="new-email"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    style={inputStyle}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText style={inputStyle}>
                      <i
                        className="ni ni-lock-circle-open"
                        style={inputStyle}
                      />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={inputStyle}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText style={inputStyle}>
                      <i
                        className="ni ni-lock-circle-open"
                        style={inputStyle}
                      />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Re-type password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={inputStyle}
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
                  disabled={!agreeTerms} // Disable the button if terms are not agreed
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
    </>
  );
};

export default RegisterPatient;
