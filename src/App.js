
import './App.css';
import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from "react-router-dom"
import Reservation from './components/Reservation'
import Home from './pages/Home';
import ClassShow from './pages/ClassShow';
import Login from './components/Login';
import Signup from './components/Signup';
import Header from './components/Header';
// import Profile from './pages/Profile';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const[user, setUser] = useState(null)
  const navigate = useNavigate()
  const URL = 'http://localhost:4000/api/'

  const handleSignUp = async(user) => {
    const response = await fetch(URL + 'auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    const data = await response.json()
    console.log(data)
    navigate('/login')
  }

  const handleLogin = async(user) => {
    const response = await fetch(URL + 'auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    const data = await response.json()
    if(response.status !== 200){
      console.error('Login failed:', data)
      return
    }
    localStorage.setItem('authToken', data.token)
    setIsLoggedIn(true)
    await fetchUser(data.id)
    navigate('/')  
  }

  const handleLogout = () => {
    console.log("in handle log")
    localStorage.removeItem("authToken")
    setIsLoggedIn(false)
    navigate("/")
  }

  const fetchUser = async (id) => {
    // grab the token from local storage
    const token = localStorage.getItem("authToken")
    if (token) {
      const response = await fetch(URL + `user/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "authorization": token 
        }
      })
      const data = await response.json()
    //   console.log(data) //check for the data returned!
      setUser(data.data)
    } else {
      console.log("no token")
    }
  }
  
  useEffect(()=>{
    let token = localStorage.getItem("authToken")
    if(!token) {
      setIsLoggedIn(false) 
    } else {
      setIsLoggedIn(true) 
    }
  }, [])

  return (
    <div className="App">
      {/* <h1 className="text-3xl font-bold underline">
        FitHub
      </h1> */}
      <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} user={user}/>
      <Routes>
        
        {/* Class Routes below*/}
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<ClassShow />}/>

        {/* Login/Signup Routes below */}
        <Route path='/signup' element={<Signup handleSignUp={handleSignUp}/>}/>
        <Route path='/login' element={<Login handleLogin={handleLogin}/>}/>   

      </Routes>
      <Reservation />
    </div>
  );
}

export default App;
