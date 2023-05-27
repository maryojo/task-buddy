import React from 'react'
import ProfileCard from './ProfileCard'
import LogoutButton from './LogoutButton'

const userData = JSON.parse(sessionStorage.getItem('userData'));


const Sidebar = ({setTasks, tasks}) => {
  return (
    <div className='w-screen h-20 md:h-screen md:w-3/12 bg-[#383838] md:rounded-md flex flex-row md:flex-col justify-between p-3 fixed md:left-0 top-0'>
      <ProfileCard name={userData.name} email={userData.email}/>
      <LogoutButton setTasks={setTasks} tasks={tasks}/>
    </div>
  )
}

export default Sidebar