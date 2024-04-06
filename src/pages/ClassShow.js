import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Add from '../components/Add';

const ClassShow = (props) => {
  const navigate = useNavigate()
  const { id } = useParams();
  const [workoutClass, setWorkoutClass] = useState(null);
  const [form, setForm] = useState(null)

  //Show Classes
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

  if (!workoutClass) return <div>Loading...</div>

  //Add Reservation
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
    navigate("/reservation")
    console.log(createRes)
  }

  const addClass = (e) => {
    e.preventDefault()
    createReservation(workoutClass)
  }

  //Add Reviews
  const handleChange = (e) => {
    console.log("typing review...")
    setForm({...form, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    console.log("adding review")
    e.preventDefault()
    props.createReview(form)
  }

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

      <h2>Reviews</h2>
      <h4>Add a Review!</h4>
      <input style={{width: "300px", height: "200px"}}
        type="text"
        name="comments"
        placeholder="Let us know what you think!"
        onChange={handleChange}
      />
      <input type="button" value="Submit" onClick={handleSubmit}/>
      

    </div>
  )
}

export default ClassShow

/*
  const loaded = (props) => {
    return props.workoutClass.reviews.map((review) => {
      return(
        <div key={review._id}>
          <p>{review.comments}</p>
        </div>
      )
    })
  }

    if (reviews.length) {
        loaded()
      } else {
        <h2>No reviews yet.</h2>
      }
  */
