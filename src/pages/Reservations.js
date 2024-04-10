import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Reservations = ({ reservation, deleteReservation }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDelete = (reservationId) => {
    deleteReservation(reservationId)
    navigate("/reservation");
  };

  return reservation && reservation.length > 0 ? (
    reservation.map(workoutClass => (
      <div key={workoutClass._id}>
        <h1>{workoutClass.studio}</h1>
        <p>{workoutClass.location}</p>
        <p>{workoutClass.typeOfClass}</p>
        <button onClick={() => handleDelete(workoutClass._id)}>Delete</button>
      </div>
    ))
  ) : <h1>Loading ...</h1>;
}

export default Reservations;
