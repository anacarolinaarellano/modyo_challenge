import "./App.css";
import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import secretImg from "./secret.png";
import ShowModal from "./components/Modal";

function App() {
  //vars to keep track of cards
  var cardOne = "";
  var cardTwo = "";
  const [images, setImages] = useState([]); // use hook
  const [show, setShow] = useState(false);

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
          setShow(true)
          setTimeout(() => {setShow(false) }, 3000)
          // cards that have been found now have click disabled 
          cardOne.classList.add("disabled");
          cardTwo.classList.add("disabled");
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
        <ShowModal show={show}/>
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
