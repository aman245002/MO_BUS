// src/pages/HomePage.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import busImage from "../assets/bus.jpg"; // Ensure the image exists

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <Container className="my-5">
      <Row className="align-items-center">
        <Col md={6} className="mb-4 mb-md-0">
          <img src={busImage} alt="Bus" className="img-fluid rounded shadow" />
        </Col>
        <Col md={6}>
          <h2 className="mb-3">Welcome to Aman Booking System</h2>
          <p style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
            Experience seamless and easy bus ticket booking. Search routes,
            compare prices, check seat availability, and book your tickets in
            seconds. Safe, fast, and reliable travel – one click away!
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
