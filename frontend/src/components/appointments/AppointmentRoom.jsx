import { useEffect, useRef, useState } from "react";
import { Form, Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Container,
  FormGroup,
  Input,
  Row,
} from "reactstrap";
import AxiosInstance from "scripts/axioInstance";

const AppointmentRoom = () => {
  let { appointmentId } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(undefined);

  const [appointment, setAppointment] = useState(null);

  const userId = localStorage.getItem("userId")
    ? localStorage.getItem("userId")
    : null;

  const updatAppointment = () => {
    AxiosInstance.get(`http://localhost:8080/appointments/${appointmentId}`)
      .then((response) => {
        setAppointment(response.data);
      })
      .catch((error) => {
        console.error("Error fetching doctors:", error);
      });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  const scrollToBottom = () => {
    window.scrollTo({
      top: 10000,
    });
  };

  const download = (filePath) => {
    fetch(`http://localhost:8080/files/download?filePath=${filePath}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to download file");
        }
        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filePath.split("/").pop());
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => console.error("Error downloading the file:", error));
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(event.target.files[0]);
    setMessage("");
  };

  const sendMessage = (text, type) => {
    const data = {
      text: text,
    };
    AxiosInstance.post(
      `http://localhost:8080/appointments/chat/${appointment.appointmentId}/${type}`,
      data
    )
      .then((response) => {
        console.log(response);
        updatAppointment();
      })
      .catch((error) => {
        console.error("Error fetching doctors:", error);
      });
  };

  useEffect(() => {
    const intervalId = setInterval(updatAppointment, 500);
    return () => clearInterval(intervalId);
  }, []);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    try {
      const response = await axios.post(
        "http://localhost:8080/files/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("File uploaded succesfully!", response.data);
      sendMessage(response.data, 2);
    } catch (error) {
      console.log("Failed ot upload file");
    }
  };

  const handleSendMessage = () => {
    if (message.trim() === "" && !selectedFile) {
      // Don't send empty message
      return;
    }

    if (selectedFile) {
      handleUpload();
    } else {
      sendMessage(message, 1);
    }
    setMessage("");
    setSelectedFile(undefined);
  };

  const handleTextChange = (text) => {
    setMessage(text);
    setSelectedFile(undefined);
  };

  return (
    <>{appointment && <>
      <div
        className="header pb-7 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          backgroundImage:
            "url(" + require("../../assets/img/cover/health5.jpg") + ")",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          width: "100%",
        }}
      >
        <span className="mask bg-gradient-default opacity-6" />
      </div>
      <Container className="mt--7" fluid>
        {appointment.status == 0 ? (
          <>
            <h2 className="text-red">
              The appointment is not approved yet!<br></br>Please wait for
              doctor approval!
            </h2>
          </>
        ) : (
          <Card className="card-stats">
            <CardHeader className="bg-dark">
              <h2 className="text-white">
                Appointment: {appointment.appointmentId}{" "}
                <i className="fa fa-clock text-warning" />{" "}
                {appointment.dateTime}
              </h2>
              <Row>
                <Col style={{ whiteSpace: "nowrap" }}>
                  <span className="text-white mr-2 mb-2">
                    <i className="fa fa-user" />{" "}
                    <Link
                      to={`/health/patients/${appointment.patientId}`}
                      className="text-white"
                    >
                      Patient profile
                    </Link>
                  </span>
                </Col>
                <Col style={{ whiteSpace: "nowrap" }}>
                  <span className="text-white mr-2 mb-2">
                    <i className="fa fa-user" />{" "}
                    <Link
                      to={`/health/doctors/${appointment.doctorId}`}
                      className="text-white"
                    >
                      Doctor profile
                    </Link>
                  </span>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Row className="bg-gray mb-3" style={{ borderRadius: "10px" }}>
                <Col className="pt-3 pb-2 pl-3 pr-5">
                  {appointment.type == 1 ? (
                    <h2 className="text-white">
                      <b className="text-dark">
                       Join the following link in time of appointment to connect with the doctor - {appointment.url && <a className="text-white" href={appointment.url}>{appointment.url}</a>}
                      </b>
                      <b>
                        <a
                          href={appointment.description}
                          className="text-white"
                        >
                          {appointment.description}
                        </a>
                      </b>
                    </h2>
                  ) : (
                    <h2 className="text-dark">
                      The doctor will provide his/her allocated room in chat for
                      the appointment.
                    </h2>
                  )}
                </Col>
              </Row>
            </CardBody>
            <CardBody className="ml-4 mr-4">
              {appointment.chats.map((chat) => {
                return (
                  <Container
                    style={{
                      display: "flex",
                      justifyContent:
                        chat.userId === userId ? "flex-end" : "flex-start",
                      marginBottom: "10px",
                    }}
                  >
                    <div
                      style={{
                        maxWidth: "70%",
                        borderRadius: "15px",
                        backgroundColor:
                          chat.userId === userId ? "#eeeeff" : "#f8f9fa",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        padding: "10px",
                        position: "relative",
                      }}
                    >
                      <img
                        src={
                          chat.userId.startsWith("D")
                            ? require("../../assets/img/cover/doc.png")
                            : require("../../assets/img/cover/pat.png")
                        }
                        alt="user"
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          position: "absolute",
                          top: "-5px",
                          [chat.userId === userId ? "right" : "left"]: "-40px",
                        }}
                      />
                      <div style={{ wordBreak: "break-word" }}>
                        {chat.text || (
                          <b
                            style={{ cursor: "pointer" }}
                            className="text-dark"
                            onClick={() => download(chat.fileUrl)}
                          >
                            [File - Click to download]
                          </b>
                        )}
                      </div>
                      <div
                        style={{
                          textAlign: "right",
                          fontSize: "0.8em",
                          color: "#888",
                          marginTop: "5px",
                        }}
                      >
                        {chat.time}
                      </div>
                    </div>
                  </Container>
                );
              })}
            </CardBody>
            <CardFooter className="border-top">
              <FormGroup>
                <Input
                  type="textarea"
                  placeholder="Type your message here..."
                  value={message}
                  disabled={selectedFile !== undefined}
                  onChange={(e) => handleTextChange(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Input type="file" onChange={handleFileChange} />
              </FormGroup>
              <Button color="primary" onClick={handleSendMessage}>
                Send
              </Button>
            </CardFooter>
          </Card>
        )}
      </Container>
    </>}</>
  );
};

export default AppointmentRoom;
