import { useEffect, useState } from "react"
import { useParams, useNavigate } from 'react-router-dom';
import {Routes, Route} from 'react-router-dom'
import ClassShow from "../pages/ClassShow";

const Review = (props) => {
    const { id } = useParams();

    const [review, setReview] = useState(null)

    const URL = `http://localhost:4000/class/${id}/`

    const getReview = async() => {
        const response = await fetch(URL)
        const data = await response.json()
        setReview(data.data)
    }

    const createReview = async (review) => {
        const createdReview = await fetch(URL + review, {
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
        await fetch(URL + review, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify()
        })
        getReview()
    }

    const deleteReview = async (review, id) => {
        await fetch(URL + review, {
            method: "DELETE",
        })
        getReview()
    }

    useEffect(() => {
        getReview()
    }, [])

    return (
        <Routes>
            <Route path="/:id" element={<ClassShow review={review} createReview={createReview}/>}/>
            <Route path="/:id/review" element={<ClassShow review={review} createReview={createReview} />}/>
            <Route path="/:id/review/:reviewId" element={<ClassShow review={review} createReview={createReview} updateReview={updateReview} deleteReview={deleteReview}/>}/>
        </Routes>
    )

}

export default Review
