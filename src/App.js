import "./App.css";
import secretImg from './secret.png'
import React, { useState, useEffect } from "react";

function App() {
  const [images, setImages] = useState([]);
  const endpoint =
    "https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=20";

  // Get images from endpoint and add them ti¡o array  
  const fetchImages = async () => {
    const response = await fetch(endpoint);
    const data = await response.json();
    const imagesArray = data.entries;
    setImages(imagesArray);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const  handleClick = (event, url) => {
    console.log(event.target);
    event.target.src = url
    console.log('Image clicked');
  }

  return (
    <div className="App">
      <header>
        <h1>Memory Game</h1>
      </header>
      <div className="container">
        {images.map((currImg, idx) => {
          const url = currImg.fields.image.url
          const alt = currImg.fields.image.title
          return (
            <img key={idx} src={secretImg} alt={alt} onClick={event => handleClick(event, url)}/>
          );
        })}
      </div>
    </div>
  );
}
export default App;
