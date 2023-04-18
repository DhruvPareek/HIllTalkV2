import React from "react";
import {useState, useEffect, useReducer} from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import DiningHalls from "./DiningHalls";
import Contact from "./Contacts";
import Dorms from "./Dorms";
import RecCenters from "./RecCenters";
import AuthPage from "./AuthPage";
import './App.css';

import {
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./firebase-config";

let logged = false;

function App() {
  const [reducerValue, forceUpdate] = useReducer(x => x+1, 0);
  const [user, setUser] = useState({});

  useEffect(() => {
    forceUpdate();
  
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser){
        logged = true; //we are logged in 
      }
      else{
        logged = false;//we are logged out now
      }
    });
    }, [reducerValue])

  return (
    <Router>
      <header>
      <h1> HillTalk </h1>
      <nav>
      {logged ? (<div className="loginStuff"><Link to="/AuthPage">Signed In: {user.email}</Link></div>) : (<div className="loginStuff"><Link to="/AuthPage">Login/Register</Link></div>)}
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
