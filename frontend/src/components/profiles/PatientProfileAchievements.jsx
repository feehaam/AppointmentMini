import { Card, CardHeader, CardBody, Row, Col, CardTitle } from "reactstrap";
import { useEffect, useState } from "react";
import patientDataAchievements from "assets/data/patientprofile/patientAchievements";
import AxiosInstance from "scripts/axioInstance";

export const PatientProfileAchievements = ({ patientId }) => {
  const [patientData, setPatientData] = useState(null);

  useEffect(() => {
    AxiosInstance.get(`http://localhost:7100/progress/${patientId}`)
      .then((response) => {
        console.log(response);
        setPatientData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching doctors:", error);
      });
  }, []);

  function getLevel(dif) {
    const lowerDif = dif.toLowerCase();

    if (lowerDif === "hard")
      return (
        <span className="text-danger mr-2">
          <i className="fa fa-arrow-up" /> {dif.toUpperCase()}
        </span>
      );
    else if (lowerDif === "moderate")
      return (
        <span className="text-info mr-2">
          <i className="fa fa-arrow-up" /> {dif.toUpperCase()}
        </span>
      );
    else
      return (
        <span className="text-success mr-2">
          <i className="fa fa-arrow-up" /> {dif.toUpperCase()}
        </span>
      );
  }

  return (
    <>
      {patientData && (
        <div>
          <Card className="card-profile shadow">
            <CardHeader className="text-center border-0 pt-md-4 pb-0 pb-md-1">
              <h2
                className="mb-0"
                style={{ margin: "5px", padding: "15px", fontWeight: "bold" }}
              >
                <b>Achievements</b>
              </h2>
            </CardHeader>
            <CardBody className="pt-0 pt-md-4">
              {patientData.length === 0 && (
                <div className="container" style={{ textAlign: "center" }}>
                  This patient does not have any achievements yet.
                </div>
              )}
              {patientData.map((achievement, index) => {
                console.log(achievement);
                return (
                  <Card className="card-stats mt-2 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text mb-0"
                          >
                            <b>
                              <i className="ni ni-user-run text-success" />
                            </b>{" "}
                            {achievement.completionDate ? (
                              <>
                                Completed in <b>{achievement.completedIn}</b>{" "}
                                days
                              </>
                            ) : (
                              "In progress " +
                              "(" +
                              parseInt(
                                achievement.totalScore /
                                  achievement.achievement.goalScore
                              ) *
                                100 +
                              "%)"
                            )}
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {achievement.achievement.title}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip742438047"
                            onClick={(e) => e.preventDefault()}
                          >
                            <img
                              className="rounded-circle"
                              src={achievement.achievement.logoUrl}
                            />
                          </a>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        {getLevel(achievement.achievement.difficulty)}{" "}
                        <span className="text-nowrap">
                          Achievement date:{" "}
                          {achievement.completionDate
                            ? achievement.completionDate
                            : "Not achieved yet."}
                        </span>
                      </p>
                    </CardBody>
                  </Card>
                );
              })}
            </CardBody>
          </Card>
        </div>
      )}
    </>
  );
};
