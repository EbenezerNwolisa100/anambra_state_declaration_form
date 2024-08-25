import './App.css'
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Indigenes from "./pages/indigenes";
import NonIndigenes from "./pages/nonindigenes";

function App() {

  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/indigenes" element={<Indigenes />} />
        <Route path="/nonindigenes" element={<NonIndigenes />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
