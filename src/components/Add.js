// import { useParams } from "react-router-dom"
// import { useState, useEffect } from "react"

// import Reservations from "../pages/Reservations"

// const Add = ({addClass}) => {

//     return (
//         <section>
//             <div>
//                 <input type="button" value="Add" onClick={addClass}/>
//             </div>
//         </section>
//     )
// }

// export default Add

// /*
//     const { id } = useParams();

//     const [classData, setClassData] = useState(null)

//     const fetchClassData = async() => {
//         console.log(classId)
//         const response = await fetch(`http://localhost:4000/class/${classId}`)
//         const data = await response.json()
//         setClassData(data)
//         props.createReservation(classData)
//         console.log("Added")
//     }
    
//     useEffect(() => {
//         fetchClassData()
//     }, [])  
//     */

import { useParams, useNavigate } from "react-router-dom";
import { useCallback } from "react";

const Add = ({ createReservation, userId }) => {
    const { id: classId } = useParams();
    const navigate = useNavigate();

    const fetchClassDataAndAddReservation = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:4000/class/${classId}`);
            if (!response.ok) throw new Error("Failed to fetch class data");

            await createReservation({
                userId,  // Assuming userId is passed from props or derived from auth state
                classId,
                attending: true
            });
            console.log("Reservation Added");
            navigate("/reservation");
        } catch (error) {
            console.error("Error in adding reservation:", error);
        }
    }, [classId, userId, createReservation, navigate]);

    return (
        <section>
            <div>
                <input type="button" value="Add" onClick={fetchClassDataAndAddReservation} />
            </div>
        </section>
    );
};

export default Add;
