import "./App.css";
import Navbar from "./components/navbar";
import DaftarHadir from "./pages/daftarHadir";
import Dashboard from "./pages/dasboard";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Download from "./pages/download";
import Profile from "./pages/profile";
import Jadwal from "./pages/jadwal";
import DaftarGuru from "./pages/daftarGuru";
import DaftarSiswa from "./pages/daftarSiswa";
import Login from "./pages/login";
import { WS } from "./ws";
import DaftarWaliMurid from "./pages/daftarWaliMurid";

function Authenticated({ children }) {
  const token = localStorage.getItem("authToken");
  if (!token) return <Navigate to="/login" />;
  return children;
}

function Unauthenticated({ children }) {
  const token = localStorage.getItem("authToken");
  if (token) return <Navigate to="/" />;
  return children;
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  WS.onmessage = m => {
    console.log({m})
  }

  return (
    <Router>
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <div className={`main-content ${isMenuOpen ? "md:ml-52 ml-0" : ""}`}>
        <Routes>
          <Route
            path="/"
            element={
              <Authenticated>
                <Dashboard />
              </Authenticated>
            }
          />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/daftarhadir"
            element={
              <Authenticated>
                <DaftarHadir />
              </Authenticated>
            }
          />
          <Route
            path="/download"
            element={
              <Authenticated>
                <Download />
              </Authenticated>
            }
          />
          <Route
            path="/jadwal"
            element={
              <Authenticated>
                <Jadwal />
              </Authenticated>
            }
          />
          <Route
            path="/daftarguru"
            element={
              <Authenticated>
                <DaftarGuru />
              </Authenticated>
            }
          />
          <Route
            path="/login"
            element={
              <Unauthenticated>
                <Login />
              </Unauthenticated>
            }
          />
          <Route
            path="/daftarsiswa"
            element={
              <Authenticated>
                <DaftarSiswa/>
              </Authenticated>
            }
          />
          <Route
            path="/daftarwalimurid"
            element={
              <Authenticated>
                <DaftarWaliMurid/>
              </Authenticated>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
