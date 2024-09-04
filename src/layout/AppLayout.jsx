import React from "react";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";

const AppLayout = () => {
  const Navigate = useNavigate("")
  const gotoPage = (path) => {
    Navigate(path)
  }

  const [keyword, setkeyword] =useState("")
  const searchByKeyword = (event) =>{
    event.preventDefault()
    Navigate(`/movies?q=${keyword}`)
  }
  return (
    <div>
      <Navbar expand="lg" variant="dark">
        <Container fluid>
          <Navbar.Brand onClick={()=>gotoPage("/")} className="navbar-brand-logo">
            <img src="/netflix_red.png" width={100}/>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link onClick={()=>gotoPage("/")}>Home</Nav.Link>
              <Nav.Link onClick={()=>gotoPage("/movies")}>Movie</Nav.Link>
            </Nav>
            <Form className="d-flex" onSubmit={searchByKeyword}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={keyword}
                onChange={(event)=>setkeyword(event.target.value)}
              />
              <Button variant="outline-danger">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
};

export default AppLayout;
