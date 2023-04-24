    import './App.css';
    import React, { useState } from 'react';
    import {db} from "./firebase-config";
    import {collection, getDocs, addDoc, updateDoc, doc} from "firebase/firestore";
    import Swal from "sweetalert2";

    
    function ContactUs() {
      const [name, setName] = useState("");
      const [email, setEmail] = useState("");
      const [message, setMessage] = useState("");
      const reviewCollectionRef = collection(db, "Messages")
    
      const createReview = async () => {
        
        if(name != "" && email != "" && message != ""){
          await addDoc(reviewCollectionRef, { Name : name, Email : email, Message : message });
          Swal.fire({
            
            icon: 'success',
            title: 'Success!',
            text: "Your inquiry has been submitted.",
            footer: '<a href="/contact">Having Issues? - Contact Us!</a>'
          })  
        }
        else{
          Swal.fire({
            
            icon: 'error',
            title: 'Oops...',
            text: "Please fill out all sections before submitting.",
            footer: '<a href="/contact">Having Issues? - Contact Us!</a>'
          })  
        }
        };
    
      return (
        <div>
          <div style={{ position: 'relative' }}>
              <div style={{ 
                backgroundImage: 'url(https://cdn2.lamag.com/wp-content/uploads/sites/6/2022/09/UCLA.jpg)',
                backgroundSize: 'cover',
                height: '100vh',
                position: 'relative' }}>
              </div>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(255, 255, 255, 0.3)', // Example background color
                font: "Lucida Console",
                align: "center",
                fontSize: '30px',
                padding: '0px 12px'
              }}>
                <h5>Contact Us</h5>
                <b>We'd love to hear from you!</b>
                <br></br>
                <div>
                <p class="ContactText">This project was built by some of the best and brightest young minds at the University of California, Los Angeles for 
                  our Computer Science 35L class of Winter Quarter, 2023. We hope you find it helpful!<br></br>
                Creators: Aarya Tallada, Colin Hoggatt, Dhruv Pareek, Lakshman Sundaram, Ryan Miller
                </p>
                </div>
              </div>
          </div>
          
              
          <div style={{
            verticalAlign: "middle"
          }}>
          <b>Please submit issues below.</b>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              // value={name}
              onChange={(event) => setName(event.target.value)}
              class="ContactBox"
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              // value={email}
              onChange={(event) => setEmail(event.target.value)}
              class="ContactBox"
            />
          </div>
          <div>
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              // value={message}
              onChange={(event) => setMessage(event.target.value)}
              class="ContactBox"
              // margin="10px"
            />
          </div>
          <button onClick={createReview} type="submit">Submit</button> 
          </div>
        </div>
      );
    }
    
    export default ContactUs;
    