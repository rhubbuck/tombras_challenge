import React, { useState } from 'react';
import RadarStation from './RadarStation';
import Pagination from './Pagination';

function StationGrid({stations, loading, currentPage, setCurrentPage }) {
    const [postsPerPage, setPostsPerPage] = useState(9);

    if (loading) {
        return <h3 className='text-xl'>Loading...</h3>
    }
    
    //Get current station segment to display in pagination
    const indexOfLastStation = currentPage * postsPerPage;
    const indexOfFirstStation = indexOfLastStation - postsPerPage;
    const currentStations = stations.slice(indexOfFirstStation, indexOfLastStation);

    return (
        <div className='lg:h-5/6 h-3/5'>
            <div className='mt-4 grid grid-cols-3 grid-rows-3'>
                {currentStations.map( item => {
                    return <RadarStation station={item} key={item.id} />
            })}
            </div>
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} postsPerPage={postsPerPage} totalPosts={stations.length} />
        </div>
        
        
    )
}

export default StationGrid