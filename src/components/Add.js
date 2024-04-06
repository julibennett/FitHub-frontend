import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

import Reservations from "../pages/Reservations"

const Add = ({addClass}) => {

    return (
        <section>
            <div>
                <input type="button" value="Add" onClick={addClass}/>
            </div>
        </section>
    )
}

export default Add

/*
    const { id } = useParams();

    const [classData, setClassData] = useState(null)

    const fetchClassData = async() => {
        console.log(classId)
        const response = await fetch(`http://localhost:4000/class/${classId}`)
        const data = await response.json()
        setClassData(data)
        props.createReservation(classData)
        console.log("Added")
    }
    
    useEffect(() => {
        fetchClassData()
    }, [])  
    */