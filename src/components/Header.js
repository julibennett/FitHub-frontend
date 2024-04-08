import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({isLoggedIn, handleLogout, user}) => {
  console.log(isLoggedIn)

  const loggedInLink = (
    
    <div className='flex items-center space-x-4'>
        {user && <span>Welcome, {user.username}! </span>}
        {/* <button onClick={handleLogout}>Logout</button>      */}
        <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 ">Logout</button>     
    </div>

)

  const noAuthLinks = (
    <div className='flex items-center justify-center space-x-4'>
        <Link to="/signup" className='m-3 coolFont hover:text-gray-300'>Signup </Link>
        <Link to="/login" className='m-3 coolFont hover:text-gray-300'>Login </Link>
    </div>
  )

  return (
    <nav className="bg-purple-800 text-white p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex-1 flex justify-center items-center">
          <Link to='/class' className='text-xl font-bold hover:text-gray-300 navTitle'>FitHub</Link>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <Link to='/class' className='hover:text-gray-300 navLinks'>Home </Link>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <Link to='/reservation' className='hover:text-gray-300 navLinks'>Reservations </Link>
        </div>
        <div className="flex-1 flex justify-center items-center">
          {isLoggedIn ? loggedInLink : noAuthLinks}
        </div>
      </div>
    </nav>
  )
}

export default Header