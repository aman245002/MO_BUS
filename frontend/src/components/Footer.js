// src/components/Footer.js
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-3 mt-auto">
      <Container>
        <Row className="justify-content-between">
          <Col md="auto">
            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="text-light me-3">LinkedIn</a>
            <a href="https://github.com/" target="_blank" rel="noreferrer" className="text-light me-3">GitHub</a>
            <a href="https://instagram.com/" target="_blank" rel="noreferrer" className="text-light me-3">Instagram</a>
            <a href="/help" className="text-light">Help</a>
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
