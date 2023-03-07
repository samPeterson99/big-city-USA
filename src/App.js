import stateMap from './states.png'
import './App.css';
import { cities } from "./cities"
import { useState } from 'react';

const App = () => {
const [gameState, setGameState] = useState([])

const handleClick = (e) => {
  let x = e.nativeEvent.offsetX;
  let y = e.nativeEvent.offsetY;
  console.log(`xMin: ${e.nativeEvent.offsetX - 12},\n
              xMax: ${e.nativeEvent.offsetX + 12},\n
              yMin: ${e.nativeEvent.offsetY - 12},\n
              yMax: ${e.nativeEvent.offsetY + 12},\n`)

  for (const object of cities) {
    if (x < object.xMax && x > object.xMin && y > object.yMin && y < object.yMax) {
      let circle = document.createElement("div");
      circle.classList.add(`circle${object.place}`);
      circle.classList.add('circle');
      document.getElementById("imageBox").appendChild(circle);
      setGameState([
        ...gameState,
        object.place
      ].sort())
    }
  }
  
  const revealedCities = cities.filter(obj => {
    return gameState.some((num) => num === obj.place)
  })

  if (revealedCities.length === 20) {
    alert('alright')
  }

}

const revealer = () => {
  setGameState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20])
}




const generateBoard = cities.map((object) =>
<div key={object.place} className='cityOnBoard' >
    <h3>{object.place}.</h3>
    
    {gameState.indexOf(object.place) > -1 &&
    <div>
        <h3>{object.city}</h3>
        <h4>Population: {object.population}</h4>
    </div> 
    }
</div>
)






return (
    <div className="App">
        <h1 id='title'>Big City, U.S.A.</h1>
        <h2 id='directions'>find the 20 largest US cities <br></br>by clicking them on the state map below</h2>
        <div id='imageBox'>
          <img src={stateMap} onClick={handleClick} id='stateMap' alt='United States map' />
        </div>
        <div id='scoreboard'>
          {generateBoard}
        </div>
        <button onClick={revealer}>reveal all</button>
        <div id='note'>
        developer's note 
          <div id='revealNote'>Cities are ranked by the population of their incorporated area, as oppose to their larger metro areas. This biases the data toward Western cities which have more area. <br></br> Populations based on 2020 census data. For more information <a href='https://en.wikipedia.org/wiki/Cities_and_metropolitan_areas_of_the_United_States'>click here</a>.</div>
        </div>
    </div>
);
}

export default App;
