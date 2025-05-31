import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import UserNavbar from "./UserNavbar";
import Footer from "./Footer";

function UserDashboard() {
  const [busStopName, setBusStopName] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setResults([]);

    try {
      if (!busStopName.trim()) {
        setError("Please enter a bus stop name.");
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in to search.");
        return;
      }

      const res = await axios.get("http://localhost:5000/api/buses/search", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { stop: busStopName.trim() }, // ✅ Corrected this line
      });

      setResults(res.data);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Failed to fetch buses. Try again."
      );
    }
  };

  return (
    <>
      <UserNavbar />
      <Container className="my-5 text-center">
        <img
          src="/bus.jpg"
          alt="Bus Booking Banner"
          className="img-fluid mb-4"
          style={{ maxHeight: "350px", borderRadius: "10px" }}
        />

        <h3 className="mb-4">Search Buses by Bus Stop</h3>

        <Form onSubmit={handleSearch}>
          <Row className="mb-4 justify-content-center">
            <Col md={4}>
              <Form.Control
                type="text"
                placeholder="Enter Bus Stop Name"
                value={busStopName}
                onChange={(e) => setBusStopName(e.target.value)}
              />
            </Col>
          </Row>

          <div className="text-center">
            <Button variant="primary" type="submit">
              Search
            </Button>
          </div>
        </Form>

        {error && <p className="text-danger mt-3">{error}</p>}

        {results.length > 0 && (
          <Container className="mt-4">
            <h5>Search Results:</h5>
            {results.map((bus) => (
              <div key={bus._id} className="border rounded p-3 mb-3 text-start">
                <strong>{bus.name}</strong> ({bus.number})<br />
                <small>
                  From: {bus.source?.name || "N/A"} → To:{" "}
                  {bus.destination?.name || "N/A"}
                  <br />
                  Departure: {bus.departureTime}, Arrival: {bus.arrivalTime}
                  <br />
                  Seats: {bus.availableSeats}/{bus.totalSeats}, Price: ₹
                  {bus.price}
                  <br />
                  Route: {bus.routeNumber}, Type: {bus.busType}
                </small>
              </div>
            ))}
          </Container>
        )}
      </Container>
      <Footer />
    </>
  );
}

export default UserDashboard;
