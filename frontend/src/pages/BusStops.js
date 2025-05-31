import React, { useEffect, useState } from 'react';
import { Container, ListGroup, Spinner, Form } from 'react-bootstrap';
import axios from '../api/axios';
import UserNavbar from '../components/UserNavbar';
import Footer from '../components/Footer';

function BusStops() {
  const [busStops, setBusStops] = useState([]);
  const [filteredStops, setFilteredStops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchBusStops = async () => {
      try {
        const response = await axios.get('/api/busstops');
        setBusStops(response.data);
        setFilteredStops(response.data);
      } catch (error) {
        console.error('Error fetching bus stops:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBusStops();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = busStops.filter((stop) =>
      stop.name.toLowerCase().includes(value)
    );
    setFilteredStops(filtered);
  };

  return (
    <>
      <UserNavbar />
      <Container className="my-5">
        <h3 className="text-center mb-4">All Bus Stops</h3>

        {/* Search Bar */}
        <Form className="mb-4">
          <Form.Control
            type="text"
            placeholder="Search bus stop by name..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </Form>

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <ListGroup>
            {filteredStops.length > 0 ? (
              filteredStops.map((stop, index) => (
                <ListGroup.Item key={index}>
                  <strong>{stop.name}</strong> —{' '}
                  <span className="text-muted">{stop.location}</span>
                </ListGroup.Item>
              ))
            ) : (
              <ListGroup.Item>No bus stop found.</ListGroup.Item>
            )}
          </ListGroup>
        )}
      </Container>
      <Footer />
    </>
  );
}

export default BusStops;
