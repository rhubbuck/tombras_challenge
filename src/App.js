import './App.css';
import './index.css'
import { useEffect, useState } from 'react';
import RadarStation from './RadarStation';
import StationGrid from './StationGrid';
import Pagination from './Pagination';

function App() {

const [stations, setStations] = useState([]);
const [loading, setLoading] = useState(false);
const [currentPage, setCurrentPage] = useState(1);
const [postsPerPage, setPostsPerPage] = useState(9);

useEffect(() => {
  const fetchWeatherData = async () => {
      const url = 'https://api.weather.gov/radar/stations';
      
      try {
        setLoading(true);
        const res = await fetch(url);
        const data = await res.json();
        setStations(data.features);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchWeatherData();
}, [])

console.log(stations);

//Get current station segment
const indexOfLastStation = currentPage * postsPerPage;
const indexOfFirstStation = indexOfLastStation - postsPerPage;
const currentStations = stations.slice(indexOfFirstStation, indexOfLastStation);

  return (
    <div className="App flex w-full h-full">
      <div className='bg-red-600 basis-1/4 h-screen'>
          toolbar
      </div>
      <div className='basis-3/4'>
        <StationGrid stations={currentStations} loading={loading} />
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
    </div>
  );
}

export default App;
