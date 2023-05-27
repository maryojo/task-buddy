import React from 'react'

const PrimaryButton = ({text, onClick, type}) => {
  return (
    <button onClick={onClick} className='bg-primary text-gray-900 font-semibold py-3 rounded-md' type={type}>{text}</button>
  )
}

export default PrimaryButton