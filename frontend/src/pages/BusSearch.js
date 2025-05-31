import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';

function BusSearch() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // TODO: Call API to search buses
    console.log(from, to, date);
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '500px' }}>
      <h2 className="mb-4 text-center">Search Buses</h2>
      <Form onSubmit={handleSearch}>
        <Form.Group className="mb-3">
          <Form.Label>From</Form.Label>
          <Form.Control value={from} onChange={(e) => setFrom(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>To</Form.Label>
          <Form.Control value={to} onChange={(e) => setTo(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">Search</Button>
      </Form>
    </Container>
  );
}

export default BusSearch;
