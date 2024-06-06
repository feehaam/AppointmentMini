import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
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

const VerifyAccount = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [email, setEmail] = useState(searchParams.get("email") || "");
  const [otp, setOtp] = useState("");

  const handleVerify = () => {};

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [location.search]);

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent">
            <div className="text-muted text-center mt-2">
              <h3 style={{ textTransform: "uppercase" }}>
                Verify Your Account
              </h3>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Enter your email"
                    type="email"
                    autoComplete="new-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-key-25" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Enter your OTP"
                  type="number"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </InputGroup>
              <div className="text-right">
                <Button
                  className="my-2"
                  color="primary"
                  type="button"
                  onClick={handleVerify}
                >
                  Verify
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

export default VerifyAccount;
