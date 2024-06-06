import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Container,
  CardHeader,
} from "reactstrap";
import { isAdmin } from "scripts/accountInfo";
import AxiosInstance from "scripts/axioInstance"; // Import your AxiosInstance

const textColor = {
  color: "#555",
};

const RegisterAdmin = () => {
  const navigate = useNavigate();
  if (!isAdmin()) {
    navigate("/");
  }
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [warning, setWarning] = useState("");
  const [success, setSuccess] = useState(false);

  const handleRegister = () => {
    if (!validateInputs()) {
      return;
    }

    const url = "http://localhost:5100/account/create-admin-account";
    const adminData = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    };

    AxiosInstance.post(url, adminData)
      .then((result) => {
        if (result.status === 200) {
          setSuccess(true);
          setWarning("");
        }
      })
      .catch((error) => {
        setSuccess(false);
        setWarning(error.response.data.message);
      });
  };

  const validateInputs = () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setWarning("All fields are required.");
      return false;
    }

    if (password !== confirmPassword) {
      setWarning("Passwords do not match.");
      return false;
    }

    setWarning("");
    return true;
  };

  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "150px",
          backgroundImage:
            "url(" + require("../../assets/img/cover/adminbg.jpg") + ")",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        <span className="mask bg-gradient-default opacity-6" />
      </div>
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1 center" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">
                      <b>Create a new admin account</b>
                    </h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form role="form">
                  {warning && (
                    <div className="alert alert-danger">{warning}</div>
                  )}
                  {success && (
                    <div className="alert alert-success">{success}</div>
                  )}
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
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
                    <InputGroup className="input-group-alternative mb-3">
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
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-email-83" style={textColor} />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
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
                          <i
                            className="ni ni-lock-circle-open"
                            style={textColor}
                          />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Password"
                        type={showPassword ? "text" : "password"}
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
                          <i
                            className="ni ni-lock-circle-open"
                            style={textColor}
                          />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Re-type password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
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
                      style={textColor}
                    >
                      <span className="text-muted">Show password</span>
                    </label>
                  </div>
                  <br></br>
                  <div className="text-center">
                    <Button
                      className="mb-3"
                      color="primary"
                      type="button"
                      onClick={handleRegister}
                    >
                      Create account
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RegisterAdmin;
