import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [user, setUser] = useState({ name: '', email: '', password: '', role: 'user' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/users/register', user);
      setMessage('Registration successful!');
      setTimeout(() => navigate('/'), 1500); // Redirect to login
    } catch (error) {
      setMessage(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="mb-4 text-center">Sign Up</h2>
      {message && <Alert variant="info">{message}</Alert>}
      <Form onSubmit={handleSubmit}>
  <Form.Group className="mb-3">
    <Form.Label>Name</Form.Label>
    <Form.Control type="text" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} required />
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label>Email</Form.Label>
    <Form.Control type="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} required />
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} required />
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label>Role</Form.Label>
    <Form.Select
      value={user.role}
      onChange={(e) => setUser({ ...user, role: e.target.value })}
      required
    >
      <option value="user">User</option>
      <option value="admin">Admin</option>
    </Form.Select>
  </Form.Group>

  <Button variant="success" type="submit" className="w-100">Register</Button>
</Form>

    </Container>
  );
}

export default Signup;
