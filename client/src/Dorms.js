// About.js

import {useState, useEffect, useReducer} from "react";
import React from "react";
import "./App.css";


import {db} from "./firebase-config"
import {collection, getDocs, addDoc, updateDoc, doc} from "firebase/firestore";

import {
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./firebase-config";
import { async } from "@firebase/util";

import Swal from "sweetalert2";


<i class='fas fa-thumbs-up'></i>

function Dorms(){
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [matchingResults, setMatchingResults] = useState([]);

  //hooks for sorting functionality 
  const [centennial, setCentennial] = useState(0);
  const [deNeve, setDeNeve] = useState(0);
  const [hollyGardenia, setHollyGardenia] = useState(0);
  const [hedrickSummit, setHedrickSummit] = useState(0);
  const [dykstra, setDykstra] = useState(0);
  const [hedrickHall, setHedrickHall] = useState(0);
  const [hitch, setHitch] = useState(0);
  const [rieberHall, setRieberHall] = useState(0);
  const [rieberVista, setRieberVista] = useState(0);

  const [sortedAspect, setSortedAspect] = useState("");
  const [sortedNames, setSortedNames] = useState([]);
  const [showSortedResults, setShowSortedResults] = useState(false);

  const [centennialAverageRatings, setCentennialAverageRatings] = useState([]);
  const [centennialOverallAverage, setCentennialOverallAverage] = useState(0);
  const [deNeveAverageRatings, setDeNeveAverageRatings] = useState([]);
  const [deNeveOverallAverage, setDeNeveOverallAverage] = useState(0);
  const [hollyGardeniaAverageRatings, setHollyGardeniaAverageRatings] = useState([]);
  const [hollyGardeniaOverallAverage, setHollyGardeniaOverallAverage] = useState(0);
  const [heddySummitAverageRatings, setHeddySummitAverageRatings] = useState([]);
  const [heddySummitOverallAverage, setHeddySummitOverallAverage] = useState(0);
  const [dykstraAverageRatings, setDykstraAverageRatings] = useState([]);
  const [dykstraOverallAverage, setDykstraOverallAverage] = useState(0);
  const [hedrickHallAverageRatings, setHedrickHallAverageRatings] = useState([]);
  const [hedrickHallOverallAverage, setHedrickHallOverallAverage] = useState(0);
  const [hitchAverageRatings, setHitchAverageRatings] = useState([]);
  const [hitchOverallAverage, setHitchOverallAverage] = useState(0);
  const [rieberHallAverageRatings, setRieberHallAverageRatings] = useState([]);
  const [rieberHallOverallAverage, setRieberHallOverallAverage] = useState(0);
  const [rieberVistaAverageRatings, setRieberVistaAverageRatings] = useState([]);
  const [rieberVistaOverallAverage, setRieberVistaOverallAverage] = useState(0);

  useEffect(() => {
    let foundCentennial, foundDeNeve, foundHolly, foundHeddySummit, foundDykstra, foundHeddyHall, foundHitch, foundRieberHall, foundRieberVista = false;
    setSortedNames(prevArray=>[]);
    let sortedNums = [centennial, deNeve, hollyGardenia, hedrickSummit, dykstra, hedrickHall, hitch, rieberHall, rieberVista].sort((a, b) => b - a);
    
    for(let i = 0; i < sortedNums.length; i++){
      if(sortedNums[i] === centennial && !foundCentennial){
        foundCentennial = true;
        setSortedNames(prevArray=>[...prevArray, displayCentennial]);
      }else if(sortedNums[i] === deNeve && !foundDeNeve){
        foundDeNeve = true;
        setSortedNames(prevArray=>[...prevArray, displayDeNeve]);
      }else if(sortedNums[i] === hollyGardenia && !foundHolly){
        foundHolly = true;
        setSortedNames(prevArray=>[...prevArray, displayHollyGardenia]);        
      }else if(sortedNums[i] === hedrickSummit && !foundHeddySummit){
        foundHeddySummit = true;
        setSortedNames(prevArray=>[...prevArray, displayHeddySummit]);  
      }else if(sortedNums[i] === dykstra && !foundDykstra){
        foundDykstra = true;
        setSortedNames(prevArray=>[...prevArray, displayDykstra]); 
      }
      else if(sortedNums[i] === hedrickHall && !foundHeddyHall){
        foundHeddyHall = true;
        setSortedNames(prevArray=>[...prevArray, displayHeddyHall]); 
      }
      else if(sortedNums[i] === hitch && !foundHitch){
        foundHitch = true;
        setSortedNames(prevArray=>[...prevArray, displayHitch]); 
      }
      else if(sortedNums[i] === rieberHall && !foundRieberHall){
        foundRieberHall = true;
        setSortedNames(prevArray=>[...prevArray, displayRieberHall]); 
      }
      else if(sortedNums[i] === rieberVista && !foundRieberVista){
        foundRieberVista = true;
        setSortedNames(prevArray=>[...prevArray, displayRieberVista]); 
      }
    }
  }, [sortedAspect]);

  async function getAverages(props) {
    const centennialPromise = retrieveAverages("Centennial", props);
    const deNevePromise = retrieveAverages("DeNeve", props);
    const hollyGardeniaPromise = retrieveAverages("HollyGardenia", props);
    const hedrickSummitPromise = retrieveAverages("HeddySummit", props);
    const dykstraPromise = retrieveAverages("Dykstra", props);
    const hedrickHallPromise = retrieveAverages("Hedrick", props);
    const hitchPromise = retrieveAverages("Hitch", props);
    const rieberHallPromise = retrieveAverages("RieberHall", props);
    const rieberVistaPromise = retrieveAverages("RieberVista", props);
  
    setCentennial(await centennialPromise);
    setDeNeve(await deNevePromise);
    setHollyGardenia(await hollyGardeniaPromise);
    setHedrickSummit(await hedrickSummitPromise);
    setDykstra(await dykstraPromise);
    setHedrickHall(await hedrickHallPromise);
    setHitch(await hitchPromise);
    setRieberHall(await rieberHallPromise);
    setRieberVista(await rieberVistaPromise);

    setSortedAspect(props)
    setShowSortedResults(true);
  }

  async function getRatingsForOneDorm(props){
    const cleanlinessAveragePromise = retrieveAverages(props, 1);
    const noiseAveragePromise = retrieveAverages(props, 2);
    const livingSpaceAveragePromise = retrieveAverages(props, 3);
    const locationAveragePromise = retrieveAverages(props, 4);
    const socialLifeAveragePromise = retrieveAverages(props, 5);

    const cleanlinessAverage = await cleanlinessAveragePromise;
    const noiseAverage = await noiseAveragePromise;
    const livingSpaceAverage = await livingSpaceAveragePromise;
    const locationAverage = await locationAveragePromise;
    const socialLifeAverage = await socialLifeAveragePromise;

    if(props === "Centennial"){
      setCentennialAverageRatings([cleanlinessAverage, noiseAverage, livingSpaceAverage, locationAverage, socialLifeAverage]);
      setCentennialOverallAverage((cleanlinessAverage + noiseAverage + livingSpaceAverage + locationAverage + socialLifeAverage)/5);
    }else if(props === "DeNeve"){
      setDeNeveAverageRatings([cleanlinessAverage, noiseAverage, livingSpaceAverage, locationAverage, socialLifeAverage]);
      setDeNeveOverallAverage((cleanlinessAverage + noiseAverage + livingSpaceAverage + locationAverage + socialLifeAverage)/5);
    }else if(props === "HollyGardenia"){
      setHollyGardeniaAverageRatings([cleanlinessAverage, noiseAverage, livingSpaceAverage, locationAverage, socialLifeAverage]);
      setHollyGardeniaOverallAverage((cleanlinessAverage + noiseAverage + livingSpaceAverage + locationAverage + socialLifeAverage)/5);
    }else if(props === "HeddySummit"){
      setHeddySummitAverageRatings([cleanlinessAverage, noiseAverage, livingSpaceAverage, locationAverage, socialLifeAverage]);
      setHeddySummitOverallAverage((cleanlinessAverage + noiseAverage + livingSpaceAverage + locationAverage + socialLifeAverage)/5);
    }else if(props === "Dykstra"){
      setDykstraAverageRatings([cleanlinessAverage, noiseAverage, livingSpaceAverage, locationAverage, socialLifeAverage]);
      setDykstraOverallAverage((cleanlinessAverage + noiseAverage + livingSpaceAverage + locationAverage + socialLifeAverage)/5);
    }else if(props === "Hedrick"){
      setHedrickHallAverageRatings([cleanlinessAverage, noiseAverage, livingSpaceAverage, locationAverage, socialLifeAverage]);
      setHedrickHallOverallAverage((cleanlinessAverage + noiseAverage + livingSpaceAverage + locationAverage + socialLifeAverage)/5);
    }else if(props === "Hitch"){
      setHitchAverageRatings([cleanlinessAverage, noiseAverage, livingSpaceAverage, locationAverage, socialLifeAverage]);
      setHitchOverallAverage((cleanlinessAverage + noiseAverage + livingSpaceAverage + locationAverage + socialLifeAverage)/5);
    }else if(props === "RieberHall"){
      setRieberHallAverageRatings([cleanlinessAverage, noiseAverage, livingSpaceAverage, locationAverage, socialLifeAverage]);
      setRieberHallOverallAverage((cleanlinessAverage + noiseAverage + livingSpaceAverage + locationAverage + socialLifeAverage)/5);
    }else if(props === "RieberVista"){
      setRieberVistaAverageRatings([cleanlinessAverage, noiseAverage, livingSpaceAverage, locationAverage, socialLifeAverage]);
      setRieberVistaOverallAverage((cleanlinessAverage + noiseAverage + livingSpaceAverage + locationAverage + socialLifeAverage)/5);
    }
  }

  useEffect(() => {
    getRatingsForOneDorm("Centennial");
    getRatingsForOneDorm("DeNeve");
    getRatingsForOneDorm("HollyGardenia");
    getRatingsForOneDorm("HeddySummit");
    getRatingsForOneDorm("Dykstra");
    getRatingsForOneDorm("Hedrick");
    getRatingsForOneDorm("Hitch");
    getRatingsForOneDorm("RieberHall");
    getRatingsForOneDorm("RieberVista");
  },[]);

  function displayHeddySummit(){
    return (
      <div>
        <br />
        <h3>Hedrick Summit</h3>
        <div class="flex-container">
        <img src="https://s3-media0.fl.yelpcdn.com/bphoto/R7x3cuexqtbDRpbZKK405w/348s.jpg"  width="250" height="200" class="HSummit"></img>
        <div class="rating-section">
        <h4>Overall Rating:</h4> <p className="specialBlueText">{heddySummitOverallAverage !== undefined ? heddySummitOverallAverage.toFixed(1) : heddySummitOverallAverage}/5</p>
        <div class="rating">
        <span className="blueText">Cleanliness: </span>{heddySummitAverageRatings[0] !== undefined ? heddySummitAverageRatings[0].toFixed(1) : heddySummitAverageRatings[0]}/5 <br /><br />
      <span className="blueText">Noise: </span>{heddySummitAverageRatings[1] !== undefined ? heddySummitAverageRatings[1].toFixed(1) : heddySummitAverageRatings[1]}/5 <br /><br />
      <span className="blueText">Living Space: </span>{heddySummitAverageRatings[2] !== undefined ? heddySummitAverageRatings[2].toFixed(1) : heddySummitAverageRatings[2]}/5 <br /><br />
      <span className="blueText">Location: </span>{heddySummitAverageRatings[3] !== undefined ? heddySummitAverageRatings[3].toFixed(1) : heddySummitAverageRatings[3]}/5 <br /><br />
      <span className="blueText">Social Life: </span>{heddySummitAverageRatings[4] !== undefined ? heddySummitAverageRatings[4].toFixed(1) : heddySummitAverageRatings[4]}/5 <br /><br />
      </div>
      </div>
      </div>
        <div class="ListOfReviews">
          <h3>Leave a Review:</h3>
        {ReviewDatabase("HeddySummit")}
        </div>
        </div>
    );
  }

  function displayHitch(){
    return (
      <div>
        <br />
        <h3>Hitch Suites</h3>
        <div class="flex-container">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ_zvnYnhBUwc_tFS-fniDWToVlSA_BgtF6g&usqp=CAU"  width="250" height="220" class="HitchSuitesPics"></img>
        <div class="rating-section">
        <h4>Overall Rating:</h4> <p className="specialBlueText">{hitchOverallAverage !== undefined ? hitchOverallAverage.toFixed(1) : hitchOverallAverage}/5</p>
        <div class="rating">
        <span className="blueText">Cleanliness: </span>{hitchAverageRatings[0] !== undefined ? hitchAverageRatings[0].toFixed(1) : hitchAverageRatings[0]}/5 <br /><br />
      <span className="blueText">Noise: </span>{hitchAverageRatings[1] !== undefined ? hitchAverageRatings[1].toFixed(1) : hitchAverageRatings[1]}/5 <br /><br />
      <span className="blueText">Living Space: </span>{hitchAverageRatings[2] !== undefined ? hitchAverageRatings[2].toFixed(1) : hitchAverageRatings[2]}/5 <br /><br />
      <span className="blueText">Location: </span>{hitchAverageRatings[3] !== undefined ? hitchAverageRatings[3].toFixed(1) : hitchAverageRatings[3]}/5 <br /><br />
      <span className="blueText">Social Life: </span>{hitchAverageRatings[4] !== undefined ? hitchAverageRatings[4].toFixed(1) : hitchAverageRatings[4]}/5 <br /><br />
      </div>
      </div>
      </div>
      <div class="ListOfReviews">
      <h3>Leave a Review:</h3>
        {ReviewDatabase("Hitch")}
        </div>
      </div>
      
    );
  }

  function displayDeNeve(){
    return (
      <div>
        <br />
        <h3>De Neve Acacia, Birch, Cedar, Dogwood, Evergreen, Fir</h3>
        <div class="flex-container">
      <img src="https://fastly.4sqi.net/img/general/600x600/6826866_k4W8jsn53GD_Y6CHMaGW5AlGywjPaUPbG_8YXquH-5U.jpg"  width="250" height="200" class="DeNeveDorms"></img>
      <div class="rating-section">
        <h4>Overall Rating:</h4> <p className="specialBlueText">{deNeveOverallAverage !== undefined ? deNeveOverallAverage.toFixed(1) : deNeveOverallAverage}/5</p>
        <div class="rating">
        <span className="blueText">Cleanliness: </span>{deNeveAverageRatings[0] !== undefined ? deNeveAverageRatings[0].toFixed(1) : deNeveAverageRatings[0]}/5 <br /><br />
      <span className="blueText">Noise: </span>{deNeveAverageRatings[1] !== undefined ? deNeveAverageRatings[1].toFixed(1) : deNeveAverageRatings[1]}/5 <br /><br />
      <span className="blueText">Living Space: </span>{deNeveAverageRatings[2] !== undefined ? deNeveAverageRatings[2].toFixed(1) : deNeveAverageRatings[2]}/5 <br /><br />
      <span className="blueText">Location: </span>{deNeveAverageRatings[3] !== undefined ? deNeveAverageRatings[3].toFixed(1) : deNeveAverageRatings[3]}/5 <br /><br />
      <span className="blueText">Social Life: </span>{deNeveAverageRatings[4] !== undefined ? deNeveAverageRatings[4].toFixed(1) : deNeveAverageRatings[4]}/5 <br /><br />
      </div>
      </div>
      </div>
      <div class="ListOfReviews">
      <h3>Leave a Review:</h3>
      {ReviewDatabase("DeNeve")}
      </div>
      </div>
    );
  }

  function displayCentennial(){
    return (
      <div>
        <br />
        <h3>Centennial/Olympic</h3>
        <div class="flex-container">
        <img src="https://s3.amazonaws.com/cms.ipressroom.com/173/files/20218/614102382cfac27232f4ea45_Olympic+and+Centennial+Hall_5DM47510_Ext2/Olympic+and+Centennial+Hall_5DM47510_Ext2_hero.jpg"  width="250" height="200" class="CentennialOlympic"></img>
        <div class="rating-section">
        <h4>Overall Rating:</h4> <p className="specialBlueText">{centennialOverallAverage !== undefined ? centennialOverallAverage.toFixed(1) : centennialOverallAverage}/5</p>
        <div class="rating">
        <span className="blueText">Cleanliness: </span>{centennialAverageRatings[0] !== undefined ? centennialAverageRatings[0].toFixed(1) : centennialAverageRatings[0]}/5 <br /><br />
      <span className="blueText">Noise: </span>{centennialAverageRatings[1] !== undefined ? centennialAverageRatings[1].toFixed(1) : centennialAverageRatings[1]}/5 <br /><br />
      <span className="blueText">Living Space: </span>{centennialAverageRatings[2] !== undefined ? centennialAverageRatings[2].toFixed(1) : centennialAverageRatings[2]}/5 <br /><br />
      <span className="blueText">Location: </span>{centennialAverageRatings[3] !== undefined ? centennialAverageRatings[3].toFixed(1) : centennialAverageRatings[3]}/5 <br /><br />
      <span className="blueText">Social Life: </span>{centennialAverageRatings[4] !== undefined ? centennialAverageRatings[4].toFixed(1) : centennialAverageRatings[4]}/5 <br /><br />
      </div>
      </div>
      </div>
      <div class="ListOfReviews">
      <h3>Leave a Review:</h3>
        {ReviewDatabase("Centennial")}
        </div>
      </div>
    );
  }

  function displayRieberVista(){
    return (
      <div>
        <br />
        <h3>Rieber Terrace/Vista</h3>
        <div class="flex-container">
        <img src="https://conferences.ucla.edu/wp-content/uploads/2019/01/Summer_PlazaRooms_RieberVista.jpg"  width="250" height="200" class="RieberTerraceVista"></img>
        <div class="rating-section">
        <h4>Overall Rating:</h4> <p className="specialBlueText">{rieberVistaOverallAverage !== undefined ? rieberVistaOverallAverage.toFixed(1) : rieberVistaOverallAverage}/5</p>
        <div class="rating">
        <span className="blueText">Cleanliness: </span>{rieberVistaAverageRatings[0] !== undefined ? rieberVistaAverageRatings[0].toFixed(1) : rieberVistaAverageRatings[0]}/5 <br /><br />
      <span className="blueText">Noise: </span>{rieberVistaAverageRatings[1] !== undefined ? rieberVistaAverageRatings[1].toFixed(1) : rieberVistaAverageRatings[1]}/5 <br /><br />
      <span className="blueText">Living Space: </span>{rieberVistaAverageRatings[2] !== undefined ? rieberVistaAverageRatings[2].toFixed(1) : rieberVistaAverageRatings[2]}/5 <br /><br />
      <span className="blueText">Location: </span>{rieberVistaAverageRatings[3] !== undefined ? rieberVistaAverageRatings[3].toFixed(1) : rieberVistaAverageRatings[3]}/5 <br /><br />
      <span className="blueText">Social Life: </span>{rieberVistaAverageRatings[4] !== undefined ? rieberVistaAverageRatings[4].toFixed(1) : rieberVistaAverageRatings[4]}/5 <br /><br />
      </div>
      </div>
      </div>
      <div class="ListOfReviews">
      <h3>Leave a Review:</h3>
        {ReviewDatabase("RieberVista")}
      </div>
      </div>
    );
  }

  function displayDykstra(){
    return (
      <div>
        <br />
        <h3>Dykstra</h3>
        <div class="flex-container">
        <img src="https://www.saifulbouquet.com/wp-content/uploads/2020/04/47097_web_ns_2_17_dykstramemories_picco.jpg" width="250" height="200" class="Dykstra"></img>
        <div class="rating-section">
        <h4>Overall Rating:</h4> <p className="specialBlueText">{dykstraOverallAverage !== undefined ? dykstraOverallAverage.toFixed(1) : dykstraOverallAverage}/5</p>
        <div class="rating">
        <span className="blueText">Cleanliness: </span>{dykstraAverageRatings[0] !== undefined ? dykstraAverageRatings[0].toFixed(1) : dykstraAverageRatings[0]}/5 <br /><br />
      <span className="blueText">Noise: </span>{dykstraAverageRatings[1] !== undefined ? dykstraAverageRatings[1].toFixed(1) : dykstraAverageRatings[1]}/5 <br /><br />
      <span className="blueText">Living Space: </span>{dykstraAverageRatings[2] !== undefined ? dykstraAverageRatings[2].toFixed(1) : dykstraAverageRatings[2]}/5 <br /><br />
      <span className="blueText">Location: </span>{dykstraAverageRatings[3] !== undefined ? dykstraAverageRatings[3].toFixed(1) : dykstraAverageRatings[3]}/5 <br /><br />
      <span className="blueText">Social Life: </span>{dykstraAverageRatings[4] !== undefined ? dykstraAverageRatings[4].toFixed(1) : dykstraAverageRatings[4]}/5 <br /><br />
      </div>
      </div>
      </div>
      <div class="ListOfReviews">
      <h3>Leave a Review:</h3>
        {ReviewDatabase("Dykstra")}
        </div>
      </div>
    );
  }

  function displayHeddyHall(){
    return (
      <div>
        <br />
        <h3>Hedrick Hall</h3>
        <div class="flex-container">
        <img src="https://humansofuniversity.com/wp-content/uploads/2022/05/2b0fbb098d13dd26587a5841292cd4aa-1024x768.jpg" width="250" height="200" class="HedrickPic"></img>
        <div class="rating-section">
        <h4>Overall Rating:</h4> <p className="specialBlueText">{hedrickHallOverallAverage !== undefined ? hedrickHallOverallAverage.toFixed(1) : hedrickHallOverallAverage}/5</p>
        <div class="rating">
        <span className="blueText">Cleanliness: </span>{hedrickHallAverageRatings[0] !== undefined ? hedrickHallAverageRatings[0].toFixed(1) : hedrickHallAverageRatings[0]}/5 <br /><br />
      <span className="blueText">Noise: </span>{hedrickHallAverageRatings[1] !== undefined ? hedrickHallAverageRatings[1].toFixed(1) : hedrickHallAverageRatings[1]}/5 <br /><br />
      <span className="blueText">Living Space: </span>{hedrickHallAverageRatings[2] !== undefined ? hedrickHallAverageRatings[2].toFixed(1) : hedrickHallAverageRatings[2]}/5 <br /><br />
      <span className="blueText">Location: </span>{hedrickHallAverageRatings[3] !== undefined ? hedrickHallAverageRatings[3].toFixed(1) : hedrickHallAverageRatings[3]}/5 <br /><br />
      <span className="blueText">Social Life: </span>{hedrickHallAverageRatings[4] !== undefined ? hedrickHallAverageRatings[4].toFixed(1) : hedrickHallAverageRatings[4]}/5 <br /><br />
      </div>
      </div>
      </div>
      <div class="ListOfReviews">
      <h3>Leave a Review:</h3>
        {ReviewDatabase("Hedrick")}
      </div>
      </div>
    );
  }

  function displayRieberHall(){
    return (
      <div>
        <br />
        <h3>Rieber Hall</h3>
        <div class="flex-container">
      <img src="https://www.sgvtribune.com/wp-content/uploads/2022/03/LDN-Z-UCLA-DORMS.jpg?w=620"  width="250" height="230" class="rieberHall"></img>
      <div class="rating-section">
        <h4>Overall Rating:</h4> <p className="specialBlueText">{rieberHallOverallAverage !== undefined ? rieberHallOverallAverage.toFixed(1) : rieberHallOverallAverage}/5</p>
        <div class="rating">
        <span className="blueText">Cleanliness: </span>{rieberHallAverageRatings[0] !== undefined ? rieberHallAverageRatings[0].toFixed(1) : rieberHallAverageRatings[0]}/5 <br /><br />
      <span className="blueText">Noise: </span>{rieberHallAverageRatings[1] !== undefined ? rieberHallAverageRatings[1].toFixed(1) : rieberHallAverageRatings[1]}/5 <br /><br />
      <span className="blueText">Living Space: </span>{rieberHallAverageRatings[2] !== undefined ? rieberHallAverageRatings[2].toFixed(1) : rieberHallAverageRatings[2]}/5 <br /><br />
      <span className="blueText">Location: </span>{rieberHallAverageRatings[3] !== undefined ? rieberHallAverageRatings[3].toFixed(1) : rieberHallAverageRatings[3]}/5 <br /><br />
      <span className="blueText">Social Life: </span>{rieberHallAverageRatings[4] !== undefined ? rieberHallAverageRatings[4].toFixed(1) : rieberHallAverageRatings[4]}/5 <br /><br />
      </div>
      </div>
      </div>
      <div class="ListOfReviews">
      <h3>Leave a Review:</h3>
      {ReviewDatabase("RieberHall")}
      </div>
      </div>
    );
  }

  function displayHollyGardenia(){
    return (
      <div>
        <br />
      <h3>De Neve Gardenia/Holly</h3>
      <div class="flex-container">
        <img src="https://humansofuniversity.com/wp-content/uploads/2022/05/67658661.jpg"  width="250" height="200" class="HollyGardenia"></img>
        <div class="rating-section">
        <h4>Overall Rating:</h4> <p className="specialBlueText">{hollyGardeniaOverallAverage !== undefined ? hollyGardeniaOverallAverage.toFixed(1) : hollyGardeniaOverallAverage}/5</p>
        <div class="rating">
        <span className="blueText">Cleanliness: </span>{hollyGardeniaAverageRatings[0] !== undefined ? hollyGardeniaAverageRatings[0].toFixed(1) : hollyGardeniaAverageRatings[0]}/5 <br /><br />
      <span className="blueText">Noise: </span>{hollyGardeniaAverageRatings[1] !== undefined ? hollyGardeniaAverageRatings[1].toFixed(1) : hollyGardeniaAverageRatings[1]}/5 <br /><br />
      <span className="blueText">Living Space: </span>{hollyGardeniaAverageRatings[2] !== undefined ? hollyGardeniaAverageRatings[2].toFixed(1) : hollyGardeniaAverageRatings[2]}/5 <br /><br />
      <span className="blueText">Location: </span>{hollyGardeniaAverageRatings[3] !== undefined ? hollyGardeniaAverageRatings[3].toFixed(1) : hollyGardeniaAverageRatings[3]}/5 <br /><br />
      <span className="blueText">Social Life: </span>{hollyGardeniaAverageRatings[4] !== undefined ? hollyGardeniaAverageRatings[4].toFixed(1) : hollyGardeniaAverageRatings[4]}/5 <br /><br />
      </div>
      </div>
      </div>
      <div class="ListOfReviews">
      <h3>Leave a Review:</h3>
        {ReviewDatabase("HollyGardenia")}
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
    <img src="https://i.pinimg.com/736x/26/04/67/2604674112dd693949fa3cc6babe7c71--dorm-ideas-hall.jpg" alt="tripleClassic" width="720" height="405" class = "DormsCover"/>
    <br />

    <div className="blueBackground">
      <p className="introText">Here you can find every dorm on campus.</p>
       <b>Sort By:</b>
       <ul>
        <button type='button' className="btn btn-primary" onClick={() => { getAverages(1);}}>Cleanliness{}</button>
        <button type='button' className="btn btn-primary" onClick={() => { getAverages(2);}}>Noise{}</button>
        <button type='button' className="btn btn-primary" onClick={() => { getAverages(3);}}>Living Space{}</button>
        <button type='button' className="btn btn-primary" onClick={() => { getAverages(4);}}>Location{}</button>
        <button type='button' className="btn btn-primary" onClick={() => { getAverages(5);}}>Social Life{}</button>
        </ul>
        <br></br>

        <div class="searchBox">
        <h4>Search For Keywords in Reviews:</h4>
        <input type="text" value = {searchTerm}  onChange={event => setSearchTerm(event.target.value)} 
        id="searchBox" placeholder="Enter keywords..." size="50"></input>
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
        {displayHeddySummit()}
        <br />
        <br />
        {displayHitch()}
        <br />
        <br />
        {displayDeNeve()}
        <br />
        <br />
        {displayCentennial()}
        <br />
        <br />
        {displayRieberVista()}
        <br />
        <br />
        {displayDykstra()}
        <br />
        <br />
        {displayHeddyHall()}
        <br />
        <br />
        {displayRieberHall()}
        <br />
        <br />
        {displayHollyGardenia()}
        <br />
      </div>)
      }
      </body>
      </html>
      );
}

