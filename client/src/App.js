import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import DiningHalls from "./DiningHalls";
import Contact from "./Contacts";
import Dorms from "./Dorms";
import RecCenters from "./RecCenters";
import './App.css';

function App() {
  return (
    <Router>
      <h1> HillTalk </h1>
      <nav>
      <div class="nav-links">
        <ul>
          <li>
            <Link to="/">Home</Link>
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
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/DiningHalls" element={<DiningHalls />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/Dorms" element={<Dorms />} />
      <Route path="/RecCenters" element={<RecCenters />} />
      </Routes>
    </Router>
//>>>>>>> 735cf8fc38ff55bbf54b63544c458d6ab0fed92a
  );
}

export default App;
