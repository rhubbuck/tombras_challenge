import React from 'react'

function TimezoneInput() {
  return (
    <div className='mt-6'>
        <select className='cursor-pointer border-2'>
            <option value="0" className='cursor-pointer'>All timezones</option>
            <option value="1" className='cursor-pointer'>GMT</option>
        </select>
</div>
  )
}

export default TimezoneInput

