
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
  const URL = process.env.URL

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
    if(response.status !== 200 || !data.token){
        return data
    } else {
        console.log(data)
    }
    localStorage.setItem("authToken", data.token)
    localStorage.setItem("userId", data.id)
    localStorage.setItem("username", user.username)

    console.log(user)
    console.log(data.id)
    
    setUser({
      username: user.username,
      _id: data.id 
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
  const resURL = `${URL}api/reservation/`;

  const [reservations, setReservations] = useState([]);  // Note the variable name change for clarity

//   const getReservations = async () => {
  
//   try {
//     const response = await fetch(resURL);
//     if (!response.ok) {
//       console.error('Response Status:', response.status);
//       throw new Error(`Network response was not ok, status: ${response.status}`);
//     }
//     const reservationsData = await response.json();
//     console.log("Fetched Reservations:", reservationsData.data); 
//     const fullReservations = await Promise.all(reservationsData.data.map(async (reservation) => {
//       const classResponse = await fetch(`http://localhost:4000/api/class/${reservation.classId._id}`);
//       if (!classResponse.ok) {
//         console.error('Class Fetch Status:', classResponse.status);
//         throw new Error(`Failed to fetch class details, status: ${classResponse.status}`);
//       }
//       const classData = await classResponse.json();
//       return {...reservation, classDetails: classData};
//     }));
//     console.log("Full Reservations with Class Details:", fullReservations);
//     setReservations(fullReservations);
//   } catch (error) {
//     console.error('Fetch error:', error.message);
//   }
// };

const getReservations = async () => {
  try {
      const response = await fetch(resURL);
      if (!response.ok) {
          console.error('Response Status:', response.status);
          throw new Error(`Network response was not ok, status: ${response.status}`);
      }
      const reservationsData = await response.json();
      console.log("Fetched Reservations:", reservationsData.data); 
      setReservations(reservationsData.data);
  } catch (error) {
      console.error('Fetch error:', error.message);
  }
};

    
    
    // console.log(classData)
    const createReservation = async (reservationInfo) => {
      if (!reservationInfo || !reservationInfo.userId || !reservationInfo.classId) {
        console.log("Reservation Info:", reservationInfo);
        console.error("User or Class Data is not available.");
        return;
      }
    
      const reservationData = {
        userId: reservationInfo.userId,
        classId: reservationInfo.classId, 
        attending: reservationInfo.attending || true  
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
          throw new Error('Failed to create reservation');
        }
        navigate("/reservation");
        getReservations();
      } catch (error) {
        console.error('Error in adding reservation:', error);
      }
    }
    
  
    



    const deleteReservation = async (id) => {
      const response = await fetch(`${resURL}${id}`, {
        method: "DELETE"
      })
      if (response.ok) {
        getReservations()
        console.log('Reservation Deleted')
      } else {
       
        const error = await response.json()
        console.error('Error deleting reservation:', error.message)
      }
    }
    
  

    useEffect(() => {
        getReservations()
    }, []);

  return (
    <div className="App app-container">
      
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
        <Route path="/reservation" element={<Reservations reservations={reservations} deleteReservation={deleteReservation}/>}/>

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
