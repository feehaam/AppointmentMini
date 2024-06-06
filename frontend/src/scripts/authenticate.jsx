import { Navigate, Outlet } from "react-router-dom";
import {
  clearInfo,
  getRole,
  isAdmin,
  isPatient,
  isDoctor,
  isLogged,
} from "./accountInfo";

export const Authenticate = ({ requiredRole }) => {
  console.log("Required role: " + requiredRole + ", user role: " + getRole());

  if (
    (requiredRole === "ANY" ||
      requiredRole === "PATIENT" ||
      requiredRole === "DOCTOR" ||
      requiredRole === "ADMIN") &&
    !isLogged()
  ) {
    return <Navigate to={"/public/login"} />;
  }

  if (requiredRole === "ADMIN" && !isAdmin()) {
    clearInfo();
    return <Navigate to={"/public/login"} />;
  }

  if (requiredRole === "PATIENT" && !isPatient()) {
    clearInfo();
    return <Navigate to={"/public/login"} />;
  }

  if (requiredRole === "DOCTOR" && !isDoctor()) {
    clearInfo();
    return <Navigate to={"/public/login"} />;
  }

  console.log("Serving user the contents.");
  return <Outlet />;
};
