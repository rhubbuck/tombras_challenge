import React from 'react'

function RadarStation({station}) {
// Set latitude and longitude of each station
    let latitude = station.geometry.coordinates[1];
    let longitude = station.geometry.coordinates[0];
//Link to google maps when coordinates clicked
    const showMapClick = () => {
        window.open("https://maps.google.com?q=" + latitude + "," + longitude );
      };

  return (
    <div className=' 
      py-4 
      flex 
      flex-col 
      justify-around 
      p-2 rounded 
      overflow-hidden 
      shadow-lg 
      hover:border-blue-300 
      border-transparent 
      border-2'>
        <h2 className='text-lg mt-2 mb-6'>{station.properties.name} ({station.properties.id}) </h2>
        <p className='my-2'>Elevation: {Math.round(station.properties.elevation.value)} ft.</p>
        <p onClick={showMapClick} className='cursor-pointer hover:underline my-2'>{latitude}{'\u00b0'} N , {longitude * -1}{'\u00b0'} W</p>
    </div>
  )
}

export default RadarStation