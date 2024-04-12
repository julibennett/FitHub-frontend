import { useParams, useNavigate } from "react-router-dom";

const Reservations = ({ reservations, deleteReservation }) => {
  const navigate = useNavigate()
  const { id } = useParams()

  const handleDelete = (reservationId) => {
    deleteReservation(reservationId)
    navigate("/reservation")
  };

  const loaded = () => {
    console.log("Loaded reservations:", reservations)
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {reservations.map((reservation) => (
          <div key={reservation._id} className="bg-white text-black rounded-lg shadow-md p-4">
            <h1 className="text-lg font-bold">{reservation.classId.studio} </h1>
            <img src={reservation.classId.image} alt="image of workout class" style={{width: "350px", height: "200px"}}/>            
            <p>{reservation.classId.location}</p>
            <p>{reservation.classId.typeOfClass}</p>
            <p> Time: {reservation.classId.time}</p>
            <button onClick={() => handleDelete(reservation._id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-4">Delete</button>
          </div>
        ))}
      </div>
    );
}


  return reservations && reservations.length > 0 ? loaded() : <h1 className="text-white">Loading ...</h1>
}

export default Reservations;
