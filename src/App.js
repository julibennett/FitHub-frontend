
import './App.css';
import { useEffect, useState } from 'react';
import { Route, Routes, useParams, useNavigate } from "react-router-dom"
import Reservations from './pages/Reservations';
import Home from './pages/Home';
import ClassShow from './pages/ClassShow';
import Login from './components/Login';
import Signup from './components/Signup';
import Header from './components/Header';
// import Profile from './pages/Profile';

function App() {
  //Login + Signup + Auth
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

  //Reviews
  const { id } = useParams();

  const [review, setReview] = useState(null)

  const revURL = `http://localhost:4000/class/${id}/`

  const getReview = async() => {
      const response = await fetch(revURL)
      const data = await response.json()
      setReview(data.data)
  }

  const createReview = async (review) => {
      const createdReview = await fetch(revURL + review, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(review)
      })
      getReview()
      console.log(createdReview)
  }

  const updateReview = async (review, id) => {
      await fetch(revURL + review, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify()
      })
      getReview()
  }

  const deleteReview = async (review, id) => {
      await fetch(revURL + review, {
          method: "DELETE",
      })
      getReview()
  }

  useEffect(() => {
      getReview()
  }, [])

  //Reservation
  const resURL = "http://localhost:4000/reservation/"

    const [reservation, setReservation] = useState(null)

    const getReservation = async() => {
        const response = await fetch(resURL)
        const data = await response.json()
        setReservation(data.data)
        console.log(data.data)
    }

    const createReservation = async(classData) => {
        console.log("creating res")
        const createdRes = await fetch(resURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(classData)
        })
        navigate("/reservation")
        getReservation()
        console.log(createdRes)
    }

    const deleteReservation = async(id) => {
        await fetch(resURL + id, {
            method: "DELETE"
        })
        getReservation()
    }

    useEffect(() => {
        getReservation()
    }, []);

  return (
    <div className="App">
      {/* <h1 className="text-3xl font-bold underline">
        FitHub
      </h1> */}
      <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} user={user}/>
      <Routes>
        
        {/* Class Routes below*/}
        <Route path="/class" element={<Home />} />
        <Route path="/class/:id" element={<ClassShow />}/>

        {/* Login/Signup Routes below */}
        <Route path='/signup' element={<Signup handleSignUp={handleSignUp}/>}/>
        <Route path='/login' element={<Login handleLogin={handleLogin}/>}/>  

        {/*Review Route*/}
        <Route path="/class/:id" element={<ClassShow review={review} createReview={createReview} updateReview={updateReview} deleteReview={deleteReview}/>}/> 

        {/*Reservation Route*/}
        <Route path="/reservation" element={<Reservations reservation={reservation} createReservation={createReservation} deleteReservation={deleteReservation}/>}/>

      </Routes>

    </div>
  );
}

export default App;
