import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";
import "./article-items.css";
import AxiosInstance from "scripts/axioInstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const ArticleItem = ({ st }) => {
  const [status, setStatus] = useState(st);
  const [name, setName] = useState('Not Available')
  const [photo, setPhoto] = useState('')

  const getUser = () => {
  const authorId = st.authorId;
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
      setPhoto(response.data.photoURL)
    })
    .catch((error) => {
      
    });
   

  return (
  <div className="container" style={{ margin: "10px" }}>
  <div className="row no-gutters">
    <div className="col">
      <Link to={link} style={{ fontWeight: "bold" }}>
       <i className="fa-solid fa-pen"></i> {name}
      </Link>
    </div>
  </div>
</div>


  );
};

  if (status !== null) {
    return (
      <div className="article-item-container">
        <Link to={"/health/posts/" + status.postId}>
          {status.photo ? (
            <img src={status.photo} alt="Status Photo" />
          ) : (
            <img
              src={process.env.PUBLIC_URL + "/community/postdefault.jpg"}
              alt="Alternative Photo"
              className="alt-photo"
            />
          )}
          <h1 className="article-title">{status.title}</h1>
        </Link>
        <Row>
          <Col>{getUser(status.authorId)}</Col>
          <Col className="article-info">
            <i className="fa-solid fa-clock"></i> {status.date}
          </Col>
        </Row>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default ArticleItem;
