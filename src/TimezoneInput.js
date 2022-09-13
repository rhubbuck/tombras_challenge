import React from 'react'

function TimezoneInput( { getTimezoneSelection, resetTimezones }) {

  const handleGetTimezone = (e) => {
    if (e.target.value === "All") {
      resetTimezones()
    } else {
    getTimezoneSelection(e.target.value)}
}

  return (
    <div className='mt-6'>
        <select onChange={handleGetTimezone} className='cursor-pointer border-2'>
            <option value="All" className='cursor-pointer'>All timezones</option>
            <option value="America/Anchorage" className='cursor-pointer'>Alaska Standard Time</option>
            <option value="America/Puerto_Rico" className='cursor-pointer'>Atlantic Standard Time</option>
            <option value="America/Chicago" className='cursor-pointer'>Central Standard Time</option>
            <option value="Pacific/Guam" className='cursor-pointer'>Chamorro Standard Time</option>
            <option value="America/New_York" className='cursor-pointer'>Eastern Standard Time</option>
            <option value="Pacific/Honolulu" className='cursor-pointer'>Hawaii-Aleutian Standard Time</option>
            <option value="Asia/Tokyo" className='cursor-pointer'>Japan Standard Time</option>
            <option value="Asia/Seoul" className='cursor-pointer'>Korea Standard Time</option>
            <option value="America/Denver" className='cursor-pointer'>Mountain Standard Time</option>
            <option value="America/Los_Angeles" className='cursor-pointer'>Pacific Standard Time</option>
        </select>
    </div>
  )
}

export default TimezoneInput