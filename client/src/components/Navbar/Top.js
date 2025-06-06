import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { HashLink as Link } from 'react-router-hash-link';
import Navbar from 'react-bootstrap/Navbar';
import './top.css';

const Top = () => {
  const [fix, setfix] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    function handleScroll() {
      setfix(window.scrollY >= 80);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navbarClass = fix ? 'fixed-navbar navBackground' : 'navBackground';

  return (
    <Navbar
      bg=""
      className={navbarClass}
      expand="md"
      variant="light"
      collapseOnSelect
    >
      <Container>
        <Navbar.Brand>
          <Link to="/" className='trans nav-link head' smooth>
            ORGAN DONATION
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Link to="/User_Medical_Info" className={`trans nav-link nav-link-ltr ${activeLink === "user_medical_info" ? "active-link" : ""}`} onClick={() => setActiveLink("user_medical_info")}>USER MEDICAL INFO</Link>
            <Link to="/Donor_Register" className={`trans nav-link nav-link-ltr ${activeLink === "donor_register" ? "active-link" : ""}`} onClick={() => setActiveLink("donor_register")}>DONOR REGISTER</Link>
            <Link to="/Transactions" className={`trans nav-link nav-link-ltr ${activeLink === "transactions" ? "active-link" : ""}`} onClick={() => setActiveLink("transactions")}>TRANSPLANT INSIGHTS</Link>
          </Nav>
          <Nav className="login-nav">
            <Link to="/Hospital_login" className='buttn nav-link'>Hospital Login</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Top;
