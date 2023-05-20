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

import Swal from "sweetalert2";

function RecCenters() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [matchingResults, setMatchingResults] = useState([]);


  const [showSortedResults, setShowSortedResults] = useState(false);
  const [JWCAverage, setJWCAverage] = useState(0);
  const [IMAverage, setIMAverage] = useState(0);
  const [hitchAverage, setHitchAverage] = useState(0);
  const [sunsetAverage, setSunsetAverage] = useState(0);
  const [BFitAverage, setBFitAverage] = useState(0);
  const [sortedNames, setSortedNames] = useState([]);
  const [sortedAspect, setSortedAspect] = useState("");

  const [JWCAverageRatings, setJWCAverageRatings] = useState([]);
  const [JWCOverallAverage, setJWCOverallAverage] = useState(0);
  const [IMAverageRatings, setIMAverageRatings] = useState([]);
  const [IMOverallAverage, setIMOverallAverage] = useState(0);
  const [hitchAverageRatings, setHitchAverageRatings] = useState([]);
  const [hitchOverallAverage, setHitchOverallAverage] = useState(0);
  const [sunsetAverageRatings, setSunsetAverageRatings] = useState([]);
  const [sunsetOverallAverage, setSunsetOverallAverage] = useState(0);
  const [BFitAverageRatings, setBFitAverageRatings] = useState([]);
  const [BFitOverallAverage, setBFitOverallAverage] = useState(0);

  useEffect(() => {
    let foundJWC, foundIM, foundHitch, foundSunset, foundBFit = false;
    setSortedNames(prevArray=>[]);
    let sortedNums = [JWCAverage, IMAverage, hitchAverage, sunsetAverage, BFitAverage].sort((a, b) => b - a);
    
    for(let i = 0; i < sortedNums.length; i++){
      if(sortedNums[i] === JWCAverage && !foundJWC){
        foundJWC = true;
        setSortedNames(prevArray=>[...prevArray, displayJWC]);
      }else if(sortedNums[i] === IMAverage && !foundIM){
        foundIM = true;
        setSortedNames(prevArray=>[...prevArray, displayIM]);
      }else if(sortedNums[i] === hitchAverage && !foundHitch){
        foundHitch = true;
        setSortedNames(prevArray=>[...prevArray, displayHitch]);        
      }else if(sortedNums[i] === sunsetAverage && !foundSunset){
        foundSunset = true;
        setSortedNames(prevArray=>[...prevArray, displaySunset]);  
      }else if(sortedNums[i] === BFitAverage && !foundBFit){
        foundBFit = true;
        setSortedNames(prevArray=>[...prevArray, displayBFit]); 
      }
    }
  }, [sortedAspect]);

  async function getAverages(props) {
    const jwcAveragePromise = retrieveAverages("JWCReviews", props);
    const imAveragePromise = retrieveAverages("IMFieldReviews", props);
    const hitchAveragePromise = retrieveAverages("HitchBBReviews", props);
    const sunsetAveragePromise = retrieveAverages("SunsetRecReviews", props);
    const bfitAveragePromise = retrieveAverages("BFITReviews", props);
  
    setJWCAverage(await jwcAveragePromise);
    setIMAverage(await imAveragePromise);
    setHitchAverage(await hitchAveragePromise);
    setSunsetAverage(await sunsetAveragePromise);
    setBFitAverage(await bfitAveragePromise);

    setSortedAspect(props)
    setShowSortedResults(true);
  }

  async function getRatingsForOneRC(props){
    const maintenanceAveragePromise = retrieveAverages(props, 1);
    const hoursAveragePromise = retrieveAverages(props, 2);
    const spaceAveragePromise = retrieveAverages(props, 3);
    const locationAveragePromise = retrieveAverages(props, 4);
    const activityAveragePromise = retrieveAverages(props, 5);

    const maintenanceAverage = await maintenanceAveragePromise;
    const hoursAverage = await hoursAveragePromise;
    const spaceAverage = await spaceAveragePromise;
    const locationAverage = await locationAveragePromise;
    const activityAverage = await activityAveragePromise;

    if(props === "JWCReviews"){
      setJWCAverageRatings([maintenanceAverage, hoursAverage, spaceAverage, locationAverage, activityAverage]);
      setJWCOverallAverage((maintenanceAverage + hoursAverage + spaceAverage + locationAverage + activityAverage)/5);
    }else if(props === "IMFieldReviews"){
      setIMAverageRatings([maintenanceAverage, hoursAverage, spaceAverage, locationAverage, activityAverage]);
      setIMOverallAverage((maintenanceAverage + hoursAverage + spaceAverage + locationAverage + activityAverage)/5);
    }else if(props === "HitchBBReviews"){
      setHitchAverageRatings([maintenanceAverage, hoursAverage, spaceAverage, locationAverage, activityAverage]);
      setHitchOverallAverage((maintenanceAverage + hoursAverage + spaceAverage + locationAverage + activityAverage)/5);
    }else if(props === "SunsetRecReviews"){
      setSunsetAverageRatings([maintenanceAverage, hoursAverage, spaceAverage, locationAverage, activityAverage]);
      setSunsetOverallAverage((maintenanceAverage + hoursAverage + spaceAverage + locationAverage + activityAverage)/5);
    }else if(props === "BFITReviews"){
      setBFitAverageRatings([maintenanceAverage, hoursAverage, spaceAverage, locationAverage, activityAverage]);
      setBFitOverallAverage((maintenanceAverage + hoursAverage + spaceAverage + locationAverage + activityAverage)/5);
    }
  }

  useEffect(() => {
    getRatingsForOneRC("JWCReviews");
    getRatingsForOneRC("IMFieldReviews");
    getRatingsForOneRC("HitchBBReviews");
    getRatingsForOneRC("SunsetRecReviews");
    getRatingsForOneRC("BFITReviews");
},[]);

  function displayJWC(){
    return (
      <div>
        <br />
        <h3>John Wooden Center</h3>
        <div class="flex-container">
        <img src="https://pbs.twimg.com/media/CgMViMxUIAAIU-p.jpg:large"  width="250" height="200" class="JWC"></img>
        <div class="rating-section">
        <h4>Overall Rating:</h4> <p className="specialBlueText">{JWCOverallAverage !== undefined ? JWCOverallAverage.toFixed(1) : JWCOverallAverage}/5</p>
        <div class="rating">
        <span className="blueText">Facility Maintenance: </span>{JWCAverageRatings[0] !== undefined ? JWCAverageRatings[0].toFixed(1) : JWCAverageRatings[0]}/5 <br /><br />
      <span className="blueText">Hours: </span>{JWCAverageRatings[1] !== undefined ? JWCAverageRatings[1].toFixed(1) : JWCAverageRatings[1]}/5 <br /><br />
      <span className="blueText">Space: </span>{JWCAverageRatings[2] !== undefined ? JWCAverageRatings[2].toFixed(1) : JWCAverageRatings[2]}/5 <br /><br />
      <span className="blueText">Location: </span>{JWCAverageRatings[3] !== undefined ? JWCAverageRatings[3].toFixed(1) : JWCAverageRatings[3]}/5 <br /><br />
      <span className="blueText">Activity Level: </span>{JWCAverageRatings[4] !== undefined ? JWCAverageRatings[4].toFixed(1) : JWCAverageRatings[4]}/5 <br /><br />
      </div>
      </div>
      </div>
        <div class="ListOfReviews">
        {ReviewDatabase("JWCReviews")}
        </div>
        </div>
    );
  }

  function displayBFit(){
    return (
      <div>
        <br />
      <h3>Bruin Fitness Center (Bfit)</h3>
      <div class="flex-container">
      <img src="https://conferences.ucla.edu/wp-content/uploads/2019/09/bfit.jpg"  width="250" height="200" class="BFIT"></img>
      <div class="rating-section">
        <h4>Overall Rating:</h4> <p className="specialBlueText">{BFitOverallAverage !== undefined ? BFitOverallAverage.toFixed(1) : BFitOverallAverage}/5</p>
        <div class="rating">
        <span className="blueText">Facility Maintenance: </span>{BFitAverageRatings[0] !== undefined ? BFitAverageRatings[0].toFixed(1) : BFitAverageRatings[0]}/5 <br /><br />
      <span className="blueText">Hours: </span>{BFitAverageRatings[1] !== undefined ? BFitAverageRatings[1].toFixed(1) : BFitAverageRatings[1]}/5 <br /><br />
      <span className="blueText">Space: </span>{BFitAverageRatings[2] !== undefined ? BFitAverageRatings[2].toFixed(1) : BFitAverageRatings[2]}/5 <br /><br />
      <span className="blueText">Location: </span>{BFitAverageRatings[3] !== undefined ? BFitAverageRatings[3].toFixed(1) : BFitAverageRatings[3]}/5 <br /><br />
      <span className="blueText">Activity Level: </span>{BFitAverageRatings[4] !== undefined ? BFitAverageRatings[4].toFixed(1) : BFitAverageRatings[4]}/5 <br /><br />
      </div>
      </div>
      </div>
      <div class="ListOfReviews">
      {ReviewDatabase("BFITReviews")}
      </div>
      </div>
    );
  }

  function displaySunset(){
    return (
      <div>
        <br />
        <h3>Sunset Canyon Recreation Center (Sunset Rec)</h3>
        <div class="flex-container">
        <img src="https://recreation.ucla.edu/sites/default/files/styles/resize_3_2/public/2022-03/facilities_pools_600x400_1.jpg?itok=97qpWsPL"  width="250" height="200" class="SUNSETREC"></img>
        <div class="rating-section">
        <h4>Overall Rating:</h4> <p className="specialBlueText">{sunsetOverallAverage !== undefined ? sunsetOverallAverage.toFixed(1) : sunsetOverallAverage}/5</p>
        <div class="rating">
        <span className="blueText">Facility Maintenance: </span>{sunsetAverageRatings[0] !== undefined ? sunsetAverageRatings[0].toFixed(1) : sunsetAverageRatings[0]}/5 <br /><br />
      <span className="blueText">Hours: </span>{sunsetAverageRatings[1] !== undefined ? sunsetAverageRatings[1].toFixed(1) : sunsetAverageRatings[1]}/5 <br /><br />
      <span className="blueText">Space: </span>{sunsetAverageRatings[2] !== undefined ? sunsetAverageRatings[2].toFixed(1) : sunsetAverageRatings[2]}/5 <br /><br />
      <span className="blueText">Location: </span>{sunsetAverageRatings[3] !== undefined ? sunsetAverageRatings[3].toFixed(1) : sunsetAverageRatings[3]}/5 <br /><br />
      <span className="blueText">Activity Level: </span>{sunsetAverageRatings[4] !== undefined ? sunsetAverageRatings[4].toFixed(1) : sunsetAverageRatings[4]}/5 <br /><br />
      </div>
      </div>
      </div>
<div class="ListOfReviews">
        {ReviewDatabase("SunsetRecReviews")}
        </div>
      </div>
    );
  }

  function displayHitch(){
    return (
      <div>
          <br />
        <h3>Hitch Basketball Courts</h3>
        <div class="flex-container">
        <img src="https://i.pinimg.com/originals/97/d5/dc/97d5dc01f8ae8694c1e8c319ee3bbf00.png"  width="250" height="200" class="HITCHBB"></img>
        <div class="rating-section">
        <h4>Overall Rating:</h4> <p className="specialBlueText">{hitchOverallAverage !== undefined ? hitchOverallAverage.toFixed(1) : hitchOverallAverage}/5</p>
        <div class="rating">
        <span className="blueText">Facility Maintenance: </span>{hitchAverageRatings[0] !== undefined ? hitchAverageRatings[0].toFixed(1) : hitchAverageRatings[0]}/5 <br /><br />
      <span className="blueText">Hours: </span>{hitchAverageRatings[1] !== undefined ? hitchAverageRatings[1].toFixed(1) : hitchAverageRatings[1]}/5 <br /><br />
      <span className="blueText">Space: </span>{hitchAverageRatings[2] !== undefined ? hitchAverageRatings[2].toFixed(1) : hitchAverageRatings[2]}/5 <br /><br />
      <span className="blueText">Location: </span>{hitchAverageRatings[3] !== undefined ? hitchAverageRatings[3].toFixed(1) : hitchAverageRatings[3]}/5 <br /><br />
      <span className="blueText">Activity Level: </span>{hitchAverageRatings[4] !== undefined ? hitchAverageRatings[4].toFixed(1) : hitchAverageRatings[4]}/5 <br /><br />
      </div>
      </div>
      </div>
      <div class="ListOfReviews">
        {ReviewDatabase("HitchBBReviews")}
        </div>
      </div>
    );
  }

  function displayIM(){
    return (
      <div>
        <br />
        <h3>Intramural Field</h3>
        <div class="flex-container">
        <img src="https://recreation.ucla.edu/sites/default/files/styles/header_image/public/2022-03/facilities_IMfield_1156x420.jpg?itok=9NBBHMNs"  width="250" height="200" class="IMFIELD"></img>
        <div class="rating-section">
        <h4>Overall Rating:</h4> <p className="specialBlueText">{IMOverallAverage !== undefined ? IMOverallAverage.toFixed(1) : IMOverallAverage}/5</p>
        <div class="rating">
        <span className="blueText">Facility Maintenance: </span>{IMAverageRatings[0] !== undefined ? IMAverageRatings[0].toFixed(1) : IMAverageRatings[0]}/5 <br /><br />
      <span className="blueText">Hours: </span>{IMAverageRatings[1] !== undefined ? IMAverageRatings[1].toFixed(1) : IMAverageRatings[1]}/5 <br /><br />
      <span className="blueText">Space: </span>{IMAverageRatings[2] !== undefined ? IMAverageRatings[2].toFixed(1) : IMAverageRatings[2]}/5 <br /><br />
      <span className="blueText">Location: </span>{IMAverageRatings[3] !== undefined ? IMAverageRatings[3].toFixed(1) : IMAverageRatings[3]}/5 <br /><br />
      <span className="blueText">Activity Level: </span>{IMAverageRatings[4] !== undefined ? IMAverageRatings[4].toFixed(1) : IMAverageRatings[4]}/5 <br /><br />
      </div>
      </div>
      </div>
      <div class="ListOfReviews">
        {ReviewDatabase("IMFieldReviews")}
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
<img src="https://linespace.com/wp-content/uploads/2018/03/UCLA_BeFit_091615_04-1170x658.jpg" alt="BFit" width="720" height="405" class = "RecCenterCover"/>
<br />
  <div className="blueBackground">
  <p className="introText">Here you can find every recreation center on campus.</p>
  <b>Sort By:</b>
   <ul>
    <button type='button' className="btn btn-primary" onClick={() => { getAverages(1);}}>Facility Maintenance{}</button>
    <button type='button' className="btn btn-primary" onClick={() => { getAverages(2);}}>Hours{}</button>
    <button type='button' className="btn btn-primary" onClick={() => { getAverages(3);}}>Space{}</button>
    <button type='button' className="btn btn-primary" onClick={() => { getAverages(4);}}>Location{}</button>
    <button type='button' className="btn btn-primary" onClick={() => { getAverages(5);}}>Activity Level{}</button>
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
  </div>) : 
    (<div>
      {displayBFit()}
      <br />
      <br />
      {displayHitch()}
      <br />
      <br />
      {displayIM()}
      <br />
      <br />
      {displayJWC()}
      <br />
      <br />
      {displaySunset()}
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
  // do something with hedrickMatches
}

const readInSearchData = async (reviewCollectionRef) => {
  const querySnapshot = await getDocs(reviewCollectionRef);

  // create array of reviews from collection
  const readInReviews = [];
  
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    data.id = doc.id;
    readInReviews.push(data);
    console.log(typeof data);
  });

  return readInReviews;
}

