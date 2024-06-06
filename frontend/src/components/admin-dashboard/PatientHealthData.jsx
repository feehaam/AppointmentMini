import { useEffect, useState } from "react";
import { Button } from "reactstrap";
import AxiosInstance from "scripts/axioInstance";

const PatientHealthData = () => {
  const [patientData, setPatientData] = useState([]);
  useEffect(() => {
    AxiosInstance.get(`http://localhost:7100/patients/list`)
      .then((response) => {
        console.log("patients", response.data);
        setPatientData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const downloadCSV = () => {
    if (patientData.length === 0) {
      console.log("Data is not loaded yet");
      return;
    }

    // Create CSV header
    const csvHeader =
      "User ID,First Name,Last Name,Address,Gender,Blood Group," +
      "Weight,Age,Blood Pressure,Diabetes,Height,Allergies,Occupation,Smoking,Drinking,Asthma\n";

    // Create CSV content
    const csvContent =
      csvHeader +
      patientData
        .map((patient) => {
          // Replace commas with spaces for specific properties
          const allergies = patient.allergies
            ? patient.allergies
                .map((allergy) => allergy.replace(/,/g, " "))
                .join(",")
            : "";

          const address = patient.address
            ? patient.address.replace(/,/g, " ")
            : "";

          // Specify the order of fields
          const values = [
            patient.userId || "-",
            patient.firstName || "-",
            patient.lastName || "-",
            address,
            patient.gender || "-",
            patient.bloodGroup || "",
            patient.weight || "",
            patient.age || "",
            patient.bloodPressure || "",
            patient.diabetes || "",
            patient.height || "",
            allergies,
            patient.occupation || "",
            patient.smoking ? "Yes" : "No",
            patient.drinking ? "Yes" : "No",
            patient.asthma ? "Yes" : "No",
          ];

          return values.join(",");
        })
        .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "healthdata.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Button
        className="m-2 p-3"
        color="danger"
        variant="primary"
        onClick={downloadCSV}
      >
        <h2 className="text-white">Download Patient Data</h2>
      </Button>
    </>
  );
};

export default PatientHealthData;
