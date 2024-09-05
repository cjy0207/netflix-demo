import React from "react";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLanguage } from "../hooks/useLanguage";

const AppLayout = () => {
  const navigate = useNavigate();
  const { language, toggleLanguage } = useLanguage(); // Get the current language and toggle function
  const [keyword, setKeyword] = useState("");

  const gotoPage = (path) => {
    navigate(path);
  };

  const searchByKeyword = (event) => {
    event.preventDefault();
    navigate(`/movies?q=${keyword}`);
    setKeyword("");
  };

  return (
    <div>
      <Navbar expand="lg" variant="dark">
        <Container fluid>
          <Navbar.Brand onClick={() => gotoPage("/")} className="navbar-brand-logo">
            <img src="/netflix_red.png" width={100} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link onClick={() => gotoPage("/")}>Home</Nav.Link>
              <Nav.Link onClick={() => gotoPage("/movies")}>Movie</Nav.Link>
            </Nav>
            <Form className="d-flex" onSubmit={searchByKeyword}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
              />
              <Button variant="outline-danger">Search</Button>
            </Form>
            {/* KR Button to toggle language */}
            <Button variant="outline-light" onClick={toggleLanguage}>
              {language === "en-US" ? "KR" : "EN"}
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
};

export default AppLayout;
