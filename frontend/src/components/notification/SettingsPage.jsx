import React, { useState, useEffect } from "react";
import {
  Button,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Card,
  Form,
  Col,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faMobile,
  faBell,
  faMoon,
  faUser,
  faCalendar,
  faUsers,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import AxiosInstance from "scripts/axioInstance";
import useI18N from "components/internationalization/i18n";

const LANGUAGE_MAP = {
  zh: "Chinese",
  es: "Spanish",
  en: "English",
  hi: "Hindi",
  ar: "Arabic",
  bn: "Bengali",
  pt: "Portuguese",
  ru: "Russian",
  ja: "Japanese",
  de: "German",
};

const SettingsPage = () => {
  const { text, isBaseReady } = useI18N();
  const [notificationSettings, setNotificationSettings] = useState({
    getEmailNotifications: true,
    getSMSNotifications: false,
    getPushNotifications: true,
    doNotDisturb: false,
    getAccountAccountUpdates: true,
    getAppointmentUpdates: true,
    getCommunityUpdates: true,
    getSiteUpdates: true,
  });

  const [selectedLanguage, setSelectedLanguage] = useState("");

  useEffect(() => {
    AxiosInstance.get(`http://localhost:7600/preferences`)
      .then((response) => {
        setNotificationSettings(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });

    let language = localStorage.getItem("language");
    if (language === undefined || language === null) {
      language = "English";
    }
    setSelectedLanguage(language);
  }, []);

  const handleCheckboxChange = (setting) => {
    setNotificationSettings((prevSettings) => ({
      ...prevSettings,
      [setting]: !prevSettings[setting],
    }));
  };

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const handleSave = () => {
    AxiosInstance.put(`http://localhost:7600/preferences`, notificationSettings)
      .then((response) => {
        localStorage.setItem("language", selectedLanguage);
        window.location.reload();
        console.log(
          text("settings-saved", "Settings saved successfully:"),
          response
        );
      })
      .catch((error) => {
        console.error(text("save-error", "Error saving user settings:"), error);
      });
  };

  return (
    <div>
      <div
        className="header pb-5 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          height: "100px",
          backgroundImage:
            "url(" + require("../../assets/img/cover/health2.jpg") + ")",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        <span className="mask bg-gradient-default opacity-6" />
        <Container className="d-flex align-items-center" fluid>
          <Row>
            <h1 className="display-2 opacity-7" style={{ color: "white" }}>
              {text("settings-title", "Notification and Languages Settings")}
            </h1>
          </Row>
        </Container>
      </div>
      <Container style={{ maxWidth: "700px" }}>
        <Card className="p-5 m-4">
          <h2>
            {text(
              "settings-notification-preferences",
              "Notification Preferences"
            )}
          </h2>
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                checked={notificationSettings.getEmailNotifications}
                onChange={() => handleCheckboxChange("getEmailNotifications")}
              />
              <FontAwesomeIcon icon={faEnvelope} />{" "}
              {text("settings-email-notifications", "Email Notifications")}
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                checked={notificationSettings.getSMSNotifications}
                onChange={() => handleCheckboxChange("getSMSNotifications")}
              />
              <FontAwesomeIcon icon={faMobile} />{" "}
              {text("settings-sms-notifications", "SMS Notifications")}
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                checked={notificationSettings.getPushNotifications}
                onChange={() => handleCheckboxChange("getPushNotifications")}
              />
              <FontAwesomeIcon icon={faBell} />{" "}
              {text("settings-push-notifications", "Push Notifications")}
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                checked={notificationSettings.doNotDisturb}
                onChange={() => handleCheckboxChange("doNotDisturb")}
              />
              <FontAwesomeIcon icon={faMoon} />{" "}
              {text("settings-do-not-disturb", "Do Not Disturb")}
            </Label>
          </FormGroup>
          <hr />
          <h2>{text("settings-notification-types", "Notification Types")}</h2>
          <FormGroup check>
            <Label check>
              <Input
                disabled
                type="checkbox"
                checked={notificationSettings.getAccountAccountUpdates}
                onChange={() =>
                  handleCheckboxChange("getAccountAccountUpdates")
                }
              />
              <FontAwesomeIcon icon={faUser} />{" "}
              {text("settings-account-updates", "Account Updates")}
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                checked={notificationSettings.getAppointmentUpdates}
                onChange={() => handleCheckboxChange("getAppointmentUpdates")}
              />
              <FontAwesomeIcon icon={faCalendar} />{" "}
              {text("settings-appointment-updates", "Appointment Updates")}
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                checked={notificationSettings.getCommunityUpdates}
                onChange={() => handleCheckboxChange("getCommunityUpdates")}
              />
              <FontAwesomeIcon icon={faUsers} />{" "}
              {text("settings-community-updates", "Community Updates")}
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                checked={notificationSettings.getSiteUpdates}
                onChange={() => handleCheckboxChange("getSiteUpdates")}
              />
              <FontAwesomeIcon icon={faGlobe} />{" "}
              {text("settings-site-updates", "Site Updates")}
            </Label>
          </FormGroup>
          <hr />
          <Form>
            <FormGroup>
              <Label for="languageSelect">
                <h2>{text("settings-language", "Language")}</h2>
              </Label>
              <Input
                type="select"
                name="languageSelect"
                id="languageSelect"
                onChange={handleLanguageChange}
              >
                {Object.entries(LANGUAGE_MAP).map(([code, name]) => (
                  <option
                    key={code}
                    value={name}
                    selected={selectedLanguage === name}
                  >
                    {name}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Form>
          <Button color="primary" onClick={handleSave}>
            {text("settings-save", "Save")}
          </Button>
        </Card>
      </Container>
    </div>
  );
};

export default SettingsPage;
