import { useParams, useNavigate } from "react-router-dom";

const Reservations = ({ reservations, deleteReservation }) => {
  const navigate = useNavigate()
  const { id } = useParams()

  const handleDelete = (reservationId) => {
    deleteReservation(reservationId)
    navigate("/reservation")
  };

  const loaded = () => {
    return reservations.map((workoutClass) => (
      <div key={workoutClass._id}>
        <h1>{workoutClass.studio}</h1>
        <p>{workoutClass.location}</p>
        <p>{workoutClass.typeOfClass}</p>
        <button onClick={() => handleDelete(workoutClass._id)}>Delete</button>
      </div>
    ))
  }

  return reservations && reservations.length > 0 ? loaded() : <h1>Loading ...</h1>
}

export default Reservations;
