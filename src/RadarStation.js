import React from 'react'

function RadarStation({station}) {
  return (
    <div>
        <p>{station.properties.name}</p>
        <p>{station.properties.id}</p>
        <p>{station.properties.elevation.value}</p>
        <p>{station.geometry.coordinates[1]} , {station.geometry.coordinates[0]}</p>
    </div>
  )
}

export default RadarStation