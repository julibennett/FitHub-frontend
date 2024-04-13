import React from 'react'
import { useParams, useNavigate } from "react-router-dom"

const Delete = (reviewId) => {
    const navigate = useNavigate()
    const { id } = useParams()

    //console.log(id)
    //console.log(reviewId.reviewId)
    const reviewid = reviewId.reviewId
    const token = localStorage.getItem("authToken")

    const deleteReview = async () => {
        console.log("deleting review")
        await fetch(`http://localhost:4000/api/class/${id}/review/${reviewid}`, {
            method: "DELETE",
            headers: {
                "authorization": token 
            }
        })
    }

    const removeReview = (e) => {
        e.preventDefault()
        deleteReview(reviewid)
        navigate(`/class`)
      } 

  return (
    <div>
        <input type="button" value="Delete" onClick={removeReview} className='text-1xl font-bold text-center text-purple-400 ml-2'/>
    </div>
  )
}

export default Delete