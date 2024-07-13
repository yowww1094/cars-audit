import React, { useEffect, useState } from 'react'

function Header() {
  const [time, setTime] = useState(new Date());

  useEffect(()=>{
    setTime(new Date())
  },[])
  return (
    <div className='bg-white h-16 px-4 items-center justify-between flex overflow-hidden sticky top-0'>
        
    </div>
  )
}

export default Header