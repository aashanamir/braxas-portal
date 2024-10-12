import {BrowserRouter, Routes, Route} from "react-router-dom";
import SignIn from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import CreateUser from "./pages/CreateUser/CreateUser";
import Messages from "./pages/Messages/Messages";
import Attendence from "./pages/Attendence/Attendence";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {

  return (
    <BrowserRouter>
      <Navbar/>
      <Sidebar/>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/user" element={<CreateUser/>} />
        <Route path="/messages" element={<Messages/>} />
        <Route path="/attendance" element={<Attendence/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
