import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Container,
  Row,
  Col,
  Input,
  Button,
  CardFooter,
} from "reactstrap";
import AxiosInstance from "scripts/axioInstance";
import StatusItem from "./StatusItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import Translate from "components/internationalization/Translate";
import Comm from "./Comment";
import CommentBox from "./CommentBox";

const PostDisplay = () => {
  const [post, setPost] = useState(null);
  const { postId } = useParams();
  const [name, setName] = useState("Not Available");
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    const apiUrl = `http://localhost:7500/posts/${postId}`;

    AxiosInstance.get(apiUrl)
      .then((response) => {
        setPost(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching post:", error);
      });
  }, []);

  const getUser = (authorId) => {
    const adminUrl = `http://localhost:5100/access/minimal-info/${authorId}`;
    const patientUrl = `http://localhost:7100/patients/minimal-info/${authorId}`;
    const doctorUrl = `http://localhost:7200/doctors/minimal-info/${authorId}`;

    let link = "/health/";

    let apiUrl = "";
    if (authorId[0] === "P") {
      link += "patients/" + authorId;
      apiUrl = patientUrl;
    } else if (authorId[0] === "D") {
      link += "doctors/" + authorId;
      apiUrl = doctorUrl;
    } else if (authorId[0] === "A") {
      link = "#";
      apiUrl = adminUrl;
    } else {
      link = "#";
    }

    AxiosInstance.get(apiUrl)
      .then((response) => {
        const fullName = response.data.firstName + " " + response.data.lastName;
        setName(fullName);
        setPhoto(response.data.photoURL);
      })
      .catch((error) => {});

    return (
      <div
        className="container"
        style={{ marginTop: "10px", marginBottom: "-10px" }}
      >
        <div className="row no-gutters">
          <div className="col-auto">
            {photo ? (
              <span className="avatar avatar-sm rounded-circle">
                <img alt="User" src={photo} />
              </span>
            ) : (
              <FontAwesomeIcon icon={faUserCircle} size="lg" className="mr-2" />
            )}
          </div>
          <div className="col m-2">
            <Link to={link} style={{ fontWeight: "bold", cursor: "pointer" }}>
              {name}
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const renderComments = (comments) => {
    return comments.map((comment) => (
      <div key={comment.id}>
        <Card style={{ borderColor: "#ccc", marginBottom: "10px" }}>
          <CommentBox comment={comment} postId={post.postId} />
        </Card>
      </div>
    ));
  };

  return (
    <>
      <div
        className="header pb-5 pt-2 pt-lg-8 d-flex align-items-center"
        style={{
          height: "100px",
          backgroundImage:
            "url(" + require("../../assets/img/cover/community1.png") + ")",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        <span className="mask bg-gradient-default opacity-6" />
        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Link to={"/health/community"}>
              <h1 className="display-2 opacity-7" style={{ color: "white" }}>
                <i class="fa-solid fa-chevron-left"></i> Community
              </h1>
            </Link>
          </Row>
        </Container>
      </div>
      <Container>
        {post ? (
          <div
            style={{
              border: "1px solid #ddf",
              margin: "5px",
              padding: "5px",
              borderRadius: "5px",
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
              backgroundColor: "white",
            }}
          >
            {getUser(post.userId)}
            <hr></hr>
            {post.type !== "status" && (
              <div style={{ textAlign: "center" }} className="h1">
                {post.title}
              </div>
            )}
            {post.photoURL && (
              <img
                src={post.photoURL}
                alt="Status Photo"
                style={{
                  maxWidth: "98%",
                  display: "block",
                  margin: "0 auto",
                  maxHeight: "600px",
                  borderRadius: "5px",
                }}
              />
            )}
            <div
              style={{
                padding: "10px",
                borderBottom: "1px solid #eee",
                color: "#555", // Set text color to #555
                textAlign: "justify", // Justify the text
              }}
            >
              <Translate text={post.content} />
              <div style={{ marginTop: "10px" }}>{post.date}</div>
            </div>
            <Row
              style={{
                borderBottom: "1px solid #eee",
                marginLeft: "5px",
                marginRight: "5px",
              }}
            >
              <Col style={{ textAlign: "right" }}></Col>
            </Row>
            <Row>
              <Col
                style={{
                  padding: "10px",
                  fontWeight: "bold",
                  marginLeft: "20px",
                }}
              >
                <Row>
                  <Col>
                    <div>
                      {post.comments.length === 0
                        ? "No comments yet"
                        : post.comments.length + " comments"}
                    </div>
                  </Col>
                  <Col className="mr-4">
                    <Comm postId={post.postId} commentId={0} text={"Comment"} />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              {post.comments.length > 0 && (
                <CardBody>
                  <div className="mb-2">{renderComments(post.comments)}</div>
                </CardBody>
              )}
            </Row>
          </div>
        ) : (
          "Loading..."
        )}
      </Container>
    </>
  );
};

export default PostDisplay;
