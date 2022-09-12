import React from 'react';
import RadarStation from './RadarStation';

function StationGrid({stations, loading, searchTerm}) {
    if (loading) {
        return <h3 className='text-xl'>Loading...</h3>
    }

    return (
        <div className='h-5/6 mt-4 grid grid-cols-3'>
        <p>{searchTerm}</p>
            {stations.filter(station => station.properties.name.toLowerCase().includes(searchTerm)).map( item => {
                return <RadarStation station={item} key={item.id} />
            })}
        </div>
    
  )
}

export default StationGrid