import {BrowserRouter, Routes, Route} from "react-router-dom";
import SignIn from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import CreateUser from "./pages/CreateUser/CreateUser";
import Messages from "./pages/Messages/Messages";
import Attendence from "./pages/Attendence/Attendence";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/user" element={<CreateUser/>} />
        <Route path="/messages" element={<Messages/>} />
        <Route path="/attendance" element={<Attendence/>} />
        {/* <Route path="/dashboard" element={<Sidebar />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
