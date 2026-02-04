import React from 'react'

const Title = ({ title, subtitle, align }) => {
  return (
        <div className={`flex flex-col justify-center items-center text-center ${align  === "left" && "md:items-start md:justify-start md:text-left"}`}>
            <h1 className='font-semibold text-4x1 md: text-[40px]'>{title}</h1>
            <p className='text-gray-600 mt-2'>{subtitle}</p>
        </div>
    )
}

export default Title
