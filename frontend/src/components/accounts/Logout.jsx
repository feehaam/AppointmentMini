import { Navigate } from "react-router-dom";
import { clearInfo } from "scripts/accountInfo";

const Logout = () => {
  clearInfo();
  return <Navigate to={"/"} />;
};

export default Logout;
