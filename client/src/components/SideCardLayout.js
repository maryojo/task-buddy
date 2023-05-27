import React from 'react'

const SideCardLayout = ({icon, title}) => {
  return (
    <div className='flex'>
      <div>
        {icon}
      </div>
      <div>{title}</div>
    </div>
  )
}

export default SideCardLayout