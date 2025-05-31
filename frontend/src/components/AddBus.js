import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";
import Footer from "./Footer";
import UserNavbar from "./UserNavbar";

const AddBus = () => {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    source: "",
    destination: "",
    totalSeats: "",
    availableSeats: "",
    departureTime: "",
    arrivalTime: "",
    price: "",
    routeNumber: "",
    totalTime: "",
    busStops: [],
    busType: "AC",
  });

  const [busStopsList, setBusStopsList] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBusStops = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/busstops", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBusStopsList(res.data); // ✅ Set the list
      } catch (error) {
        console.error("Error fetching bus stops:", error);
      }
    };

    fetchBusStops();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, selectedOptions } = e.target;

    if (type === "select-multiple") {
      const values = Array.from(selectedOptions).map((opt) => opt.value);
      setFormData((prev) => ({ ...prev, [name]: values }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.post(
        "http://localhost:5000/api/buses",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Bus added successfully!");
      setFormData({
        name: "",
        number: "",
        source: "",
        destination: "",
        totalSeats: "",
        availableSeats: "",
        departureTime: "",
        arrivalTime: "",
        price: "",
        routeNumber: "",
        totalTime: "",
        busStops: [],
        busType: "AC",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add bus");
    }
  };

  return (
    <>
      <UserNavbar />
      <Container className="mt-4">
        <h3>Add New Bus</h3>
        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group controlId="name">
                <Form.Label>Bus Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="number" className="mt-2">
                <Form.Label>Bus Number</Form.Label>
                <Form.Control
                  type="text"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="source" className="mt-2">
                <Form.Label>Source</Form.Label>
                <Form.Select
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Source</option>
                  {busStopsList.map((stop) => (
                    <option key={stop._id} value={stop._id}>
                      {stop.name} ({stop.location})
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group controlId="destination" className="mt-2">
                <Form.Label>Destination</Form.Label>
                <Form.Select
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Destination</option>
                  {busStopsList
                    .filter((stop) => stop._id !== formData.source)
                    .map((stop) => (
                      <option key={stop._id} value={stop._id}>
                        {stop.name} ({stop.location})
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>

              <Form.Group controlId="busStops" className="mt-2">
                <Form.Label>Intermediate Bus Stops</Form.Label>
                <Form.Control
                  as="select"
                  name="busStops"
                  multiple
                  value={formData.busStops}
                  onChange={handleChange}
                >
                  {busStopsList
                    .filter(
                      (stop) =>
                        stop._id !== formData.source &&
                        stop._id !== formData.destination
                    )
                    .map((stop) => (
                      <option key={stop._id} value={stop._id}>
                        {stop.name} ({stop.location})
                      </option>
                    ))}
                </Form.Control>
                <Form.Text>Select multiple using Ctrl/Command key.</Form.Text>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="totalSeats">
                <Form.Label>Total Seats</Form.Label>
                <Form.Control
                  type="number"
                  name="totalSeats"
                  value={formData.totalSeats}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="availableSeats" className="mt-2">
                <Form.Label>Available Seats</Form.Label>
                <Form.Control
                  type="number"
                  name="availableSeats"
                  value={formData.availableSeats}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="departureTime" className="mt-2">
                <Form.Label>Departure Time</Form.Label>
                <Form.Control
                  type="time"
                  name="departureTime"
                  value={formData.departureTime}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="arrivalTime" className="mt-2">
                <Form.Label>Arrival Time</Form.Label>
                <Form.Control
                  type="time"
                  name="arrivalTime"
                  value={formData.arrivalTime}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="price" className="mt-2">
                <Form.Label>Ticket Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="routeNumber" className="mt-2">
                <Form.Label>Route Number</Form.Label>
                <Form.Control
                  type="text"
                  name="routeNumber"
                  value={formData.routeNumber}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="totalTime" className="mt-2">
                <Form.Label>Total Time</Form.Label>
                <Form.Control
                  type="text"
                  name="totalTime"
                  value={formData.totalTime}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="busType" className="mt-2">
                <Form.Label>Bus Type</Form.Label>
                <Form.Select
                  name="busType"
                  value={formData.busType}
                  onChange={handleChange}
                  required
                >
                  <option value="AC">AC</option>
                  <option value="Non-AC">Non-AC</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Button variant="primary" type="submit" className="mt-3">
            Add Bus
          </Button>
        </Form>
      </Container>
      <Footer />
    </>
  );
};

export default AddBus;
