import React from 'react'
import { Link } from 'react-router-dom'
import { UseAppContext } from '../../context/AppContext'

const NavbarOwner = () => {

    const { user } = UseAppContext();

  return (
    <div className='relative flex items-center justify-between border-b border-borderColor bg-light px-6 py-4 text-gray-600 transition-all md:px-10'>
        <Link to='/' className='select-none'>
            <span className='brand-font text-2xl font-bold text-gray-800'>Aurevia</span>
        </Link>
        <p className='text-sm md:text-base'>
            Welcome, <span className='font-medium text-gray-800'>{user?.name || "Owner"}</span>
        </p>

      
    </div>
  )
}

export default NavbarOwner
