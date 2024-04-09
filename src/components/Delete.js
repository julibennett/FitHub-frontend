import React from 'react'
import { useParams, useNavigate } from "react-router-dom"

const Delete = (reviewId) => {
    const navigate = useNavigate()
    const { id } = useParams()

    //console.log(id)
    //console.log(reviewId.reviewId)
    const reviewid = reviewId.reviewId

    const deleteReview = async () => {
        console.log("deleting review")
        await fetch(`http://localhost:4000/class/${id}/review/${reviewid}`, {
            method: "DELETE",
        })
    }

    const removeReview = (e) => {
        e.preventDefault()
        deleteReview(reviewid)
        navigate(`/class`)
      } 

  return (
    <div>
        <input type="button" value="Delete" onClick={removeReview} className='text-1xl font-bold text-center mb-4'/>
    </div>
  )
}

export default Delete