import { useParams, useNavigate } from "react-router-dom"

const Reservations = ({props, reservation}) => {
  const navigate = useNavigate()
  const { id } = useParams();

  const loaded = () => {
    return props.reservation.map((workoutClass) => {
      return(
        <div key={workoutClass._id}>
          <h1>{workoutClass.studio}</h1>
          <p>{workoutClass.location}</p>
          <p>{workoutClass.typeOfClass}</p>
          <p>{workoutClass.location}</p>
          <button onClick={removeReservation}>Delete</button>
        </div>
      )
    })
  }

  const removeReservation = (e) => {
    e.preventDefault()
    reservation.deleteReservation(id)
    navigate("/reservation")
  }

  return (reservation ? loaded() : <h1>Loading ...</h1>)
}

export default Reservations