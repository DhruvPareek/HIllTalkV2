import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  fetchSignInMethodsForEmail,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "./firebase-config";
import "./App.css";
import Swal from "sweetalert2";

export let logged = false;
export default function AuthPage() {
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
        const signInMethods = await fetchSignInMethodsForEmail(auth, registerEmail);
        if (signInMethods.length > 0) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "Email is already registered"
          });
        } else {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            registerEmail,
            registerPassword
          );
          
          if (userCredential.user) {
            await sendEmailVerification(userCredential.user);
            Swal.fire({
              icon: 'warning',
              title: 'Wait!',
              //add a new line inbetween the two strings on the next line
              text: "Please verify your email before logging in (you were just sent an email). If you don't see it, check your spam folder.",
              allowOutsideClick: false,
              allowEscapeKey: false,
              allowEnterKey: false
            });
            await signOut(auth);
          }
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
        });
      }
    };
  
    //login function that signs in user
const login = async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      loginEmail,
      loginPassword
    );
    if (userCredential.user) {
      if (!userCredential.user.emailVerified) {
        await signOut(auth);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: "Please verify your email before logging in (you were sent an email when you registered)"
        })
      }
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: "Incorrect email or password"
    }) 
  }
};

  
    const logout = async () => {
      await signOut(auth);
    };
  
    // jsx that displays map, title and login/register text on the homepage
    return (
  <html>
  {user ? <div> <p className="loginText"> User Logged In: {user.email} </p>
   <p><button onClick={logout} className="rev-button"> Sign Out </button> </p> 
  </div> : (
      <div>
      <p><h2>Register User</h2> (password must be 6 letters or longer)</p>
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
    
      <button onClick={register} className="rev-button">Create User</button>
    <br />  <br />  <br />
    <h2>Login</h2>
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
    <button onClick={login} className="rev-button">Login</button>
  </div>
  )}
  </html>
  
    );
  }