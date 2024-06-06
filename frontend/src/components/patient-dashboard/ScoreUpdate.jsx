import { useState } from "react";
import {
  Button,
  Col,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from "reactstrap";
import AxiosInstance from "scripts/axioInstance";

const ScoreUpdate = ({ id }) => {
  const [date, setDate] = useState();
  const [score, setScore] = useState();
  const inputStyle = { color: "#555" };
  const [success, setSuccess] = useState();
  const [warning, setWarning] = useState();
  const save = () => {
    setSuccess("");
    setWarning("");
    AxiosInstance.post(
      `http://localhost:7100/progress/add-score/${id}/${score}/${date}`
    )
      .then((response) => {
        setSuccess(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        setWarning(error.response.data.message);
      });
  };
  return (
    <>
      <Row>
        <Col>
          <div
            className="bg-success text-white"
            style={{ borderRadius: "5px", textAlign: "center" }}
          >
            {success}
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div
            className="bg-danger text-white"
            style={{ borderRadius: "5px", textAlign: "center" }}
          >
            {warning}
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col>
          <FormGroup>
            <InputGroup className="input-group-alternative mb-3">
              <InputGroupAddon addonType="prepend">
                <InputGroupText style={inputStyle}>
                  <i class="fa-solid fa-ranking-star"></i>
                </InputGroupText>
              </InputGroupAddon>
              <Input
                placeholder="Score"
                type="number"
                autoComplete="new-email"
                value={score}
                onChange={(e) => setScore(e.target.value)}
                style={inputStyle}
              />
            </InputGroup>
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <InputGroup className="input-group-alternative">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="ni ni-calendar-grid-58" style={inputStyle} />
                </InputGroupText>
              </InputGroupAddon>

              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholderText="Date of Birth"
              ></Input>
            </InputGroup>
          </FormGroup>
        </Col>
        <Col>
          <Button className="bg-primary text-white" onClick={save}>
            Add score
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default ScoreUpdate;
