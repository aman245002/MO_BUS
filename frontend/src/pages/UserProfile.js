import React, { useEffect, useState } from 'react';
import { Container, Card, Spinner } from 'react-bootstrap';
import axios from '../api/axios';
import UserNavbar from '../components/UserNavbar';
import Footer from '../components/Footer';

function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token'); // ✅ Get token
        const response = await axios.get('/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}` // ✅ Attach token
          }
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
      <Container className="my-5">
        <h3 className="text-center mb-4">User Profile</h3>
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        ) : user ? (
          <Card className="mx-auto" style={{ maxWidth: '400px' }}>
            <Card.Body>
              <Card.Title>{user.name}</Card.Title>
              <Card.Text>Email: {user.email}</Card.Text>
              <Card.Text>Role: {user.role}</Card.Text>
            </Card.Body>
          </Card>
        ) : (
          <p className="text-center text-danger">Failed to load profile.</p>
        )}
      </Container>
      <Footer />
    </>
  );
}

export default UserProfile;
