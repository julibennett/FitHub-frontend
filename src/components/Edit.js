import React from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Edit = ({ reviewId, reviewUser, comments}) => {

    const navigate = useNavigate()
    const { id } = useParams()

    //console.log(id)
    //console.log(reviewId)
    //console.log(reviewUser)

    const [review, setReview] = useState(null)
    const [editing, setEditing] = useState(false)
    const token = localStorage.getItem("authToken")

    const updateReview = async (review) => {
        //console.log(review.comments)
        await fetch(`http://localhost:4000/api/class/${id}/review/${reviewId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "authorization": token
            },
            body: JSON.stringify(review)
        })
    }

    const handleEdit = () => {
        setEditing(true)
    }

    const handleChange = (e) => {
        console.log("typing review...")
        setReview({...review, [e.target.name]: e.target.value})
    }

    const editReview = (e) => {
        setEditing(false)
        e.preventDefault()
        updateReview(review, reviewId)
        //console.log(review)
        navigate(`/class`)
    }

    return (
        <div>
        {editing === true ? (
            <div>
                <form onSubmit={editReview}>
                    <label>
                        <input className='border-double border-2 border-purple-300 rounded-lg px-1 py-1 mb-5'
                        type="text"
                        name="username"
                        placeholder="Enter username."
                        onChange={handleChange}
                        />
                    </label>
                    <br></br>
                    <label>
                        <textarea class="border-double border-2 border-purple-300 rounded-lg px-4 py-2 resize-none" rows="4" type="text"
                            name="comments"
                            placeholder="Let us know what you think again!"
                            onChange={handleChange}>
                        </textarea>
                    </label>
                    <br></br>
                    <button type="submit" className='text-1xl font-bold text-center text-purple-400'>Submit</button> 
                </form>
                <br></br>
            </div>
        ) : (
            <input type="button" value="Edit" onClick={handleEdit} className='text-1xl font-bold text-center text-purple-400 mr-2'/>
        )}
    </div>
    )
}

export default Edit