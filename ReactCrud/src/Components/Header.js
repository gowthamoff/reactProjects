import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const shouldShowButton =
    location.pathname !== "/post" && !location.pathname.startsWith("/edit/");
  const shouldShowHomeButton =
    location.pathname.includes("/edit/") || location.pathname === "/post";

  return (
    <div className="header">
      <Navbar expand="lg">
        <Navbar.Brand
          as={Link}
          to="/"
          className="leftPad d-flex justify-content-center align-items-center fw-bold fs-4"
          style={{ height: "100px" }}
        >
          CRUD
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="justify-content-end">
          <Nav>
            {shouldShowHomeButton && (
              <Nav.Link as={Link} to="/">
                <Button variant="secondary">Home</Button>
              </Nav.Link>
            )}
            {shouldShowButton && (
              <Nav.Link as={Link} to="/post">
                <Button variant="success">Add Record</Button>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
