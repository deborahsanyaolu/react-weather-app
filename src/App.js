import hotPic from './assets/hot.jpg'
import coldPic from './assets/cold.jpg'
import Descriptions from './components/Descriptions';
import { useEffect, useState } from 'react';
import { getFormattedWeatherData } from './weatherService';

const App = () => {

  const [city, setCity] = useState("Manchester");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [pic, setPic] = useState(hotPic);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormattedWeatherData(city, units);
      setWeather(data);

      //Background image Dynamic

      const threshold = units === 'metric' ? 15 : 60;
      if (data.temp <= threshold) setPic(coldPic)
      else setPic(hotPic);
    };

    fetchWeatherData();
  }, [units, city]);

  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);
    // console.log(currentUnit)

    const isCelsius = currentUnit ==="C"
    button.innerText = isCelsius ? "°F" : "°C"
    setUnits(isCelsius ? "metric" : "imperial")
    // console.log(button)
  };
   //Why won't this work????????????


  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value)
      e.currentTarget.blur() //This will get rid of focus once city has loaded
    }
  }

  return (
    <div className="app" style={{backgroundImage: `url(${pic})
    `}}>
      <div className="overlay">
        {weather && (
          <div className="container">
            <div className="section section__inputs">
              <input onKeyDown={enterKeyPressed} type="text" name="city" placeholder="Enter City..."/>
              <button onClick={(e) => handleUnitsClick(e)}>°C</button>
            </div>
        
            <div className="section section__temperature">
              <div className='icon'>
                <h3>{`${weather.name}, ${weather.country}`}</h3>
                <img 
                src={weather.iconURL}alt="weatherIcon"
                />
                <h3>{weather.description}</h3>
              </div>
              <div className='temperture'>
                <h1>{`${weather.temp.toFixed()} °${units === 'metric' ? "C" : "F"}`}</h1>
              </div>
            </div>
            
  
            {/* bottom description */}
            <Descriptions weather={weather} units={units} />
          </div>
          )
        }
      </div>
    </div>
  );
}

export default App;
