import React from 'react'
import SideCard from '../components/SideCard'
import ProfileCard from './ProfileCard'

const Sidebar = () => {
  return (
    <div className='w-3/12 bg-slate-300 rounded-md'>
      <ProfileCard/>
      <SideCard/>
    </div>
  )
}

export default Sidebar