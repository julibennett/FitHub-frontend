
import './App.css';
import { useEffect, useState } from 'react';
import { Route, Routes, useParams, useNavigate } from "react-router-dom"
import Login from './components/Login';
import Signup from './components/Signup';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ClassShow from './pages/ClassShow';
import Reservations from './pages/Reservations';

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

  // const handleLogin = async(user) => {
  //   const response = await fetch(URL + 'auth/login', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(user)
  //   })
  //   const data = await response.json()
  //   if(response.status !== 200 || !data.token){
  //   return data
  //   } else {
  //     console.log(data)
  //   }
  //   localStorage.setItem("authToken", data.token)
  //   localStorage.setItem("userId", data.userId)
  //   localStorage.setItem("username", user.username)

  //   console.log(user)
  //   console.log(data.userId)
  //   setIsLoggedIn(true)
  //   setUser(user.username)

  //   navigate("/class")  
  // }

  const handleLogin = async(user) => {
    const response = await fetch(URL + 'auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    const data = await response.json()
    if(response.status !== 200 || !data.token){
        return data
    } else {
        console.log(data)
    }
    localStorage.setItem("authToken", data.token)
    localStorage.setItem("userId", data.userId)
    localStorage.setItem("username", user.username)

    console.log(user)
    console.log(data.userId)
    
    // Set user in state to include more details
    setUser({
      username: user.username,
      _id: data.userId // Assuming 'data.userId' is the correct ID field returned from your backend
    })

    setIsLoggedIn(true)
    navigate("/class")  
}


  const handleLogout = () => {
    console.log("in handle log")
    localStorage.removeItem("authToken")
    localStorage.removeItem("userId")
    localStorage.removeItem("username")
    setIsLoggedIn(false)
    navigate("/class")
  }
  
  useEffect(()=>{
    let token = localStorage.getItem("authToken")
    if(!token) {
      setIsLoggedIn(false) 
    } else {
      setIsLoggedIn(true) 
    }
  }, [])

  //Reservation
  const resURL = "http://localhost:4000/api/reservation/"

    const [reservation, setReservation] = useState(null)

    const getReservation = async () => {
      try {
          const response = await fetch(resURL)
          if (!response.ok) {
              throw new Error('Network response was not ok')
          }
          const data = await response.json()
          setReservation(data.data)
      } catch (error) {
          console.error('Fetch error:', error.message)
      }
  };
  

    // const createReservation = async(classData) => {
    //     console.log("creating res")
    //     const createdRes = await fetch(resURL, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(classData)
    //     })
    //     navigate("/reservation")
    //     getReservation()
    //     console.log(createdRes)
    // }

    const createReservation = async (classData) => {
      if (!user || !classData) {
        console.log("User:", user);
        console.log("Class Data:", classData)

        console.error("User or Class Data is not available.")
        return
      }
    
      const reservationData = {
        userId: user._id,
        classId: classData._id, 
        attending: true
      };
    
      try {
        const createdRes = await fetch(resURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reservationData)
        });
        if (!createdRes.ok) {
          throw new Error('Failed to create reservation')
        }
        navigate("/reservation")
        getReservation();
      } catch (error) {
        console.error('Error in adding reservation:', error)
      }
    }
  
    

    // const deleteReservation = async(id) => {
    //     await fetch(resURL + id, {
    //         method: "DELETE"
    //     })
    //     getReservation()
    // }

    const deleteReservation = async (id) => {
      const response = await fetch(`${resURL}${id}`, {
        method: "DELETE"
      })
      if (response.ok) {
        getReservation()
      } else {
       
        const error = await response.json()
        console.error('Error deleting reservation:', error.message)
      }
    }
    
  

    useEffect(() => {
        getReservation()
    }, []);

  return (
    <div className="App">
      
      <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes>

        {/* Login/Signup Routes below */}
        <Route path='/signup' element={<Signup handleSignUp={handleSignUp}/>}/>
        <Route path='/login' element={<Login handleLogin={handleLogin}/>}/>  

        {/* Class Routes below*/}
        <Route path="/class" element={<Home />}/>
        <Route path="/class/:id" element={<ClassShow isLoggedIn={isLoggedIn} createReservation = {createReservation}/>}/>
        <Route path="/class/:id/review/:reviewId" element={<ClassShow isLoggedIn={isLoggedIn} />}/>

        {/*Reservation Route*/}
        <Route path="/reservation" element={<Reservations reservation={reservation} deleteReservation={deleteReservation}/>}/>

      </Routes>
      <Footer />
    </div>
  );
}

export default App;

/*
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
*/
