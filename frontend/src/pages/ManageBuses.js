import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Button,
  Container,
  Row,
  Col,
  Spinner,
  Alert,
} from "react-bootstrap";
import Footer from "../components/Footer";
import UserNavbar from "../components/UserNavbar";
import { useNavigate } from "react-router-dom";
const ManageBuses = () => {
  const navigate = useNavigate();
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchBuses = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "https://mo-bus-iozk.onrender.com/api/buses/all"
      );
      setBuses(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch buses");
      setLoading(false);
    }
  };

  const deleteBus = async (id) => {
    if (!window.confirm("Are you sure you want to delete this bus?")) return;
    try {
      await axios.delete(`https://mo-bus-iozk.onrender.com/api/buses/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setBuses((prev) => prev.filter((bus) => bus._id !== id));
    } catch (err) {
      alert("Error deleting bus");
    }
  };

  useEffect(() => {
    fetchBuses();
  }, []);

  return (
    <>
      <UserNavbar />
      <Container className="mt-4">
        <Row className="mb-3">
          <Col>
            <h2>Manage Buses</h2>
          </Col>
          <Col className="text-end">
            <Button
              variant="primary"
              onClick={() => navigate("/admin/add-bus")}
            >
              Add New Bus
            </Button>
          </Col>
        </Row>

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Number</th>
                <th>Source</th>
                <th>Destination</th>
                <th>Seats</th>
                <th>Departure</th>
                <th>Arrival</th>
                <th>Price</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {buses.map((bus) => (
                <tr key={bus._id}>
                  <td>{bus.name}</td>
                  <td>{bus.number}</td>
                  <td>{bus.source?.name}</td>
                  <td>{bus.destination?.name}</td>
                  <td>
                    {bus.availableSeats}/{bus.totalSeats}
                  </td>
                  <td>{bus.departureTime}</td>
                  <td>{bus.arrivalTime}</td>
                  <td>₹{bus.price}</td>
                  <td>{bus.busType}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => navigate(`/admin/edit-bus/${bus._id}`)}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => deleteBus(bus._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default ManageBuses;
