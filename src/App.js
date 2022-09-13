import './App.css';
import './index.css';
import { useEffect, useState, useRef } from 'react';
import StationGrid from './StationGrid';
import TimezoneInput from './TimezoneInput';
import Fuse from 'fuse.js';

function App() {

const [stations, setStations] = useState([]);
const [apiStations, setApiStations] = useState([]);
const [loading, setLoading] = useState(false);
const [userLat, setUserLat] = useState();
const [userLong, setUserLong] = useState();
const [currentPage, setCurrentPage] = useState(1);
const [timezone, setTimezone] = useState('');
const [searchTerm, setSearchTerm] = useState('');
const [filteredArr, setFilteredArr] = useState([]);

const inputRef = useRef(null);

var geolocation = require('geolocation');
 //get user location
useEffect(() => {
  geolocation.getCurrentPosition(function (err, position) {
    if (err) throw err;
    setUserLat(position.coords.latitude);
    localStorage.setItem('my-key-lat', position.coords.latitude);
    localStorage.setItem('my-key-long', position.coords.longitude);
    setUserLong(position.coords.longitude);
  }, );
});

// Timezone Lookup Library
var tzlookup = require("tz-lookup");

//Get distance from user to other stations
const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

const deg2rad = (deg) => {
  return deg * (Math.PI/180);
}

//Sort array of stations by distance from user
const sortArrayByDistance =  (arr) => {
  let localLat = localStorage.getItem('my-key-lat');
  let localLong = localStorage.getItem('my-key-long');

  if ( localLat && localLong) {
    let arrayWithDistance = arr.map(station => {
        let distance =  getDistanceFromLatLonInKm(localLat, localLong, station.geometry.coordinates[1], station.geometry.coordinates[0]);
        return {...station, distance: distance};
      });
        let sorted = arrayWithDistance.sort((a, b) => a.distance - b.distance);
        return sorted;
      } else {
        let arrayWithDistance = arr.map(station => {
        let distance =  getDistanceFromLatLonInKm(userLat, userLong, station.geometry.coordinates[1], station.geometry.coordinates[0]);
      return {...station, distance: distance};
    });
  let sorted = arrayWithDistance.sort((a, b) => a.distance - b.distance);
  return sorted;
  };
};

//Get input and search through array using fuse
const onChangeFunction = (e) => {
  setSearchTerm(e.target.value);
  let term = inputRef.current.value;
  const options = {
    includeScore: true,
    keys: ['properties.name']
  }
  const fuse = new Fuse(stations, options);
  const result = fuse.search(term);
  const resultTwo = result.map(item => {
    return item.item;
  })
  setFilteredArr(resultTwo);
}

//Get data from timezone select input
const getTimezoneSelection = (str) => {
  setStations(apiStations);
    setTimezone(str);
}

// Use timezone input data to filter through arrays
useEffect ( () => {
  let timezoneStations = stations.filter( item => {
    return item.timezone === timezone;
  })
  setStations(timezoneStations);
  setFilteredArr(timezoneStations);
  setCurrentPage(1);
}, [timezone])

//Reset to default when selecting all timezones
const resetTimezones = () => {
  setStations(apiStations);
  setFilteredArr(apiStations);
  setCurrentPage(1);
}

//Fetch data, add distance, add timezone, and sort
useEffect(() => {
  const fetchApiData = async () => {
      const url = 'https://api.weather.gov/radar/stations';
      try {
        setLoading(true);
        const res = await fetch(url);
        const data = await res.json();
        let apiData = data.features;
        //add timezone
        let timezoneArray = apiData.map(item => {
          let lat = item.geometry.coordinates[1];
          let long = item.geometry.coordinates[0];
          let timezone = tzlookup(lat, long);
          return {...item, timezone: timezone};
          })
        setStations(sortArrayByDistance(timezoneArray));
        setApiStations(sortArrayByDistance(timezoneArray));
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchApiData();
},[]);

  return (
    <div className="App flex w-full h-full">
      <div className='basis-1/4 h-screen border-r-black border-r-2'>
        <h2 className='mt-12 mb-2'>Filter results by city or timezone</h2>
          <input type="text" ref={inputRef} onChange={onChangeFunction} className=' 
          mt-2
          px-3
          py-1.5 w-60 text-base
          font-normal
          text-gray-700
          bg-white 
          bg-clip-padding
          border 
          border-solid 
          border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 
          focus:bg-white 
          focus:border-blue-600 
          focus:outline-none' 
          placeholder='Search for a city...'></input>
          <TimezoneInput getTimezoneSelection={getTimezoneSelection} resetTimezones={resetTimezones} />
      </div>
      <div className='basis-3/4 p-y-4'>
        <h1 className='underline mt-4 mb-6 font-light leading-tight text-5xl text-blue-700'>National Weather Service Active Stations</h1>
        { filteredArr === undefined || filteredArr.length === 0 ? 
        <StationGrid stations={stations} loading={loading} currentPage={currentPage} setCurrentPage={setCurrentPage} /> : 
        <StationGrid stations={filteredArr} loading={loading} currentPage={currentPage}  setCurrentPage={setCurrentPage} />}
      </div>
    </div>
  );
}

export default App;
