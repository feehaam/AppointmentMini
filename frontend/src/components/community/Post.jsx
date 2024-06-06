import { useState } from "react";
import {
  Button,
  Col,
  Container,
  CustomInput,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from "reactstrap";
import PhotoUpload2 from "scripts/PhotoUpload2";
import { isDoctor } from "scripts/accountInfo";
import { isAdmin } from "scripts/accountInfo";
import { isPatient } from "scripts/accountInfo";
import AxiosInstance from "scripts/axioInstance";

const Post = () => {
  const [type, setType] = useState("status");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState("");
  const [alert, setAlert] = useState(false);
  const [success, setSuccess] = useState("");
  const textColor = { color: "#555" };

  const sharePost = () => {
    setAlert("");
    setSuccess("");
    setAlert("");
    const status = {
      title,
      content,
      photo:
        photo === null || photo === undefined || photo === "" ? null : photo,
      type,
    };
    AxiosInstance.post(
      `http://localhost:7500/posts`, status
    )
      .then((response) => {
        setSuccess(response.data)
        console.log(response);
      })
      .catch((error) => {
        setAlert(error.response.data.message)
        console.error(error);
      });
  };

  return (
    <>
      <Container className="mb-4">
        {type !== "status" && type !== "feedback" && (
          <FormGroup>
            <InputGroup className="input-group-alternative mb-3">
              <InputGroupAddon addonType="prepend">
                <InputGroupText style={textColor}>
                  <i className="ni ni-ruler-pencil" style={textColor} />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                placeholder={"Write a title for " + type}
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={textColor}
              />
            </InputGroup>
          </FormGroup>
        )}
        <FormGroup style={{ border: "1px solid #eee" }}>
          {photo && (
            <div style={{ textAlign: "center" }}>
              <img
                src={photo}
                alt="Selected Photo"
                style={{
                  width: "150px",
                  height: "auto",
                  border: "1px solid #ccc",
                  padding: "2px",
                  marginBottom: "10px",
                  borderRadius: "20px",
                }}
              />
            </div>
          )}
          <InputGroup className="input-group-alternative">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="ni ni-align-left-2" />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              type="textarea"
              placeholder={"Write your " + type.toLowerCase() + " here."}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={10000}
              style={{
                minHeight: "100px",
                ...textColor,
              }}
            />
          </InputGroup>
        </FormGroup>
        <Row>
          <Col>
              
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <PhotoUpload2 url={photo} setUrl={setPhoto} />
          </Col>
          <Col>
            <InputGroup className="input-group-alternative">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="ni ni-bold-down" style={textColor} />
                </InputGroupText>
              </InputGroupAddon>
              <CustomInput
                type="select"
                id="gender"
                value={type}
                onChange={(e) => setType(e.target.value)}
                style={textColor}
              >
                <option value="status">Status</option>
                {isPatient() && <option value="feedback">Feedback</option>}
                {(isDoctor() || isAdmin()) && <>
                  <option value="article">Article</option>
                <option value="firstaid">First Aid</option></>}
                {isAdmin() && <option value="faq">FAQ</option>}
              </CustomInput>
            </InputGroup>
          </Col>
        </Row>
        {success && <div className="alert alert-success">{success}</div>}
        {alert && (
          <div className="alert alert-danger">{alert}</div>
        )}
        <Button style={{ width: "100%" }} color="primary" onClick={sharePost}>
          Post your {type}
        </Button>
      </Container>
    </>
  );
};
export default Post;
