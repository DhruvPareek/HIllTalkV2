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

  // change the user's status to logged in/out
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
  // create a valid username and password to register account
  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      //console.log(user);
    } catch (error) {
      //console.log(error.message);
    }
  };

  //login function that signs in user
  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      //console.log(user);
    } catch (error) {
      //console.log(error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  // jsx that displays map, title and login/register text on the homepage
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
  <p>Register User (password must be 6 letters or longer)</p>
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
{/* Changes if user has been registered */}
{user?user.email:"Not Logged In"}
<button onClick={logout} className="rev-button"> Sign Out </button>
</body>
</html>

  );
}
