const isLogged = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

const getRole = () => {
  return localStorage.getItem("role");
};

const isAdmin = () => {
  const role = localStorage.getItem("role");
  console.log(role);
  console.log(role === "ADMIN");
  return role === "ADMIN";
};

const isPatient = () => {
  const role = localStorage.getItem("role");
  return role === "PATIENT";
};

const isDoctor = () => {
  const role = localStorage.getItem("role");
  return role === "DOCTOR";
};

const getEmail = () => {
  return localStorage.getItem("email");
};

const getUserId = () => {
  return localStorage.getItem("userId");
};

const clearInfo = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("email");
};

export {
  isLogged,
  isAdmin,
  isDoctor,
  isPatient,
  getUserId,
  getEmail,
  clearInfo,
  getRole,
};
