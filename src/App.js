import './App.css';
import './index.css'
import { useEffect, useState, useRef } from 'react';
import StationGrid from './StationGrid';
import TimezoneInput from './TimezoneInput';
import Fuse from 'fuse.js'

function App() {

const [stations, setStations] = useState([]);
const [apiStations, setApiStations] = useState([]);
const [loading, setLoading] = useState(false);
const [currentPage, setCurrentPage] = useState(1);
const [postsPerPage, setPostsPerPage] = useState(9);
const [userLatitude, setUserLatitude] = useState(null);
const [userLongitude, setUserLongitude] = useState(null);
const [timezone, setTimezone] = useState('');
const [searchTerm, setSearchTerm] = useState('');
const [filteredArr, setFilteredArr] = useState([]);

const inputRef = useRef(null);

var tzlookup = require("tz-lookup");

//Get current station segment
const indexOfLastStation = currentPage * postsPerPage;
const indexOfFirstStation = indexOfLastStation - postsPerPage;


//Get user location
const successCallback = (position) => {
  let userPosition = position;
  setUserLatitude(userPosition.coords.latitude);
  setUserLongitude(userPosition.coords.longitude);
 
};

const errorCallback = (error) => {
  console.log(error);
};

navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
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

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

const sortArrayByDistance = function(arr) {
  let arrayWithDistance = arr.map(station => {
    let distance =  getDistanceFromLatLonInKm(userLatitude, userLongitude, station.geometry.coordinates[1], station.geometry.coordinates[0]);
    return {...station, distance: distance};
  });
  let sorted = arrayWithDistance.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
  return sorted;
}

useEffect(() => {
  const fetchApiData = async () => {
      const url = 'https://api.weather.gov/radar/stations';
      
      try {
        setLoading(true);
        const res = await fetch(url);
        const data = await res.json();
        let apiData = data.features;
        setStations(apiData);
        let finalArray = sortArrayByDistance(apiData);
        setStations(finalArray);
        let xArray = finalArray.map(item => {
          let lat = item.geometry.coordinates[1];
          let long = item.geometry.coordinates[0];
          let timezone = tzlookup(lat, long)
          return {...item, timezone: timezone}
        })
        setStations(xArray)
        setApiStations(xArray)
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  fetchApiData();
}, []);

const onChangeFunction = (e) => {

  setSearchTerm(e.target.value);
  console.log(searchTerm);
  console.log(inputRef.current.value)
  let term = inputRef.current.value;

  const options = {
    includeScore: true,
    keys: ['properties.name']
  }
  
  const fuse = new Fuse(stations, options)
  
  const result = fuse.search(term)
  const resultTwo = result.map(item => {
    return item.item
  })
  console.log(stations.map(item => {
    return item.timezone
  }))

  setFilteredArr(resultTwo);
}

const getTimezoneSelection = (str) => {
  setStations(apiStations)
    setTimezone(str)
}

useEffect ( () => {
  console.log(timezone);
  let timezoneStations = stations.filter( item => {
    return item.timezone === timezone
  })
  console.log(timezoneStations)
  setStations(timezoneStations)
  setFilteredArr(timezoneStations)
}, [timezone])

const resetTimezones = () => {
  setStations(apiStations)
}

  return (
    <div className="App flex w-full h-full">
      <div className='basis-1/4 h-screen border-r-black border-r-2'>
          <TimezoneInput getTimezoneSelection={getTimezoneSelection} resetTimezones={resetTimezones} />
          <input type="text" ref={inputRef} onChange={onChangeFunction} className='border-2' placeholder='Search for a city...'></input>
      </div>
      <div className='basis-3/4 p-y-4'>
        <h1 className='text-2xl underline mb-4'>National Weather Service Active Stations</h1>
        { filteredArr === undefined || filteredArr.length === 0 ? 
        <StationGrid stations={stations} loading={loading} searchTerm={searchTerm} /> : 
        <StationGrid stations={filteredArr} loading={loading} searchTerm={searchTerm} />}
      </div>
    </div>
  );
}

export default App;