const findMatches = async(userSearch) => {
  const JWCCollectionRef = collection(db, "JWCReviews");
  const bFitCollectionRef = collection(db, "BFITReviews");
  const sunsetCollectionRef = collection(db, "SunsetRecReviews");
  const hitchBBCollectionRef = collection(db, "HitchBBReviews");
  const IMFieldCollectionRef = collection(db, "IMFieldReviews");

  const readInJWCReviews = await readInSearchData(JWCCollectionRef);
  const readInBFITReviews = await readInSearchData(bFitCollectionRef);
  const readInSunsetReviews = await readInSearchData(sunsetCollectionRef);
  const readInHitchBBReviews = await readInSearchData(hitchBBCollectionRef);
  const readInIMFieldReviews = await readInSearchData(IMFieldCollectionRef);

  let allRevs = [];

  readInJWCReviews.forEach((review) => {
    allRevs.push("John Wooden Center: \"" + review.TextReview + "\""); 
    
  });

  readInBFITReviews.forEach((review) => {
    allRevs.push("BFit: \"" + review.TextReview + "\""); 
  });

  readInSunsetReviews.forEach((review) => {
    allRevs.push("Sunset Rec: \"" + review.TextReview + "\""); 
  });

  readInHitchBBReviews.forEach((review) => {
    allRevs.push("Hitch Basketball Courts: \"" + review.TextReview + "\""); 
  });

  readInIMFieldReviews.forEach((review) => {
    allRevs.push("Intramural Fields: \"" + review.TextReview + "\""); 
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
  // do something with hedrickMatches
}


const computeAverage = async(collectionName, category) => {
// function computeAverage(collectionName, category){

  const reviewCollectionRef = collection(db, collectionName);

  const readInReviews = await readInData(reviewCollectionRef); //read in data from review

  const length = readInReviews.length; //number of reviews


  //don't need to do any read in data
  if (length == 0){
    return 0;
  }

  //read in data from collection that string specifies 
  if (category == "1"){
    //compute average of facility quality 
    let totalRating = 0;

    readInReviews.forEach((review) =>{
      totalRating += parseInt(review.FacilityQRating); //add up facility rating for each review
    });
    return totalRating / length;
  }

  if (category == "2") {
    let totalRating = 0;

    readInReviews.forEach((review) => {
      totalRating += parseInt(review.HoursRating); //add up facility rating for each review
    });
    return totalRating / length;
  }

  if (category == "3"){
    let totalRating = 0;

    readInReviews.forEach((review) =>{
      totalRating += parseInt(review.SpaceRating); //add up facility rating for each review
    });
    return totalRating / length;
  }

  if (category == "4"){
    let totalRating = 0;

    readInReviews.forEach((review) =>{
      totalRating += parseInt(review.LocationRating); //add up facility rating for each review
    });
    return totalRating / length;
  }

  if (category == "5"){
    let totalRating = 0;

    readInReviews.forEach((review) =>{
      totalRating += parseInt(review.BusinessRating); //add up facility rating for each review
    });
    return totalRating / length;
  }
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
function ReviewDatabase(string){
    const [input, setInput] = useState(""); //this will be the input review from the user
    const [FacilityQRating, setFacilityQRating] = useState(-1); //this will be the inout rating from the user
    const [HoursRating, setHoursRating] = useState(-1); //this will be the inout rating from the user
    const [SpaceRating, setSpaceRating] = useState(-1); //this will be the inout rating from the user
    const [LocationRating, setLocationRating] = useState(-1); //this will be the inout rating from the user
    const [BusinessRating, setBusinessRating] = useState(-1); //this will be the inout rating from the user
    
    const [reducerValue, forceUpdate] = useReducer(x => x+1, 0);

    const [showAllReviews, setShowAllReviews] = useState(false);
    const [leaveReview, setLeaveReview] = useState(false);

    const [reviews, setReview] = useState([]);
    const reviewCollectionRef = collection(db, string)
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

    const createReview = async() => {
      setLeaveReview(false);
    if (logged){
      if (BusinessRating != -1 && LocationRating != -1 && SpaceRating != -1 && HoursRating != -1 && FacilityQRating != -1 && input != "" && BusinessRating <= 5 && BusinessRating >= 0 && LocationRating <= 5 && LocationRating >= 0 && SpaceRating >= 0 && SpaceRating <= 5 && HoursRating >= 0 && HoursRating <= 5 && FacilityQRating >= 0 && FacilityQRating <= 5) {
        await addDoc(reviewCollectionRef, { TextReview: input ,BusinessRating: BusinessRating, LocationRating: LocationRating, SpaceRating: SpaceRating, HoursRating: HoursRating, FacilityQRating : FacilityQRating, 
          Overall: ((Number(BusinessRating) + Number(LocationRating) + Number(SpaceRating) + Number(HoursRating) + Number(FacilityQRating))/5), upvotes: Number(0), downvotes: Number(0), userEmail: "" })
        forceUpdate();
        //  alert("Review Submitted! Refresh page to view.")
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
        text: "Please login at Home Page before leaving a review"
      })  
    }
    };
    
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
        forceUpdate();
        //alert("Upvote counted!! Refresh page to view.")
      }else{
        Swal.fire({
          
          icon: 'error',
          title: 'Oops...',
          text: "Please Login at Home Page before Upvoting!"
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
          text: "Please Login at Home Page before DownVoting!"
        })  
      }
    }

    useEffect(() => {
      
      const getReviews = async () => {
        // const data = await getDocs(reviewCollectionRef);
        // setReview(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
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

    function leaveAReview(){
      if(leaveReview == false){
        setLeaveReview(true);
      }else{
        setLeaveReview(false);
      }
    }

    return (
      <div className="ReviewDatabase">
      <button onClick={leaveAReview} className="rev-button"> Leave a Review</button>
      {leaveReview ? (
      <div className="form-container">
      <textarea
        placeholder="Review. . ."
        onChange={(event) => {
          setInput(event.target.value);
        }}
        className="ReviewBox"
        rows="8"  // change this to increase/decrease height
        cols="50" // change this to increase/decrease width
      />
      <div className="input-group-horiz">
      <p className="no-margin">Facility Maintenance:
      <input
        type="number"
        min={0}
        max={5}
        placeholder="0-5"
        onChange={(event) => {
          setFacilityQRating(event.target.value);
        }}
        class="RatingBox"
        /></p>

      <p className="no-margin">Hours:
      <input
        type="number"
        min={0}
        max={5}
        placeholder="0-5"
        onChange={(event) => {
          setHoursRating(event.target.value);
        }}
        class="RatingBox"
        /></p>

      <p className="no-margin">Space:
      <input
        type="number"
        min={0}
        max={5}
        placeholder="0-5"
        onChange={(event) => {
          setSpaceRating(event.target.value);
        }}
        class="RatingBox"
        /></p>

      <p className="no-margin">Location:
      <input
        type="number"
        min={0}
        max={5}
        placeholder="0-5"
        onChange={(event) => {
          setLocationRating(event.target.value);
        }}
        class="RatingBox"
        /></p>
      <p className="no-margin">Activity Level:
      <input
        type="number"
        min={0}
        max={5}
        placeholder="0-5"
        onChange={(event) => {
          setBusinessRating(event.target.value);
        }}
        class="RatingBox"
        /></p>
        <button onClick={createReview} className="rev-button">Submit Review</button>
        </div></div>) : null}
        {/* DISPLAYING MOST POPULAR/AGREED UPON REVVIEW */}
        <h3>Top Review:</h3>
          {reviews.length > 0 ? (<div>
                <div className="eachReview">
                    <p><span className="blueText"><b>Review: </b></ span>{reviews[0].TextReview}</p>
                    <p><span className="blueText"><b>Overall Rating: </b></span>{reviews[0].Overall}/5</p>
                    <p><span className="blueText">Facility Maintenance:</span> {reviews[0].FacilityQRating}/5 <span className="blueText"> |  Hours:</span> {reviews[0].HoursRating}/5 <span className="blueText"> |  Space: </span>{reviews[0].SpaceRating}/5 <span className="blueText"> |  Location:</span> {reviews[0].LocationRating}/5 <span className="blueText"> |  Activity Level:</span> {reviews[0].BusinessRating}/5 </p>
                     <button onClick={() => {upVote(reviews[0].id, reviews[0].upvotes, reviews[0].userEmail)}} class="thumbsup"><span role="img" aria-label="thumbs-up">&#x1F44D;</span></button>{reviews[0].upvotes}
                    <button onClick={() => {downVote(reviews[0].id, reviews[0].downvotes, reviews[0].userEmail)}} class="thumbsdown"><span role="img" aria-label="thumbs-down">&#x1F44E;</span></button>{reviews[0].downvotes}
                </div>
                {/* BUTTON TO DISPLAY REST OF THE REVIEWS */}
                {!showAllReviews && <button onClick={() => displayAllReviews(1)} className="rev-button">More Reviews</button>}
                {showAllReviews && <button onClick={() => displayAllReviews(2)} className="rev-button">Less Reviews</button>}</div>) : (<div>No reviews available</div>)}
                {showAllReviews ?  reviews.slice(1).map((review) => {
          return (
        <div className="eachReview">
        <p><span className="blueText"><b>Review: </b></ span>{review.TextReview}</p>
        <p><span className="blueText"><b>Overall Rating: </b></span>{review.Overall}/5</p>
        <p><span className="blueText">Facility Maintenance:</span> {review.FacilityQRating}/5 <span className="blueText"> |  Hours:</span> {review.HoursRating}/5 <span className="blueText"> |  Space: </span>{review.SpaceRating}/5 <span className="blueText"> |  Location:</span> {review.LocationRating}/5 <span className="blueText"> |  Activity Level:</span> {review.BusinessRating}/5 </p>
         <button onClick={() => {upVote(review.id, review.upvotes, review.userEmail)}} class="thumbsup"><span role="img" aria-label="thumbs-up">&#x1F44D;</span></button>{review.upvotes}
        <button onClick={() => {downVote(review.id, review.downvotes, review.userEmail)}} class="thumbsdown"><span role="img" aria-label="thumbs-down">&#x1F44E;</span></button>{review.downvotes}
        </div>);
        }) : null}
    </div>);
  }


  

export default RecCenters;