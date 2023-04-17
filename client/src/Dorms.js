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
  const [rieberHall, setRieberhall] = useState(0);
  const [rieberVista, setRieberVista] = useState(0);

  const [sortedAspect, setSortedAspect] = useState("");
  const [sortedNames, setSortedNames] = useState([]);
  const [showSortedResults, setShowSortedResults] = useState(false);
  console.log(sortedAspect);

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
    // console.log(retrieveAverages("JWCReviews", props));
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
    setRieberhall(await rieberHallPromise);
    setRieberVista(await rieberVistaPromise);

    setSortedAspect(props)
    setShowSortedResults(true);
  }

  function displayHeddySummit(){
    return (
      <div>
        <h3>Hedrick Summit</h3>
        <img src="https://s3-media0.fl.yelpcdn.com/bphoto/R7x3cuexqtbDRpbZKK405w/348s.jpg"  width="250" height="200" class="HSummit"></img>
        <div class="ListOfReviews">
          <h3>Reviews:</h3><br></br>
        {ReviewDatabase("HeddySummit")}
        </div>
        </div>
    );
  }

  function displayHitch(){
    return (
      <div>
        <h3>Hitch Suites</h3>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ_zvnYnhBUwc_tFS-fniDWToVlSA_BgtF6g&usqp=CAU"  width="250" height="220" class="HitchSuitesPics"></img>
        <div class="ListOfReviews">
          <h3>Reviews:</h3><br></br>
        {ReviewDatabase("Hitch")}
        </div>
      </div>
      
    );
  }

  function displayDeNeve(){
    return (
      <div>
        <h3>De Neve Acacia, Birch, Cedar, Dogwood, Evergreen, Fir</h3>
      <img src="https://fastly.4sqi.net/img/general/600x600/6826866_k4W8jsn53GD_Y6CHMaGW5AlGywjPaUPbG_8YXquH-5U.jpg"  width="250" height="200" class="DeNeveDorms"></img>
      <div class="ListOfReviews">
        <h3>Reviews:</h3><br></br>
      {ReviewDatabase("DeNeve")}
      </div>
      </div>
    );
  }

  function displayCentennial(){
    return (
      <div>
        <h3>Centennial/Olympic</h3>
        <img src="https://s3.amazonaws.com/cms.ipressroom.com/173/files/20218/614102382cfac27232f4ea45_Olympic+and+Centennial+Hall_5DM47510_Ext2/Olympic+and+Centennial+Hall_5DM47510_Ext2_hero.jpg"  width="250" height="200" class="CentennialOlympic"></img>
        <div class="ListOfReviews">
          <h3>Reviews:</h3><br /><br />
        {ReviewDatabase("Centennial")}
        </div>
      </div>
    );
  }

  function displayRieberVista(){
    return (
      <div>
        <h3>Rieber Terrace/Vista</h3>
        <img src="https://conferences.ucla.edu/wp-content/uploads/2019/01/Summer_PlazaRooms_RieberVista.jpg"  width="250" height="200" class="RieberTerraceVista"></img>
        <div class="ListOfReviews">
          <h3>Reviews:</h3><br></br>
        {ReviewDatabase("RieberVista")}
      </div>
      </div>
    );
  }

  function displayDykstra(){
    return (
      <div>
        <h3>Dykstra</h3>
        <img src="https://www.saifulbouquet.com/wp-content/uploads/2020/04/47097_web_ns_2_17_dykstramemories_picco.jpg" width="250" height="200" class="Dykstra"></img>
        <div class="ListOfReviews">
          <h3>Reviews:</h3><br></br>
        {ReviewDatabase("Dykstra")}
        </div>
      </div>
    );
  }

  function displayHeddyHall(){
    return (
      <div>
        <h3>Hedrick Hall</h3>
        <img src="https://humansofuniversity.com/wp-content/uploads/2022/05/2b0fbb098d13dd26587a5841292cd4aa-1024x768.jpg" width="250" height="200" class="HedrickPic"></img>
        <div class="ListOfReviews">
          <h3>Reviews:</h3><br></br>
        {ReviewDatabase("Hedrick")}
      </div>
      </div>
    );
  }

  function displayRieberHall(){
    return (
      <div>
        <h3>Rieber Hall</h3>
      <img src="https://www.sgvtribune.com/wp-content/uploads/2022/03/LDN-Z-UCLA-DORMS.jpg?w=620"  width="250" height="230" class="rieberHall"></img>
      <div class="ListOfReviews">
        <h3>Reviews:</h3><br></br>
      {ReviewDatabase("RieberHall")}
      </div>
      </div>
    );
  }

  function displayHollyGardenia(){
    return (
      <div>
      <h3>De Neve Gardenia/Holly</h3>
        <img src="https://humansofuniversity.com/wp-content/uploads/2022/05/67658661.jpg"  width="250" height="200" class="HollyGardenia"></img>
        <div class="ListOfReviews">
          <h3>Reviews:</h3><br></br>
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
      <p>Here you can find every dorm on campus.</p>


       <span className="blueText"><b>Sort By:</b></span>
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
          text: "Please leave a review and rating (0-5) in order to submit",
          footer: '<a href="/contact">Having Issues? - Contact Us!</a>'
        })  
      }
    }
    else{
      Swal.fire({
          
        icon: 'error',
        title: 'Oops...',
        text: "Please login at Home Page before leaving a review",
        footer: '<a href="/contact">Having Issues? - Contact Us!</a>'
      })  
    }
  }

    //for updating review when upvote button clicked if user is logged in
    const upVote = async (id, numupvotes, userEmail) => { // NEW CHANGE
      if(userEmail.includes(auth.currentUser.email)){
        Swal.fire({
          
          icon: 'error',
          title: 'Oops...',
          text: "You have already voted on this review!",
          footer: '<a href="/contact">Having Issues? - Contact Us!</a>'
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
          text: "Please login at Home Page before Upvoting",
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
          text: "You have already voted on this review!",
          footer: '<a href="/contact">Having Issues? - Contact Us!</a>'
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
          text: "Please login at Home Page before Downvoting",
          footer: '<a href="/contact">Having Issues? - Contact Us!</a>'
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
    console.log("ENTEREDEDEDED");
    forceUpdate();
  }


  useEffect(() => {
    const getReviews = async () => {
      const data = await getDocs(reviewCollectionRef);
      setReview(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    }

    getReviews()
  }, [reducerValue])

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

    {/* //<button onClick={sortReview} className="rev-button">Sort by Popularity</button>  */}

    </div>
    </div>


        {allReviews.map((review) => {
          return (
            <div className="eachReview">
              <p><b><span className="blueText">Review: </span></b>{review.Review}</p> 
              <p><b><span className="blueText">Overall Rating: </span> </b>{review.Overall}/5</p>
              <p><span className="blueText">Cleanliness:  </span>{review.CleanlinessRating}/5 <span className="blueText">|  Noise:  </span>{review.NoiseRating}/5 <span className="blueText"> |  Living Space:  </span> {review.SpaceRating}/5 <span className="blueText"> |  Location: </span> {review.LocationRating}/5 <span className="blueText"> |  Social Life:  </span>{review.SocialLifeRating}/5</p>
              <button onClick={() => {upVote(review.id, review.upvotes, review.userEmail)}} class="thumbsup"><span role="img" aria-label="thumbs-up">
        &#x1F44D;</span></button>{review.upvotes}
              <button onClick={() => {downVote(review.id, review.downvotes, review.userEmail)}}class="thumbsdown"><span role="img" aria-label="thumbs-down">
        &#x1F44E;
      </span></button>{review.downvotes}
              {console.log(string)}
              {console.log(review.CleanlinessRating)}
              </div>
              );
        })}
    </div>
  );
}

export default Dorms;


// //ADDED March 9th
// const sortReviews = async (string) => {

  
//   //orderBy() method specifies that the documents should be ordered by the value of the "rating" field in descending order

//   const querySnapshot = await query(reviewCollectionRef, orderBy("upvotes", "desc")); // 'query' method returns a QuerySnapshot object that contains the results of the query
//   console.log(typeof querySnapshot.docs);

//   // if (querySnapshot.docs.length > 0) {
//   //   const sortedReviews = querySnapshot.docs.map((doc) => doc.data()); //maps snapshots to data objects
//   //   console.log("Sorted reviews:", sortedReviews);
//   //   // Update the state of your component with the sorted reviews data
//   // } else {
//   //   console.warn("No reviews found.");
//   // }

//   // const sortedReviews = querySnapshot.docs.map((doc) => doc.data()); //maps snapshots to data objects
//   // console.log(sortedReviews);
//   // setReviews(sortedReviews); 