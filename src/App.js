import './App.css';
import './index.css'
import { useEffect } from 'react';
import RadarStation from './RadarStation';

function App() {

const fetchWeatherData = async () => {
  try {
    const res = await fetch('https://api.weather.gov/radar/stations');
    const data = await res.json();
    console.log(data.features);
  } catch (error) {
    console.log(error);
  }
  
}

useEffect(() => {
  fetchWeatherData();
}, [])

class Station {
  constructor( name, identifier, gps, altitude) {
    this.name = name;
    this.identifier = identifier;
    this.gps = gps;
    this.altitude = altitude
  } 
}

const testStation = new Station('knoxville', '123456', 3563, '3000ft');
console.log(testStation);

  return (
    <div className="App flex w-full h-full">
      <div className='bg-red-600 basis-1/4 h-screen'>
          toolbar
      </div>
      <div className='bg-blue-300 basis-3/4 h-screen grid grid-cols-3'>
        <RadarStation />
        <RadarStation />
        <RadarStation />
        <RadarStation />
        <RadarStation />
        <RadarStation />
        <RadarStation />
        <RadarStation />
        <RadarStation />
      </div>
    </div>
  );
}

export default App;
