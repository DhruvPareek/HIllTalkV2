import {useState, useEffect, useReducer} from "react";
import React from 'react';
import './App.css';

import {db} from "./firebase-config"
import {collection, getDocs, addDoc, updateDoc, doc} from "firebase/firestore";


import {
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./firebase-config";

import Swal from "sweetalert2";


//Dining Halls function
function DiningHalls() {
  //hooks for search functionality 
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [matchingResults, setMatchingResults] = useState([]);

  //hooks for sorting functionality --> for each dining hall this will have an average rating for a specific aspect
  const [bplateAverage, setBplateAverage] = useState(0);
  const [epicAverage, setEpicAverage] = useState(0);
  const [dreyAverage, setDreyAverage] = useState(0);
  const [rendeWestAverage, setRendeWestAverage] = useState(0);
  const [rendeEastAverage, setRendeEastAverage] = useState(0);
  const [bcafeAverage, setBcafeAverage] = useState(0);
  const [bBowlAverage, setBBowlAverage] = useState(0);
  const [deNeveAverage, setDeNeveAverage] = useState(0);
  const [feastAverage, setFeastAverage] = useState(0);
  const [studyAverage, setStudyAverage] = useState(0);
  //hooks for sorting functionality --> for each dining hall this will have an average rating for a specific aspect

  const [sortedAspect, setSortedAspect] = useState("");
  const [sortedNames, setSortedNames] = useState([]);
  const [showSortedResults, setShowSortedResults] = useState(false);

  //hooks for average rating functionality for each DH
  const [bplateAverageRatings, setBplateAverageRatings] = useState([]);
  const [bplateOverallAverage, setBplateOverallAverage] = useState(0);
  const [epicAverageRatings, setEpicAverageRatings] = useState([]);
  const [epicOverallAverage, setEpicOverallAverage] = useState(0);
  const [dreyAverageRatings, setDreyAverageRatings] = useState([]);
  const [dreyOverallAverage, setDreyOverallAverage] = useState(0);
  const [rendeWestAverageRatings, setRendeWestAverageRatings] = useState([]);
  const [rendeWestOverallAverage, setRendeWestOverallAverage] = useState(0);
  const [rendeEastAverageRatings, setRendeEastAverageRatings] = useState([]);
  const [rendeEastOverallAverage, setRendeEastOverallAverage] = useState(0);
  const [bcafeAverageRatings, setBcafeAverageRatings] = useState([]);
  const [bcafeOverallAverage, setBcafeOverallAverage] = useState(0);
  const [bBowlAverageRatings, setBBowlAverageRatings] = useState([]);
  const [bBowlOverallAverage, setBBowlOverallAverage] = useState(0);
  const [deNeveAverageRatings, setDeNeveAverageRatings] = useState([]);
  const [deNeveOverallAverage, setDeNeveOverallAverage] = useState(0);
  const [feastAverageRatings, setFeastAverageRatings] = useState([]);
  const [feastOverallAverage, setFeastOverallAverage] = useState(0);
  const [studyAverageRatings, setStudyAverageRatings] = useState([]);
  const [studyOverallAverage, setStudyOverallAverage] = useState(0);
  //hooks for average rating functionality for each DH

  //SETS ORDER FOR SORTING BY SPECIFIC ELEMENT
  useEffect(() => {
    let foundBplate, foundEpic, foundDrey, foundRendeWest, foundRendeEast, foundBcafe, foundBBowl, foundDeNeve, foundFeast, foundStudy = false;
    setSortedNames(prevArray=>[]);
    let sortedNums = [bplateAverage, epicAverage, dreyAverage, rendeWestAverage, rendeEastAverage, bcafeAverage, bBowlAverage, deNeveAverage, feastAverage, studyAverage].sort((a, b) => b - a);
    //sorts array of the dining halls by the average rating of the aspect to sort by
    for(let i = 0; i < sortedNums.length; i++){
      if(sortedNums[i] === bplateAverage && !foundBplate){
        foundBplate = true;
        setSortedNames(prevArray=>[...prevArray, displayBplate]);
      }else if(sortedNums[i] === epicAverage && !foundEpic){
        foundEpic = true;
        setSortedNames(prevArray=>[...prevArray, displayEpic]);
      }else if(sortedNums[i] === dreyAverage && !foundDrey){
        foundDrey = true;
        setSortedNames(prevArray=>[...prevArray, displayDrey]);        
      }else if(sortedNums[i] === rendeWestAverage && !foundRendeWest){
        foundRendeWest = true;
        setSortedNames(prevArray=>[...prevArray, displayRendeWest]);  
      }else if(sortedNums[i] === rendeEastAverage && !foundRendeEast){
        foundRendeEast = true;
        setSortedNames(prevArray=>[...prevArray, displayRendeEast]);  
      }else if(sortedNums[i] === bcafeAverage && !foundBcafe){
        foundBcafe = true;
        setSortedNames(prevArray=>[...prevArray, displayBcafe]); 
      }
      else if(sortedNums[i] === bBowlAverage && !foundBBowl){
        foundBBowl = true;
        setSortedNames(prevArray=>[...prevArray, displayBBowl]); 
      }
      else if(sortedNums[i] === deNeveAverage && !foundDeNeve){
        foundDeNeve = true;
        setSortedNames(prevArray=>[...prevArray, displayDeNeve]); 
      }
      else if(sortedNums[i] === feastAverage && !foundFeast){
        foundFeast = true;
        setSortedNames(prevArray=>[...prevArray, displayFeast]); 
      }
      else if(sortedNums[i] === studyAverage && !foundStudy){
        foundStudy = true;
        setSortedNames(prevArray=>[...prevArray, displayStudy]); 
      }
    }
  }, [sortedAspect]);

  //For a given dining hall, retrieve all reviews and calculate the average rating for the given aspect
  async function getAverageRatingForAllDH(props) {
    const bplateAveragePromise = retrieveAverages("Bplate", props);
    const epicAveragePromise = retrieveAverages("Epicuria", props);
    const dreyAveragePromise = retrieveAverages("Drey", props);
    const rendeWestAveragePromise = retrieveAverages("RendeWest", props);
    const rendeEastAveragePromise = retrieveAverages("RendeEast", props);
    const bcafeAveragePromise = retrieveAverages("Bcafe", props);
    const bBowlAveragePromise = retrieveAverages("BruinBowl", props);
    const deNeveAveragePromise = retrieveAverages("De Neve", props);
    const feastAveragePromise = retrieveAverages("Feast", props);
    const studyAveragePromise = retrieveAverages("Study", props);
  
    setBplateAverage(await bplateAveragePromise);
    setEpicAverage(await epicAveragePromise);
    setDreyAverage(await dreyAveragePromise);
    setRendeWestAverage(await rendeWestAveragePromise);
    setRendeEastAverage(await rendeEastAveragePromise);
    setBcafeAverage(await bcafeAveragePromise);
    setBBowlAverage(await bBowlAveragePromise);
    setDeNeveAverage(await deNeveAveragePromise);
    setFeastAverage(await feastAveragePromise);
    setStudyAverage(await studyAveragePromise);

    setSortedAspect(props);
    setShowSortedResults(true);
  }

  async function getRatingsForOneDH(props){
    const healthAveragePromise = retrieveAverages(props, 1);
    const tasteAveragePromise = retrieveAverages(props, 2);
    const waitAveragePromise = retrieveAverages(props, 3);
    const seatingAveragePromise = retrieveAverages(props, 4);

    const healthAverage = await healthAveragePromise;
    const tasteAverage = await tasteAveragePromise;
    const waitAverage = await waitAveragePromise;
    const seatingAverage = await seatingAveragePromise;

    if(props === "Feast"){
      setFeastAverageRatings([healthAverage, tasteAverage, waitAverage, seatingAverage]);
      setFeastOverallAverage((healthAverage + tasteAverage + waitAverage + seatingAverage)/4);
    }else if(props === "Bplate"){
      setBplateAverageRatings([healthAverage, tasteAverage, waitAverage, seatingAverage]);
      setBplateOverallAverage((healthAverage + tasteAverage + waitAverage + seatingAverage)/4);
    }else if(props === "Epicuria"){
      setEpicAverageRatings([healthAverage, tasteAverage, waitAverage, seatingAverage]);
      setEpicOverallAverage((healthAverage + tasteAverage + waitAverage + seatingAverage)/4);
    }else if(props === "Drey"){
      setDreyAverageRatings([healthAverage, tasteAverage, waitAverage, seatingAverage]);
      setDreyOverallAverage((healthAverage + tasteAverage + waitAverage + seatingAverage)/4);
    }else if(props === "RendeWest"){
      setRendeWestAverageRatings([healthAverage, tasteAverage, waitAverage, seatingAverage]);
      setRendeWestOverallAverage((healthAverage + tasteAverage + waitAverage + seatingAverage)/4);
    }else if(props === "RendeEast"){
      setRendeEastAverageRatings([healthAverage, tasteAverage, waitAverage, seatingAverage]);
      setRendeEastOverallAverage((healthAverage + tasteAverage + waitAverage + seatingAverage)/4);
    }else if(props === "Bcafe"){
      setBcafeAverageRatings([healthAverage, tasteAverage, waitAverage, seatingAverage]);
      setBcafeOverallAverage((healthAverage + tasteAverage + waitAverage + seatingAverage)/4);
    }else if(props === "BruinBowl"){
      setBBowlAverageRatings([healthAverage, tasteAverage, waitAverage, seatingAverage]);
      setBBowlOverallAverage((healthAverage + tasteAverage + waitAverage + seatingAverage)/4);
    }else if(props === "De Neve"){
      setDeNeveAverageRatings([healthAverage, tasteAverage, waitAverage, seatingAverage]);
      setDeNeveOverallAverage((healthAverage + tasteAverage + waitAverage + seatingAverage)/4);
    }else if(props === "Study"){
      setStudyAverageRatings([healthAverage, tasteAverage, waitAverage, seatingAverage]);
      setStudyOverallAverage((healthAverage + tasteAverage + waitAverage + seatingAverage)/4);
    }

  }

  useEffect(() => {
      getRatingsForOneDH("Feast");
      getRatingsForOneDH("Bplate");
      getRatingsForOneDH("Epicuria");
      getRatingsForOneDH("Drey");
      getRatingsForOneDH("RendeWest");
      getRatingsForOneDH("RendeEast");
      getRatingsForOneDH("Bcafe");
      getRatingsForOneDH("BruinBowl");
      getRatingsForOneDH("De Neve");
      getRatingsForOneDH("Study");
  },[]);

  function displayRendeWest(){
    return (
      <div>
        <br />
        <h3>Rendezvous West</h3>
        <div class="flex-container">
        <img src="data:image/jpeg;base64,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"  width="250" height="200" class="RendeWest"></img>
        <div class="rating-section">
        <h4>Overall Rating:</h4> <p className="specialBlueText">{rendeWestOverallAverage !== undefined ? rendeWestOverallAverage.toFixed(1) : rendeWestOverallAverage}/5</p>
        <div class="rating">
        <span className="blueText">Healthiness: </span>{rendeWestAverageRatings[0] !== undefined ? rendeWestAverageRatings[0].toFixed(1) : rendeWestAverageRatings[0]}/5 <br /><br />
      <span className="blueText">Tastiness: </span>{rendeWestAverageRatings[1] !== undefined ? rendeWestAverageRatings[1].toFixed(1) : rendeWestAverageRatings[1]}/5 <br /><br />
      <span className="blueText">Wait Time: </span>{rendeWestAverageRatings[2] !== undefined ? rendeWestAverageRatings[2].toFixed(1) : rendeWestAverageRatings[2]}/5 <br /><br />
      <span className="blueText">Seating: </span>{rendeWestAverageRatings[3] !== undefined ? rendeWestAverageRatings[3].toFixed(1) : rendeWestAverageRatings[3]}/5 <br /><br />
      </div>
      </div>
      </div>
        <div class="ListOfReviews">
        {ReviewDatabase("RendeWest")}
        </div>
        </div>
    );
  }

  function displayRendeEast(){
    return (
      <div>
        <br />
        <h3>Rendezvous East</h3>
        <div class="flex-container">
        <img src="https://cdn.usarestaurants.info/assets/uploads/99b3d00c1c9de792d13244a48fc97d20_-united-states-california-los-angeles-county-los-angeles-648364-rendezvoushtm.jpg"  width="150" height="300" className="RendeEast"></img>
        <div class="rating-section">
        <h4>Overall Rating:</h4> <p className="specialBlueText">{rendeEastOverallAverage !== undefined ? rendeEastOverallAverage.toFixed(1) : rendeEastOverallAverage}/5</p>
        <div class="rating">
        <span className="blueText">Healthiness: </span>{rendeEastAverageRatings[0] !== undefined ? rendeEastAverageRatings[0].toFixed(1) : rendeEastAverageRatings[0]}/5 <br /><br />
      <span className="blueText">Tastiness: </span>{rendeEastAverageRatings[1] !== undefined ? rendeEastAverageRatings[1].toFixed(1) : rendeEastAverageRatings[1]}/5 <br /><br />
      <span className="blueText">Wait Time: </span>{rendeEastAverageRatings[2] !== undefined ? rendeEastAverageRatings[2].toFixed(1) : rendeEastAverageRatings[2]}/5 <br /><br />
      <span className="blueText">Seating: </span>{rendeEastAverageRatings[3] !== undefined ? rendeEastAverageRatings[3].toFixed(1) : rendeEastAverageRatings[3]}/5 <br /><br />
      </div>
      </div>
      </div>
        <div class="ListOfReviews">
        {ReviewDatabase("RendeEast")}
        </div>
        </div>
    );
  }

  function displayDeNeve(){
    return (
      <div>
        <br />
      <h3>De Neve</h3>
      <div class="flex-container">
        <img src="https://portal.housing.ucla.edu/sites/default/files/media/images/DiningWebsite_HeaderImages_DeNeve.png"  width="250" height="200" class="DeNeveDH"></img>
        <div class="rating-section">
        <h4>Overall Rating:</h4> <p className="specialBlueText">{deNeveOverallAverage !== undefined ? deNeveOverallAverage.toFixed(1) : deNeveOverallAverage}/5</p>
        <div class="rating">
        <span className="blueText">Healthiness: </span>{deNeveAverageRatings[0] !== undefined ? deNeveAverageRatings[0].toFixed(1) : deNeveAverageRatings[0]}/5 <br /><br />
      <span className="blueText">Tastiness: </span>{deNeveAverageRatings[1] !== undefined ? deNeveAverageRatings[1].toFixed(1) : deNeveAverageRatings[1]}/5 <br /><br />
      <span className="blueText">Wait Time: </span>{deNeveAverageRatings[2] !== undefined ? deNeveAverageRatings[2].toFixed(1) : deNeveAverageRatings[2]}/5 <br /><br />
      <span className="blueText">Seating: </span>{deNeveAverageRatings[3] !== undefined ? deNeveAverageRatings[3].toFixed(1) : deNeveAverageRatings[3]}/5 <br /><br />
      </div>
      </div>
      </div>
        <div class="ListOfReviews">
        {ReviewDatabase("De Neve")}
        </div>
      </div>
      
    );
  }

  function displayEpic(){
    return (
      <div>
        <br />
        <h3>Epicuria</h3>
        <div class="flex-container">
        <img src="https://portal.housing.ucla.edu/sites/default/files/media/images/DiningWebsite_HeaderImages_EpicuriaAckerman2.png"  width="250" height="200" class="Epicuria"></img>
        <div class="rating-section">
        <h4>Overall Rating:</h4> <p className="specialBlueText">{epicOverallAverage !== undefined ? epicOverallAverage.toFixed(1) : epicOverallAverage}/5</p>
        <div class="rating">
        <span className="blueText">Healthiness: </span>{epicAverageRatings[0] !== undefined ? epicAverageRatings[0].toFixed(1) : epicAverageRatings[0]}/5 <br /><br />
      <span className="blueText">Tastiness: </span>{epicAverageRatings[1] !== undefined ? epicAverageRatings[1].toFixed(1) : epicAverageRatings[1]}/5 <br /><br />
      <span className="blueText">Wait Time: </span>{epicAverageRatings[2] !== undefined ? epicAverageRatings[2].toFixed(1) : epicAverageRatings[2]}/5 <br /><br />
      <span className="blueText">Seating: </span>{epicAverageRatings[3] !== undefined ? epicAverageRatings[3].toFixed(1) : epicAverageRatings[3]}/5 <br /><br />
      </div>
      </div>
      </div>
        <div class="ListOfReviews">
        {ReviewDatabase("Epicuria")}
        </div>
      </div>
    );
  }

  function displayBplate(){
    return (
      <div>
        <br />
        <h3>Bplate</h3>
        <div class="flex-container">
        <img src="https://portal.housing.ucla.edu/sites/default/files/media/images/DiningWebsite_HeaderImages_Bruin%20Plate.png"  width="250" height="200" class="Bplate"></img>
        <div class="rating-section">
        <h4>Overall Rating:</h4> <p className="specialBlueText">{bplateOverallAverage !== undefined ? bplateOverallAverage.toFixed(1) : bplateOverallAverage}/5</p>
        <div class="rating">
        <span className="blueText">Healthiness: </span>{bplateAverageRatings[0]!== undefined ? bplateAverageRatings[0].toFixed(1) : bplateAverageRatings[0]}/5 <br /><br />
      <span className="blueText">Tastiness: </span>{bplateAverageRatings[1]!== undefined ? bplateAverageRatings[1].toFixed(1) : bplateAverageRatings[1]}/5 <br /><br />
      <span className="blueText">Wait Time: </span>{bplateAverageRatings[2]!== undefined ? bplateAverageRatings[2].toFixed(1) : bplateAverageRatings[2]}/5 <br /><br />
      <span className="blueText">Seating: </span>{bplateAverageRatings[3]!== undefined ? bplateAverageRatings[3].toFixed(1) : bplateAverageRatings[3]}/5 <br /><br />
      </div>
      </div>
      </div>
        <div class="ListOfReviews">
        {ReviewDatabase("Bplate")}
        </div>
      </div>
    );
  }

  function displayStudy(){
    return (
      <div>
        <br />
        <h3>The Study</h3>
        <div class="flex-container">
        <img src="https://portal.housing.ucla.edu/sites/default/files/media/images/DiningWebsite_HeaderImages_TheStudyatHedrick.png"  width="250" height="200" class="TheStudy"></img>
        <div class="rating-section">
        <h4>Overall Rating:</h4> <p className="specialBlueText">{studyOverallAverage !== undefined ? studyOverallAverage.toFixed(1) : studyOverallAverage}/5</p>
        <div class="rating">
        <span className="blueText">Healthiness: </span>{studyAverageRatings[0] !== undefined ? studyAverageRatings[0].toFixed(1) : studyAverageRatings[0]}/5 <br /><br />
      <span className="blueText">Tastiness: </span>{studyAverageRatings[1] !== undefined ? studyAverageRatings[1].toFixed(1) : studyAverageRatings[1]}/5 <br /><br />
      <span className="blueText">Wait Time: </span>{studyAverageRatings[2] !== undefined ? studyAverageRatings[2].toFixed(1) : studyAverageRatings[2]}/5 <br /><br />
      <span className="blueText">Seating: </span>{studyAverageRatings[3] !== undefined ? studyAverageRatings[3].toFixed(1) : studyAverageRatings[3]}/5 <br /><br />
      </div>
      </div>
      </div>
        <div class="ListOfReviews">
        {ReviewDatabase("Study")}
        </div>
      </div>
    );
  }

  function displayBcafe(){
    return (
      <div>
        <br />
        <h3>Bruin Cafe</h3>
        <div class="flex-container">
        <img src="https://portal.housing.ucla.edu/sites/default/files/media/images/DiningWebsite_HeaderImages_Bruin%20Cafe.png"  width="250" height="200" class="BCafe"></img>
        <div class="rating-section">
        <h4>Overall Rating:</h4> <p className="specialBlueText">{bcafeOverallAverage !== undefined ? bcafeOverallAverage.toFixed(1) : bcafeOverallAverage}/5</p>
        <div class="rating">
        <span className="blueText">Healthiness: </span>{bcafeAverageRatings[0] !== undefined ? bcafeAverageRatings[0].toFixed(1) : bcafeAverageRatings[0]}/5 <br /><br />
      <span className="blueText">Tastiness: </span>{bcafeAverageRatings[1] !== undefined ? bcafeAverageRatings[1].toFixed(1) : bcafeAverageRatings[1]}/5 <br /><br />
      <span className="blueText">Wait Time: </span>{bcafeAverageRatings[2] !== undefined ? bcafeAverageRatings[2].toFixed(1) : bcafeAverageRatings[2]}/5 <br /><br />
      <span className="blueText">Seating: </span>{bcafeAverageRatings[3] !== undefined ? bcafeAverageRatings[3].toFixed(1) : bcafeAverageRatings[3]}/5 <br /><br />
      </div>
      </div>
      </div>
        <div class="ListOfReviews">
        {ReviewDatabase("Bcafe")}
        </div>
      </div>
    );
  }

  function displayBBowl(){
    return (
      <div>
        <br />
        <h3>Bruin Bowl</h3>
        <div class="flex-container">
        <img src="https://portal.housing.ucla.edu/sites/default/files/media/images/DiningWebsite_HeaderImages_Bruin%20Bowl.png"  width="250" height="200" class="BruinBowl"></img>
        <div class="rating-section">
        <h4>Overall Rating:</h4> <p className="specialBlueText">{bBowlOverallAverage !== undefined ? bBowlOverallAverage.toFixed(1) : bBowlOverallAverage}/5</p>
        <div class="rating">
      <span className="blueText">Healthiness: </span>{bBowlAverageRatings[0]!== undefined ? bBowlAverageRatings[0].toFixed(1) : bBowlAverageRatings[0]}/5 <br /><br />
      <span className="blueText">Tastiness: </span>{bBowlAverageRatings[1]!== undefined ? bBowlAverageRatings[1].toFixed(1) : bBowlAverageRatings[1]}/5 <br /><br />
      <span className="blueText">Wait Time: </span>{bBowlAverageRatings[2]!== undefined ? bBowlAverageRatings[2].toFixed(1) : bBowlAverageRatings[2]}/5 <br /><br />
      <span className="blueText">Seating: </span>{bBowlAverageRatings[3]!== undefined ? bBowlAverageRatings[3].toFixed(1) : bBowlAverageRatings[3]}/5 <br /><br />
      </div>
      </div>
      </div>
        <div class="ListOfReviews">
        {ReviewDatabase("BruinBowl")}
        </div>
      </div>
    );
  }

  function displayFeast(){
    return (
      <div>
        <br />
        <h3>FEAST</h3>
        <div class="flex-container">
        <img src="https://portal.housing.ucla.edu/sites/default/files/media/images/DiningWebsite_HeaderImages_FEASTatRieber.png"  width="250" height="200" class="FEAST"></img>
        <div class="rating-section">
      <h4>Overall Rating:</h4> <p className="specialBlueText">{feastOverallAverage !== undefined ? feastOverallAverage.toFixed(1) : feastOverallAverage}/5</p>
      <div class="rating">
      <span className="blueText">Healthiness: </span>{feastAverageRatings[0] !== undefined ? feastAverageRatings[0].toFixed(1) : feastAverageRatings[0]}/5 <br /><br />
      <span className="blueText">Tastiness: </span>{feastAverageRatings[1] !== undefined ? feastAverageRatings[1].toFixed(1) : feastAverageRatings[1]}/5 <br /><br />
      <span className="blueText">Wait Time: </span>{feastAverageRatings[2] !== undefined ? feastAverageRatings[2].toFixed(1) : feastAverageRatings[2]}/5 <br /><br />
      <span className="blueText">Seating: </span>{feastAverageRatings[3] !== undefined ? feastAverageRatings[3].toFixed(1) : feastAverageRatings[3]}/5 <br /><br />
      </div>
      </div>
      </div>
        <div class="ListOfReviews">
        {ReviewDatabase("Feast")}
        </div>
      </div>
    );
  }

  function displayDrey(){
    return (
      <div>
        <br />
        <h3>The Drey</h3>
        <div class="flex-container">
        <img src="https://portal.housing.ucla.edu/sites/default/files/media/images/DiningWebsite_HeaderImages_TheDrey_1.png"  width="250" height="200" class="Drey"></img>
        <div class="rating-section">
        <h4>Overall Rating:</h4> <p className="specialBlueText">{dreyOverallAverage !== undefined ? dreyOverallAverage.toFixed(1) : dreyOverallAverage}/5</p>
        <div class="rating">
        <span className="blueText">Healthiness: </span>{dreyAverageRatings[0] !== undefined ? dreyAverageRatings[0].toFixed(1) : dreyAverageRatings[0]}/5 <br /><br />
      <span className="blueText">Tastiness: </span>{dreyAverageRatings[1] !== undefined ? dreyAverageRatings[1].toFixed(1) : dreyAverageRatings[1]}/5 <br /><br />
      <span className="blueText">Wait Time: </span>{dreyAverageRatings[2] !== undefined ? dreyAverageRatings[2].toFixed(1) : dreyAverageRatings[2]}/5 <br /><br />
      <span className="blueText">Seating: </span>{dreyAverageRatings[3] !== undefined ? dreyAverageRatings[3].toFixed(1) : dreyAverageRatings[3]}/5 <br /><br />
      </div>
      </div>
      </div>
        <div class="ListOfReviews">
        {ReviewDatabase("Drey")}
        </div>
      </div>
    );
  }

  function handleSearch() {
    retrieveMatchingResults(searchTerm).then((searchMatches) => {
      setMatchingResults(searchMatches);
    });
    setShowSearchResults(true);
  }

    return (
        <html>
        <head>
        <title>HillTalk</title>
        </head>
        <body>
          <img src="https://s3.amazonaws.com/cms.ipressroom.com/173/files/20160/56a670f2bd26f54876001535_UCLAOlympicVillage6/UCLAOlympicVillage6_4d51350a-2c04-4d93-8fe3-ac4e6b248efc-prv.jpg" alt="Bplate" width="720" height="405" class = "DiningHallCover" />
          <br />
          <div className="blueBackground">
          <p className="introText">This page contains every dining hall, takeout and buffet style places from around the hill.</p>
           <b>Sort By:</b>
           <ul>
            {/* Buttons for sorting */}
            <button type='button' className="btn btn-primary" onClick={() => { getAverageRatingForAllDH(1);}}>Healthiness{}</button>  
            <button type='button' className="btn btn-primary" onClick={() => { getAverageRatingForAllDH(2);}}>Tastiness{}</button>  
            <button type='button' className="btn btn-primary" onClick={() => { getAverageRatingForAllDH(3);}}>Wait Time{}</button>  
            <button type='button' className="btn btn-primary" onClick={() => { getAverageRatingForAllDH(4);}}>Availability of Seating{}</button>
            </ul> 
            <br></br>

            {/* Searchbox implementation */}
            <div class="searchBox">
        <h4>Search For Keywords in Reviews:</h4>
        <input type="text" value = {searchTerm}  onChange={event => setSearchTerm(event.target.value)} 
        id="searchBox" placeholder="Enter keywords..." size="50" ></input>
       <button onClick={handleSearch} className="rev-button">Search</button><br />
       </div>

       <div class="SearchResults">  {showSearchResults ? (
    <div>
      {matchingResults.map((result) => (
        <p key={result}>{result}<br /><br /><br /></p>
      ))}
    </div>
    
  ) : null}</div><br /><br />
  </div>
  {showSortedResults ? 
  // display sorted dining halls
  (<div>
        {sortedNames[0]()}
        <br />
        <br />
        {sortedNames[1]()}
        <br />
        <br />
        {sortedNames[2]()}
        <br />
        <br />
        {sortedNames[3]()}
        <br />
        <br />
        {sortedNames[4]()}
        <br />
        <br />
        {sortedNames[5]()}
        <br />
        <br />
        {sortedNames[6]()}
        <br />
        <br />
        {sortedNames[7]()}
        <br />
        <br />
        {sortedNames[8]()}
        <br />
        <br />
        {sortedNames[9]()}
        <br />
    </div>) : 
      (<div>
        {displayRendeWest()}
        <br />
        <br />
        {displayRendeEast()}
        <br />
        <br />
        {displayDeNeve()}
        <br />
        <br />
        {displayEpic()}
        <br />
        <br />
        {displayBplate()}
        <br />
        <br />
        {displayStudy()}
        <br />
        <br />
        {displayBcafe()}
        <br />
        <br />
        {displayBBowl()}
        <br />
        <br />
        {displayFeast()}
        <br />
        <br />
        {displayDrey()}
        <br />
      </div>)
      }
      </body>
      </html>
      );
}

// function to match user input search with keywords in reviews
async function retrieveMatchingResults(props){
  let searchMatches = await findMatches(props);
  return searchMatches;
  // do something with hedrickMatches
}
// read in text from reviews to match with user's search
const readInSearchData = async (reviewCollectionRef) => {
  const querySnapshot = await getDocs(reviewCollectionRef);

  // create array of reviews from collection
  const readInReviews = [];
  
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    data.id = doc.id;
    readInReviews.push(data);
    // console.log(typeof data);
  });

  return readInReviews;
}

