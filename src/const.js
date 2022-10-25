import Home from "./pages/workLog";
// import Register from "./pages/registration";
import Login from "./pages/login";
import Logout from "./components/pages/logout";
import AddEmployee from "./pages/addEmployee";
import EmployeeDashboard from "./pages/employeeDashboard";
import Task from "./pages/addTask";
import AddProject from "./pages/addProject";
import UserProfile from "./pages/userProfile";
import AddCustomer from "./pages/addCustomer";
import UpdateTaskPage from "./pages/updateTask";
import GetTask from "./components/pages/get-project-data/project-details";
import ProjectDataPage from "./pages/projectDetails";

export const NAV_DATA = [
  {
    path: "/employees",
    heading: "Employee Dashboard",
  },
  {
    path: "/addEmployee",
    heading: "Add Employee",
  },
  {
    path: "/addProject",
    heading: "Add Project",
  },

  {
    path: "/addTask",
    heading: "Add Task",
  },
  {
    path: "/addCustomer",
    heading: "Add Customer",
  },
  // {
  //   path: "/register",
  //   heading: "Sign Up",
  // },
  localStorage.getItem("accessToken")
    ? {
        path: "/logout",
        heading: "Sign Out",
      }
    : {
        path: "/login",
        heading: "Sign In",
      },
];

export const ROUTES = [
  {
    path: "/",
    page: <Home />,
  },
  // {
  //   path: "/register",
  //   page: <Register />,
  // },

  {
    path: "/employees",
    page: <EmployeeDashboard />,
  },
  {
    path: "/addEmployee",
    page: <AddEmployee />,
  },
  {
    path: "/addTask",
    page: <Task />,
  },
  {
    path: "/updatetask",
    page: <UpdateTaskPage />,
  },
  {
    path: "/addProject",
    page: <AddProject />,
  },
  {
    path: "/user",
    page: <UserProfile />,
  },
  {
    path: "/addCustomer",
    page: <AddCustomer />,
  },
  {
    path: "/project",
    page: <ProjectDataPage />,
  },
  {
    path: "/taskData",
    page: <GetTask />,
  },
  localStorage.getItem("accessToken")
    ? {
        path: "/logout",
        page: <Logout />,
      }
    : {
        path: "/login",
        page: <Login />,
      },
];
