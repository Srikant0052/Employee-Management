import Home from "./pages/workLog";
import Register from "./pages/registration";
import Login from "./pages/login";
import Logout from "./components/pages/logout";
import AddEmployee from "./pages/addEmployee";
import EmployeeDashboard from "./pages/employeeDashboard";
import Task from "./pages/updateTask";
import AddProject from "./pages/addProject";
// import UserProfile from "./pages/userProfile";
import AddCustomer from "./pages/addCustomer";
// import UpdateTaskPage from "./pages/addTask";
// import GetTask from "./components/pages/get-project-data/project-details";
import ProjectDataPage from "./pages/projectDetails";
import TaskData from "./pages/taskDataPage";
import AddTaskPage from "./pages/addTask";
// import ReactDataTable from "./components/pages/table/react-data-table";


export const ADMIN_NAV_DATA = [
  
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

export const NAV_DATA = [
  {
    path: "/addTask",
    heading: "Add Task",
  },
  // {
  //   path: "/table",
  //   page: "Table",
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
export const ADMIN_ROUTES = [
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
    path: "/addProject",
    page: <AddProject />,
  },
  {
    path: "/addCustomer",
    page: <AddCustomer />,
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

export const ROUTES = [
  {
    path: "/task",
    page: <TaskData />,
  },
  {
    path: "/addTask",
    page: <AddTaskPage />,
  },

  // {
  //   path: "/user",
  //   page: <UserProfile />,
  // },

  {
    path: "/project",
    page: <ProjectDataPage />,
  },
  // {
  //   path: "/taskData",
  //   page: <GetTask />,
  // },
  // {
  //   path: "/table",
  //   page: <ReactDataTable />,
  // },
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