// findMatches function that reads in the reviews for each dining hall and stores the text they display
const findMatches = async(userSearch) => {
  const rendeWestCollectionRef = collection(db, "RendeWest");
  const rendeEastCollectionRef = collection(db, "RendeEast");
  const bCafeCollectionRef = collection(db, "Bcafe");
  const bPlateCollectionRef = collection(db, "Bplate");
  const bBowlCollectionRef = collection(db, "BruinBowl");
  const dNeveCollectionRef = collection(db, "De Neve");
  const dreyCollectionRef = collection(db, "Drey");
  const epicCollectionRef = collection(db, "Epicuria");
  const feastCollectionRef = collection(db, "Feast");
  const studyCollectionRef = collection(db, "Study");

  const readInRendeWestReviews = await readInSearchData(rendeWestCollectionRef);
  const readInRendeEastReviews = await readInSearchData(rendeEastCollectionRef);
  const readInBCafeReviews = await readInSearchData(bCafeCollectionRef);
  const readInBPlateReviews = await readInSearchData(bPlateCollectionRef);
  const readInBBowlReviews = await readInSearchData(bBowlCollectionRef);
  const readInDNeveReviews = await readInSearchData(dNeveCollectionRef);
  const readInDreyReviews = await readInSearchData(dreyCollectionRef);
  const readInEpicReviews = await readInSearchData(epicCollectionRef);
  const readInFeastReviews = await readInSearchData(feastCollectionRef);
  const readInStudyReviews = await readInSearchData(studyCollectionRef);

  // Empty review function to store reviews to display that have a matching keyword
  let allRevs = [];

  // Push matching reviews from each dining hall to the allRevs array
  readInRendeWestReviews.forEach((review) => {
    allRevs.push("Rendezvous West: \"" + review.Review + "\""); // Push the dining hall followed by its matching review
    
  });

  readInRendeEastReviews.forEach((review) => {
    allRevs.push("Rendezvous East: \"" + review.Review + "\""); // Push the dining hall followed by its matching review
    
  });

  readInBCafeReviews.forEach((review) => {
    allRevs.push("BCafe: \"" + review.Review + "\""); // Push the dining hall followed by its matching review
  });

  readInBPlateReviews.forEach((review) => {
    allRevs.push("B-Plate: \"" + review.Review + "\""); // Push the dining hall followed by its matching review
  });

  readInBBowlReviews.forEach((review) => {
    allRevs.push("Bruin Bowl: \"" + review.Review + "\""); // Push the dining hall followed by its matching review
  });

  readInDNeveReviews.forEach((review) => {
    allRevs.push("De Neve: \"" + review.Review + "\""); // Push the dining hall followed by its matching review
  });

  readInDreyReviews.forEach((review) => {
    allRevs.push("Drey: \"" + review.Review + "\""); // Push the dining hall followed by its matching review
  });

  readInEpicReviews.forEach((review) => {
    allRevs.push("Epicuria: \"" + review.Review + "\""); // Push the dining hall followed by its matching review
  });

  readInFeastReviews.forEach((review) => {
    allRevs.push("Feast: \"" + review.Review + "\""); // Push the dining hall followed by its matching review
  });

  readInStudyReviews.forEach((review) => {
    allRevs.push("The Study: \"" + review.Review + "\""); // Push the dining hall followed by its matching review
  });

  let matchingElements = [];
  allRevs.forEach(item => {
    if (item.toLowerCase().includes(userSearch.toLowerCase())) {
      matchingElements.push(item)
    }
  });

  return matchingElements;
}

