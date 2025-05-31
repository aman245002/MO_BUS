// src/components/BusCard.js
import React from "react";

const BusCard = ({ bus }) => {
  return (
    <div className="card mb-3 p-3 shadow-sm border rounded">
      <h5>{bus.name} ({bus.number})</h5>
      <p><strong>From:</strong> {bus.source.name}</p>
      <p><strong>To:</strong> {bus.destination.name}</p>
      <p><strong>Departure:</strong> {bus.departureTime} | <strong>Arrival:</strong> {bus.arrivalTime}</p>
      <p><strong>Seats:</strong> {bus.availableSeats} / {bus.totalSeats}</p>
      <p><strong>Price:</strong> ₹{bus.price}</p>
      <p><strong>Type:</strong> {bus.busType}</p>
    </div>
  );
};

export default BusCard;
