import "./App.css";
import Navbar from "./components/navbar/page";
import DaftarHadir from "./pages/daftarHadir/page";
import Dashboard from "./pages/dasboard/page";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Download from "./pages/download/page";
import Profile from "./pages/profile/page";
import Logout from "./pages/logout/page";
import Jadwal from "./pages/jadwal/page";
import DaftarGuru from "./pages/daftarGuru/page";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Router>
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <div className={`main-content ${isMenuOpen ? "ml-52" : ""}`}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/daftarhadir" element={<DaftarHadir />} />
          <Route path="/download" element={<Download />} />
          <Route path="/jadwal" element={<Jadwal />} />
          <Route path="/daftarguru" element={<DaftarGuru />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
