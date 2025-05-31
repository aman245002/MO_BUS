// src/pages/Dashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import BusCard from "../components/BusCard";

const Dashboard = () => {
  const [buses, setBuses] = useState([]);

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/buses/all");
        setBuses(res.data);
      } catch (error) {
        console.error("Failed to fetch buses", error);
      }
    };

    fetchBuses();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Available Buses</h2>
      {buses.length === 0 ? (
        <p>No buses available.</p>
      ) : (
        buses.map((bus) => <BusCard key={bus._id} bus={bus} />)
      )}
    </div>
  );
};

export default Dashboard;
