import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({isLoggedIn, handleLogout, user}) => {
  console.log(isLoggedIn)

  const loggedInLink = (
    <div className='flex items-center space-x-4'>
        {user && <span>Welcome, {user.username}! </span>}
        <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700">Logout</button>     
    </div>
)

  const noAuthLinks = (
    <div className="fflex items-center justify-center space-x-4 w-full">
        <Link to="/signup" className="text-blue-500 hover:text-blue-700 ">Signup </Link>
        <Link to="/login" className="text-blue-500 hover:text-blue-700">Login </Link>
    </div>
  )

  return (
    <nav className="bg-purple-800 text-white p-4 sticky top-0 z-50">
      <div cclassName="container mx-auto flex justify-between items-center">
        <Link to='/' className='navTitle text-xl font-bold text-white hover:text-gray-300' >FitHub </Link>
        <Link to='/' className='navLinks hover:text-gray-300'>Home  </Link>
        <Link to='/reservation' className='navLinks hover:text-gray-300'>Reservations </Link>
      </div>
      <div>
        {isLoggedIn ? loggedInLink : noAuthLinks}
      </div>
    </nav>
  )
}

export default Header