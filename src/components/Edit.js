import React from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Edit = ({ reviewId, comments}) => {

    const navigate = useNavigate()
    const { id } = useParams()

    //console.log(id)
    //console.log(reviewId)

    const [review, setReview] = useState(comments)
    const [editing, setEditing] = useState(false)

    const updateReview = async (review) => {
        //console.log(review.comments)
        await fetch(`http://localhost:4000/class/${id}/review/${reviewId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(review)
        })
    }

    const handleEdit = () => {
        setEditing(true)
    }

    const handleChange = (e) => {
        console.log("typing review...")
        setReview({[e.target.name]: e.target.value})
    }

    const editReview = (e) => {
        setEditing(false)
        e.preventDefault()
        updateReview(review, reviewId)
        console.log(review)
        navigate(`/class`)
    }

    return (
        <div>
            {editing === true ? (
                <div>
                    <input style={{width: "200px", height: "100px"}}
                        type="text"
                        name="comments"
                        placeholder="Enter new review."
                        onChange={handleChange}
                    />
                    <br></br>
                    <input type="button" value="Submit" onClick={editReview} className='text-1xl font-bold text-center mb-4'/>
                </div>
            ) : (
                <input type="button" value="Edit" onClick={handleEdit} className='text-1xl font-bold text-center mb-4'/>
            )}
        </div>
    )
}

export default Edit