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
    let foundBplate, foundEpic, foundDrey, foundRendeWest, foundBcafe, foundBBowl, foundDeNeve, foundFeast, foundStudy = false;
    setSortedNames(prevArray=>[]);
    let sortedNums = [bplateAverage, epicAverage, dreyAverage, rendeWestAverage, bcafeAverage, bBowlAverage, deNeveAverage, feastAverage, studyAverage].sort((a, b) => b - a);
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
    const bcafeAveragePromise = retrieveAverages("Bcafe", props);
    const bBowlAveragePromise = retrieveAverages("BruinBowl", props);
    const deNeveAveragePromise = retrieveAverages("De Neve", props);
    const feastAveragePromise = retrieveAverages("Feast", props);
    const studyAveragePromise = retrieveAverages("Study", props);
  
    setBplateAverage(await bplateAveragePromise);
    setEpicAverage(await epicAveragePromise);
    setDreyAverage(await dreyAveragePromise);
    setRendeWestAverage(await rendeWestAveragePromise);
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
        <img src="https://www.sustain.ucla.edu/wp-content/uploads/2013/05/RNDZ_3_web_960x450.jpg"  width="250" height="200" class="RendeWest"></img>
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
        <h3>Leave a Review:</h3>
        {ReviewDatabase("RendeWest")}
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
        <h3>Leave a Review:</h3>
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
        <h3>Leave a Review:</h3>
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
        <h3>Leave a Review:</h3>
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
        <h3>Leave a Review:</h3>
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
        <h3>Leave a Review:</h3>
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
        <h3>Leave a Review:</h3>
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
        <h3>Leave a Review:</h3>
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
        <h3>Leave a Review:</h3>
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
    </div>) : 
      (<div>
        {displayRendeWest()}
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
  const bCafeCollectionRef = collection(db, "Bcafe");
  const bPlateCollectionRef = collection(db, "Bplate");
  const bBowlCollectionRef = collection(db, "BruinBowl");
  const dNeveCollectionRef = collection(db, "De Neve");
  const dreyCollectionRef = collection(db, "Drey");
  const epicCollectionRef = collection(db, "Epicuria");
  const feastCollectionRef = collection(db, "Feast");
  const studyCollectionRef = collection(db, "Study");

  const readInRendeWestReviews = await readInSearchData(rendeWestCollectionRef);
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

    // jsx that displays on the Dining Halls page
    return (
      <div className="ReviewDatabase">
      <div className="form-container">
      
        <input
        placeholder="Review. . ."
        onChange={(event) => {
          setNewReview(event.target.value);
        }}
        class="ReviewBox"/>
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
      </div>
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
            <button onClick={() => {upVote(review.id, review.upvotes, review.userEmail)}} class="thumbsup"><span role="img" aria-label="thumbs-up">
        &#x1F44D;</span></button>{review.upvotes}
        <button onClick={() => {downVote(review.id, review.downvotes, review.userEmail)}} class="thumbsdown"><span role="img" aria-label="thumbs-down">
        &#x1F44E;
      </span></button>{review.downvotes}      
                </div>
          );}): null}
    </div>);
  }
  

export default DiningHalls;


