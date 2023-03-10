


import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase-config";
import "./App.css";

export let logged = false;
export default function Home() {

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({});
  useEffect(() => {

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    if (currentUser){
     logged = true; //we are logged in 
    }
    else{
      logged = false;//we are logged out
    }
  });
  })
  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
<html>
    <head>
<title>HillTalk</title>
<link rel="stylesheet" href="format.css" />
</head>

<body>
<script type="text/javascript" src="test.js"></script>
<section class="header">
</section>
<img src="http://www.housing.ucla.edu/maps/ochmap.jpg" alt="map" width="720" height="405" class = "map" />
<p class ="description">A Place To Rate, Review, and Discuss the Different Features of the Hill</p>
<br></br>

<div>
  <p>Register User</p>
  <input
          placeholder="Email..."
          onChange={(event) => {
            setRegisterEmail(event.target.value);
          }}
          className="loginBox"
        />
        <input
          placeholder="Password..."
          onChange={(event) => {
            setRegisterPassword(event.target.value);
          }}
          className="loginBox"
        />

  <button onClick={register}>Create User</button>

</div>

<div>
  <p>Login</p>
  <input
          placeholder="Email..."
          onChange={(event) => {
            setLoginEmail(event.target.value);
          }}
          className="loginBox"
        />
        <input
          placeholder="Password..."
          onChange={(event) => {
            setLoginPassword(event.target.value);
          }}
          className="loginBox"
        />

  <button onClick={login}>Login</button>

</div>

<h>User Logged In: </h>
{user?user.email:"Not Logged In"}
<button onClick={logout} className="rev-button"> Sign Out </button>
</body>
</html>

  );
}
