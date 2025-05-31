import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function UserNavbar() {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole'); // 'user' or 'admin'

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand
          onClick={() => navigate('/dashboard')}
          style={{ cursor: 'pointer' }}
        >
          Aman Booking System
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/* Visible to all */}
            <Nav.Link onClick={() => navigate('/total-busstops')}>Total Bus Stops</Nav.Link>
            <Nav.Link onClick={() => navigate('/total-buses')}>Total Buses</Nav.Link>
            <Nav.Link onClick={() => navigate('/profile')}>My Profile</Nav.Link>

            {/* Admin-only */}
            {userRole === 'admin' && (
              <>
                <Nav.Link onClick={() => navigate('/manage-busstops')}>Manage Bus Stops</Nav.Link>
                <Nav.Link onClick={() => navigate('/manage-buses')}>Manage Buses</Nav.Link>
                <Nav.Link onClick={() => navigate('/admin/manage-profiles')}>Manage Profiles</Nav.Link>
              </>
            )}

            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default UserNavbar;
