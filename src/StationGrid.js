import React from 'react';
import RadarStation from './RadarStation';

function StationGrid({stations, loading}) {
    if (loading) {
        return <h3>Loading...</h3>
    }

    return (
        <div className='bg-blue-300 h-full grid grid-cols-3'>
            {stations.map( item => {
                return <RadarStation station={item} key={item.id} />
            })}
        </div>
    
  )
}

export default StationGrid