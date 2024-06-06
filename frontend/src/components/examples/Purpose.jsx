import React from "react";
import { Container, Row, Col } from "reactstrap";

const Purpose = () => {
  const landingPageStyle = {};
  const siteNameStyle = {
    fontSize: "2.5em",
    textAlign: "center",
    marginBottom: "30px",
    color: "white",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
  };

  const mottoStyle = {
    fontSize: "1em",
    fontFamily: "cursive",
  };

  const rotatedColStyle = {
    transform: "rotate(-5deg)",
  };

  return (
    <Container fluid style={landingPageStyle}>
      <Row className="justify-content-center">
        <Col xs="12">
          <h1 style={siteNameStyle}>
            EA Healthcare
            <br />
            <span style={mottoStyle}>{'"Your Health, Our Concern"'}</span>
          </h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col
          xs="3"
          className="m-2 bg-dark"
          style={{
            transform: "rotate(-5deg)",
            borderRadius: "10px",
            color: "#bbb",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          }}
        >
          <h2
            style={{
              color: "#aaaaff",
              padding: "5px",
              borderBottom: "1px solid #555",
            }}
          >
            <b style={{ color: "white", margin: "3px" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-pin"
                viewBox="0 0 16 16"
              >
                <path d="M4.146.146A.5.5 0 0 1 4.5 0h7a.5.5 0 0 1 .5.5c0 .68-.342 1.174-.646 1.479-.126.125-.25.224-.354.298v4.431l.078.048c.203.127.476.314.751.555C12.36 7.775 13 8.527 13 9.5a.5.5 0 0 1-.5.5h-4v4.5c0 .276-.224 1.5-.5 1.5s-.5-1.224-.5-1.5V10h-4a.5.5 0 0 1-.5-.5c0-.973.64-1.725 1.17-2.189A5.921 5.921 0 0 1 5 6.708V2.277a2.77 2.77 0 0 1-.354-.298C4.342 1.674 4 1.179 4 .5a.5.5 0 0 1 .146-.354zm1.58 1.408-.002-.001.002.001m-.002-.001.002.001A.5.5 0 0 1 6 2v5a.5.5 0 0 1-.276.447h-.002l-.012.007-.054.03a4.922 4.922 0 0 0-.827.58c-.318.278-.585.596-.725.936h7.792c-.14-.34-.407-.658-.725-.936a4.915 4.915 0 0 0-.881-.61l-.012-.006h-.002A.5.5 0 0 1 10 7V2a.5.5 0 0 1 .295-.458 1.775 1.775 0 0 0 .351-.271c.08-.08.155-.17.214-.271H5.14c.06.1.133.191.214.271a1.78 1.78 0 0 0 .37.282" />
              </svg>
            </b>
            Patient-Centric Approach
          </h2>
          <p>We prioritize your needs, providing a patient-centric platform.</p>
        </Col>
        <Col
          xs="3"
          className="m-2 bg-dark"
          style={{
            borderRadius: "10px",
            color: "#bbb",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          }}
        >
          <h2
            style={{
              color: "#aaaaff",
              padding: "5px",
              borderBottom: "1px solid #555",
            }}
          >
            <b style={{ color: "white", margin: "3px" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-pin"
                viewBox="0 0 16 16"
              >
                <path d="M4.146.146A.5.5 0 0 1 4.5 0h7a.5.5 0 0 1 .5.5c0 .68-.342 1.174-.646 1.479-.126.125-.25.224-.354.298v4.431l.078.048c.203.127.476.314.751.555C12.36 7.775 13 8.527 13 9.5a.5.5 0 0 1-.5.5h-4v4.5c0 .276-.224 1.5-.5 1.5s-.5-1.224-.5-1.5V10h-4a.5.5 0 0 1-.5-.5c0-.973.64-1.725 1.17-2.189A5.921 5.921 0 0 1 5 6.708V2.277a2.77 2.77 0 0 1-.354-.298C4.342 1.674 4 1.179 4 .5a.5.5 0 0 1 .146-.354zm1.58 1.408-.002-.001.002.001m-.002-.001.002.001A.5.5 0 0 1 6 2v5a.5.5 0 0 1-.276.447h-.002l-.012.007-.054.03a4.922 4.922 0 0 0-.827.58c-.318.278-.585.596-.725.936h7.792c-.14-.34-.407-.658-.725-.936a4.915 4.915 0 0 0-.881-.61l-.012-.006h-.002A.5.5 0 0 1 10 7V2a.5.5 0 0 1 .295-.458 1.775 1.775 0 0 0 .351-.271c.08-.08.155-.17.214-.271H5.14c.06.1.133.191.214.271a1.78 1.78 0 0 0 .37.282" />
              </svg>
            </b>
            Innovative Telemedicine
          </h2>
          <p>
            Embrace the future of healthcare with our telemedicine services.
            Consult with doctors through secure video calls.
          </p>
        </Col>
        <Col
          xs="3"
          className="m-2 bg-dark"
          style={{
            transform: "rotate(5deg)",
            borderRadius: "10px",
            color: "#bbb",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          }}
        >
          <h2
            style={{
              color: "#aaaaff",
              padding: "5px",
              borderBottom: "1px solid #555",
            }}
          >
            <b style={{ color: "white", margin: "3px" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-pin"
                viewBox="0 0 16 16"
              >
                <path d="M4.146.146A.5.5 0 0 1 4.5 0h7a.5.5 0 0 1 .5.5c0 .68-.342 1.174-.646 1.479-.126.125-.25.224-.354.298v4.431l.078.048c.203.127.476.314.751.555C12.36 7.775 13 8.527 13 9.5a.5.5 0 0 1-.5.5h-4v4.5c0 .276-.224 1.5-.5 1.5s-.5-1.224-.5-1.5V10h-4a.5.5 0 0 1-.5-.5c0-.973.64-1.725 1.17-2.189A5.921 5.921 0 0 1 5 6.708V2.277a2.77 2.77 0 0 1-.354-.298C4.342 1.674 4 1.179 4 .5a.5.5 0 0 1 .146-.354zm1.58 1.408-.002-.001.002.001m-.002-.001.002.001A.5.5 0 0 1 6 2v5a.5.5 0 0 1-.276.447h-.002l-.012.007-.054.03a4.922 4.922 0 0 0-.827.58c-.318.278-.585.596-.725.936h7.792c-.14-.34-.407-.658-.725-.936a4.915 4.915 0 0 0-.881-.61l-.012-.006h-.002A.5.5 0 0 1 10 7V2a.5.5 0 0 1 .295-.458 1.775 1.775 0 0 0 .351-.271c.08-.08.155-.17.214-.271H5.14c.06.1.133.191.214.271a1.78 1.78 0 0 0 .37.282" />
              </svg>
            </b>
            Efficient Appointment Scheduling
          </h2>
          <p>
            Say goodbye to long waiting times. Experience hassle-free scheduling
            with our booking system.
          </p>
        </Col>
        <Col
          xs="3"
          className="m-2 bg-dark"
          style={{
            transform: "rotate(5deg)",
            borderRadius: "10px",
            color: "#bbb",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          }}
        >
          <h2
            style={{
              color: "#aaaaff",
              padding: "5px",
              borderBottom: "1px solid #555",
            }}
          >
            <b style={{ color: "white", margin: "3px" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-pin"
                viewBox="0 0 16 16"
              >
                <path d="M4.146.146A.5.5 0 0 1 4.5 0h7a.5.5 0 0 1 .5.5c0 .68-.342 1.174-.646 1.479-.126.125-.25.224-.354.298v4.431l.078.048c.203.127.476.314.751.555C12.36 7.775 13 8.527 13 9.5a.5.5 0 0 1-.5.5h-4v4.5c0 .276-.224 1.5-.5 1.5s-.5-1.224-.5-1.5V10h-4a.5.5 0 0 1-.5-.5c0-.973.64-1.725 1.17-2.189A5.921 5.921 0 0 1 5 6.708V2.277a2.77 2.77 0 0 1-.354-.298C4.342 1.674 4 1.179 4 .5a.5.5 0 0 1 .146-.354zm1.58 1.408-.002-.001.002.001m-.002-.001.002.001A.5.5 0 0 1 6 2v5a.5.5 0 0 1-.276.447h-.002l-.012.007-.054.03a4.922 4.922 0 0 0-.827.58c-.318.278-.585.596-.725.936h7.792c-.14-.34-.407-.658-.725-.936a4.915 4.915 0 0 0-.881-.61l-.012-.006h-.002A.5.5 0 0 1 10 7V2a.5.5 0 0 1 .295-.458 1.775 1.775 0 0 0 .351-.271c.08-.08.155-.17.214-.271H5.14c.06.1.133.191.214.271a1.78 1.78 0 0 0 .37.282" />
              </svg>
            </b>
            Comprehensive CDSS Service
          </h2>
          <p>
            Our Clinical Decision Support System (CDSS) provides the latest
            analysis report.
          </p>
        </Col>
        <Col
          xs="3"
          className="m-2 bg-dark"
          style={{
            borderRadius: "10px",
            color: "#bbb",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          }}
        >
          <h2
            style={{
              color: "#aaaaff",
              padding: "5px",
              borderBottom: "1px solid #555",
            }}
          >
            <b style={{ color: "white", margin: "3px" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-pin"
                viewBox="0 0 16 16"
              >
                <path d="M4.146.146A.5.5 0 0 1 4.5 0h7a.5.5 0 0 1 .5.5c0 .68-.342 1.174-.646 1.479-.126.125-.25.224-.354.298v4.431l.078.048c.203.127.476.314.751.555C12.36 7.775 13 8.527 13 9.5a.5.5 0 0 1-.5.5h-4v4.5c0 .276-.224 1.5-.5 1.5s-.5-1.224-.5-1.5V10h-4a.5.5 0 0 1-.5-.5c0-.973.64-1.725 1.17-2.189A5.921 5.921 0 0 1 5 6.708V2.277a2.77 2.77 0 0 1-.354-.298C4.342 1.674 4 1.179 4 .5a.5.5 0 0 1 .146-.354zm1.58 1.408-.002-.001.002.001m-.002-.001.002.001A.5.5 0 0 1 6 2v5a.5.5 0 0 1-.276.447h-.002l-.012.007-.054.03a4.922 4.922 0 0 0-.827.58c-.318.278-.585.596-.725.936h7.792c-.14-.34-.407-.658-.725-.936a4.915 4.915 0 0 0-.881-.61l-.012-.006h-.002A.5.5 0 0 1 10 7V2a.5.5 0 0 1 .295-.458 1.775 1.775 0 0 0 .351-.271c.08-.08.155-.17.214-.271H5.14c.06.1.133.191.214.271a1.78 1.78 0 0 0 .37.282" />
              </svg>
            </b>{" "}
            Community
          </h2>
          <p>
            Join our health-focused community to share experiences, insights,
            and support each other on your wellness journey.
          </p>
        </Col>
        <Col
          xs="3"
          className="m-2 bg-dark"
          style={{
            transform: "rotate(-5deg)",
            borderRadius: "10px",
            color: "#bbb",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          }}
        >
          <h2
            style={{
              color: "#aaaaff",
              padding: "5px",
              borderBottom: "1px solid #555",
            }}
          >
            <b style={{ color: "white", margin: "3px" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-pin"
                viewBox="0 0 16 16"
              >
                <path d="M4.146.146A.5.5 0 0 1 4.5 0h7a.5.5 0 0 1 .5.5c0 .68-.342 1.174-.646 1.479-.126.125-.25.224-.354.298v4.431l.078.048c.203.127.476.314.751.555C12.36 7.775 13 8.527 13 9.5a.5.5 0 0 1-.5.5h-4v4.5c0 .276-.224 1.5-.5 1.5s-.5-1.224-.5-1.5V10h-4a.5.5 0 0 1-.5-.5c0-.973.64-1.725 1.17-2.189A5.921 5.921 0 0 1 5 6.708V2.277a2.77 2.77 0 0 1-.354-.298C4.342 1.674 4 1.179 4 .5a.5.5 0 0 1 .146-.354zm1.58 1.408-.002-.001.002.001m-.002-.001.002.001A.5.5 0 0 1 6 2v5a.5.5 0 0 1-.276.447h-.002l-.012.007-.054.03a4.922 4.922 0 0 0-.827.58c-.318.278-.585.596-.725.936h7.792c-.14-.34-.407-.658-.725-.936a4.915 4.915 0 0 0-.881-.61l-.012-.006h-.002A.5.5 0 0 1 10 7V2a.5.5 0 0 1 .295-.458 1.775 1.775 0 0 0 .351-.271c.08-.08.155-.17.214-.271H5.14c.06.1.133.191.214.271a1.78 1.78 0 0 0 .37.282" />
              </svg>
            </b>
            Health Progress Tracking
          </h2>
          <p>
            Monitor and track your health progress over time, set and achieve
            goals.
          </p>
        </Col>
      </Row>
      <br></br>
    </Container>
  );
};
export default Purpose;
