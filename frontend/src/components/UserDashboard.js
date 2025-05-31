import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button, Row, Col, Card, Spinner } from "react-bootstrap";
import UserNavbar from "./UserNavbar";
import Footer from "./Footer";

function UserDashboard() {
  const [busStopName, setBusStopName] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setResults([]);
    setLoading(true);

    try {
      if (!busStopName.trim()) {
        setError("Please enter a bus stop name.");
        setLoading(false);
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in to search.");
        setLoading(false);
        return;
      }

      const res = await axios.get(
        "https://mo-bus-iozk.onrender.com/api/buses/search",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { stop: busStopName.trim() },
        }
      );

      setResults(res.data);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Failed to fetch buses. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <UserNavbar />
      <Container className="my-5 text-center">
        <Card className="mb-4 shadow-sm">
          <Card.Img
            variant="top"
            src="/bus6.jpg"
            alt="Bus Booking Banner"
            style={{ maxHeight: "800px", objectFit: "cover" }}
          />
          <Card.Body>
            <Card.Title as="h3">Search Buses by Bus Stop</Card.Title>
            <Form onSubmit={handleSearch}>
              <Row className="justify-content-center my-4">
                <Col xs={10} md={6} lg={4}>
                  <Form.Control
                    type="text"
                    placeholder="Enter Bus Stop Name"
                    value={busStopName}
                    onChange={(e) => setBusStopName(e.target.value)}
                  />
                </Col>
              </Row>
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" /> Searching...
                  </>
                ) : (
                  "Search"
                )}
              </Button>
            </Form>

            {error && <p className="text-danger mt-3">{error}</p>}
          </Card.Body>
        </Card>

        {results.length > 0 && (
          <div>
            <h4 className="mb-4">Available Buses:</h4>
            <Row className="g-4 justify-content-center">
              {results.map((bus) => (
                <Col key={bus._id} xs={12} md={6} lg={4}>
                  <Card className="h-100 shadow-sm border-0">
                    <Card.Body>
                      <Card.Title>{bus.name} ({bus.number})</Card.Title>
                      <Card.Text>
                        <strong>From:</strong> {bus.source?.name || "N/A"} <br />
                        <strong>To:</strong> {bus.destination?.name || "N/A"} <br />
                        <strong>Departure:</strong> {bus.departureTime} <br />
                        <strong>Arrival:</strong> {bus.arrivalTime} <br />
                        <strong>Seats:</strong> {bus.availableSeats}/{bus.totalSeats} <br />
                        <strong>Price:</strong> ₹{bus.price} <br />
                        <strong>Route:</strong> {bus.routeNumber} <br />
                        <strong>Type:</strong> {bus.busType}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        )}
      </Container>
      <Footer />
    </>
  );
}

export default UserDashboard;
