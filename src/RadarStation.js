import React from 'react'

function RadarStation({station}) {

    let latitude = station.geometry.coordinates[1];
    let longitude = station.geometry.coordinates[0];

    const showMapClick = () => {
        window.open("https://maps.google.com?q=" + latitude + "," + longitude );
      };

  return (
    <div>
        <p>{station.properties.name}</p>
        <p>{station.properties.id}</p>
        <p>{station.properties.elevation.value}</p>
        <p>{station.properties.timeZone}</p>
        <p onClick={showMapClick} className='cursor-pointer hover:underline'>{latitude}{'\u00b0'} N , {longitude * -1}{'\u00b0'} W</p>
    </div>
  )
}

export default RadarStation