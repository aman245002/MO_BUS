import React, { useEffect, useState } from 'react';
import { Container, Card, Spinner, Row, Col } from 'react-bootstrap';
import axios from '../api/axios';
import UserNavbar from '../components/UserNavbar';
import Footer from '../components/Footer';
import { FaUser, FaEnvelope, FaUserShield } from 'react-icons/fa';

function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <>
      <UserNavbar />
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '75vh', backgroundColor: '#fff' }}
      >
        <Container>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" />
            </div>
          ) : user ? (
            <Card className="shadow-lg border-0 p-4 mx-auto" style={{ maxWidth: '500px' }}>
              <Card.Body>
                <div className="text-center mb-4">
                  <FaUser size={60} className="text-dark mb-2" />
                  <h4>{user.name}</h4>
                  <p className="text-muted">
                    {user.role === 'admin' ? 'Administrator' : 'User'}
                  </p>
                </div>
                <hr />
                <Row className="mb-3">
                  <Col xs={1}>
                    <FaEnvelope className="text-dark" />
                  </Col>
                  <Col>
                    <strong>Email:</strong> {user.email}
                  </Col>
                </Row>
                <Row>
                  <Col xs={1}>
                    <FaUserShield className="text-dark" />
                  </Col>
                  <Col>
                    <strong>Role:</strong> {user.role}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ) : (
            <p className="text-center text-danger">Failed to load profile.</p>
          )}
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default UserProfile;
