import React from 'react'
import Avatar from 'react-avatar';

const ProfileCard = ({name, email}) => {
  return (
    <section className='flex gap-3 items-center p-3 rounded-md bg-[#222222]'>
      <div className=''>
        <Avatar name={name} size="40" round className='w-full'/>
      </div>
      <div className='w-3/5'>
        <p className='text-sm'>{name}</p>
        <p className='text-xs truncate'>{email}</p>
      </div>
    </section>
  )
}

export default ProfileCard