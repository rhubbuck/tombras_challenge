import './App.css';
import './index.css'
import { useEffect, useState } from 'react';
import RadarStation from './RadarStation';
import StationGrid from './StationGrid';
import Pagination from './Pagination';
import TimezoneInput from './TimezoneInput';

function App() {

const [stations, setStations] = useState([]);
const [loading, setLoading] = useState(false);
const [currentPage, setCurrentPage] = useState(1);
const [postsPerPage, setPostsPerPage] = useState(9);
const [userLatitude, setUserLatitude] = useState(null);
const [userLongitude, setUserLongitude] = useState(null);
const [timezone, setTimezone] = useState('');

//Get current station segment
const indexOfLastStation = currentPage * postsPerPage;
const indexOfFirstStation = indexOfLastStation - postsPerPage;
const currentStations = stations.slice(indexOfFirstStation, indexOfLastStation);

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
  const fetchWeatherData = async () => {
      const url = 'https://api.weather.gov/radar/stations';
      
      try {
        setLoading(true);
        const res = await fetch(url);
        const data = await res.json();
        let apiData = data.features;
        console.log(apiData)
        setStations(apiData);
        let finalArray = sortArrayByDistance(apiData);
        setStations(finalArray);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchWeatherData();
}, [])


console.log(stations);


// let x = sortArrayByDistance(stations);
// console.log(x)


// let testArray = stations.map(station => {
//   let distance =  getDistanceFromLatLonInKm(userLatitude, userLongitude, station.geometry.coordinates[1], station.geometry.coordinates[0]);
//   return {...station, distance: distance};
// });
// let sorted = testArray.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
// console.log(sorted)
///////////////////////////////////////////////////////////////////////
  return (
    <div className="App flex w-full h-full">
      <div className='bg-red-600 basis-1/4 h-screen'>
          <TimezoneInput />
          <button className='h-8 fixed top-10'>test userlocation</button>
      </div>
      <div className='basis-3/4'>
        <StationGrid stations={currentStations} loading={loading} />
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
    </div>
  );
}

export default App;
