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
      lg:py-4 
      flex 
      flex-col 
      justify-around 
      md:p-2 
      rounded 
      overflow-hidden 
      shadow-lg 
      hover:border-blue-300 
      border-transparent 
      border-2'>
        <h2 className='xl:text-lg md:text-base text-sm xl:mt-2 md:mb-2 xl:mb-6'>{station.properties.name} ({station.properties.id}) </h2>
        <p className='xl:my-2 lg:my-1 md:text-sm lg:text-base text-xs my-1'>Elevation: {Math.round(station.properties.elevation.value)} ft.</p>
        <p onClick={showMapClick} className='cursor-pointer hover:underline xl:my-2 md:text-sm lg:text-base text-xs'>{latitude}{'\u00b0'} N , {longitude * -1}{'\u00b0'} W</p>
    </div>
  )
}

export default RadarStation