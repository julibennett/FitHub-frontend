import React from 'react'
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Edit from '../components/Edit'
import Delete from '../components/Delete'
import Add from '../components/Add'

const ClassShow = (props) => {

    const { id } = useParams();
    const navigate = useNavigate()

    const [workoutClass, setWorkoutClass] = useState(null);
    const [form, setForm] = useState(null);
    const [review, setReview] = useState(null)
    const token = localStorage.getItem("authToken")
    const userId = localStorage.getItem("userId")
    const username = localStorage.getItem("username")
    console.log(token)
    console.log(username)

    //Show Classes
    useEffect(() => {
      
      const URL = `http://localhost:4000/class/${id}`;
  
      const fetchClassDetails = async () => {
        try {
          const response = await fetch(URL)
          const data = await response.json()
          setWorkoutClass(data.data)
        } catch (error) {
          console.log('Failed to fetch class details:', error)
        }
      };
  
      fetchClassDetails()
    }, [id])

    const revURL = `http://localhost:4000/class/${id}`;

    useEffect(() => {
        const getReview = async() => {
        try {
            const response = await fetch(revURL)
            const data = await response.json()
            setReview(data.data)
        } catch (error) {
            console.log("Failed to fetch reviews")
        }
        }
        getReview()
    },[revURL])

    if (!workoutClass) return <div>Loading...</div>

    //Review Fetch Calls
    const createReview = async (form) => {
        const createdReview = await fetch(`http://localhost:4000/class/${id}/review`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": token
            },
            body: JSON.stringify(form)
        })
        navigate(`/class`)
    }

     //Add Reviews
    const handleChange = (e) => {
        console.log("typing review...")
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        console.log("adding review")
        e.preventDefault()
        createReview(form)
        navigate(`/class`)
    }  


  return (
    <div className="container mx-auto p-4 max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg p-8">
      <h1 className='coolFont text-2xl font-bold text-center mb-4'>{workoutClass.typeOfClass}</h1>
        <p className="mb-2"><span className="font-semibold">Location:</span> {workoutClass.location}</p>
        <p className="mb-2"><span className="font-semibold">Time:</span> {workoutClass.time}</p>
        <p className="mb-2"><span className="font-semibold">Studio:</span> {workoutClass.studio}</p>
        <p className="mb-2"><span className="font-semibold">Instructor:</span> {workoutClass.instructor}</p>
      <br></br>
      <h1 className='coolFont text-1xl font-bold text-center mb-4'>Reviews</h1>
        {workoutClass.review && workoutClass.review.length > 0 ? 
            workoutClass.review.map((rev, index) => (
                <React.Fragment key={index}>
                    <p className="mb-2 underline">{rev.username} says:</p>
                    <p className="mb-2">{rev.comments}</p>
                    <p className="mb-2">{rev.timestamps}</p>
                    {username == rev.username ? (
                      <>
                        <Edit reviewId={rev._id} comments={rev.comments} />
                        <Delete reviewId={rev._id} />
                      </>
                    ) : null}
                </React.Fragment>
        )) : 
        <p className="mb-2"><span className="font-semibold">No reviews yet.</span></p>
        }

        <br></br>

        <h1 className='coolFont text-1xl font-bold text-center mb-4'>Add a Review!</h1>
        <form onSubmit={handleSubmit}>
          <label>
            <input 
              type="text"
              name="username"
              placeholder="Enter username"
              onChange={handleChange}
            />
          </label>
          <br></br>
          <label>
            <input style={{width: "300px", height: "200px"}}
              type="text"
              name="comments"
              placeholder="Let us know what you think!"
              onChange={handleChange}
            />
          </label>
          <br></br>
          <button type="submit" className='text-1xl font-bold text-center mb-4'>Submit</button> 
        </form>

        <Add user={props.userId} createReservation={props.createReservation}/>

    </div>
  )
}

export default ClassShow
