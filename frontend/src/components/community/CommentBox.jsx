import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardText } from "reactstrap";
import AxiosInstance from "scripts/axioInstance";
import Comm from "./Comment";
import Translate from "components/internationalization/Translate";

const CommentBox = ({ comment, postId }) => {
  const [name, setName] = useState("Not Available");
  const [photo, setPhoto] = useState("");
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
            <Link to={link} style={{ fontWeight: "bold" }}>
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
          <CommentBox comment={comment} postId={postId} />
        </Card>
      </div>
    ));
  };

  return (
    <>
      {getUser(comment.userId)}
      <CardBody>
        <Translate text={comment.content} />
        <CardText>
          <Comm
            postId={postId}
            commentId={comment.id}
            text={"Reply"}
            time={comment.timeCreated}
          />
        </CardText>
      </CardBody>
      {comment.replies.length > 0 && (
        <div className="m-2 ml-3">{renderComments(comment.replies)}</div>
      )}
    </>
  );
};

export default CommentBox;
