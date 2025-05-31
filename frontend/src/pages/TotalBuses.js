// src/pages/TotalBuses.js
import React, { useEffect, useState } from 'react';
import { Container, ListGroup, Spinner } from 'react-bootstrap';
import axios from '../api/axios';
import UserNavbar from '../components/UserNavbar';
import Footer from '../components/Footer';

function TotalBuses() {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await axios.get('/api/buses/all'); // backend endpoint
        setBuses(response.data);
      } catch (error) {
        console.error('Error fetching buses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBuses();
  }, []);

  return (
    <>
      <UserNavbar />
      <Container className="my-5">
        <h3 className="text-center mb-4">All Buses</h3>

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <ListGroup>
            {buses.length > 0 ? (
              buses.map((bus, index) => (
                <ListGroup.Item key={index}>
                  <strong>{bus.number || 'Bus #' + (index + 1)}</strong> — {bus.name || 'Unnamed Bus'}
                </ListGroup.Item>
              ))
            ) : (
              <ListGroup.Item>No buses found.</ListGroup.Item>
            )}
          </ListGroup>
        )}
      </Container>
      <Footer />
    </>
  );
}

export default TotalBuses;
