TODO:
-Compeltely redo styling lol, lowkey rip off bruinwalk, make boxes round and coloring white and blue themed

-Add separate login page ☑️

-Add social life rating attribute to each dorm ☑️

-Add saxon, sproul landing/cove, sunset, sproul hall to dorms

-Split rendezvous into west and east

-Add university apartments

-default sort reviews from most least upvoted

-show only top review, press a button to display rest of reviews

-Display overall average rating and average rating of each attribute next to each facility
    -For example, for Saxon we should display next to it the average overral rating, average cleanliness rating, average noisiness rating, etc.

-Have login information(whether signed in or out and email signed in with) at the top right of the page at all times + sign out button ☑️


HillTalk

Introduction: 
The purpose of this project is to design a full-stack web appliaction. HillTalk enables users with the following features:
1. Users can register and login to an account, regardless of what local device they are using to run HillTalk.
2. Users can read the reviews from other users of any Dorm, Dining Hall, and/or Recreation Center on UCLA's "Hill". Each review has:
    a. a text comment, 
    b. individual ratings on different aspects (ex: Dorms -> Location, Cleanliness, Noise, Living Space), 
    c. overall rating which is the average of the aspect ratings, and 
    d. upvote and downvote buttons with the corresponding counts.
3. Users can leave their own reviews by leaving a comment and rating (0-5) for each category of the place they are reviewing, then click the "Submit Review" button. 
    Note: Users must be logged in to an account on the Home Page in order to leave a review. 
    Note: Users will be flagged if they do not complete all sections of the review or attempt to leave a rating outside the [0-5] inclusive range.
4. Users can search through the reviews via keywords on individual pages (Dorms, Dining Halls, and Recreation Centers) by entering the keyword under the "Search For Keywords in Reviews:" section at the top of each review page then clicking the "Search" button.
5. Users can sort the individual pages (Dorms, Dining Halls, and Recreation Centers) based on preference by clicking any of the sorting buttons under the "Sort By:" section at the top of each review page. This will rearrange the current webpage from highest to lowest rated based on the preference labeled on the button they clicked.
6. Users can upvote or downvote reviews by clicking the thumbs up or thumbs down respectively at the bottom of each review.
    Note: A user can only upvote or downvote once per review.

Requirements:
This project requires requires the following modules:
1. React (https://react.dev/)
2. Firebase (https://firebase.google.com/)

Installation:
First, follow the steps at this link to download Node.js:
https://radixweb.com/blog/installing-npm-and-nodejs-on-windows-and-mac

Then, run the following in terminal in HillTalkHTMLCSS/client

    npm install
    npm install firebase
    npm install sweetalert2

To start the program, run in HillTalkHTMLCSS/client or 

    npm start

Configuration:
The module has no menu or modifiable settings. There is no configuration.

Registering Account:
Your password must be at least 6 characters long and the email must be a regular email address format.

Troubleshooting & FAQ:
If you run into any issues, please report it on the Contact Us page of the website.

Authors:
-Aarya Tallada (https://github.com/aaryatallada)
-Colin Hoggatt (https://github.com/colinhoggatt)
-Dhruv Pareek (https://github.com/DhruvPareek)
-Lakshman Sundaram (https://github.com/lakshman-sun27)
-Ryan Miller (https://github.com/RyanBatesMiller)
