import "./App.css";
import secretImg from "./secret.png";
import React, { useState, useEffect } from "react";

function App() {
  //vars to keep track of cards
  var cardOne = "";
  var cardTwo = "";
  const [images, setImages] = useState([]); // use hook
  const endpoint =
    "https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=20";

  // Get images from endpoint and add them ti¡o array
  const fetchImages = async () => {
    const response = await fetch(endpoint);
    const data = await response.json();
    var imagesArray = data.entries;
    imagesArray = imagesArray.concat(imagesArray);
    setImages(imagesArray);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleClick = (event, url) => {
    cardOne = cardTwo;
    cardTwo = event.target;
    event.target.src = url;

    if (cardOne !== "") {
      if (cardOne.alt === cardTwo.alt) {
        setTimeout(() => {
          alert("Congratulations, that's a match!");
          cardOne = "";
          cardTwo = "";
        }, 300);
      } //no match
      else {
        setTimeout(() => {
          cardOne.src = secretImg;
          cardTwo.src = secretImg;
          cardOne = "";
          cardTwo = "";
        }, 700);
      }
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Memory Game</h1>
      </header>
      <div className="container">
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
