
import { useParams, useNavigate } from "react-router-dom";

const Reservations = ({ reservations, deleteReservation }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const userId = localStorage.getItem("userId")

  const handleDelete = async (reservationId) => {
    const success = await deleteReservation(reservationId);
    if (!success) {
      navigate("/reservation"); 
      console.log(userId)
    } else {
      alert("Failed to delete reservation.");
    }
  };

  if (!reservations) {
    return <h1 className="text-white">Loading...</h1>;
  }

  if (reservations.length === 0) {
    return <h1 className="text-white">No Reservations Found</h1>;
  }

  console.log("Reservations data:", reservations);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {reservations
        .filter(reservation => userId == reservation.userId)
        .map(reservation => (
          <div key={reservation._id} className="bg-white text-black rounded-lg shadow-md p-4">
            <>
              <h1 className="text-lg font-bold">{reservation.classId ? reservation.classId.studio : 'No Studio Info'}</h1>
              <img src={reservation.classId ? reservation.classId.image : '/path/to/default/image.png'} alt="image of workout class" className="object-contain border-double border-4 rounded-xl border-purple-300 mb-4"/>
              <p>{reservation.classId ? reservation.classId.location : 'No Location Info'}</p>
              <p>{reservation.classId ? reservation.classId.typeOfClass : 'No Class Type Info'}</p>
              <p>Time: {reservation.classId ? reservation.classId.time : 'No Time Info'}</p>
              <button onClick={() => handleDelete(reservation._id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-4">Delete</button>
            </>
          </div>
        ))
      }
    </div>
  );
  
}

export default Reservations;
