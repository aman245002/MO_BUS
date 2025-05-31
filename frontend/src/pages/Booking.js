import React from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';

function Booking() {
  const { busId } = useParams();

  return (
    <Container className="mt-5">
      <h2>Booking Bus ID: {busId}</h2>
      {/* TODO: Passenger details form, seat selection, payment */}
    </Container>
  );
}

export default Booking;
