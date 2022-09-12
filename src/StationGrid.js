import React from 'react';
import RadarStation from './RadarStation';

function StationGrid({stations, loading}) {
    if (loading) {
        return <h3 className='text-xl'>Loading...</h3>
    }

    return (
        <div className='h-5/6 mt-4 grid grid-cols-3'>
            {stations.map( item => {
                return <RadarStation station={item} key={item.id} />
            })}
        </div>
    
  )
}

export default StationGrid