async function retrieveMatchingResults(props){
  let searchMatches = await findMatches(props);
  return searchMatches;
}

const readInSearchData = async (reviewCollectionRef) => {
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

const findMatches = async(userSearch) => {
  const hedrickCollectionRef = collection(db, "Hedrick");
  const centennialCollectionRef = collection(db, "Centennial");
  const deNeveAFCollectionRef = collection(db, "DeNeve");
  const hollyGardeniaCollectionRef = collection(db, "HollyGardenia");
  const hedrickSummitCollectionRef = collection(db, "HeddySummit");
  const dykstraCollectionRef = collection(db, "Dykstra");
  const hitchCollectionRef = collection(db, "Hitch");
  const rieberHallCollectionRef = collection(db, "rieberHall");
  const vistaTerraceCollectionRef = collection(db, "RieberVista");

  const readInHedrickReviews = await readInSearchData(hedrickCollectionRef);
  const readInCentennialReviews = await readInSearchData(centennialCollectionRef);
  const readInDeNeveAFReviews = await readInSearchData(deNeveAFCollectionRef);
  const readInHollyGardeniaReviews = await readInSearchData(hollyGardeniaCollectionRef);
  const readInHeddySummitReviews = await readInSearchData(hedrickSummitCollectionRef);
  const readInDykstraReviews = await readInSearchData(dykstraCollectionRef);
  const readInHitchReviews = await readInSearchData(hitchCollectionRef);
  const readInrieberHallReviews = await readInSearchData(rieberHallCollectionRef);
  const readInVistaTerraceReviews = await readInSearchData(vistaTerraceCollectionRef);

  let allRevs = [];

  readInHedrickReviews.forEach((review) => {
    allRevs.push("Hedrick Hall: \"" + review.Review + "\""); 
    
  });

  readInCentennialReviews.forEach((review) => {
    allRevs.push("Centennial/Olympic Halls: \"" + review.Review + "\""); 
  });

  readInDeNeveAFReviews.forEach((review) => {
    allRevs.push("De Neve Acacia, Birch, Cedar, Dogwood, Evergreen, Fir: \"" + review.Review + "\""); 
  });

  readInHollyGardeniaReviews.forEach((review) => {
    allRevs.push("De Neve Gardenia/Holly: \"" + review.Review + "\""); 
  });

  readInHeddySummitReviews.forEach((review) => {
    allRevs.push("Hedrick Summit: \"" + review.Review + "\""); 
  });

  readInDykstraReviews.forEach((review) => {
    allRevs.push("Dykstra Hall: \"" + review.Review + "\""); 
  });

  readInHitchReviews.forEach((review) => {
    allRevs.push("Hitch Suites: \"" + review.Review + "\""); 
  });

  readInrieberHallReviews.forEach((review) => {
    allRevs.push("Rieber Hall: \"" + review.Review + "\""); 
  });

  readInVistaTerraceReviews.forEach((review) => {
    allRevs.push("Rieber Vista/Terrace: \"" + review.Review + "\""); 
  });

  let matchingElements = [];
  allRevs.forEach(item => {
    if (item.toLowerCase().includes(userSearch.toLowerCase())) {
      matchingElements.push(item)
    }
  });

  return matchingElements;
}


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
        totalRating += parseInt(review.CleanlinessRating); //add up facility rating for each review
      });
    }
  
    else if (category == "2") {
  
      readInReviews.forEach((review) => {
        totalRating += parseInt(review.NoiseRating); //add up facility rating for each review
      });
    }
  
    else if (category == "3"){
  
      readInReviews.forEach((review) =>{
        totalRating += parseInt(review.SpaceRating); //add up facility rating for each review
      });
    }
  
    else if (category == "4"){
  
      readInReviews.forEach((review) =>{
        totalRating += parseInt(review.LocationRating); //add up facility rating for each review
      });
    }

    else if (category == "5"){
  
      readInReviews.forEach((review) =>{
        totalRating += parseInt(review.SocialLifeRating); //add up facility rating for each review
      });
    }

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


