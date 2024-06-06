import { useEffect, useState } from "react";
import {
  Card,
  Container,
  Row,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import AxiosInstance from "scripts/axioInstance";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(10);

  const fetchNotifications = (page) => {
    AxiosInstance.get(`http://localhost:7600/notifications/${page}/${pageSize}`)
      .then((response) => {
        setNotifications(response.data);

        // Set notifications as seen after 3 seconds
        setTimeout(() => {
          AxiosInstance.put(`http://localhost:7600/notifications/set-all-seen`)
            .then((response) => {})
            .catch((error) => {
              console.error(error);
            });
        }, 3000);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchNotifications(currentPage);
  }, [currentPage]);

  const totalPages = Math.ceil(notifications.length / pageSize);

  return (
    <>
      <div
        className="header pb-5 pt-5 pt-lg-8 d-flex align-items-center"
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
            <h1 className="display-2 opacity-7" style={{ color: "white" }}>
              Notifications
            </h1>
          </Row>
        </Container>
      </div>
      <Container
        className="mt-4"
        fluid
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Card
          style={{
            width: "90%",
            maxWidth: "700px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            padding: "15px",
          }}
        >
          <Pagination>
            <PaginationItem disabled={currentPage === 0}>
              <PaginationLink
                previous
                onClick={() => setCurrentPage(currentPage - 1)}
              />
            </PaginationItem>
            {[...Array(totalPages).keys()].map((page) => (
              <PaginationItem key={page} active={currentPage === page}>
                <PaginationLink onClick={() => setCurrentPage(page)}>
                  {page + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem
              disabled={notifications.length === 0 || notifications.length < 10}
            >
              <PaginationLink
                next
                onClick={() => setCurrentPage(currentPage + 1)}
              />
            </PaginationItem>
          </Pagination>
          {notifications.length === 0 && <h3>No notifications to display</h3>}

          {notifications.map((notification) => (
            <div
              key={notification.notificationId}
              style={{
                cursor: notification.url ? "pointer" : "default",
                padding: "15px",
                paddingBottom: "5px",
                marginBottom: "10px",
                borderRadius: "5px",
                backgroundColor: notification.seen ? "transparent" : "#fffbe6",
                display: "flex",
                flexDirection: "column",
                border: "1px solid #eee",
              }}
              onClick={() => {
                if (notification.url) {
                  window.location.href = notification.url;
                }
              }}
            >
              <Row className="justify-content-between">
                <Col xs={9} sm={9} md={9} lg={9}>
                  <Row>
                    <Col>
                      <strong>{notification.title}</strong>
                      {notification.url && (
                        <i
                          className="fas fa-link ml-2"
                          style={{ color: "#3498db" }}
                        ></i>
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      {notification.prefix && (
                        <span style={{ color: "#555", marginRight: "5px" }}>
                          {notification.prefix}
                        </span>
                      )}
                      <span
                        style={{
                          color: "#333",
                          backgroundColor: "#eee",
                          padding: "2px",
                          borderRadius: "5px",
                        }}
                      >
                        {notification.text}
                      </span>
                      {notification.suffix && (
                        <span style={{ color: "#555", marginLeft: "5px" }}>
                          {notification.suffix}
                        </span>
                      )}
                    </Col>
                  </Row>
                </Col>
                {notification.photoUrl && (
                  <Col xs="auto" sm="auto" md="auto" lg="auto">
                    <div
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "5px",
                        overflow: "hidden",
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <img
                        src={notification.photoUrl}
                        alt="Notification"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  </Col>
                )}
              </Row>
              <Row className="mt-2">
                <Col xs={8}>
                  <p>{notification.timeCreate}</p>
                </Col>
                <Col xs={4} className="text-right">
                  {notification.type && (
                    <span
                      className="bg-primary text-white p-1 rounded"
                      style={{ fontSize: "0.8rem" }}
                    >
                      {notification.type}
                    </span>
                  )}
                </Col>
              </Row>
            </div>
          ))}
        </Card>
      </Container>
    </>
  );
};

export default Notifications;
