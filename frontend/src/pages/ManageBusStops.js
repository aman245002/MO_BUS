import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Table,
  Alert,
} from "react-bootstrap";
import axios from "../api/axios";
import UserNavbar from "../components/UserNavbar";
import Footer from "../components/Footer";

function ManageBusStops() {
  const [editId, setEditId] = useState(null);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [routeNumbers, setRouteNumbers] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [busStops, setBusStops] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  const fetchBusStops = async () => {
    try {
      const res = await axios.get("/api/busstops", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBusStops(res.data);
    } catch (err) {
      setError("Failed to load bus stops");
    }
  };

  useEffect(() => {
    if (userRole?.toLowerCase() === "admin") {
      fetchBusStops();
    }
  }, [userRole]);

  const handleAddBusStop = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    const routesArray = routeNumbers.split(",").map((r) => r.trim());

    const payload = {
      name,
      location,
      routeNumbers: routesArray,
      coordinates: {
        lat: parseFloat(latitude),
        lng: parseFloat(longitude),
      },
    };

    try {
      if (editId) {
        const res = await axios.put(`/api/busstops/${editId}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage(res.data.message);
      } else {
        const res = await axios.post("/api/busstops", payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage(res.data.message);
      }

      setName("");
      setLocation("");
      setRouteNumbers("");
      setLatitude("");
      setLongitude("");
      setEditId(null);
      fetchBusStops();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save bus stop");
    }
  };

  const handleEdit = (stop) => {
    setEditId(stop._id);
    setName(stop.name);
    setLocation(stop.location);
    setRouteNumbers(stop.routeNumbers.join(", "));
    setLatitude(stop.coordinates?.lat || "");
    setLongitude(stop.coordinates?.lng || "");
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/busstops/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchBusStops();
    } catch (err) {
      setError("Failed to delete bus stop");
    }
  };

  if (userRole?.toLowerCase() !== "admin") {
    return (
      <Container className="mt-5">
        <Alert variant="danger">Access Denied: Admins only</Alert>
      </Container>
    );
  }

  return (
    <>
      <UserNavbar />
      <Container className="mt-5">
        <h2>Manage Bus Stops</h2>

        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleAddBusStop} className="mb-4">
          <Row className="align-items-end">
            <Col md={3}>
              <Form.Group className="mb-2">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-2">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-2">
                <Form.Label>Route Numbers (comma-separated)</Form.Label>
                <Form.Control
                  value={routeNumbers}
                  onChange={(e) => setRouteNumbers(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={1.5}>
              <Form.Group className="mb-2">
                <Form.Label>Lat</Form.Label>
                <Form.Control
                  type="number"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={1.5}>
              <Form.Group className="mb-2">
                <Form.Label>Lng</Form.Label>
                <Form.Control
                  type="number"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Button variant="primary" type="submit">
            {editId ? "Update Bus Stop" : "Add Bus Stop"}
          </Button>
          {editId && (
            <Button
              variant="secondary"
              className="ms-2"
              onClick={() => {
                setEditId(null);
                setName("");
                setLocation("");
                setRouteNumbers("");
                setLatitude("");
                setLongitude("");
              }}
            >
              Cancel Edit
            </Button>
          )}
        </Form>

        <h4>All Bus Stops</h4>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Route Numbers</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {busStops.map((stop) => (
              <tr key={stop._id}>
                <td>{stop.name}</td>
                <td>{stop.location}</td>
                <td>{stop.routeNumbers.join(", ")}</td>
                <td>{stop.coordinates?.lat || "N/A"}</td>
                <td>{stop.coordinates?.lng || "N/A"}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(stop)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(stop._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      <Footer />
    </>
  );
}

export default ManageBusStops;