// function that calls computeAverage and returns average values for ratings
async function retrieveAverages(facilityName, category){
  let averageValue = await computeAverage(facilityName, category);
  return averageValue;

}

const computeAverage = async(collectionName, category) => {  
    const reviewCollectionRef = collection(db, collectionName);
  
    const readInReviews = await readInData(reviewCollectionRef); //read in data from review
  
    const length = readInReviews.length; //number of reviews
  
  
    //don't need to do any read in data
    if (length == 0){
      return 0;
    }
  
    //read in data from collection that string specifies
    
    let totalRating = 0;
    
    if (category == "1"){
      //compute average of facility quality 
  
      readInReviews.forEach((review) =>{
        totalRating += parseInt(review.HealthRating); //add up facility rating for each review
      });
    }
  
    else if (category == "2") {
  
      readInReviews.forEach((review) => {
        totalRating += parseInt(review.QualityRating); //add up facility rating for each review
      });
    }
  
    else if (category == "3"){
  
      readInReviews.forEach((review) =>{
        totalRating += parseInt(review.TimeRating); //add up facility rating for each review
      });
    }
  
    else if (category == "4"){
  
      readInReviews.forEach((review) =>{
        totalRating += parseInt(review.SeatingRating); //add up facility rating for each review
      });
    }

    // return the average rating 
    return totalRating / length;
}