let logged = false;
//centennial 
function ReviewDatabase(string){

  const [input, setInput] = useState("");   
  const [CleanlinessRating, setCleanlinessRating] = useState(-1); 
  const [NoiseRating, setNoiseRating] = useState(-1);   
  const [SpaceRating, setSpaceRating] = useState(-1);  
  const [LocationRating, setLocationRating] = useState(-1);  
  const [SocialLifeRating, setSocialLifeRating] = useState(-1);  

  const [showAllReviews, setShowAllReviews] = useState(false);
  const [allReviews, setReview] = useState([]);
  const reviewCollectionRef = collection(db, string) //grabbing "CentennialReviews" collection and sets it equal to var
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
      },[reducerValue])

    const createReview = async () => {
    if (logged){
      if (SocialLifeRating <= 5 && SocialLifeRating >=0 && LocationRating <= 5 && LocationRating >= 0 && SpaceRating <= 5 && SpaceRating >= 0 && NoiseRating <=5 && NoiseRating >=0 && CleanlinessRating <= 5 && CleanlinessRating >= 0 && input != "") {
        await addDoc(reviewCollectionRef, { Review: input , LocationRating: Number(LocationRating), SocialLifeRating: Number(SocialLifeRating), NoiseRating: Number(NoiseRating), SpaceRating: Number(SpaceRating), CleanlinessRating: Number(CleanlinessRating), 
          Overall: ((Number(NoiseRating) + Number(LocationRating) + Number(SpaceRating) + Number(CleanlinessRating) + Number(SocialLifeRating))/5),upvotes: Number(0), downvotes: Number(0), userEmail: "" })
        sortReview();
        forceUpdate();
      }
      else{
        Swal.fire({
          
          icon: 'error',
          title: 'Oops...',
          text: "Please leave a review and rating (0-5) in order to submit"
        })  
      }
    }
    else{
      Swal.fire({
          
        icon: 'error',
        title: 'Oops...',
        text: "Please login at Home Page before leaving a review"
      })  
    }
  }

    //for updating review when upvote button clicked if user is logged in
    const upVote = async (id, numupvotes, userEmail) => { // NEW CHANGE
      if(userEmail.includes(auth.currentUser.email)){
        Swal.fire({
          
          icon: 'error',
          title: 'Oops...',
          text: "You have already voted on this review!"
        }) 
      }
      else if(logged){
        const reviewDoc = doc(db, string, id);
        const newFields = {upvotes: numupvotes + 1, userEmail: [...userEmail, auth.currentUser.email]};
        await updateDoc(reviewDoc, newFields);
        sortReview();
        forceUpdate();
        //alert("Upvote counted!! Refresh page to view.")
      }
      else{
        Swal.fire({
          
          icon: 'error',
          title: 'Oops...',
          text: "Please login at Home Page before Upvoting"
        }) 
      }
    }
  
    //for updating review when downvote button clicked if user is logged in
    const downVote = async (id, numdownvotes, userEmail) => { // NEW CHANGE
      if(userEmail.includes(auth.currentUser.email)){
        Swal.fire({
          
          icon: 'error',
          title: 'Oops...',
          text: "You have already voted on this review!"
        }) 
      }
      if(logged){
        const reviewDoc = doc(db, string, id);
        const newFields = {downvotes: numdownvotes + 1, userEmail: [...userEmail, auth.currentUser.email]};
        await updateDoc(reviewDoc, newFields);
        sortReview();
        forceUpdate();
        //alert("Downvote counted!! Refresh page to view.")
      }else{
        Swal.fire({
          
          icon: 'error',
          title: 'Oops...',
          text: "Please login at Home Page before Downvoting"
        }) 
      }
    }

  //sort reviews by popularity (within same collection)
  const sortReview = async () => {
    const querySnapshot = await getDocs(reviewCollectionRef);

    // create array of reviews from collection
    const readInReviews = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      data.id = doc.id;
      readInReviews.push(data);
    });

    readInReviews.sort((a, b) => b.upvotes - a.upvotes); //sorts from most popular -> least 

    setReview(readInReviews);
    forceUpdate();
  }


  useEffect(() => {
    const getReviews = async () => {
      const data = await getDocs(reviewCollectionRef);

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

  return (
    <div className="ReviewDatabase">
    
    <div className="form-container">
    <input 
      placeholder="Review. . ." 
      onChange={(event) => 
        {setInput(event.target.value)
      }}
      class="ReviewBox"
    />

    <div className="input-group-horiz">
    <p className="no-margin">Cleanliness: 
    <input 
      placeholder="0-5" 
      type="number"
      min={0}
      max={5}
      onChange={(event) => 
        {setCleanlinessRating(event.target.value)
      }}
      class="RatingBox"
    /></p>

    <p className="no-margin">Noise: 
    <input 
      placeholder="0-5" 
      type="number"
      min={0}
      max={5}
      onChange={(event) => 
        {setNoiseRating(event.target.value)
      }}
      class="RatingBox"
    /></p>
    
    <p className="no-margin">Living Space: 
    <input 
      placeholder="0-5" 
      type="number"
      min={0}
      max={5}
      onChange={(event) => 
        {setSpaceRating(event.target.value)
      }}
      class="RatingBox"
    /></p>

    <p className="no-margin">Location: 
    <input 
      placeholder="0-5" 
      type="number"
      min={0}
      max={5}
      onChange={(event) => 
        {setLocationRating(event.target.value)
      }}
      class="RatingBox"
    /></p>

    <p className="no-margin">Social Life: 
    <input 
      placeholder="0-5" 
      type="number"
      min={0}
      max={5}
      onChange={(event) => 
        {setSocialLifeRating(event.target.value)
      }}
      class="RatingBox"
    /></p>
    
    <button onClick={createReview} className="rev-button">Submit Review</button> 

    </div>
    </div>
        {/* DISPLAYING MOST POPULAR/AGREED UPON REVVIEW */}
        <h3>Top Review:</h3>
          {allReviews.length > 0 ? (<div>
            <div className="eachReview">
              <p><b><span className="blueText">Review: </span></b>{allReviews[0].Review}</p> 
              <p><b><span className="blueText">Overall Rating: </span> </b>{allReviews[0].Overall}/5</p>
              <p><span className="blueText">Cleanliness:  </span>{allReviews[0].CleanlinessRating}/5 <span className="blueText">|  Noise:  </span>{allReviews[0].NoiseRating}/5 <span className="blueText"> |  Living Space:  </span> {allReviews[0].SpaceRating}/5 <span className="blueText"> |  Location: </span> {allReviews[0].LocationRating}/5 <span className="blueText"> |  Social Life:  </span>{allReviews[0].SocialLifeRating}/5</p>
              <button onClick={() => {upVote(allReviews[0].id, allReviews[0].upvotes, allReviews[0].userEmail)}} class="thumbsup"><span role="img" aria-label="thumbs-up">&#x1F44D;</span></button>{allReviews[0].upvotes}
              <button onClick={() => {downVote(allReviews[0].id, allReviews[0].downvotes, allReviews[0].userEmail)}}class="thumbsdown"><span role="img" aria-label="thumbs-down">&#x1F44E;</span></button>{allReviews[0].downvotes}
              </div>
                {/* BUTTON TO DISPLAY REST OF THE REVIEWS */}
                {!showAllReviews && <button onClick={() => displayAllReviews(1)} className="rev-button">More Reviews</button>}
                {showAllReviews && <button onClick={() => displayAllReviews(2)} className="rev-button">Less Reviews</button>}</div>) : (<div>No reviews available</div>)}
                {showAllReviews ?  allReviews.slice(1).map((review) => {
          return (
            <div className="eachReview">
            <p><b><span className="blueText">Review: </span></b>{review.Review}</p> 
            <p><b><span className="blueText">Overall Rating: </span> </b>{review.Overall}/5</p>
            <p><span className="blueText">Cleanliness:  </span>{review.CleanlinessRating}/5 <span className="blueText">|  Noise:  </span>{review.NoiseRating}/5 <span className="blueText"> |  Living Space:  </span> {review.SpaceRating}/5 <span className="blueText"> |  Location: </span> {review.LocationRating}/5 <span className="blueText"> |  Social Life:  </span>{review.SocialLifeRating}/5</p>
            <button onClick={() => {upVote(review.id, review.upvotes, review.userEmail)}} class="thumbsup"><span role="img" aria-label="thumbs-up">&#x1F44D;</span></button>{review.upvotes}
            <button onClick={() => {downVote(review.id, review.downvotes, review.userEmail)}}class="thumbsdown"><span role="img" aria-label="thumbs-down">&#x1F44E;</span></button>{review.downvotes}
            </div>);
        }) : null}
        </div>);
      }

export default Dorms;