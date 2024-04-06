import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({isLoggedIn, handleLogout, user}) => {
  console.log(isLoggedIn)

  const loggedInLink = (
    <div>
        {user && <span>Welcome, {user.username}! </span>}
        <button onClick={handleLogout}>Logout</button>     
    </div>
)

  const noAuthLinks = (
    <div>
        <Link to="/signup">Signup </Link>
        <Link to="/login">Login </Link>
    </div>
  )

  return (
    <nav>
      <div className=''>
        <Link to='/' className='navTitle'>FitHub </Link>
        <Link to='/' className='navLinks'>Home  </Link>
        <Link to='/reservation' className='navLinks'>Reservations </Link>
      </div>
      <div>
        {isLoggedIn ? loggedInLink : noAuthLinks}
      </div>
    </nav>
  )
}

export default Header