//take snapshot and read in data from backend 
const readInData = async (reviewCollectionRef) => {
    const querySnapshot = await getDocs(reviewCollectionRef);

    // create array of reviews from collection
    const readInReviews = [];
    
    querySnapshot.forEach((doc) => {
    const data = doc.data();
    data.id = doc.id;
    readInReviews.push(data);
    });

    return readInReviews;
}

// copy this into every file where there are reviews for authentication, also need one import statement thats at the top
let logged = false;
function ReviewDatabase(string){
    const [Reviews, setReview] = useState([]); //hook instead of class
    const ReviewCollectionRef = collection(db, string) //gets the collection of reviews from the database and stores into var

    const [newReview, setNewReview] = useState("");
    const [newHealthRating, setNewHealthRating] = useState(-1);
    const [newQualityRating, setNewQualityRating] = useState(-1);
    const [newTimeRating, setNewTimeRating] = useState(-1);
    const [newSeatingRating, setNewSeatingRating] = useState(-1);

    const [reducerValue, forceUpdate] = useReducer(x => x+1, 0);

    const [showAllReviews, setShowAllReviews] = useState(false);
    const [leaveReview, setLeaveReview] = useState(false);


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
    //end of what you need to copy
    const createReview = async () => {
      setLeaveReview(false);
      if (logged){
        if((newSeatingRating != -1 && newTimeRating != -1 && newHealthRating != -1 && newQualityRating != -1 && newReview != "" &&  newSeatingRating >=0 && newSeatingRating <=5 && newTimeRating >= 0 && newTimeRating <= 5 && newHealthRating >= 0 && newHealthRating <= 5 && newQualityRating >= 0 && newQualityRating <= 5)){
        await addDoc(ReviewCollectionRef, { Review: newReview, SeatingRating: Number(newSeatingRating), TimeRating: Number(newTimeRating), HealthRating: Number(newHealthRating), QualityRating: Number(newQualityRating), 
          Overall: ((Number(newSeatingRating) + Number(newTimeRating) + Number(newHealthRating) + Number(newQualityRating))/4), upvotes: Number(0), downvotes: Number(0), userEmail: ""});
        forceUpdate();
          //alert("Review Submitted!! Refresh page to view.")
      }
      else{
        Swal.fire({
          
          icon: 'error',
          title: 'Oops...',
          text: "Please leave a review and rating for each field (0-5) in order to submit"
        })  
      }
      }
      else{

        Swal.fire({
          
          icon: 'error',
          title: 'Oops...',
          text: "Please Login at Home Page before leaving a review"
        }) 
      }
      };

     //for updating review when upvote button clicked if user is logged in
     const upVote = async (id, numupvotes, userEmail) => { // NEW CHANGE
      if(userEmail.includes(auth.currentUser.email)){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'You have already voted on this review!'
        })
      }
      else if(logged){
        const reviewDoc = doc(db, string, id);
        const newFields = {upvotes: numupvotes + 1, userEmail: [...userEmail, auth.currentUser.email]};
        await updateDoc(reviewDoc, newFields);
        forceUpdate();
        //alert("Upvote counted!! Refresh page to view.")
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please Login at Home Page before Upvoting!'
        })
      }
    }
  
    //for updating review when downvote button clicked if user is logged in
    const downVote = async (id, numdownvotes, userEmail) => { // NEW CHANGE
      if(userEmail.includes(auth.currentUser.email)){
        Swal.fire({
          
          icon: 'error',
          title: 'Oops...',
          text: 'You have already voted on this review!'
        })
      }
      else if(logged){
        const reviewDoc = doc(db, string, id);
        const newFields = {downvotes: numdownvotes + 1, userEmail: [...userEmail, auth.currentUser.email]};
        await updateDoc(reviewDoc, newFields);
        forceUpdate();
        //alert("Downvote counted!! Refresh page to view.")
      }else{
        Swal.fire({
          
          icon: 'error',
          title: 'Oops...',
          text: 'Please Login at Home Page before Downvoting!'
        })
      }
    }

    useEffect(() => {
      const getReviews = async () => {
        // const data = await getDocs(reviewCollectionRef);
        // setReview(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        const data = await getDocs(ReviewCollectionRef);

        // Create an array of fetched reviews
        const fetchedReviews = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
      
        // Sort the array by the difference between upvotes and downvotes, in descending order
        fetchedReviews.sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes));
      
        // Set the sorted array to the 'reviews' state
        setReview(fetchedReviews);
      }
  
      getReviews()  
    }, [reducerValue])

    function displayAllReviews(props){
      if(props == 1){
        setShowAllReviews(true);
      }else{
        setShowAllReviews(false);
      }
    }

    function leaveAReview(){
      if(leaveReview == false){
        setLeaveReview(true);
      }else{
        setLeaveReview(false);
      }
    }

    // jsx that displays on the Dining Halls page
    return (
      <div className="ReviewDatabase">
      <button onClick={leaveAReview} className="rev-button"> Leave a Review</button>
      {leaveReview ? (
      <div className="form-container">
      <textarea
        placeholder="Review. . ."
        onChange={(event) => {
          setNewReview(event.target.value);
        }}
        className="ReviewBox"
        rows="8"  // change this to increase/decrease height
        cols="50" // change this to increase/decrease width
      />
      <div className="input-group-horiz">
      <p className="no-margin">Healthiness: 
        <input
        type="number"
        min={0}
        max={5}
        placeholder="0-5"
        onChange={(event) => {
          setNewHealthRating(event.target.value);
        }}
        class="RatingBox"
      />
      </p>
      <p className="no-margin">Tastiness: 
      <input
        type="number"
        min={0}
        max={5}
        placeholder="0-5"
        onChange={(event) => {
          setNewQualityRating(event.target.value);
        }}
        class="RatingBox"
      /></p>
      <p className="no-margin">Wait Time: 
      <input
        type="number"
        min={0}
        max={5}
        placeholder="0-5"
        onChange={(event) => {
          setNewTimeRating(event.target.value);
        }}
        class="RatingBox"
      /></p>
      <p className="no-margin">Availability of Seating: 
      <input
        type="number"
        min={0}
        max={5}
        placeholder="0-5"
        onChange={(event) => {
          setNewSeatingRating(event.target.value);
        }}
        class="RatingBox"
      /></p>
      <button onClick={createReview} className="rev-button"> Submit Review</button>
      </div>
      </div>) : null}
        {/* DISPLAYING MOST POPULAR/AGREED UPON REVVIEW */}
        <h3>Top Review:</h3>
          {Reviews.length > 0 ? (<div>
          <div className="eachReview">

            {/* Display each rating and the reviews */}
            <p><span className="RevTitles"><b>Review: </b></span>{Reviews[0].Review}</p>
            <p><span className="RevTitles"><b>Overall Rating: </b></span>{Reviews[0].Overall}</p>
            <p><span className="RevTitles">Healthiness: </span><span>{Reviews[0].HealthRating}/5</span><span className="RevTitles">  |  Tastiness: </span><span>{Reviews[0].QualityRating}/5</span><span className="RevTitles">  |  Wait Time: </span><span>{Reviews[0].TimeRating}/5</span><span className="RevTitles">  |  Availability of Seating: </span><span>{Reviews[0].SeatingRating}/5</span></p>

            {/* Display upvotes */}
            <button onClick={() => {upVote(Reviews[0].id, Reviews[0].upvotes, Reviews[0].userEmail)}} class="thumbsup"><span role="img" aria-label="thumbs-up">&#x1F44D;</span></button>{Reviews[0].upvotes}
            <button onClick={() => {downVote(Reviews[0].id, Reviews[0].downvotes, Reviews[0].userEmail)}} class="thumbsdown"><span role="img" aria-label="thumbs-down">&#x1F44E;</span></button>{Reviews[0].downvotes}
            </div>                
            {/* BUTTON TO DISPLAY REST OF THE REVIEWS */}
                {!showAllReviews && <button onClick={() => displayAllReviews(1)} className="rev-button">More Reviews</button>}
                {showAllReviews && <button onClick={() => displayAllReviews(2)} className="rev-button">Less Reviews</button>}</div>) : (<div>No reviews available</div>)}
                {showAllReviews ?  Reviews.slice(1).map((review) => {
          return (
            <div className="eachReview">
            {/* Display each rating and the reviews */}
            <p><span className="RevTitles"><b>Review: </b></span>{review.Review}</p>
            <p><span className="RevTitles"><b>Overall Rating: </b></span>{review.Overall}</p>
            <p><span className="RevTitles">Healthiness: </span><span>{review.HealthRating}/5</span><span className="RevTitles">  |  Tastiness: </span><span>{review.QualityRating}/5</span><span className="RevTitles">  |  Wait Time: </span><span>{review.TimeRating}/5</span><span className="RevTitles">  |  Availability of Seating: </span><span>{review.SeatingRating}/5</span></p>

            {/* Display upvotes */}
            <button onClick={() => {upVote(review.id, review.upvotes, review.userEmail)}} class="thumbsup"><span role="img" aria-label="thumbs-up">&#x1F44D;</span></button>{review.upvotes}
        <button onClick={() => {downVote(review.id, review.downvotes, review.userEmail)}} class="thumbsdown"><span role="img" aria-label="thumbs-down">&#x1F44E;</span></button>{review.downvotes}      
                </div>
          );}): null}
    </div>);
  }
  

export default DiningHalls;