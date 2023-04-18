import {useState, useEffect, useReducer} from "react";
import React from 'react';
import './App.css';

//import{logged} from './Home.js';

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

  //hooks for sorting functionality 
  const [bplateAverage, setBplateAverage] = useState(0);
  const [epicAverage, setEpicAverage] = useState(0);
  const [dreyAverage, setDreyAverage] = useState(0);
  const [rendeAverage, setRendeAverage] = useState(0);
  const [bcafeAverage, setBcafeAverage] = useState(0);
  const [bBowlAverage, setBBowlAverage] = useState(0);
  const [deNeveAverage, setDeNeveAverage] = useState(0);
  const [feastAverage, setFeastAverage] = useState(0);
  const [studyAverage, setStudyAverage] = useState(0);
  const [sortedAspect, setSortedAspect] = useState("");
  const [sortedNames, setSortedNames] = useState([]);
  const [showSortedResults, setShowSortedResults] = useState(false);

  useEffect(() => {
    let foundBplate, foundEpic, foundDrey, foundRende, foundBcafe, foundBBowl, foundDeNeve, foundFeast, foundStudy = false;
    setSortedNames(prevArray=>[]);
    let sortedNums = [bplateAverage, epicAverage, dreyAverage, rendeAverage, bcafeAverage, bBowlAverage, deNeveAverage, feastAverage, studyAverage].sort((a, b) => b - a);
    
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
      }else if(sortedNums[i] === rendeAverage && !foundRende){
        foundRende = true;
        setSortedNames(prevArray=>[...prevArray, displayRende]);  
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

  async function getAverages(props) {
    const bplateAveragePromise = retrieveAverages("Bplate", props);
    // console.log(retrieveAverages("JWCReviews", props));
    const epicAveragePromise = retrieveAverages("Epicuria", props);
    const dreyAveragePromise = retrieveAverages("Drey", props);
    const rendeAveragePromise = retrieveAverages("Rendezvous", props);
    const bcafeAveragePromise = retrieveAverages("Bcafe", props);
    const bBowlAveragePromise = retrieveAverages("BruinBowl", props);
    const deNeveAveragePromise = retrieveAverages("De Neve", props);
    const feastAveragePromise = retrieveAverages("Feast", props);
    const studyAveragePromise = retrieveAverages("Study", props);
  
    setBplateAverage(await bplateAveragePromise);
    setEpicAverage(await epicAveragePromise);
    setDreyAverage(await dreyAveragePromise);
    setRendeAverage(await rendeAveragePromise);
    setBcafeAverage(await bcafeAveragePromise);
    setBBowlAverage(await bBowlAveragePromise);
    setDeNeveAverage(await deNeveAveragePromise);
    setFeastAverage(await feastAveragePromise);
    setStudyAverage(await studyAveragePromise);

    setSortedAspect(props)
    setShowSortedResults(true);
  }

  function displayRende(){
    return (
      <div>
        <h3>Rendezvous</h3>
        <img src="https://www.sustain.ucla.edu/wp-content/uploads/2013/05/RNDZ_3_web_960x450.jpg"  width="250" height="200" class="Rendezvous"></img>
        <div class="ListOfReviews">
          <h3>Reviews:</h3><br></br>
        {ReviewDatabase("Rendezvous")}
        </div>
        </div>
    );
  }

  function displayDeNeve(){
    return (
      <div>

      <h3>De Neve</h3>
        <img src="https://portal.housing.ucla.edu/sites/default/files/media/images/DiningWebsite_HeaderImages_DeNeve.png"  width="250" height="200" class="DeNeveDH"></img>
        <div class="ListOfReviews">
          <h3>Reviews:</h3><br></br>
        {ReviewDatabase("De Neve")}
        </div>
      </div>
      
    );
  }

  function displayEpic(){
    return (
      <div>
        <h3>Epicuria</h3>
        <img src="https://portal.housing.ucla.edu/sites/default/files/media/images/DiningWebsite_HeaderImages_EpicuriaAckerman2.png"  width="250" height="200" class="Epicuria"></img>
        <div class="ListOfReviews">
          <h3>Reviews:</h3><br></br>
        {ReviewDatabase("Epicuria")}
        </div>
      </div>
    );
  }

  function displayBplate(){
    return (
      <div>
        <h3>Bplate</h3>
        <img src="https://portal.housing.ucla.edu/sites/default/files/media/images/DiningWebsite_HeaderImages_Bruin%20Plate.png"  width="250" height="200" class="Bplate"></img>
        <div class="ListOfReviews">
          <h3>Reviews:</h3><br></br>
        {ReviewDatabase("Bplate")}
        </div>
      </div>
    );
  }

  function displayStudy(){
    return (
      <div>
        <h3>The Study</h3>
        <img src="https://portal.housing.ucla.edu/sites/default/files/media/images/DiningWebsite_HeaderImages_TheStudyatHedrick.png"  width="250" height="200" class="TheStudy"></img>
        <div class="ListOfReviews">
          <h3>Reviews:</h3><br></br>
        {ReviewDatabase("Study")}
        </div>
      </div>
    );
  }

  function displayBcafe(){
    return (
      <div>
        <h3>Bruin Cafe</h3>
        <img src="https://portal.housing.ucla.edu/sites/default/files/media/images/DiningWebsite_HeaderImages_Bruin%20Cafe.png"  width="250" height="200" class="BCafe"></img>
        <div class="ListOfReviews">
          <h3>Reviews:</h3><br></br>
        {ReviewDatabase("Bcafe")}
        </div>
      </div>
    );
  }

  function displayBBowl(){
    return (
      <div>
        <h3>Bruin Bowl</h3>
        <img src="https://portal.housing.ucla.edu/sites/default/files/media/images/DiningWebsite_HeaderImages_Bruin%20Bowl.png"  width="250" height="200" class="BruinBowl"></img>
        <div class="ListOfReviews">
          <h3>Reviews:</h3><br></br>
        {ReviewDatabase("BruinBowl")}
        </div>
      </div>
    );
  }

  function displayFeast(){
    return (
      <div>
        <h3>FEAST</h3>
        <img src="https://portal.housing.ucla.edu/sites/default/files/media/images/DiningWebsite_HeaderImages_FEASTatRieber.png"  width="250" height="200" class="FEAST"></img>
        <div class="ListOfReviews">
          <h3>Reviews:</h3><br></br>
        {ReviewDatabase("Feast")}
        </div>
      </div>
    );
  }

  function displayDrey(){
    return (
      <div>
        <h3>The Drey</h3>
        <img src="https://portal.housing.ucla.edu/sites/default/files/media/images/DiningWebsite_HeaderImages_TheDrey_1.png"  width="250" height="200" class="Drey"></img>
        <div class="ListOfReviews">
          <h3>Reviews:</h3><br></br>
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
    // Returned jsx to display content on page
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
            <button type='button' className="btn btn-primary" onClick={() => { getAverages(1);}}>Healthiness{}</button>  
            <button type='button' className="btn btn-primary" onClick={() => { getAverages(2);}}>Tastiness{}</button>  
            <button type='button' className="btn btn-primary" onClick={() => { getAverages(3);}}>Wait Time{}</button>  
            <button type='button' className="btn btn-primary" onClick={() => { getAverages(4);}}>Availability of Seating{}</button>
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
        {displayRende()}
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
  const rendeCollectionRef = collection(db, "Rendezvous");
  const bCafeCollectionRef = collection(db, "Bcafe");
  const bPlateCollectionRef = collection(db, "Bplate");
  const bBowlCollectionRef = collection(db, "BruinBowl");
  const dNeveCollectionRef = collection(db, "De Neve");
  const dreyCollectionRef = collection(db, "Drey");
  const epicCollectionRef = collection(db, "Epicuria");
  const feastCollectionRef = collection(db, "Feast");
  const studyCollectionRef = collection(db, "Study");

  const readInRendeReviews = await readInSearchData(rendeCollectionRef);
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
  readInRendeReviews.forEach((review) => {
    allRevs.push("Rendezvous: \"" + review.Review + "\""); // Push the dining hall followed by its matching review
    
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
let currUsername = "";
function ReviewDatabase(string){
    const [Reviews, setReview] = useState([]); //hook instead of class
    const ReviewCollectionRef = collection(db, string) //gets the collection of reviews from the database and stores into var
    const [newReview, setNewReview] = useState("");
    const [newHealthRating, setNewHealthRating] = useState(-1);
    const [newQualityRating, setNewQualityRating] = useState(-1);
    const [newTimeRating, setNewTimeRating] = useState(-1);
    const [newSeatingRating, setNewSeatingRating] = useState(-1);
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
          text: "Please leave a review and rating for each field (0-5) in order to submit",
          footer: '<a href="/contact">Having Issues? - Contact Us!</a>'
        })  
      }
      }
      else{

        Swal.fire({
          
          icon: 'error',
          title: 'Oops...',
          text: "Please Login at Home Page before leaving a review",
          footer: '<a href="/contact">Having Issues? - Contact Us!</a>'
        }) 
      }
      };

     //for updating review when upvote button clicked if user is logged in
     const upVote = async (id, numupvotes, userEmail) => { // NEW CHANGE
      if(userEmail.includes(auth.currentUser.email)){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'You have already voted on this review!',
          footer: '<a href="/contact">Having Issues? - Contact Us!</a>'
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
          text: 'Please Login at Home Page before Upvoting!',
          footer: '<a href="/contact">Having Issues? - Contact Us!</a>'
        })
      }
    }
  
    //for updating review when downvote button clicked if user is logged in
    const downVote = async (id, numdownvotes, userEmail) => { // NEW CHANGE
      if(userEmail.includes(auth.currentUser.email)){
        Swal.fire({
          
          icon: 'error',
          title: 'Oops...',
          text: 'You have already voted on this review!',
          footer: '<a href="/contact">Having Issues? - Contact Us!</a>'
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
          text: 'Please Login at Home Page before Downvoting!',
          footer: '<a href="/contact">Having Issues? - Contact Us!</a>'
        })
      }
    }

      //sort reviews by popularity (within same collection)
    const sortReview = async () => {
      const querySnapshot = await getDocs(ReviewCollectionRef);

      // create array of reviews from collection
      const readInReviews = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        data.id = doc.id;
        readInReviews.push(data);
      });

    readInReviews.sort((a, b) => b.upvotes - a.upvotes); //sorts from most popular -> least 

    setReview(readInReviews);
  }

    useEffect(() => {
      
      const getReviews = async () => {
        const data = await getDocs(ReviewCollectionRef); //getDocs returns all the documents from the collection of reviews
        setReview(data.docs.map((doc) => ({...doc.data(), id: doc.id}))); //doc.data return object containing fields and adds id field to new object
      }
  
      getReviews()  
    }, [reducerValue])

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
      {/* <button onClick={sortReview} className="rev-button">Sort by Popularity</button>  */}

      </div>
      </div>
      {Reviews.map((review) => {
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
            
                );
          })}
    </div>
    );
  }
  

export default DiningHalls;


