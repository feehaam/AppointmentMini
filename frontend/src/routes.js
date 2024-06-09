import Index from "components/examples/Index";
import Login from "components/accounts/Login";
import ForgottenPassword from "components/accounts/ForgottenPassword";
import VerifyAccount from "components/accounts/VerifyAccount";
import RegisterAdmin from "components/accounts/RegisterAdmin";
import RegisterPatient from "components/accounts/RegisterPatient";
import RegisterDoctor from "components/accounts/RegisterDoctor";
import PatientProfile from "components/profiles/PatientProfile";
import DoctorProfile from "components/profiles/DoctorProfile";
import EditDoctorProfile from "components/profiles/EditDoctorProfile";
import EditPatientProfile from "components/profiles/EditPatientProfile";
import CreateMedicine from "components/pharma/CreateMedicine";
import UpdateMedicine from "components/pharma/UpdateMedicine";
import MedicineList from "components/pharma/MedicineList";
import MedicineDetails from "components/pharma/MedicineDetails";
import Community from "components/community/Community";
import DoctorsList from "components/accounts/DoctorList";
import PatientsList from "components/accounts/PatientsList";
import Logout from "components/accounts/Logout";
import DoctorDashboard from "components/doctor-dashboard/Dashboard";
import CreateCall from "components/telemedicine/CreateCall";
import PostDisplay from "components/community/PostDisplay";
import RoomAllocation from "components/accounts/RoomAllocation";
import CreateEquipment from "components/equipments/Create";
import EquipmentUpdate from "components/equipments/Update";
import EquipmentList from "components/equipments/List";
import EquipmentDetails from "components/equipments/Details";
import WriteCDSS from "components/cdss/WriteCDSS";
import PatientDashboard from "components/patient-dashboard/Dashboard";
import CreateAppointment from "components/appointment/CreateAppointment";
import Notifications from "components/notification/Notifications";
import SettingsPage from "components/notification/SettingsPage";
import Search from "components/search/Search";
import AdminDashboard from "components/admin-dashboard/Dashboard";
import Appointments from "components/appointments/Appointments";

var routes = [
  {
    path: "/index",
    name: "Home",
    icon: "fa fa-home text-info",
    component: <Index />,
    layout: "/common",
    role: "",
  },
  {
    path: "/doctor",
    name: "Home",
    icon: "fa fa-home text-info",
    component: <DoctorDashboard />,
    layout: "/health",
    role: "DOCTOR",
  },
  {
    path: "/patient",
    name: "Home",
    icon: "fa fa-home text-info",
    component: <PatientDashboard />,
    layout: "/health",
    role: "PATIENT",
  },
  {
    path: "/appointments",
    name: "Appointments",
    icon: "fa fa-clock text-red",
    component: <Appointments />,
    layout: "/health",
    role: "ADMIN PATIENT DOCTOR",
  },
  {
    path: "/admin",
    name: "Home",
    icon: "fa fa-home text-info",
    component: <AdminDashboard />,
    layout: "/health",
    role: "ADMIN",
  },
  {
    path: "/take-appointment",
    name: "Doctors",
    icon: "fa-solid fa-person text-primary",
    component: <CreateAppointment />,
    layout: "/health",
    role: "ADMIN PATIENT",
  },

  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/public",
    role: "PUBLIC",
  },
  {
    path: "/register-patient",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: <RegisterPatient />,
    layout: "/public",
    role: "PUBLIC",
  },
  {
    path: "/forgotten-password",
    name: "Forgotten password",
    icon: "ni ni-circle-08 text-pink",
    component: <ForgottenPassword />,
    layout: "/public",
    role: "PUBLIC",
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "ni ni-circle-08 text-pink",
    component: <Notifications />,
    layout: "/health",
    role: "",
  },
  {
    path: "/verify-email",
    name: "Verify account",
    icon: "ni ni-circle-08 text-pink",
    component: <VerifyAccount />,
    layout: "/public",
    role: "PUBLIC",
  },
  {
    path: "/register-admin",
    name: "Create admin",
    icon: "ni ni-circle-08 text-pink",
    component: <RegisterAdmin />,
    layout: "/health",
    role: "ADMIN",
  },
  {
    path: "/register-doctor",
    name: "Join as doctor",
    icon: "ni ni-circle-08 text-pink",
    component: <RegisterDoctor />,
    layout: "/public",
    role: "PUBLIC",
  },
  {
    path: "/patients/:patientId",
    name: "Profile",
    icon: "ni ni-single-02 text-pink",
    component: <PatientProfile />,
    layout: "/health",
    role: "PATIENT",
  },
  {
    path: "/doctors/:doctorId",
    name: "Profile",
    icon: "ni ni-single-02 text-green",
    component: <DoctorProfile />,
    layout: "/health",
    role: "DOCTOR",
  },
  {
    path: "/doctors/edit-profile",
    name: "Edic Profile",
    icon: "fas fa-user-edit text-orange",
    component: <EditDoctorProfile />,
    layout: "/health",
    role: "DOCTOR",
  },
  {
    path: "/patients/edit-profile",
    name: "Edic Profile",
    icon: "fas fa-user-edit text-green",
    component: <EditPatientProfile />,
    layout: "/health",
    role: "PATIENT",
  },
  {
    path: "/doctors",
    name: "Doctors List",
    icon: "fa-solid fa-users-line text-skyblue",
    component: <DoctorsList />,
    layout: "/health",
    role: "",
  },
  {
    path: "/patients",
    name: "Patients List",
    icon: "fa-solid fa-users-rays text-gray",
    component: <PatientsList />,
    layout: "/health",
    role: "",
  },
  {
    path: "/rooms",
    name: "Room allocation",
    icon: "fa-solid fa-hotel text-warning",
    component: <RoomAllocation />,
    layout: "/health",
    role: "",
  },
  {
    path: "/logout",
    name: "Sign out",
    icon: "fa fa-sign-out text-black",
    component: <Logout />,
    layout: "/health",
    role: "ADMIN PATIENT DOCTOR",
  },
  {
    path: "/call/:roomId",
    name: "Call",
    icon: "fa fa-sign-out text-black",
    component: <CreateCall />,
    layout: "/tele",
    role: "",
  },
  {
    path: "/posts/:postId",
    name: "Post",
    icon: "fa fa-sign-out text-black",
    component: <PostDisplay />,
    layout: "/health",
    role: "",
  },
  {
    path: "/search",
    name: "Search",
    icon: "fa fa-search text-info",
    component: <Search />,
    layout: "/common",
    role: "",
  },
];
export default routes;
