import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Form,
  Button,
  Alert,
  Container,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import UserNavbar from "./UserNavbar";

const EditBus = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const token = localStorage.getItem("token");

        const [busRes, stopsRes] = await Promise.all([
          axios.get(`https://mo-bus-iozk.onrender.com/api/buses/${id}`, {
            headers: { Authorization: `Bearer ${token}` }, // ✅ FIXED HERE
          }),
          axios.get("https://mo-bus-iozk.onrender.com/api/busstops", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setFormData({
          ...busRes.data,
          source: busRes.data.source._id,
          destination: busRes.data.destination._id,
          busStops: busRes.data.busStops.map((stop) => stop._id),
        });

        setBusStopsList(stopsRes.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch bus details.");
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

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
      await axios.put(
        `https://mo-bus-iozk.onrender.com/api/buses/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Bus updated successfully!");
      setTimeout(() => navigate("/manage-buses"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update bus.");
    }
  };

  if (loading) {
    return (
      <Container className="mt-4 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <>
      <UserNavbar />
      <Container className="mt-4">
        <h3>Edit Bus</h3>
        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        {/* Reuse the same form layout from AddBus */}
        {/* Paste the <Form> layout from AddBus here, using formData and handleChange */}

        <Form onSubmit={handleSubmit}>
          {/* same form fields as in AddBus using formData values */}
          {/* Don't forget to set default values from formData */}

          {/* Final buttons */}

          <Form.Group className="mb-3">
            <Form.Label>Bus Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Bus Number</Form.Label>
            <Form.Control
              type="text"
              name="number"
              value={formData.number}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
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
                  {stop.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Destination</Form.Label>
            <Form.Select
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              required
            >
              <option value="">Select Destination</option>
              {busStopsList.map((stop) => (
                <option key={stop._id} value={stop._id}>
                  {stop.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Bus Stops</Form.Label>
            <Form.Control
              as="select"
              multiple
              name="busStops"
              value={formData.busStops}
              onChange={handleChange}
              required
            >
              {busStopsList.map((stop) => (
                <option key={stop._id} value={stop._id}>
                  {stop.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Departure Time</Form.Label>
                <Form.Control
                  type="time"
                  name="departureTime"
                  value={formData.departureTime}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Arrival Time</Form.Label>
                <Form.Control
                  type="time"
                  name="arrivalTime"
                  value={formData.arrivalTime}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Total Time</Form.Label>
            <Form.Control
              type="text"
              name="totalTime"
              value={formData.totalTime}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Total Seats</Form.Label>
                <Form.Control
                  type="number"
                  name="totalSeats"
                  value={formData.totalSeats}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Available Seats</Form.Label>
                <Form.Control
                  type="number"
                  name="availableSeats"
                  value={formData.availableSeats}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Route Number</Form.Label>
            <Form.Control
              type="text"
              name="routeNumber"
              value={formData.routeNumber}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Bus Type</Form.Label>
            <Form.Select
              name="busType"
              value={formData.busType}
              onChange={handleChange}
            >
              <option value="AC">AC</option>
              <option value="Non-AC">Non-AC</option>
            </Form.Select>
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3 me-2">
            Update Bus
          </Button>
          <Button
            variant="secondary"
            className="mt-3"
            onClick={() => navigate("/manage-buses")}
          >
            Cancel
          </Button>
        </Form>
      </Container>
      <Footer />
    </>
  );
};

export default EditBus;
