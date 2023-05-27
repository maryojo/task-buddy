import React from 'react'
import ProfileCard from './ProfileCard'
import LogoutButton from './LogoutButton'

const userData = JSON.parse(sessionStorage.getItem('userData'));


const Sidebar = ({setTasks, tasks}) => {
  return (
    <div className='h-screen w-3/12 bg-zinc-100 rounded-md flex flex-col justify-between p-3'>
      <ProfileCard name={userData.name} email={userData.email}/>
          All Tasks
      <LogoutButton setTasks={setTasks} tasks={tasks}/>
    </div>
  )
}

export default Sidebar