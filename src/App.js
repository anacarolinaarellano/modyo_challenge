import "./App.css";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import secretImg from "./secret.png";
import ShowModal from "./components/Modal";

function App() {
  //vars to keep track of cards
  var cardOne = "";
  var cardTwo = "";
  var pairsFound = 0;
  const [images, setImages] = useState([]); // use hook
  const [show, setShow] = useState(false);

  const endpoint =
    "https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=20";

  // Get images from endpoint
  const fetchImages = async () => {
    const response = await fetch(endpoint);
    const data = await response.json();
    var imagesArray = data.entries;
    //choose first 5 random elements
    var tempArray = randomizeArray(imagesArray)
    tempArray = tempArray.slice(0, 5)
    //duplicate the elements and randomize again
    tempArray = tempArray.concat(tempArray)
    console.log(tempArray)
    setImages(randomizeArray(tempArray));
  };

  useEffect(() => {
    fetchImages();
  }, []);

  //shuffle algorithm obtained from dev.to
  const randomizeArray = arr => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr
  }

  const handleClick = (event, url) => {
    cardOne = cardTwo;
    cardTwo = event.target;
    event.target.src = url;

    if (cardOne !== "") {
      if (cardOne.alt === cardTwo.alt) {
        pairsFound++;
        setTimeout(() => {
          setShow(true); //show modal
          setTimeout(() => {
            setShow(false);
          }, 1500); //stop showing modal after 1.5 seconds
          // cards that have been found now have click disabled
          cardOne.classList.add("disabled");
          cardTwo.classList.add("disabled");
          if (pairsFound === 10)
            alert("You have found all the pairs! Thanks for playing!");
          //reset cards
          cardOne = "";
          cardTwo = "";
        }, 300); //wait 0.3 seconds before actions
      } //no match
      else {
        setTimeout(() => {
          //hide images again
          cardOne.src = secretImg;
          cardTwo.src = secretImg;
          //reset cards
          cardOne = "";
          cardTwo = "";
        }, 700); //wait 0.7 seconds before actions
      }
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Memory Game</h1>
      </header>
      <div className="container">
        <ShowModal show={show} />
        {images.map((currImg, idx) => {
          const url = currImg.fields.image.url;
          const alt = currImg.fields.image.title;
          return (
            <img
              key={idx}
              src={secretImg}
              alt={alt}
              onClick={(event) => handleClick(event, url)}
            />
          );
        })}
      </div>
    </div>
  );
}
export default App;
