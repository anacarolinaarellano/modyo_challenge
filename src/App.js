import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [images, setImages] = useState([]);
  const endpoint =
    "https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=20";

  const fetchImages = async () => {
    const response = await fetch(endpoint);
    const data = await response.json();
    const imagesArray = data.entries;
    setImages(imagesArray);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="App">
      <header>
        <h1>Memory Game</h1>
      </header>
      <div>
        <ul>
          {images.map((currImg, idx) => {
            return (
              <div 
                key={idx}
                style={{
                  width: "15em",
                  height: "18em",
                  backgroundImage: `url(${currImg.fields.image.url})`,
                  margin: 2,
                }}
              >
                <li>{currImg.fields.image.title}</li>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
export default App;
