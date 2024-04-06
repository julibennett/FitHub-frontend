import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Add from '../components/Add';

const ClassShow = () => {
  const { id } = useParams();
  const [workoutClass, setWorkoutClass] = useState(null);

  useEffect(() => {
    
    const URL = `http://localhost:4000/class/${id}`;

    const fetchClassDetails = async () => {
      try {
        const response = await fetch(URL)
        const data = await response.json()
        setWorkoutClass(data.data)
      } catch (error) {
        console.error('Failed to fetch class details:', error)
      }
    };

    fetchClassDetails()
  }, [id])

  const navigate = useNavigate()
  const resURL = "http://localhost:4000/reservation/"

  const createReservation = async(workoutClass) => {
    console.log(workoutClass)
    //push workoutClass into an array here and pass the array into the post method to backend 
    const createRes = await fetch(resURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(workoutClass)
    })
    //navigate("/reservation")
    console.log(createRes)
  }

  const addClass = (e) => {
    e.preventDefault()
    createReservation(workoutClass)
  }

  if (!workoutClass) return <div>Loading...</div>

  return (
    <div className="container mx-auto p-4">
      <h1>{workoutClass.typeOfClass}</h1>
      <p>{workoutClass.location}</p>
      <p>{workoutClass.time}</p>
      <p>{workoutClass.studio}</p>
      <p>{workoutClass.instructor}</p>
      {workoutClass.review && workoutClass.review.map((review, index) => (
      <p key={index}>{review}</p>
    ))}
    <Add addClass={addClass}/>
    </div>
  )
}

export default ClassShow