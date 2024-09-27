import './App.css'
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Indigenes from "./pages/indigenes";
import NonIndigenes from "./pages/nonindigenes";
import Login from "./pages/Login"
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashbaord';

function App() {

  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/indigenes" element={<Indigenes />} />
        <Route path="/nonindigenes" element={<NonIndigenes />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
