import React from 'react'

function RadarStation({station}) {

    let latitude = station.geometry.coordinates[1];
    let longitude = station.geometry.coordinates[0];

    const showMapClick = () => {
        window.open("https://maps.google.com?q=" + latitude + "," + longitude );
      };

  return (
    <div className='border-2 py-10 flex flex-col justify-around p-2'>
        <h2 className='text-lg'>{station.properties.name} ({station.properties.id}) </h2>

        <p>Elevation: {Math.round(station.properties.elevation.value)} ft.</p>
        <p>Timezone: {station.properties.timeZone}</p>
        <p onClick={showMapClick} className='cursor-pointer hover:underline'>{latitude}{'\u00b0'} N , {longitude * -1}{'\u00b0'} W</p>
    </div>
  )
}

export default RadarStation