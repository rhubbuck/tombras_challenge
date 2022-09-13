import React, { useState } from 'react';
import RadarStation from './RadarStation';
import Pagination from './Pagination';

function StationGrid({stations, loading, searchTerm}) {
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(9);

    if (loading) {
        return <h3 className='text-xl'>Loading...</h3>
    }
    
    //Get current station segment
    const indexOfLastStation = currentPage * postsPerPage;
    const indexOfFirstStation = indexOfLastStation - postsPerPage;
    const currentStations = stations.slice(indexOfFirstStation, indexOfLastStation);

    return (
        <div className='h-5/6'>
            <div className='mt-8 grid grid-cols-3 grid-rows-3'>
                {currentStations.filter(station => station.properties.name.toLowerCase().includes(searchTerm)).map( item => {
                    return <RadarStation station={item} key={item.id} />
            })}
            </div>
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} postsPerPage={postsPerPage} totalPosts={stations.length} />
        </div>
        
        
    )
}

export default StationGrid