import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import { useState, useEffect } from "react";
import AxiosInstance from "scripts/axioInstance";

const ForgottenPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [timer, setTimer] = useState(30);
  const [showPassword, setShowPassword] = useState(false);
  const [warning, setWarning] = useState("");
  const [success, setSuccess] = useState("");

  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  const handleSendOTP = () => {
    if (!validateEmail(email)) {
      setWarning("Write email correctly.");
      return;
    }
    setWarning("");

    setIsOtpSent(true);
    const url = "http://localhost:5100/access/generate-otp/" + email;
    AxiosInstance.post(url, "")
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        setWarning(error.response.data.message);
      });
    const countdown = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);
    setTimeout(() => {
      clearInterval(countdown);
      setIsOtpSent(false);
      setTimer(30);
    }, 30000);
  };

  useEffect(() => {
    if (timer === 0) {
      setIsOtpSent(false);
    }
  }, [timer]);

  const isResetButtonDisabled = !otp || !password || !confirmPassword;

  const handleResetPassword = () => {
    setSuccess("");
    setWarning("");
    const url = "http://localhost:5100/recovery/reset-password";
    if (!email || !otp || !password || !validateEmail(email)) {
      setWarning("Fill up the fields correctly.");
      return;
    }
    if (password !== confirmPassword) {
      setWarning("Password in both fields must match.");
      return;
    }
    let resetReq = {
      email: email,
      newPassword: password,
      otp: !otp || otp == 0 ? 0 : otp,
    };
    console.log(resetReq);
    AxiosInstance.put(url, resetReq)
      .then((result) => {
        if (result.status === 200) {
          console.log(result);
          setSuccess(
            "Your password has been reset. Now you can go to login page and sign in!"
          );
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setOtp("");
        }
      })
      .catch((error) => {
        console.log(error);
        setWarning(error.response.data.message);
      });
  };

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent">
            <div className="text-muted text-center mt-2">
              <h3 style={{ textTransform: "uppercase" }}>Reset Password</h3>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form">
              {warning && <div className="alert alert-danger">{warning}</div>}
              {success && <div className="alert alert-success">{success}</div>}
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup className="mb-3">
                <div className="text-right">
                  <Button
                    className="mb-3"
                    color="primary"
                    type="button"
                    onClick={handleSendOTP}
                    disabled={isOtpSent}
                  >
                    {isOtpSent
                      ? `OTP Sent. Resend OTP in ${timer}s`
                      : "Send OTP"}
                  </Button>
                </div>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-key-25" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="OTP"
                    type="number"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="New Password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Confirm Password"
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
              <div className="text-right">
                <Button
                  className="my-2"
                  color="primary"
                  type="button"
                  onClick={handleResetPassword}
                  disabled={isResetButtonDisabled}
                >
                  Reset Password
                </Button>
              </div>
            </Form>
            <br></br>
            <small>
              <Link to="/public/login">Go back to login</Link>
            </small>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default ForgottenPassword;
