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
import Login from "./pages/login";
import { WS } from "./ws";

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
      <div className={`main-content ${isMenuOpen ? "ml-52" : ""}`}>
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
