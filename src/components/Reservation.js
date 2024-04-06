import { useState, useEffect } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"

//Import Pages
import Reservations from "../pages/Reservations"
import ClassShow from "../pages/ClassShow"

const Reservation = (props) => {
    const navigate = useNavigate()

    const URL = "http://localhost:4000/reservation/"

    const [reservation, setReservation] = useState(null)

    const getReservation = async() => {
        const response = await fetch(URL)
        const data = await response.json()
        setReservation(data.data)
        console.log(data.data)
    }

    const createReservation = async(classData) => {
        console.log("creating res")
        const createdRes = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(classData)
        })
        navigate("/reservation")
        getReservation()
        console.log(createdRes)
    }

    const deleteReservation = async(id) => {
        await fetch(URL + id, {
            method: "DELETE"
        })
        getReservation()
    }

    useEffect(() => {
        getReservation()
    }, []);

    return (
        <Routes>
            <Route path="/reservation" element={<Reservations reservation={reservation} createReservation={createReservation}/>}/>
            <Route path="/reservation/:id" element={<Reservations deleteReservation={deleteReservation} />}/>
        </Routes>
    )
}

export default Reservation