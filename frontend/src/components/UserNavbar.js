import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./UserNavbar.css";

function UserNavbar() {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <Navbar bg="white" expand="lg" className="custom-navbar shadow-sm px-3">
      <Container fluid>
        {/* Branding Title Only */}
        <Navbar.Brand
          onClick={() => navigate("/dashboard")}
          className="brand-logo"
        >
          <span className="brand-text">Aman Booking System</span>
        </Navbar.Brand>

        {/* Right - Links */}
        <Nav className="ms-auto nav-links">
          <Nav.Link onClick={() => navigate("/total-busstops")}>
            Bus Stops
          </Nav.Link>
          <Nav.Link onClick={() => navigate("/total-buses")}>Buses</Nav.Link>
          <Nav.Link onClick={() => navigate("/profile")}>My Profile</Nav.Link>

          {userRole === "admin" && (
            <>
              <Nav.Link onClick={() => navigate("/manage-busstops")}>
                Manage Stops
              </Nav.Link>
              <Nav.Link onClick={() => navigate("/manage-buses")}>
                Manage Buses
              </Nav.Link>
              <Nav.Link onClick={() => navigate("/admin/manage-profiles")}>
                Profiles
              </Nav.Link>
            </>
          )}

          <Nav.Link onClick={handleLogout} className="nav-link logout-button">
            Logout
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default UserNavbar;
