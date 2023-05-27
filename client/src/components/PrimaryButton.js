import React from 'react'

const PrimaryButton = ({text, onClick, type, disabled}) => {
  return (
    <button onClick={onClick} className='bg-primary text-gray-900 font-semibold py-3 rounded-md disabled:bg-zinc-700 disabled:text-gray-400 hover:bg-[#e0c171]' type={type} disabled={disabled}>{text}</button>
  )
}

export default PrimaryButton