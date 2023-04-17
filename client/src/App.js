import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import DiningHalls from "./DiningHalls";
import Contact from "./Contacts";
import Dorms from "./Dorms";
import RecCenters from "./RecCenters";
import AuthPage from "./AuthPage";
import './App.css';

function App() {
  return (
    <Router>
      <header>
      <h1> HillTalk </h1>
      <nav>
      <div class="nav-links">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/AuthPage">Login/Register</Link>
          </li>
          <li>
            <Link to="/DiningHalls">Dining Halls</Link>
          </li>
          <li>
            <Link to="/Dorms">Dorms</Link>
          </li>
          <li>
            <Link to="/RecCenters">Recreation Centers</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
        </ul>
        </div>
      </nav>
      </header>
      <Routes>
      <Route path="/AuthPage" element={<AuthPage />} />
      <Route path="/" element={<Home />} />
      <Route path="/DiningHalls" element={<DiningHalls />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/Dorms" element={<Dorms />} />
      <Route path="/RecCenters" element={<RecCenters />} />
      </Routes>
    </Router>
  );
}

export default App;
