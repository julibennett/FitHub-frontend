import { useParams, useNavigate } from "react-router-dom"
import { useCallback } from "react"

const Add = ({ user, createReservation }) => {
    const { id } = useParams()
    const navigate = useNavigate()
    const userId = localStorage.getItem("userId")
    
    const fetchClassDataAndAddReservation = useCallback(async () => {
        try {
            
            const response = await fetch(`http://localhost:4000/api/class/${id}`)
            const data = await response.json()
            
            if (response.ok) {
                console.log(data.data)
                console.log(data.data._id)
                console.log(userId)
            if (data.data && data.data._id) {
                await createReservation({
                    classId: data.data._id,
                    userId: userId,
                    attending: true
                });
                console.log('create reservation', createReservation)
                console.log("Reservation Added");
                navigate("/reservation");
            } else {
                throw new Error("Data is missing or _id is undefined");
            }
        } else {
            throw new Error("Failed to fetch class data");
        }

        } catch (error) {
            console.error("Error in adding reservation:", error)
        }
    }, [id, userId, createReservation, navigate])

    return (
        <section>
            <div>
                <input type="button" value="Add" className='text-1xl font-bold text-center mb-4' onClick={fetchClassDataAndAddReservation}/>
            </div>
        </section>
    );
};

export default Add;
