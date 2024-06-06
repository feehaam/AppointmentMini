import { useState } from "react";
import {
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from "reactstrap";
import AxiosInstance from "scripts/axioInstance";

const Comm = ({ postId, commentId, text, time }) => {
  const [display, setDisplay] = useState(false);
  const [content, setContent] = useState("");

  const addComment = () => {
    if (content.trim() !== "") {
      const apiUrl = "http://localhost:7500/comments";
      const commentData = {
        content: content,
        parentPostId: postId,
        parentCommentId: commentId,
      };

      AxiosInstance.post(apiUrl, commentData)
        .then((response) => {
          window.location.reload(true);
        })
        .catch((error) => {
          console.error("Error submitting comment:", error);
        });
    }
  };

  return (
    <>
      <Row>
        <Col>{time}</Col>
        <Col style={{ textAlign: "right" }}>
          <div style={{ display: "inline-block" }}>
            <div
              onClick={() => setDisplay(!display)}
              style={{
                border: "1px solid #ddd",
                padding: "5px",
                borderRadius: "10px",
                cursor: "pointer",
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
              }}
            >
              {text}
            </div>
          </div>
        </Col>
      </Row>
      {display && (
        <Row>
          <InputGroup className="input-group-alternative mt-2">
            <Input
              type="textarea"
              placeholder={`Write your ${text} here.`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={10000}
              style={{
                minHeight: "100px",
                color: "#333",
              }}
            />
            <InputGroupAddon addonType="prepend" onClick={addComment}>
              <InputGroupText
                className="bg-primary"
                style={{ cursor: "pointer" }}
              >
                <i className="fa fa-paper-plane text-white" />
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </Row>
      )}
    </>
  );
};

export default Comm;
