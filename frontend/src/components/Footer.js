// src/components/Footer.js
import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css"; // Make sure to import the CSS file

const Footer = () => {
  return (
    <footer className="custom-footer mt-auto">
      <Container>
        <Row className="justify-content-between align-items-center">
          <Col md="auto" className="footer-links">
            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://instagram.com/" target="_blank" rel="noreferrer">Instagram</a>
            <a href="/help">Help</a>
          </Col>
          <Col md="auto" className="text-end">
            © {new Date().getFullYear()} Aman Booking System
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
