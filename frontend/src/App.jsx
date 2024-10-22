import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import SignIn from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import CreateUser from "./pages/CreateUser/CreateUser";
import Messages from "./pages/Messages/Messages";
import Attendence from "./pages/Attendence/Attendence";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setIsAdmin, setStatus, setUser } from "./slice/authSlice";
import { BASEURL } from "./API/BASEURL";
import EmployeeProfile from "./pages/User/Profile/Profile";
import EmployeeAttendance from "./pages/User/Attendence/Attendence";
import PaymentHistoryPage from "./pages/User/Payments/Payments";
import MessagesPage from "./pages/User/Nottification/Nottification";
import LoadingEffect from "./components/LoadingEffect/LoadingEffect";
import SessionExpire from "./components/SessionExpire/SessionExpire";

function App() {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);

  const fetchUser = async () => {
    try {
      dispatch(setStatus("loading"));
      const { data } = await axios.get(`${BASEURL}/employee/me`, {
        withCredentials: true,
      });

      let employee = data.employee;
      dispatch(setUser(employee));
      if (employee.role === "Admin") {
        dispatch(setIsAdmin(true));
      }
      dispatch(setStatus("idle"));
      console.log(status);
    } catch (error) {
      console.log(error);
      dispatch(setStatus("error"));
    }
  };

  useEffect(() => {
    fetchUser();
  }, [dispatch]);

  if (status === "loading") {
    return <LoadingEffect />;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Guest Route */}
        <Route
          path="/"
          element={
            <GuestRoute>
              <SignIn />
            </GuestRoute>
          }
        />

        {/* Employee Routes */}

        <Route
          path="/me"
          element={
            <EmployeeRoute>
              <Navbar />
              <Sidebar />
              <EmployeeProfile />
            </EmployeeRoute>
          }
        />

        <Route
          path="/attendance-me"
          element={
            <EmployeeRoute>
              <Navbar />
              <Sidebar />
              <EmployeeAttendance />
            </EmployeeRoute>
          }
        />

        <Route
          path="/payroll-me"
          element={
            <EmployeeRoute>
              <Navbar />
              <Sidebar />
              <PaymentHistoryPage />
            </EmployeeRoute>
          }
        />

        <Route
          path="/notifications"
          element={
            <EmployeeRoute>
              <Navbar />
              <Sidebar />
              <MessagesPage />
            </EmployeeRoute>
          }
        />

        {/* Admin Routes */}

        <Route
          path="/dashboard"
          element={
            <AdminRoute>
              <Navbar />
              <Sidebar />
              <Dashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/user"
          element={
            <AdminRoute>
              <Navbar />
              <Sidebar />
              <CreateUser />
            </AdminRoute>
          }
        />
        <Route
          path="/messages"
          element={
            <AdminRoute>
              <Navbar />
              <Sidebar />
              <Messages />
            </AdminRoute>
          }
        />
        <Route
          path="/attendance"
          element={
            <AdminRoute>
              <Navbar />
              <Sidebar />
              <Attendence />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// Guest Route
const GuestRoute = ({ children }) => {
  const { isAdmin, user } = useSelector((state) => state.auth);

  return user ? (
    isAdmin ? (
      <Navigate to="/dashboard" />
    ) : (
      <Navigate to="/me" />
    )
  ) : (
    children
  );
};

// Employee Route
const EmployeeRoute = ({ children }) => {
  const { isAdmin, user } = useSelector((state) => state.auth);


  return user ? (
    isAdmin ? (
      <Navigate to="/dashboard" />
    ) : (
      children
    )
  ) : (
    <SessionExpire />
  );
};

// Admin Route
const AdminRoute = ({ children }) => {
  const { isAdmin, user } = useSelector((state) => state.auth);


  return user ? isAdmin ? children : <Navigate to="/me" /> : <SessionExpire />;
};
